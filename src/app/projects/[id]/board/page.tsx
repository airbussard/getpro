'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors, useDraggable, useDroppable } from '@dnd-kit/core';
import { Plus, ArrowLeft, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { useStore } from '@/store';
import { Task, TaskStatus } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function KanbanBoardPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;
  const router = useRouter();

  const { getProjectById, getProjectTasks, updateTask, users } = useStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const project = getProjectById(projectId);
  const allTasks = getProjectTasks(projectId);

  const filteredTasks = searchQuery
    ? allTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allTasks;

  const columns: { id: TaskStatus; title: string; }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in_progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = filteredTasks.find((t) => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    updateTask(taskId, { status: newStatus });
  };

  if (!project) {
    return <div className="text-white">Projekt nicht gefunden</div>;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">{project.name}</h1>
            {project.description && (
              <p className="text-gray-400 mt-1">{project.description}</p>
            )}
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Neue Task
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Tasks durchsuchen..."
            className="pl-10 bg-gray-900 border-gray-800 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-gray-800 text-gray-400">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-3 gap-6">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter((task) => task.status === column.id);

            return (
              <div key={column.id} className="flex flex-col">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-white">{column.title}</h2>
                    <Badge variant="secondary" className="text-xs">
                      {columnTasks.length}
                    </Badge>
                  </div>
                  <div className="h-1 bg-gray-800 rounded-full" />
                </div>

                <div
                  className="flex-1 space-y-3 min-h-[200px] p-2 rounded-lg bg-gray-900/30"
                  data-column-id={column.id}
                >
                  {columnTasks.map((task) => (
                    <TaskCard key={task.id} task={task} users={users} getPriorityColor={getPriorityColor} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} users={users} getPriorityColor={getPriorityColor} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

interface TaskCardProps {
  task: Task;
  users: ReturnType<typeof useStore>['users'];
  getPriorityColor: (priority: string) => string;
  isDragging?: boolean;
}

function TaskCard({ task, users, getPriorityColor, isDragging = false }: TaskCardProps) {
  const assignedUsers = users.filter((u) => task.assigneeIds.includes(u.id));

  return (
    <Card
      className={`bg-gray-900 border-gray-800 hover:border-gray-700 cursor-pointer transition-all ${
        isDragging ? 'opacity-50 rotate-2' : ''
      }`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', task.id);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      }}
      onDrop={(e) => {
        e.preventDefault();
      }}
    >
      <CardHeader className="p-4 pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-medium text-white line-clamp-2">
            {task.title}
          </CardTitle>
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getPriorityColor(task.priority)}`} />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {task.description && (
          <p className="text-xs text-gray-400 mb-3 line-clamp-2">{task.description}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {assignedUsers.slice(0, 3).map((user) => (
              <Avatar
                key={user.id}
                src={user.avatarUrl}
                fallback={user.fullName}
                className="h-6 w-6 border-2 border-gray-900"
              />
            ))}
            {assignedUsers.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-xs text-gray-400">
                +{assignedUsers.length - 3}
              </div>
            )}
          </div>
          {task.deadline && (
            <span className="text-xs text-gray-500">
              {new Date(task.deadline).toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
              })}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
