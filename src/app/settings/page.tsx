'use client';

import { useState } from 'react';
import { User, Lock, Bell, Palette, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store';

export default function SettingsPage() {
  const { currentUser, toggleTheme, theme } = useStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'appearance'>('profile');

  if (!currentUser) return null;

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sicherheit', icon: Lock },
    { id: 'notifications', label: 'Benachrichtigungen', icon: Bell },
    { id: 'appearance', label: 'Darstellung', icon: Palette },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Einstellungen</h1>
        <p className="text-gray-400 mt-1">Verwalte deine Account-Einstellungen und Präferenzen</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <>
              {/* Profile Card */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Profil-Informationen</CardTitle>
                  <CardDescription className="text-gray-400">
                    Aktualisiere deine persönlichen Informationen
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <Avatar
                      src={currentUser.avatarUrl}
                      fallback={currentUser.fullName}
                      className="h-20 w-20"
                    />
                    <div>
                      <Button variant="outline" className="border-gray-800 text-gray-400">
                        Avatar ändern
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">JPG, PNG oder GIF. Max 2MB.</p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-gray-200">
                        Vollständiger Name
                      </Label>
                      <Input
                        id="fullName"
                        defaultValue={currentUser.fullName}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-200">
                        E-Mail
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={currentUser.email}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  {currentUser.isSuperAdmin && (
                    <div className="flex items-center gap-2 p-3 bg-blue-600/10 border border-blue-600/30 rounded-lg">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-white">Super Admin</p>
                        <p className="text-xs text-gray-400">
                          Du hast erweiterte Berechtigungen im System
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Änderungen speichern
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'security' && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Sicherheit</CardTitle>
                <CardDescription className="text-gray-400">
                  Verwalte dein Passwort und Sicherheitseinstellungen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-gray-200">
                      Aktuelles Passwort
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-gray-200">
                      Neues Passwort
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-200">
                      Passwort bestätigen
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-white">Zwei-Faktor-Authentifizierung</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Zusätzliche Sicherheit für deinen Account
                    </p>
                  </div>
                  <Badge variant="secondary">Bald verfügbar</Badge>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Passwort ändern
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Benachrichtigungen</CardTitle>
                <CardDescription className="text-gray-400">
                  Konfiguriere wie und wann du benachrichtigt werden möchtest
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: 'E-Mail-Benachrichtigungen', description: 'Erhalte Updates per E-Mail', icon: Mail },
                  { label: 'Task zugewiesen', description: 'Wenn dir eine neue Task zugewiesen wird' },
                  { label: 'Task-Status geändert', description: 'Bei Statusänderungen deiner Tasks' },
                  { label: 'Neue Kommentare', description: 'Wenn jemand einen Task kommentiert' },
                  { label: 'Deadline-Erinnerungen', description: '24h vor Ablauf einer Deadline' },
                  { label: 'Erwähnungen', description: 'Wenn du in einem Kommentar erwähnt wirst' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && <item.icon className="h-5 w-5 text-gray-400" />}
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Darstellung</CardTitle>
                <CardDescription className="text-gray-400">
                  Passe die Oberfläche an deine Vorlieben an
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-white mb-4">Farbschema</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={theme === 'dark' ? undefined : toggleTheme}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === 'dark'
                          ? 'border-blue-600 bg-gray-800'
                          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                      }`}
                    >
                      <div className="w-full h-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded mb-3"></div>
                      <p className="text-sm font-medium text-white">Dark Mode</p>
                      <p className="text-xs text-gray-400 mt-1">Dunkles Farbschema</p>
                    </button>
                    <button
                      onClick={theme === 'light' ? undefined : toggleTheme}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === 'light'
                          ? 'border-blue-600 bg-gray-800'
                          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                      }`}
                    >
                      <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-white rounded mb-3"></div>
                      <p className="text-sm font-medium text-white">Light Mode</p>
                      <p className="text-xs text-gray-400 mt-1">Helles Farbschema</p>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-white">Kompakte Ansicht</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Reduziere Abstände für mehr Inhalte
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
