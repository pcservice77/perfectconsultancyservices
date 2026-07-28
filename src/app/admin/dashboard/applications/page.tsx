
"use client";

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Trash2, FileBadge, Loader2, Eye, FileText, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

export default function ApplicationsPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const appsRef = useMemo(() => collection(db, 'applications'), [db]);
  const appsQuery = useMemo(() => query(appsRef, orderBy('appliedAt', 'desc')), [appsRef]);
  const { data: applications, loading } = useCollection<any>(appsQuery);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      await deleteDoc(doc(db, 'applications', id));
      toast({ title: 'Application deleted' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error deleting application' });
    }
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileBadge className="h-5 w-5 text-primary" />
          <CardTitle>Job Applications</CardTitle>
        </div>
        <CardDescription>Review submissions from potential candidates.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Candidate</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No applications found.</TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="text-xs">
                    {app.appliedAt?.toDate ? app.appliedAt.toDate().toLocaleString() : new Date(app.appliedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                        <span className="font-medium">{app.name}</span>
                        <span className="text-xs text-muted-foreground">{app.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{app.jobTitle}</TableCell>
                  <TableCell>
                    {app.resumeUrl ? (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={app.resumeUrl} target="_blank" className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          View Resume
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">No link</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Application Details</DialogTitle>
                                    <DialogDescription>Applied for {app.jobTitle}</DialogDescription>
                                </DialogHeader>
                                <ScrollArea className="max-h-[70vh] p-4">
                                    <div className="grid grid-cols-2 gap-6 text-sm">
                                        <div>
                                            <h4 className="font-semibold text-primary mb-1">Full Name</h4>
                                            <p>{app.name}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-primary mb-1">Email Address</h4>
                                            <p>{app.email}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-primary mb-1">Mobile Number</h4>
                                            <p>{app.mobile}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-primary mb-1">Qualification</h4>
                                            <p>{app.qualification}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <h4 className="font-semibold text-primary mb-1">Resume Link</h4>
                                            {app.resumeUrl ? (
                                              <Link 
                                                href={app.resumeUrl} 
                                                target="_blank" 
                                                className="text-accent hover:underline flex items-center gap-1 font-medium"
                                              >
                                                {app.resumeUrl}
                                                <ExternalLink className="h-3 w-3" />
                                              </Link>
                                            ) : (
                                              <p className="text-muted-foreground italic">Not provided</p>
                                            )}
                                        </div>
                                        <div className="col-span-2">
                                            <h4 className="font-semibold text-primary mb-1">Experience</h4>
                                            <p className="whitespace-pre-wrap">{app.experience}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <h4 className="font-semibold text-primary mb-1">Residential Address</h4>
                                            <p className="whitespace-pre-wrap">{app.address}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <h4 className="font-semibold text-primary mb-1">Other Information</h4>
                                            <p className="whitespace-pre-wrap">{app.otherInfo || 'N/A'}</p>
                                        </div>
                                    </div>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(app.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
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
