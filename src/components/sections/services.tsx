"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Landmark, ClipboardCheck, Building, FileSignature, BookOpen, BrainCircuit } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getServices } from '@/services/services';
import type { Service } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const iconComponents: { [key: string]: LucideIcon } = {
  FileText, Landmark, ClipboardCheck, Building, FileSignature, BookOpen, BrainCircuit
};


export default function ServicesSection() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const fetchedServices = await getServices();
                setServices(fetchedServices);
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);


  return (
    <section id="services" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Our Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            We offer a wide range of services to meet your business needs.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="flex flex-col overflow-hidden">
                    <CardHeader>
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-6 w-3/4 mt-2" />
                    </CardHeader>
                    <CardContent className="flex flex-grow flex-col">
                       <Skeleton className="h-4 w-full" />
                       <Skeleton className="h-4 w-full mt-2" />
                       <Skeleton className="h-10 w-32 mt-4" />
                    </CardContent>
                </Card>
              ))
          ) : (
            services.map((service) => {
                const Icon = iconComponents[service.icon];
                return(
                <Card key={service.title} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="rounded-full bg-accent/10 p-3">
                    {Icon && <Icon className="h-8 w-8 text-accent" />}
                    </div>
                    <CardTitle className="font-headline text-xl text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-grow flex-col">
                    <p className="flex-grow text-foreground/80">{service.description}</p>
                    <Button variant="outline" className="mt-4 self-start">Request Service</Button>
                </CardContent>
                </Card>
            )})
          )}
        </div>
      </div>
    </section>
  );
}
