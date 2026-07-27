
"use client";

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import { Edit, Trash2, Users, Loader2, Upload } from 'lucide-react';
import Image from 'next/image';

const staffSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['Founder', 'Co-Founder', 'Staff']),
  email: z.string().email('Invalid email'),
  contact: z.string().optional(),
  profession: z.string().min(1, 'Profession is required'),
  imageUrl: z.string().optional(),
});

type StaffFormValues = z.infer<typeof staffSchema>;

export default function ManageStaffPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const staffRef = useMemo(() => collection(db, 'staff'), [db]);
  const { data: staffList, loading } = useCollection<any>(staffRef);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any | null>(null);

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: '',
      role: 'Staff',
      email: '',
      contact: '',
      profession: '',
      imageUrl: '',
    },
  });

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1048576) {
        toast({ variant: 'destructive', title: 'File too large', description: 'Please upload an image smaller than 1MB.' });
        return;
      }
      try {
        const base64 = await fileToBase64(file);
        form.setValue('imageUrl', base64);
        toast({ title: 'Photo uploaded successfully' });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Upload failed' });
      }
    }
  };

  const onSubmit = async (values: StaffFormValues) => {
    try {
      if (editingStaff) {
        const docRef = doc(db, 'staff', editingStaff.id);
        await updateDoc(docRef, values as any);
        toast({ title: 'Staff updated successfully' });
      } else {
        await addDoc(staffRef, values as any);
        toast({ title: 'Staff added successfully' });
      }
      setIsDialogOpen(false);
      setEditingStaff(null);
      form.reset();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save staff member.' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return;
    try {
      await deleteDoc(doc(db, 'staff', id));
      toast({ title: 'Staff deleted successfully' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete.' });
    }
  };

  const openEdit = (staff: any) => {
    setEditingStaff(staff);
    form.reset(staff);
    setIsDialogOpen(true);
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Team Management</CardTitle>
          <CardDescription>Manage Founders, Co-Founders, and Staff details.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingStaff(null);
            form.reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button><Users className="mr-2 h-4 w-4" /> Add Member</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingStaff ? 'Edit Member' : 'Add New Team Member'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col gap-4">
                    <FormItem>
                        <FormLabel>Profile Photo (Optional)</FormLabel>
                        <FormControl>
                            <Input type="file" accept="image/*" onChange={handleImageUpload} />
                        </FormControl>
                        {form.watch('imageUrl') && (
                            <div className="mt-2 relative h-20 w-20 border rounded-full overflow-hidden mx-auto">
                                <Image src={form.watch('imageUrl')!} alt="Avatar" fill className="object-cover" />
                            </div>
                        )}
                    </FormItem>

                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Founder">Founder</SelectItem>
                          <SelectItem value="Co-Founder">Co-Founder</SelectItem>
                          <SelectItem value="Staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact (Optional)</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession / Designation</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
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
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Profession</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffList.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>
                    {staff.imageUrl ? (
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border">
                            <Image src={staff.imageUrl} alt={staff.name} fill className="object-cover" />
                        </div>
                    ) : (
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <Users className="h-5 w-5 text-muted-foreground" />
                        </div>
                    )}
                </TableCell>
                <TableCell className="font-medium">{staff.name}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>{staff.profession}</TableCell>
                <TableCell className="text-xs">{staff.email}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(staff)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(staff.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
