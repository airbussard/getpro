'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }

    const success = register(email, password, fullName);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('E-Mail-Adresse bereits vergeben');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
              E
            </div>
            <span className="text-2xl font-bold text-white">EmergencyPro</span>
          </Link>
        </div>

        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Registrierung</CardTitle>
            <CardDescription className="text-gray-400">
              Erstelle einen Account und starte noch heute
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-200">
                  Vollständiger Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Max Mustermann"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">
                  E-Mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">
                  Passwort
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mindestens 6 Zeichen"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <UserPlus className="mr-2 h-4 w-4" />
                Account erstellen
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Bereits registriert?{' '}
              <Link href="/login" className="text-blue-500 hover:text-blue-400">
                Jetzt anmelden
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-4">
          Phase 1 - Dummy UI. Keine echte Authentifizierung.
        </p>
      </div>
    </div>
  );
}
