"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, IndianRupee, ClipboardCheck, GraduationCap, Link as LinkIcon, ChevronRight } from 'lucide-react';
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
  resumeUrl: z.string().url('Please provide a valid URL to your resume').min(1, 'Resume link is required'),
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
                toast({ title: 'Application Received!', description: "Our HR team will review your profile shortly." });
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
    <section id="jobs" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-20 text-center space-y-4">
          <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Professional <span className="liquid-text">Careers</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 font-medium">
            Join a forward-thinking consultancy and shape the future of compliance.
          </p>
        </div>
        
        <div className="grid gap-8 max-w-5xl mx-auto">
          {loading ? (
             Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="h-48 rounded-[2.5rem] bg-slate-100 animate-pulse" />
             ))
          ) : (
          jobs.map((job) => (
            <Card key={job.id} className="group overflow-hidden rounded-[2.5rem] glass border-white/60 p-8 hover:shadow-2xl transition-all duration-500 border-l-8 border-l-primary">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <CardTitle className="font-headline text-3xl font-black text-slate-900 leading-tight">{job.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <span className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest"><Briefcase className="h-4 w-4 text-primary" /> {job.type}</span>
                        <span className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest"><MapPin className="h-4 w-4 text-primary" /> {job.location}</span>
                        <span className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest"><IndianRupee className="h-4 w-4 text-primary" /> {job.salary}</span>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6 pt-4">
                    {job.requirements && (
                        <div className="space-y-2">
                            <h4 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                                <ClipboardCheck className="h-3 w-3" /> Core Skills
                            </h4>
                            <p className="text-sm text-slate-600 font-medium line-clamp-2">{job.requirements}</p>
                        </div>
                    )}
                    {job.qualifications && (
                        <div className="space-y-2">
                            <h4 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                                <GraduationCap className="h-3 w-3" /> Minimum Ed.
                            </h4>
                            <p className="text-sm text-slate-600 font-medium line-clamp-2">{job.qualifications}</p>
                        </div>
                    )}
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
                          className="h-16 px-10 rounded-2xl bg-slate-900 text-white hover:bg-primary font-black text-lg transition-all group-hover:scale-105"
                          onClick={() => {
                              setSelectedJob(job);
                              setIsApplying(true);
                          }}
                      >
                          Apply Now
                          <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl glass border-white/40 p-0 overflow-hidden rounded-[2.5rem] max-h-[95vh]">
                      <div className="bg-primary p-12 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-4xl font-black mb-2">Apply for {job.title}</DialogTitle>
                            <DialogDescription className="text-white/80 text-lg font-medium">Join PCS. Step into a world of financial excellence.</DialogDescription>
                        </DialogHeader>
                      </div>
                      
                      <div className="p-12 overflow-y-auto max-h-[calc(95vh-160px)]">
                          <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                  <div className="grid md:grid-cols-2 gap-8">
                                      <FormField
                                          control={form.control}
                                          name="name"
                                          render={({ field }) => (
                                              <FormItem>
                                                  <FormLabel className="font-bold text-slate-700">Full Name</FormLabel>
                                                  <FormControl><Input placeholder="Your full name" className="h-14 rounded-xl border-slate-200" {...field} /></FormControl>
                                                  <FormMessage />
                                              </FormItem>
                                          )}
                                      />
                                      <FormField
                                          control={form.control}
                                          name="mobile"
                                          render={({ field }) => (
                                              <FormItem>
                                                  <FormLabel className="font-bold text-slate-700">Mobile Number</FormLabel>
                                                  <FormControl><Input placeholder="10-digit number" className="h-14 rounded-xl border-slate-200" {...field} /></FormControl>
                                                  <FormMessage />
                                              </FormItem>
                                          )}
                                      />
                                  </div>
                                  <div className="grid md:grid-cols-2 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-bold text-slate-700">Email Address</FormLabel>
                                                <FormControl><Input type="email" placeholder="name@domain.com" className="h-14 rounded-xl border-slate-200" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="resumeUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-bold text-slate-700">Resume Link (Google Drive/Dropbox)</FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <LinkIcon className="h-5 w-5 text-primary" />
                                                        <Input placeholder="https://drive.google.com/..." className="h-14 rounded-xl border-slate-200" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                  </div>
                                  <div className="grid md:grid-cols-2 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="qualification"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-bold text-slate-700">Highest Qualification</FormLabel>
                                                <FormControl><Input placeholder="e.g. CA, MBA, M.Com" className="h-14 rounded-xl border-slate-200" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="experience"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-bold text-slate-700">Total Experience</FormLabel>
                                                <FormControl><Input placeholder="e.g. 5 Years in GST" className="h-14 rounded-xl border-slate-200" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                  </div>
                                  <FormField
                                      control={form.control}
                                      name="address"
                                      render={({ field }) => (
                                          <FormItem>
                                              <FormLabel className="font-bold text-slate-700">Current Address</FormLabel>
                                              <FormControl><Textarea placeholder="Full residential address" className="rounded-xl border-slate-200 p-4" rows={3} {...field} /></FormControl>
                                              <FormMessage />
                                          </FormItem>
                                      )}
                                  />
                                  <DialogFooter className="pt-6 border-t border-slate-100">
                                      <Button type="submit" className="w-full h-16 rounded-2xl bg-primary text-white font-black text-xl shadow-2xl shadow-primary/20">Submit My Application</Button>
                                  </DialogFooter>
                              </form>
                          </Form>
                      </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          )))}
        </div>
      </div>
    </section>
  );
}
