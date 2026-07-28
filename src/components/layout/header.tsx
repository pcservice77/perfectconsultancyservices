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
    { href: '#team', label: 'Leadership' },
    { href: '#jobs', label: 'Careers' },
    { href: '#tax-updates', label: 'Insights' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500 rounded-2xl ${isScrolled ? 'glass py-2 px-4' : 'bg-transparent py-4 px-2'}`}>
      <div className="flex h-12 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
            <div className="p-2 bg-primary rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Mountain className="h-6 w-6 text-white" />
            </div>
            <span className="text-primary hidden lg:inline tracking-tight">PERFECT CONSULTANCY</span>
            <span className="text-primary lg:hidden">PCS</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex ml-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-sm font-semibold text-slate-600 transition-all hover:text-primary hover:scale-105"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-white/50 border border-transparent hover:border-white/40">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {user.email?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col items-start text-left">
                    <span className="text-xs font-bold text-slate-800">{user.email?.split('@')[0]}</span>
                    {user.isAdmin && <span className="text-[10px] text-accent font-black uppercase leading-none">Admin</span>}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass mt-2">
                <DropdownMenuLabel>Account Overview</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="flex items-center gap-2 cursor-pointer font-medium">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer font-medium">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" asChild className="hidden md:flex rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
              <Link href="/admin">Client Login</Link>
            </Button>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden glass rounded-xl">
                <Menu className="h-6 w-6 text-primary" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass border-l-0">
              <div className="grid gap-6 py-8">
                <Link href="/" className="flex items-center gap-3 font-bold text-2xl">
                  <div className="p-2 bg-primary rounded-xl text-white">
                    <Mountain className="h-6 w-6" />
                  </div>
                  <span className="text-primary">PCS</span>
                </Link>
                <nav className="grid gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-xl font-bold text-slate-800 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8 pt-8 border-t border-slate-200">
                  {!user ? (
                    <Button asChild className="w-full rounded-2xl h-14 text-lg">
                      <Link href="/admin">Client Login</Link>
                    </Button>
                  ) : (
                    <Button variant="destructive" onClick={handleLogout} className="w-full rounded-2xl h-14 text-lg">
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
