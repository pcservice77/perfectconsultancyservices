
"use client";

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Loader2, Mail, Phone } from 'lucide-react';

export default function StaffSection() {
  const db = useFirestore();
  const staffRef = useMemo(() => collection(db, 'staff'), [db]);
  const staffQuery = useMemo(() => query(staffRef, orderBy('role', 'asc')), [staffRef]);
  const { data: staff, loading } = useCollection<any>(staffQuery);

  if (loading) return <div className="flex justify-center p-24"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  if (staff.length === 0) return null;

  return (
    <section id="team" className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Meet Our Leadership</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Expert professionals dedicated to your business growth and compliance.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <Card key={member.id} className="overflow-hidden transition-all hover:shadow-xl text-center">
              <CardHeader className="flex flex-col items-center">
                <Avatar className="h-24 w-24 border-4 border-background shadow-lg mb-4">
                  <AvatarImage src={member.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} alt={member.name} />
                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl font-bold text-primary">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-accent uppercase tracking-wider text-xs">
                    {member.role}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/70 font-medium">{member.profession}</p>
                <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">{member.email}</a>
                  </div>
                  {member.contact && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{member.contact}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
