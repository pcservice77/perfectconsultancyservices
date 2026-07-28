
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mountain, ShieldCheck, User, LogOut } from 'lucide-react';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();
  const auth = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#team', label: 'Team' },
    { href: '#jobs', label: 'Careers' },
    { href: '#tax-updates', label: 'Updates' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Mountain className="h-6 w-6 text-primary" />
            <span className="text-primary hidden lg:inline uppercase">Perfect Consultancy Services</span>
            <span className="text-primary lg:hidden uppercase">PCS</span>
          </Link>

          {user && (
            <div className="hidden md:flex items-center gap-2 pl-4 border-l">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-accent/10">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {user.email?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-xs font-semibold truncate max-w-[150px]">{user.email}</span>
                      {user.isAdmin && <span className="text-[10px] text-accent font-bold uppercase">Admin</span>}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard" className="flex items-center gap-2 cursor-pointer">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {!user ? (
            <Button variant="outline" asChild size="sm" className="hidden md:inline-flex">
              <Link href="/admin">Client Login</Link>
            </Button>
          ) : (
            user.isAdmin && (
              <Button asChild variant="secondary" size="sm" className="hidden lg:flex">
                <Link href="/admin/dashboard">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Admin Panel
                </Link>
              </Button>
            )
          )}
          
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
                {user && (
                   <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{user.email?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold truncate">{user.email}</span>
                      {user.isAdmin && <span className="text-xs text-accent">Administrator</span>}
                    </div>
                  </div>
                )}
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
                {!user ? (
                  <Button asChild>
                    <Link href="/admin">Client Login</Link>
                  </Button>
                ) : (
                  <Button variant="destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
