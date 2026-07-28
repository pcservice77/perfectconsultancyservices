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
  ChevronRight,
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
    <section id="services" className="py-24 bg-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="mb-20 text-center space-y-4">
          <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
            OUR <span className="liquid-text">SERVICES</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed font-medium">
            Tailored solutions for complex financial landscapes. Experience accuracy redefined.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-24">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-primary opacity-20" />
              <Loader2 className="h-12 w-12 animate-spin text-primary absolute inset-0 [animation-delay:-0.5s]" />
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                    <Card className="group flex flex-col h-full rounded-[2rem] p-4 glass border-white/60 hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                        <CardHeader className="space-y-6">
                            <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 overflow-hidden shadow-inner">
                            {service.imageUrl ? (
                                <div className="relative h-full w-full p-4">
                                <Image 
                                    src={service.imageUrl} 
                                    alt={service.title} 
                                    fill 
                                    className="object-contain transition-all group-hover:brightness-0 group-hover:invert"
                                    />
                                </div>
                            ) : (
                                <Icon className="h-10 w-10 text-primary transition-all group-hover:text-white" />
                            )}
                            </div>
                            <CardTitle className="font-headline text-2xl text-slate-900 font-black tracking-tight">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-grow flex-col justify-between pt-0">
                            <p className="text-slate-600 leading-relaxed font-medium line-clamp-4">{service.description}</p>
                            <DialogTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    className="mt-8 rounded-xl font-bold text-primary hover:bg-primary/5 hover:text-primary group/btn"
                                    onClick={() => setSelectedService(service)}
                                >
                                    Explore Service Details
                                    <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </DialogTrigger>
                        </CardContent>
                    </Card>

                    <DialogContent className="sm:max-w-2xl glass border-white/40 p-0 overflow-hidden rounded-[2.5rem]">
                        <div className="relative h-32 bg-primary">
                          <div className="absolute bottom-0 left-8 translate-y-1/2 h-24 w-24 rounded-3xl glass border-white/60 flex items-center justify-center">
                            {service.imageUrl ? (
                              <Image src={service.imageUrl} alt={service.title} width={48} height={48} className="object-contain" />
                            ) : (
                              <Icon className="h-12 w-12 text-primary" />
                            )}
                          </div>
                        </div>
                        
                        <div className="p-8 pt-16">
                          <DialogHeader className="mb-8">
                              <DialogTitle className="text-3xl font-black text-slate-900 leading-tight">{service.title}</DialogTitle>
                              <DialogDescription className="text-lg text-slate-600 font-medium">Professional Consultation & Delivery</DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-8">
                              {!showEnquiryForm ? (
                                  <>
                                      <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-lg font-medium">
                                          {service.description}
                                      </p>
                                      <Button 
                                          className="w-full h-16 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black text-lg shadow-xl shadow-primary/20"
                                          onClick={() => setShowEnquiryForm(true)}
                                      >
                                          <MessageSquareQuote className="mr-3 h-6 w-6" />
                                          Start My Service Enquiry
                                      </Button>
                                  </>
                              ) : (
                                  <div className="space-y-6">
                                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 text-primary font-bold text-sm">
                                          <Send className="h-4 w-4" />
                                          Requested: {service.title}
                                      </div>
                                      <Form {...form}>
                                          <form onSubmit={form.handleSubmit(onEnquirySubmit)} className="space-y-4">
                                              <div className="grid grid-cols-2 gap-4">
                                                  <FormField
                                                      control={form.control}
                                                      name="name"
                                                      render={({ field }) => (
                                                          <FormItem>
                                                              <FormLabel className="text-slate-700 font-bold">Full Name</FormLabel>
                                                              <FormControl><Input placeholder="John Doe" className="h-14 rounded-xl border-slate-200 focus:ring-primary/20" {...field} /></FormControl>
                                                              <FormMessage />
                                                          </FormItem>
                                                      )}
                                                  />
                                                  <FormField
                                                      control={form.control}
                                                      name="mobile"
                                                      render={({ field }) => (
                                                          <FormItem>
                                                              <FormLabel className="text-slate-700 font-bold">Contact Number</FormLabel>
                                                              <FormControl><Input placeholder="9876543210" className="h-14 rounded-xl border-slate-200 focus:ring-primary/20" {...field} /></FormControl>
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
                                                          <FormLabel className="text-slate-700 font-bold">Email ID</FormLabel>
                                                          <FormControl><Input type="email" placeholder="john@company.com" className="h-14 rounded-xl border-slate-200 focus:ring-primary/20" {...field} /></FormControl>
                                                          <FormMessage />
                                                      </FormItem>
                                                  )}
                                              />
                                              <FormField
                                                  control={form.control}
                                                  name="message"
                                                  render={({ field }) => (
                                                      <FormItem>
                                                          <FormLabel className="text-slate-700 font-bold">Project Details</FormLabel>
                                                          <FormControl><Textarea placeholder="How can we specifically assist you?" rows={4} className="rounded-xl border-slate-200 focus:ring-primary/20 p-4" {...field} /></FormControl>
                                                          <FormMessage />
                                                      </FormItem>
                                                  )}
                                              />
                                              <div className="flex gap-4 pt-4">
                                                  <Button type="button" variant="outline" className="h-14 flex-1 rounded-xl" onClick={() => setShowEnquiryForm(false)}>Cancel</Button>
                                                  <Button type="submit" className="h-14 flex-[2] rounded-xl bg-primary text-white shadow-xl shadow-primary/20">Sumbit Request</Button>
                                              </div>
                                          </form>
                                      </Form>
                                  </div>
                              )}
                          </div>
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
