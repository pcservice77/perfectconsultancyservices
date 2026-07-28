
"use client";

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Trash2, MessageSquare, Loader2, Phone, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function EnquiriesPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const enquiriesRef = useMemo(() => collection(db, 'enquiries'), [db]);
  const enquiriesQuery = useMemo(() => query(enquiriesRef, orderBy('createdAt', 'desc')), [enquiriesRef]);
  const { data: enquiries, loading } = useCollection<any>(enquiriesQuery);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await deleteDoc(doc(db, 'enquiries', id));
      toast({ title: 'Enquiry deleted' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error deleting enquiry' });
    }
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <CardTitle>Customer Enquiries & Service Requests</CardTitle>
        </div>
        <CardDescription>View submissions from contact forms and service enquiry buttons.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Client Details</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No enquiries found.</TableCell>
              </TableRow>
            ) : (
              enquiries.map((enq) => (
                <TableRow key={enq.id}>
                  <TableCell className="text-xs">
                    {enq.createdAt?.toDate ? enq.createdAt.toDate().toLocaleString() : new Date(enq.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {enq.serviceTitle ? (
                      <div className="flex flex-col gap-1">
                        <Badge variant="default" className="w-fit flex gap-1">
                          <Briefcase className="h-3 w-3" />
                          Service
                        </Badge>
                        <span className="text-xs font-semibold text-primary">{enq.serviceTitle}</span>
                      </div>
                    ) : (
                      <Badge variant="secondary" className="w-fit">General</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                        <span className="font-medium">{enq.name}</span>
                        <span className="text-xs text-muted-foreground">{enq.email}</span>
                        {enq.mobile && (
                          <span className="text-xs flex items-center gap-1 text-accent font-medium">
                            <Phone className="h-3 w-3" />
                            {enq.mobile}
                          </span>
                        )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs whitespace-pre-wrap text-xs">{enq.message}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(enq.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
