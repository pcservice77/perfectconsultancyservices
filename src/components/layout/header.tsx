
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mountain, ShieldCheck } from 'lucide-react';
import { useUser } from '@/firebase';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#jobs', label: 'Careers' },
    { href: '#tax-updates', label: 'Updates' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="text-primary hidden sm:inline">PERFECT CONSULTANCY SERVICES</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {user?.isAdmin && (
            <Button asChild variant="secondary" size="sm" className="hidden sm:flex">
              <Link href="/admin/dashboard">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Admin Panel
              </Link>
            </Button>
          )}
          <Button variant="outline" asChild className="hidden md:inline-flex">
            <Link href="/admin">Client Login</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 py-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                  <Mountain className="h-6 w-6 text-primary" />
                  <span className="text-primary">PCS</span>
                </Link>
                <nav className="grid gap-2">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="flex w-full items-center py-2 text-lg font-semibold">
                      {link.label}
                    </Link>
                  ))}
                  {user?.isAdmin && (
                    <Link href="/admin/dashboard" className="flex w-full items-center py-2 text-lg font-semibold text-primary">
                      Admin Panel
                    </Link>
                  )}
                </nav>
                <Button asChild>
                  <Link href="/admin">Client Login</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
