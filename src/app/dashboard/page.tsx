'use client';

import { useRouter } from 'next/navigation';
import { Plus, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store';

export default function DashboardPage() {
  const router = useRouter();
  const { projects, tasks, currentUser } = useStore();

  const userProjects = projects.filter((p) => !p.archived);
  const allTasks = tasks;

  const stats = {
    totalProjects: userProjects.length,
    activeTasks: allTasks.filter((t) => t.status !== 'done').length,
    completedTasks: allTasks.filter((t) => t.status === 'done').length,
    overdueTasks: allTasks.filter(
      (t) => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'done'
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Willkommen zurück, {currentUser?.fullName || 'User'}
          </p>
        </div>
        <Button onClick={() => router.push('/projects/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Neues Projekt
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Projekte</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProjects}</div>
            <p className="text-xs text-gray-700 dark:text-gray-500 mt-1">Aktive Projekte</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Offene Tasks</CardTitle>
            <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeTasks}</div>
            <p className="text-xs text-gray-700 dark:text-gray-500 mt-1">In Bearbeitung</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Erledigt</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedTasks}</div>
            <p className="text-xs text-gray-700 dark:text-gray-500 mt-1">Abgeschlossen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Überfällig</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.overdueTasks}</div>
            <p className="text-xs text-gray-700 dark:text-gray-500 mt-1">Benötigen Aufmerksamkeit</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Deine Projekte</h2>
        {userProjects.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Noch keine Projekte vorhanden</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Erstes Projekt erstellen
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userProjects.map((project) => {
              const projectTasks = allTasks.filter((t) => t.projectId === project.id);
              const completedCount = projectTasks.filter((t) => t.status === 'done').length;
              const totalCount = projectTasks.length;
              const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

              return (
                <Card
                  key={project.id}
                  className="hover:border-gray-300 dark:hover:border-gray-700 transition-colors cursor-pointer"
                  onClick={() => router.push(`/projects/${project.id}/board`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold mb-2"
                        style={{ backgroundColor: project.color }}
                      >
                        {project.name.charAt(0).toUpperCase()}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {totalCount} Tasks
                      </Badge>
                    </div>
                    <CardTitle className="text-gray-900 dark:text-white">{project.name}</CardTitle>
                    {project.description && (
                      <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">
                        {project.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Fortschritt</span>
                        <span className="text-gray-900 dark:text-white font-medium">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-700 dark:text-gray-500 mt-2">
                        <span>{completedCount} erledigt</span>
                        <span>{totalCount - completedCount} offen</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
