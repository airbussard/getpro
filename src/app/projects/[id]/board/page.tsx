'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Plus, ArrowLeft, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { useStore } from '@/store';
import { Task, TaskStatus, User } from '@/types';

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
    return <div className="text-gray-900 dark:text-white">Projekt nicht gefunden</div>;
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
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
            {project.description && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
            )}
          </div>
        </div>
        <Button>
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
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
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
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{column.title}</h2>
                    <Badge variant="secondary" className="text-xs">
                      {columnTasks.length}
                    </Badge>
                  </div>
                  <div className="h-1 bg-gray-200 dark:bg-gray-800 rounded-full" />
                </div>

                <div
                  className="flex-1 space-y-3 min-h-[200px] p-2 rounded-lg bg-gray-100/50 dark:bg-gray-900/30"
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
  users: User[];
  getPriorityColor: (priority: string) => string;
  isDragging?: boolean;
}

function TaskCard({ task, users, getPriorityColor, isDragging = false }: TaskCardProps) {
  const assignedUsers = users.filter((u) => task.assigneeIds.includes(u.id));
  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'done';

  const priorityLabels: Record<string, string> = {
    critical: 'Kritisch',
    high: 'Hoch',
    medium: 'Mittel',
    low: 'Niedrig',
  };

  return (
    <Card
      className={`hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg cursor-pointer transition-all ${
        isDragging ? 'opacity-50 rotate-2 scale-105' : ''
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
        <div className="flex items-start justify-between gap-3 mb-2">
          <CardTitle className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 flex-1">
            {task.title}
          </CardTitle>
          <Badge
            className={`text-xs px-2 py-0.5 flex-shrink-0 ${getPriorityColor(task.priority)} border-0`}
          >
            {priorityLabels[task.priority]}
          </Badge>
        </div>
        {task.description && (
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">{task.description}</p>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        {/* Labels */}
        {task.labelIds.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.labelIds.slice(0, 2).map((labelId) => (
              <Badge key={labelId} variant="outline" className="text-xs px-2 py-0">
                Label
              </Badge>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-800">
          {/* Assignees */}
          <div className="flex -space-x-2">
            {assignedUsers.slice(0, 3).map((user) => (
              <Avatar
                key={user.id}
                src={user.avatarUrl}
                fallback={user.fullName}
                className="h-6 w-6 border-2 border-white dark:border-gray-900"
              />
            ))}
            {assignedUsers.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs text-gray-600 dark:text-gray-400">
                +{assignedUsers.length - 3}
              </div>
            )}
            {assignedUsers.length === 0 && (
              <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex items-center justify-center">
                <span className="text-xs text-gray-700 dark:text-gray-500">?</span>
              </div>
            )}
          </div>

          {/* Deadline */}
          {task.deadline && (
            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs font-medium ${
                  isOverdue
                    ? 'text-red-500'
                    : new Date(task.deadline).getTime() - new Date().getTime() < 2 * 24 * 60 * 60 * 1000
                    ? 'text-yellow-500'
                    : 'text-gray-700 dark:text-gray-500'
                }`}
              >
                {new Date(task.deadline).toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: 'short',
                })}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
