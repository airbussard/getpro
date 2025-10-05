'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Zap, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const features = [
    {
      icon: Zap,
      title: 'Blitzschnell',
      description: 'Intuitive Bedienung für maximale Produktivität',
    },
    {
      icon: Users,
      title: 'Team-Management',
      description: 'Kollaboration im Team mit Rollen und Permissions',
    },
    {
      icon: BarChart3,
      title: 'Zeit & Budget',
      description: 'Zeiterfassung und Budget-Tracking in Echtzeit',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 backdrop-blur-sm bg-gray-900/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
              E
            </div>
            <span className="text-xl font-bold">EmergencyPro</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-gray-800">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Kostenlos starten
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1.5 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
            Phase 1 - Dummy UI Preview
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Projektmanagement für Teams
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto">
            EmergencyPro ist die moderne Lösung für Projektmanagement, Zeiterfassung und
            Team-Kollaboration. Schlank, schnell und leistungsstark.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8">
                Jetzt starten
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-800 text-lg px-8"
              >
                Demo anschauen
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Alles was du brauchst
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature List */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Core Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Kanban Board mit Drag & Drop',
                  'Zeiterfassung mit Timer',
                  'Budget-Management',
                  'Team-Verwaltung mit Rollen',
                  'Kalender-Ansicht',
                  'Kommentare & Aktivitäten',
                  'Filter & Suche',
                  'Dark Mode',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bereit loszulegen?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Teste EmergencyPro jetzt kostenlos. Keine Kreditkarte erforderlich.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8">
              Kostenlos registrieren
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-500">
          <p>&copy; 2024 EmergencyPro by getemergence.com. Phase 1 - Dummy UI.</p>
        </div>
      </footer>
    </div>
  );
}
