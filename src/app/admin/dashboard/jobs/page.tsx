"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { getJobs, addJob, updateJob, deleteJob } from '@/services/jobs';
import type { Job } from '@/lib/types';
import { Edit, Trash2 } from 'lucide-react';

const jobSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  location: z.string().min(1, 'Location is required'),
  type: z.string().min(1, 'Job type is required'),
  salary: z.string().min(1, 'Salary is required'),
});

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      location: '',
      type: '',
      salary: '',
    },
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (editingJob) {
      form.reset(editingJob);
    } else {
      form.reset({
        title: '',
        location: '',
        type: '',
        salary: '',
      });
    }
  }, [editingJob, form]);

  const fetchJobs = async () => {
    const fetchedJobs = await getJobs();
    setJobs(fetchedJobs);
  };

  const onSubmit = async (values: z.infer<typeof jobSchema>) => {
    try {
      if (editingJob) {
        await updateJob(editingJob.id!, values);
        toast({ title: 'Job updated successfully' });
      } else {
        await addJob(values);
        toast({ title: 'Job added successfully' });
      }
      fetchJobs();
      setIsDialogOpen(false);
      setEditingJob(null);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteJob(id);
      toast({ title: 'Job deleted successfully' });
      fetchJobs();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong' });
    }
  };
  
  const openEditDialog = (job: Job) => {
    setEditingJob(job);
    setIsDialogOpen(true);
  }
  
  const openNewDialog = () => {
    setEditingJob(null);
    form.reset({
        title: '',
        location: '',
        type: '',
        salary: '',
    });
    setIsDialogOpen(true);
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Manage Jobs</CardTitle>
                <CardDescription>Add, edit, or remove job postings.</CardDescription>
            </div>
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={openNewDialog}>Add New Job</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>{editingJob ? 'Edit Job' : 'Add New Job'}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Type (e.g., Full-time)</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Salary</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                               <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.map((job) => (
                    <TableRow key={job.id}>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.type}</TableCell>
                        <TableCell>{job.salary}</TableCell>
                        <TableCell className="flex gap-2">
                             <Button variant="ghost" size="icon" onClick={() => openEditDialog(job)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(job.id!)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
