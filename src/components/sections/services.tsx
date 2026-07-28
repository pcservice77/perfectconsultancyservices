
"use client";

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Landmark, 
  ClipboardCheck, 
  Building, 
  FileSignature, 
  BookOpen, 
  BrainCircuit,
  Loader2,
  ImageIcon,
  Send,
  MessageSquareQuote
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const enquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().min(10, 'Valid mobile number is required'),
  message: z.string().min(1, 'Message is required'),
});

const iconComponents: { [key: string]: LucideIcon } = {
  FileText, Landmark, ClipboardCheck, Building, FileSignature, BookOpen, BrainCircuit
};

export default function ServicesSection() {
    const db = useFirestore();
    const { toast } = useToast();
    const servicesRef = useMemo(() => collection(db, 'services'), [db]);
    const servicesQuery = useMemo(() => query(servicesRef, orderBy('title', 'asc')), [servicesRef]);
    const { data: services, loading } = useCollection<any>(servicesQuery);

    const [selectedService, setSelectedService] = useState<any>(null);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);

    const form = useForm<z.infer<typeof enquirySchema>>({
        resolver: zodResolver(enquirySchema),
        defaultValues: { name: '', email: '', mobile: '', message: '' },
    });

    const onEnquirySubmit = (values: z.infer<typeof enquirySchema>) => {
        const data = {
            ...values,
            serviceTitle: selectedService?.title,
            createdAt: serverTimestamp()
        };

        addDoc(collection(db, 'enquiries'), data)
            .then(() => {
                toast({ title: 'Enquiry Sent!', description: "We'll get back to you about this service soon." });
                form.reset();
                setShowEnquiryForm(false);
            })
            .catch(async () => {
                const permissionError = new FirestorePermissionError({
                    path: 'enquiries',
                    operation: 'create',
                    requestResourceData: data,
                });
                errorEmitter.emit('permission-error', permissionError);
            });
    };

  return (
    <section id="services" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Our Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Professional Tax, Accounting & Business Compliance services tailored for your growth.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
                const Icon = iconComponents[service.icon] || FileText;
                return(
                <Dialog key={service.id} onOpenChange={(open) => {
                    if (!open) {
                        setSelectedService(null);
                        setShowEnquiryForm(false);
                        form.reset();
                    }
                }}>
                    <Card className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="rounded-full bg-accent/10 p-3 shrink-0 flex items-center justify-center h-14 w-14 overflow-hidden">
                            {service.imageUrl ? (
                                <div className="relative h-full w-full">
                                <Image 
                                    src={service.imageUrl} 
                                    alt={service.title} 
                                    fill 
                                    className="object-contain p-1"
                                    />
                                </div>
                            ) : (
                                <Icon className="h-8 w-8 text-accent" />
                            )}
                            </div>
                            <CardTitle className="font-headline text-xl text-primary">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-grow flex-col">
                            <p className="flex-grow text-foreground/80 line-clamp-3">{service.description}</p>
                            <DialogTrigger asChild>
                                <Button 
                                    variant="outline" 
                                    className="mt-4 self-start"
                                    onClick={() => setSelectedService(service)}
                                >
                                    Learn More
                                </Button>
                            </DialogTrigger>
                        </CardContent>
                    </Card>

                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-headline text-primary">{service.title}</DialogTitle>
                            <DialogDescription>Detailed information and service enquiry.</DialogDescription>
                        </DialogHeader>
                        
                        <div className="py-4 space-y-6">
                            {!showEnquiryForm ? (
                                <>
                                    <div className="flex items-start gap-6">
                                        <div className="rounded-xl bg-accent/10 p-4 shrink-0 h-24 w-24 flex items-center justify-center overflow-hidden">
                                            {service.imageUrl ? (
                                                <Image src={service.imageUrl} alt={service.title} width={80} height={80} className="object-contain" />
                                            ) : (
                                                <Icon className="h-12 w-12 text-accent" />
                                            )}
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                    <Button 
                                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                                        onClick={() => setShowEnquiryForm(true)}
                                    >
                                        <MessageSquareQuote className="mr-2 h-4 w-4" />
                                        Enquiry Now
                                    </Button>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                                        <Send className="h-4 w-4" />
                                        Enquiring about: {service.title}
                                    </div>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onEnquirySubmit)} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Your Name</FormLabel>
                                                            <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="mobile"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Contact Number</FormLabel>
                                                            <FormControl><Input placeholder="9876543210" {...field} /></FormControl>
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
                                                        <FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Additional Requirements</FormLabel>
                                                        <FormControl><Textarea placeholder="How can we help you with this service?" rows={4} {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="flex gap-2">
                                                <Button type="button" variant="outline" onClick={() => setShowEnquiryForm(false)}>Back</Button>
                                                <Button type="submit" className="flex-1 bg-accent text-accent-foreground">Submit Service Request</Button>
                                            </div>
                                        </form>
                                    </Form>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            )})}
          </div>
        )}
      </div>
    </section>
  );
}
