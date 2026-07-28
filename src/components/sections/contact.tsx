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
import { Mail, Phone, MapPin, ArrowRight, Send, CheckCircle2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
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
            toast({ title: 'Message Transmitted!', description: "A consultant will be in touch within 24 hours." });
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
            toast({ title: 'Welcome Aboard!', description: "You are now subscribed to our premium insights." });
            subscriptionForm.reset();
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to subscribe.' });
        }
    };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid gap-20 lg:grid-cols-2">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="font-headline text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Let's Start a <span className="liquid-text">Conversation</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium max-w-lg">
                Your financial excellence begins with a simple message. Professional, confidential, and accurate.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-center p-6 glass border-white/80 rounded-3xl transition-all hover:bg-white/90">
                <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Our HQ</p>
                  <p className="text-lg font-bold text-slate-800">Roshpa Tower, 5th Floor, Ranchi</p>
                </div>
              </div>

              <div className="flex gap-6 items-center p-6 glass border-white/80 rounded-3xl transition-all hover:bg-white/90">
                <div className="h-14 w-14 rounded-2xl bg-accent flex items-center justify-center text-white shadow-xl shadow-accent/20">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Call Us</p>
                  <a href="tel:8809992225" className="text-lg font-bold text-slate-800 hover:text-primary transition-colors">+91 88099 92225</a>
                </div>
              </div>

              <div className="flex gap-6 items-center p-6 glass border-white/80 rounded-3xl transition-all hover:bg-white/90">
                <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Email Us</p>
                  <a href="mailto:pcservice.77@gmail.com" className="text-lg font-bold text-slate-800 hover:text-primary transition-colors">pcservice.77@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-[3rem] blur-2xl" />
            <Card className="relative rounded-[3rem] glass border-white/40 shadow-2xl overflow-hidden">
              <CardHeader className="p-10 pb-0 space-y-2">
                <CardTitle className="text-3xl font-black text-slate-900 flex items-center gap-3">
                  Quick Inquiry
                  <Send className="h-6 w-6 text-primary" />
                </CardTitle>
                <CardDescription className="text-lg font-medium text-slate-500">How can we assist your business today?</CardDescription>
              </CardHeader>
              <CardContent className="p-10">
                <Form {...contactForm}>
                  <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={contactForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-slate-700">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="h-14 rounded-2xl glass border-slate-200 focus:ring-primary/20" {...field} />
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
                            <FormLabel className="font-bold text-slate-700">Work Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@domain.com" className="h-14 rounded-2xl glass border-slate-200 focus:ring-primary/20" {...field} />
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
                            <FormLabel className="font-bold text-slate-700">Detailed Message</FormLabel>
                            <FormControl>
                            <Textarea placeholder="Share your specific requirements or questions..." rows={5} className="rounded-2xl glass border-slate-200 p-6 focus:ring-primary/20" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full h-16 rounded-2xl bg-primary text-white font-black text-xl shadow-2xl shadow-primary/20 group">
                      Transmit Message
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-32 max-w-4xl mx-auto">
          <Card className="rounded-[2.5rem] bg-slate-900 border-none p-12 relative overflow-hidden text-center text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h3 className="text-4xl font-black">Join our <span className="liquid-text">Intelligence</span> Network</h3>
                <p className="text-lg text-slate-400 font-medium">Get the latest tax updates and careers delivered weekly to your inbox.</p>
              </div>
              
              <Form {...subscriptionForm}>
                  <form onSubmit={subscriptionForm.handleSubmit(onSubscriptionSubmit)} className="flex flex-col gap-4 sm:flex-row max-w-md mx-auto">
                      <FormField
                          control={subscriptionForm.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem className="flex-grow">
                              <FormControl>
                                  <Input type="email" placeholder="name@domain.com" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-primary/40" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                      <Button type="submit" className="h-14 px-8 rounded-2xl bg-accent text-white hover:bg-accent/90 font-black">Subscribe Now</Button>
                  </form>
              </Form>
              
              <div className="flex justify-center gap-8 pt-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <CheckCircle2 className="h-4 w-4 text-accent" /> No Spam
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <CheckCircle2 className="h-4 w-4 text-accent" /> Secure Data
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
