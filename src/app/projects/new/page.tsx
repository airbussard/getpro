'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store';

const PRESET_COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#F97316', // orange
];

export default function NewProjectPage() {
  const router = useRouter();
  const { createProject, currentUser } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: PRESET_COLORS[0],
    icon: '📁',
    settings: {
      timeTracking: true,
      fileUploads: false,
      comments: true,
      calendar: true,
      labels: true,
      emailNotifications: true,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Projektname ist erforderlich');
      return;
    }

    const newProject = createProject({
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      color: formData.color,
      icon: formData.icon,
      settings: formData.settings,
      archived: false,
      ownerId: currentUser?.id || '',
    });

    router.push(`/projects/${newProject.id}/board`);
  };

  const handleCancel = () => {
    router.push('/projects');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Neues Projekt</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Erstelle ein neues Projekt für dein Team
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Projekt-Details</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Grundlegende Informationen über dein Projekt
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name & Icon */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-200">
                    Projektname *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="z.B. Website Redesign"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icon" className="text-gray-700 dark:text-gray-200">
                    Icon / Emoji
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      maxLength={2}
                      className="w-20"
                    />
                    <div className="flex items-center gap-1">
                      {['📁', '🚀', '💡', '🎯', '⭐', '🔥'].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon: emoji })}
                          className="w-8 h-8 rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-lg"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700 dark:text-gray-200">
                  Beschreibung
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Beschreibe dein Projekt..."
                  rows={3}
                />
              </div>

              {/* Color */}
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-200">Farbe</Label>
                <div className="flex gap-2">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-10 h-10 rounded-lg transition-all ${
                        formData.color === color
                          ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-900'
                          : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-3">
                <Label className="text-gray-700 dark:text-gray-200">Projekt-Einstellungen</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { key: 'timeTracking', label: 'Zeiterfassung' },
                    { key: 'comments', label: 'Kommentare' },
                    { key: 'calendar', label: 'Kalender' },
                    { key: 'labels', label: 'Labels' },
                    { key: 'fileUploads', label: 'Datei-Uploads' },
                    { key: 'emailNotifications', label: 'E-Mail Benachrichtigungen' },
                  ].map((setting) => (
                    <label
                      key={setting.key}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800/30 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.settings[setting.key as keyof typeof formData.settings]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            settings: {
                              ...formData.settings,
                              [setting.key]: e.target.checked,
                            },
                          })
                        }
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-900 dark:text-white">{setting.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-200">Vorschau</Label>
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: formData.color }}
                    >
                      {formData.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formData.name || 'Projektname'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formData.description || 'Keine Beschreibung'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Abbrechen
                </Button>
                <Button type="submit">
                  <Folder className="mr-2 h-4 w-4" />
                  Projekt erstellen
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
