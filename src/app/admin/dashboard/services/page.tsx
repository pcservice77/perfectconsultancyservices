"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { getServices, addService, updateService, deleteService } from '@/services/services';
import type { Service } from '@/lib/types';
import { FileText, Landmark, ClipboardCheck, Building, FileSignature, BookOpen, BrainCircuit, Edit, Trash2 } from 'lucide-react';

const serviceSchema = z.object({
  icon: z.string().min(1, 'Icon is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

const iconComponents: { [key: string]: React.ElementType } = {
    FileText, Landmark, ClipboardCheck, Building, FileSignature, BookOpen, BrainCircuit
};

export default function ManageServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      icon: '',
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (editingService) {
      form.reset(editingService);
    } else {
      form.reset({
        icon: '',
        title: '',
        description: '',
      });
    }
  }, [editingService, form]);

  const fetchServices = async () => {
    const fetchedServices = await getServices();
    setServices(fetchedServices);
  };

  const onSubmit = async (values: z.infer<typeof serviceSchema>) => {
    try {
      if (editingService) {
        await updateService(editingService.id!, values);
        toast({ title: 'Service updated successfully' });
      } else {
        await addService(values);
        toast({ title: 'Service added successfully' });
      }
      fetchServices();
      setIsDialogOpen(false);
      setEditingService(null);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteService(id);
      toast({ title: 'Service deleted successfully' });
      fetchServices();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong' });
    }
  };
  
  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setIsDialogOpen(true);
  }

  const openNewDialog = () => {
    setEditingService(null);
    form.reset({
        icon: '',
        title: '',
        description: '',
      });
    setIsDialogOpen(true);
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Manage Services</CardTitle>
                <CardDescription>Add, edit, or remove services offered on your website.</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={openNewDialog}>Add New Service</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Icon (e.g., FileText)</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
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
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
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
                    <TableHead>Icon</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {services.map((service) => {
                        const IconComponent = iconComponents[service.icon];
                        return (
                            <TableRow key={service.id}>
                                <TableCell>
                                    {IconComponent && <IconComponent className="h-6 w-6" />}
                                </TableCell>
                                <TableCell>{service.title}</TableCell>
                                <TableCell>{service.description}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(service)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id!)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
