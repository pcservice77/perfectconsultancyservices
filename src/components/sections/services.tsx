
"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Landmark, 
  ClipboardCheck, 
  Building, 
  FileSignature, 
  BookOpen, 
  BrainCircuit,
  Loader2
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

const iconComponents: { [key: string]: LucideIcon } = {
  FileText, Landmark, ClipboardCheck, Building, FileSignature, BookOpen, BrainCircuit
};

export default function ServicesSection() {
    const db = useFirestore();
    const servicesRef = useMemo(() => collection(db, 'services'), [db]);
    const servicesQuery = useMemo(() => query(servicesRef, orderBy('title', 'asc')), [servicesRef]);
    const { data: services, loading } = useCollection<any>(servicesQuery);

  return (
    <section id="services" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Our Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Professional Tax, Accounting & Business Compliance services tailored for your growth.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
                const Icon = iconComponents[service.icon] || FileText;
                return(
                <Card key={service.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="rounded-full bg-accent/10 p-3">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                    <CardTitle className="font-headline text-xl text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-grow flex-col">
                    <p className="flex-grow text-foreground/80">{service.description}</p>
                    <Button variant="outline" className="mt-4 self-start">Learn More</Button>
                </CardContent>
                </Card>
            )})}
          </div>
        )}
      </div>
    </section>
  );
}
