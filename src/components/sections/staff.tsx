"use client";

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Loader2, Mail, Phone, User, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StaffSection() {
  const db = useFirestore();
  const staffRef = useMemo(() => collection(db, 'staff'), [db]);
  const staffQuery = useMemo(() => query(staffRef, orderBy('role', 'asc')), [staffRef]);
  const { data: staff, loading } = useCollection<any>(staffQuery);

  if (loading) return <div className="flex justify-center p-32"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>;
  if (staff.length === 0) return null;

  return (
    <section id="team" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="mb-20 text-center space-y-4">
          <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Visionary <span className="liquid-text">Leadership</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 font-medium">
            Meet the professional minds behind your business compliance and financial growth.
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <Card key={member.id} className="group relative overflow-hidden rounded-[2.5rem] glass border-white/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-32 bg-primary/5 transition-all group-hover:h-full group-hover:bg-primary/5 duration-500" />
              
              <CardHeader className="relative flex flex-col items-center pt-12">
                <div className="relative h-40 w-40 p-2 rounded-full glass border-white shadow-xl mb-6">
                  <Avatar className="h-full w-full rounded-full ring-2 ring-primary ring-offset-4">
                    {member.imageUrl ? (
                      <AvatarImage src={member.imageUrl} alt={member.name} className="object-cover" />
                    ) : (
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.name}&backgroundColor=0f172a&fontFamily=Inter&fontWeight=700`} alt={member.name} />
                    )}
                    <AvatarFallback><User className="h-10 w-10 text-muted-foreground" /></AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="text-center space-y-2">
                  <CardTitle className="text-2xl font-black text-slate-900">{member.name}</CardTitle>
                  <CardDescription className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider">
                    {member.role}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-8 pt-4 pb-12 text-center">
                <p className="text-slate-600 font-bold text-lg">{member.profession}</p>
                
                <div className="flex flex-col items-center gap-4 text-sm font-medium text-slate-500">
                  <a href={`mailto:${member.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                    <div className="p-2 bg-white rounded-xl shadow-sm"><Mail className="h-4 w-4" /></div>
                    {member.email}
                  </a>
                  {member.contact && (
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-white rounded-xl shadow-sm"><Phone className="h-4 w-4" /></div>
                      {member.contact}
                    </div>
                  )}
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <Button variant="ghost" size="icon" className="rounded-xl glass hover:bg-primary hover:text-white"><Linkedin className="h-5 w-5" /></Button>
                  <Button variant="ghost" size="icon" className="rounded-xl glass hover:bg-primary hover:text-white"><Twitter className="h-5 w-5" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
