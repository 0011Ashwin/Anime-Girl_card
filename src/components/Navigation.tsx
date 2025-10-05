"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Trophy, User } from 'lucide-react';
import { useUser } from '@/lib/context/UserContext';

export default function Navigation() {
  const pathname = usePathname();
  const { userData } = useUser();

  const links = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/collection', icon: Users, label: 'Collection' },
    { href: '/tasks', icon: Trophy, label: 'Tasks' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AU</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">Anime Unlocker</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full">
              <Trophy className="w-4 h-4" />
              <span className="font-bold">{userData.points}</span>
            </div>

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  pathname === link.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}