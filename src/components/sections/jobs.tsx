
"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, IndianRupee, ClipboardCheck, GraduationCap, Link as LinkIcon } from 'lucide-react';
import { getJobs } from '@/services/jobs';
import type { Job } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const applicationSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  mobile: z.string().min(10, 'Valid mobile number is required'),
  email: z.string().email('Invalid email address'),
  qualification: z.string().min(1, 'Qualification details are required'),
  experience: z.string().min(1, 'Experience details are required'),
  address: z.string().min(1, 'Residential address is required'),
  resumeUrl: z.string().url('Please provide a valid URL to your resume (e.g. Google Drive link)').min(1, 'Resume link is required'),
  otherInfo: z.string().optional(),
});

export default function JobsSection() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isApplying, setIsApplying] = useState(false);
    
    const db = useFirestore();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof applicationSchema>>({
        resolver: zodResolver(applicationSchema),
        defaultValues: {
            name: '',
            mobile: '',
            email: '',
            qualification: '',
            experience: '',
            address: '',
            resumeUrl: '',
            otherInfo: '',
        },
    });

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

    const onSubmit = (values: z.infer<typeof applicationSchema>) => {
        if (!selectedJob) return;
        
        const data = {
            ...values,
            jobId: selectedJob.id,
            jobTitle: selectedJob.title,
            appliedAt: serverTimestamp(),
        };

        addDoc(collection(db, 'applications'), data)
            .then(() => {
                toast({ title: 'Application Submitted!', description: "Thank you for applying. We'll review your details." });
                form.reset();
                setIsApplying(false);
            })
            .catch(async (err) => {
                const permissionError = new FirestorePermissionError({
                    path: 'applications',
                    operation: 'create',
                    requestResourceData: data,
                });
                errorEmitter.emit('permission-error', permissionError);
            });
    };

  return (
    <section id="jobs" className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Join Our Team</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Grow your career with PCS. We are looking for talented individuals to join our professional community.
          </p>
        </div>
        
        <div className="space-y-6">
          {loading ? (
             Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}><CardHeader><Skeleton className="h-20 w-full" /></CardHeader></Card>
             ))
          ) : (
          jobs.map((job) => (
            <Card key={job.id} className="transition-all duration-300 hover:shadow-lg border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2">
                    <CardTitle className="font-headline text-2xl text-primary">{job.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/70">
                        <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.type}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><IndianRupee className="h-4 w-4" /> {job.salary}</span>
                    </div>
                  </div>
                  
                  <Dialog open={isApplying && selectedJob?.id === job.id} onOpenChange={(open) => {
                      if (!open) {
                          setIsApplying(false);
                          setSelectedJob(null);
                      }
                  }}>
                    <DialogTrigger asChild>
                        <Button 
                            className="bg-accent text-accent-foreground hover:bg-accent/90"
                            onClick={() => {
                                setSelectedJob(job);
                                setIsApplying(true);
                            }}
                        >
                            Apply Now
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Apply for {job.title}</DialogTitle>
                            <DialogDescription>Please provide your professional details below.</DialogDescription>
                        </DialogHeader>
                        
                        <div className="py-4 space-y-6">
                            {(job.requirements || job.qualifications) && (
                                <div className="grid md:grid-cols-2 gap-4 bg-primary/5 p-4 rounded-lg border border-primary/10">
                                    {job.requirements && (
                                        <div>
                                            <h4 className="font-semibold text-primary flex items-center gap-2 mb-2">
                                                <ClipboardCheck className="h-4 w-4" /> Requirements
                                            </h4>
                                            <p className="text-xs text-foreground/80 whitespace-pre-wrap">{job.requirements}</p>
                                        </div>
                                    )}
                                    {job.qualifications && (
                                        <div>
                                            <h4 className="font-semibold text-primary flex items-center gap-2 mb-2">
                                                <GraduationCap className="h-4 w-4" /> Qualifications
                                            </h4>
                                            <p className="text-xs text-foreground/80 whitespace-pre-wrap">{job.qualifications}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Full Name</FormLabel>
                                                    <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="mobile"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Mobile Number</FormLabel>
                                                    <FormControl><Input placeholder="e.g. 9876543210" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address</FormLabel>
                                                <FormControl><Input type="email" placeholder="name@example.com" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="resumeUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Resume Link (Google Drive / Dropbox)</FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                                                        <Input placeholder="https://drive.google.com/..." {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormDescription>Provide a link to your PDF resume. Ensure the link is shared with public access.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="qualification"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Highest Qualification</FormLabel>
                                                <FormControl><Input placeholder="e.g. M.Com, CA Inter, MBA Finance" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="experience"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Past Experience</FormLabel>
                                                <FormControl><Textarea placeholder="Briefly describe your work history..." {...field} rows={3} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Residential Address</FormLabel>
                                                <FormControl><Textarea placeholder="Your full current address" {...field} rows={2} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="otherInfo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Additional Information (Optional)</FormLabel>
                                                <FormControl><Textarea placeholder="Any other relevant details or skills..." {...field} rows={2} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <DialogFooter className="pt-4">
                                        <Button type="submit" className="w-full">Submit Application</Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mt-2">
                    {job.requirements && (
                        <div>
                            <h4 className="text-sm font-bold text-primary flex items-center gap-2 mb-2 uppercase tracking-tight">
                                <ClipboardCheck className="h-4 w-4 text-accent" /> Key Requirements
                            </h4>
                            <p className="text-sm text-foreground/80 whitespace-pre-wrap">{job.requirements}</p>
                        </div>
                    )}
                    {job.qualifications && (
                        <div>
                            <h4 className="text-sm font-bold text-primary flex items-center gap-2 mb-2 uppercase tracking-tight">
                                <GraduationCap className="h-4 w-4 text-accent" /> Qualifications
                            </h4>
                            <p className="text-sm text-foreground/80 whitespace-pre-wrap">{job.qualifications}</p>
                        </div>
                    )}
                </div>
              </CardContent>
            </Card>
          )))}
        </div>
      </div>
    </section>
  );
}
