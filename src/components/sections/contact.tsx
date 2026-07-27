
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

const subscriptionSchema = z.object({
  email: z.string().email('Invalid email address'),
});


export default function ContactSection() {
    const { toast } = useToast();
    const db = useFirestore();

    const contactForm = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: { name: '', email: '', message: '' },
    });

    const subscriptionForm = useForm<z.infer<typeof subscriptionSchema>>({
        resolver: zodResolver(subscriptionSchema),
        defaultValues: { email: '' },
    });

    const onContactSubmit = async (values: z.infer<typeof contactSchema>) => {
        try {
            await addDoc(collection(db, 'enquiries'), {
                ...values,
                createdAt: serverTimestamp()
            });
            toast({ title: 'Message Sent!', description: "We'll get back to you soon." });
            contactForm.reset();
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to send message.' });
        }
    };
    
    const onSubscriptionSubmit = async (values: z.infer<typeof subscriptionSchema>) => {
        try {
            await addDoc(collection(db, 'subscriptions'), {
                ...values,
                subscribedAt: serverTimestamp()
            });
            toast({ title: 'Subscribed!', description: "You're on the list forPCS updates." });
            subscriptionForm.reset();
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to subscribe.' });
        }
    };

  return (
    <section id="contact" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Get in Touch</h2>
            <p className="mt-4 text-lg text-foreground/80">
              Have a question or need a custom service? Fill out the form and we'll get back to you.
            </p>
            <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="mt-8 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                    control={contactForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                    control={contactForm.control}
                    name="message"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                        <Textarea placeholder="Your message..." rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
                </form>
            </Form>
          </div>
          <div>
            <Card className="bg-secondary h-full flex flex-col justify-center">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Subscribe to Our Newsletter</CardTitle>
                <CardDescription>
                  Get the latest tax updates, job postings, and news delivered to your inbox.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...subscriptionForm}>
                    <form onSubmit={subscriptionForm.handleSubmit(onSubscriptionSubmit)} className="flex flex-col gap-4 sm:flex-row">
                        <FormField
                            control={subscriptionForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                <FormControl>
                                    <Input type="email" placeholder="your@email.com" className="bg-background" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Subscribe</Button>
                    </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
