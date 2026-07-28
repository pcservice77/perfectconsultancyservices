
"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  LogOut, 
  Mountain, 
  Briefcase, 
  FileText, 
  Newspaper, 
  Users, 
  MessageSquare,
  FileBadge,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useUser();
  const auth = useAuth();

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.replace('/admin');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/admin');
  };
  
  const isActive = (path: string) => pathname === path;

  if (loading || !user?.isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Mountain className="h-6 w-6 text-sidebar-primary" />
            <span className="text-sm font-semibold text-sidebar-primary truncate">PCS Admin</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/admin/dashboard')} tooltip="Overview">
                <Link href="/admin/dashboard">
                  <LayoutDashboard />
                  <span>Overview</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/admin/dashboard/services')} tooltip="Services">
                <Link href="/admin/dashboard/services">
                  <FileText />
                  <span>Services</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/admin/dashboard/staff')} tooltip="Staff & Founders">
                <Link href="/admin/dashboard/staff">
                  <Users />
                  <span>Team Members</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/admin/dashboard/enquiries')} tooltip="Enquiries">
                <Link href="/admin/dashboard/enquiries">
                  <MessageSquare />
                  <span>Enquiries</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/admin/dashboard/jobs')} tooltip="Job Postings">
                <Link href="/admin/dashboard/jobs">
                  <Briefcase />
                  <span>Careers</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/admin/dashboard/applications')} tooltip="Job Applications">
                <Link href="/admin/dashboard/applications">
                  <FileBadge />
                  <span>Job Applications</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/admin/dashboard/tax-updates')} tooltip="Tax Updates">
                <Link href="/admin/dashboard/tax-updates">
                  <Newspaper />
                  <span>Tax Updates</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger className="md:hidden"/>
            <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
