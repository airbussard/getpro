'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Grid3x3, List, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store';

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, tasks } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  const filteredProjects = projects
    .filter((p) => (showArchived ? p.archived : !p.archived))
    .filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projekte</h1>
          <p className="text-gray-400 mt-1">
            Verwalte alle deine Projekte an einem Ort
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Neues Projekt
        </Button>
      </div>

      {/* Filters & Actions */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Projekte durchsuchen..."
            className="pl-10 bg-gray-900 border-gray-800 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant={showArchived ? 'default' : 'outline'}
          className={showArchived ? 'bg-blue-600' : 'border-gray-800 text-gray-400'}
          onClick={() => setShowArchived(!showArchived)}
        >
          <Archive className="mr-2 h-4 w-4" />
          {showArchived ? 'Aktive anzeigen' : 'Archivierte anzeigen'}
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="border-gray-800 text-gray-400">
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Grid3x3 className="h-8 w-8 text-gray-600" />
            </div>
            <p className="text-gray-400 mb-4">
              {searchQuery
                ? 'Keine Projekte gefunden'
                : showArchived
                ? 'Keine archivierten Projekte'
                : 'Noch keine Projekte vorhanden'}
            </p>
            {!searchQuery && !showArchived && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Erstes Projekt erstellen
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const projectTasks = tasks.filter((t) => t.projectId === project.id);
            const completedCount = projectTasks.filter((t) => t.status === 'done').length;
            const totalCount = projectTasks.length;
            const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
            const overdueCount = projectTasks.filter(
              (t) => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'done'
            ).length;

            return (
              <Card
                key={project.id}
                className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all cursor-pointer group"
                onClick={() => router.push(`/projects/${project.id}/board`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: project.color }}
                    >
                      {project.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex gap-2">
                      {project.archived && (
                        <Badge variant="secondary" className="text-xs">
                          Archiviert
                        </Badge>
                      )}
                      {overdueCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {overdueCount} überfällig
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </CardTitle>
                  {project.description && (
                    <CardDescription className="text-gray-400 line-clamp-2 mt-2">
                      {project.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Fortschritt</span>
                      <span className="text-white font-medium">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-gray-500">Tasks: </span>
                        <span className="text-white font-medium">{totalCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Erledigt: </span>
                        <span className="text-green-500 font-medium">{completedCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800">
                    {project.settings.timeTracking && (
                      <Badge variant="outline" className="text-xs">
                        Zeiterfassung
                      </Badge>
                    )}
                    {project.settings.comments && (
                      <Badge variant="outline" className="text-xs">
                        Kommentare
                      </Badge>
                    )}
                    {project.settings.calendar && (
                      <Badge variant="outline" className="text-xs">
                        Kalender
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Stats Footer */}
      {filteredProjects.length > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4">
          <span>
            {filteredProjects.length} {filteredProjects.length === 1 ? 'Projekt' : 'Projekte'}
            {searchQuery && ' gefunden'}
          </span>
          <span>
            Gesamt: {tasks.length} Tasks, {tasks.filter((t) => t.status === 'done').length}{' '}
            erledigt
          </span>
        </div>
      )}
    </div>
  );
}
