"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, IndianRupee } from 'lucide-react';
import { getJobs } from '@/services/jobs';
import type { Job } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function JobsSection() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const fetchedJobs = await getJobs();
                setJobs(fetchedJobs);
            } catch (error) {
                console.error("Failed to fetch jobs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

  return (
    <section id="jobs" className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Join Our Team</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            We are looking for talented individuals to join our growing team.
          </p>
        </div>
        <div className="space-y-6">
          {loading ? (
             Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                    <CardHeader>
                         <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <Skeleton className="h-6 w-1/2" />
                            <Skeleton className="h-10 w-24 mt-4 md:mt-0" />
                        </div>
                         <CardDescription className="pt-2">
                             <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/70">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                        </CardDescription>
                    </CardHeader>
                </Card>
             ))
          ) : (
          jobs.map((job) => (
            <Card key={job.id} className="transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <CardTitle className="font-headline text-xl text-primary">{job.title}</CardTitle>
                  <Button className="mt-4 md:mt-0 bg-accent text-accent-foreground hover:bg-accent/90">Apply Now</Button>
                </div>
                <CardDescription className="pt-2">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/70">
                    <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.type}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><IndianRupee className="h-4 w-4" /> {job.salary}</span>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          )))}
        </div>
         <div className="mt-12 text-center">
            <Button variant="outline">View All Openings</Button>
        </div>
      </div>
    </section>
  );
}
