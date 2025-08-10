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
import { getTaxUpdates, addTaxUpdate, updateTaxUpdate, deleteTaxUpdate } from '@/services/taxUpdates';
import type { TaxUpdate } from '@/lib/types';
import { Edit, Trash2 } from 'lucide-react';

const taxUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  summary: z.string().min(1, 'Summary is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.string().min(1, 'Tags are required (comma-separated)'),
});

export default function ManageTaxUpdatesPage() {
  const [updates, setUpdates] = useState<TaxUpdate[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<TaxUpdate | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof taxUpdateSchema>>({
    resolver: zodResolver(taxUpdateSchema),
    defaultValues: {
      title: '',
      summary: '',
      content: '',
      tags: '',
    },
  });

  useEffect(() => {
    fetchUpdates();
  }, []);

  useEffect(() => {
    if (editingUpdate) {
      form.reset({
          ...editingUpdate,
          tags: editingUpdate.tags.join(', '),
      });
    } else {
      form.reset({
        title: '',
        summary: '',
        content: '',
        tags: '',
      });
    }
  }, [editingUpdate, form]);

  const fetchUpdates = async () => {
    const fetchedUpdates = await getTaxUpdates();
    setUpdates(fetchedUpdates);
  };

  const onSubmit = async (values: z.infer<typeof taxUpdateSchema>) => {
    try {
        const updateData = {
            ...values,
            tags: values.tags.split(',').map(tag => tag.trim()),
        };

      if (editingUpdate) {
        await updateTaxUpdate(editingUpdate.id!, updateData);
        toast({ title: 'Tax update updated successfully' });
      } else {
        await addTaxUpdate(updateData);
        toast({ title: 'Tax update added successfully' });
      }
      fetchUpdates();
      setIsDialogOpen(false);
      setEditingUpdate(null);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTaxUpdate(id);
      toast({ title: 'Tax update deleted successfully' });
      fetchUpdates();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong' });
    }
  };
  
  const openEditDialog = (update: TaxUpdate) => {
    setEditingUpdate(update);
    setIsDialogOpen(true);
  }

  const openNewDialog = () => {
    setEditingUpdate(null);
    form.reset({
        title: '',
        summary: '',
        content: '',
        tags: '',
    });
    setIsDialogOpen(true);
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Manage Tax Updates</CardTitle>
                <CardDescription>Add, edit, or remove tax update articles.</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={openNewDialog}>Add New Update</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                    <DialogTitle>{editingUpdate ? 'Edit Tax Update' : 'Add New Tax Update'}</DialogTitle>
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
                        name="summary"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Summary</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea {...field} rows={10} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                         <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Tags (comma-separated)</FormLabel>
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
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {updates.map((update) => (
                    <TableRow key={update.id}>
                        <TableCell>{update.title}</TableCell>
                        <TableCell>{new Date(update.date).toLocaleDateString()}</TableCell>
                        <TableCell className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(update)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(update.id!)}>
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
