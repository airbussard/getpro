'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  LogOut,
  Settings,
  Moon,
  Sun,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useStore } from '@/store';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, theme, toggleTheme } = useStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/projects',
      label: 'Projekte',
      icon: FolderKanban,
    },
    {
      href: '/settings',
      label: 'Einstellungen',
      icon: Settings,
    },
  ];

  if (!currentUser) return null;

  return (
    <div className="flex flex-col h-full bg-gray-900 border-r border-gray-800">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
            E
          </div>
          <span className="text-xl font-bold text-white">EmergencyPro</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800',
                  isActive && 'bg-gray-800 text-white'
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <Sun className="mr-3 h-5 w-5" />
          ) : (
            <Moon className="mr-3 h-5 w-5" />
          )}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>

        <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-800">
          <Avatar src={currentUser.avatarUrl} fallback={currentUser.fullName} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentUser.fullName}</p>
            <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Abmelden
        </Button>
      </div>
    </div>
  );
}
