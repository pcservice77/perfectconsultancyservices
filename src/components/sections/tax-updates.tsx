"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import TaxUpdateSummarizer from '@/components/tax-update-summarizer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getTaxUpdates } from '@/services/taxUpdates';
import type { TaxUpdate } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function TaxUpdatesSection() {
    const [updates, setUpdates] = useState<TaxUpdate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const fetchedUpdates = await getTaxUpdates();
                setUpdates(fetchedUpdates);
            } catch (error) {
                console.error("Failed to fetch tax updates", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUpdates();
    }, []);

  return (
    <section id="tax-updates" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Latest Tax Updates</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Stay informed with the latest news and updates on GST and Income Tax.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
             Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="flex flex-col">
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/4 mt-2" />
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full mt-2" />
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-4">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </CardFooter>
                </Card>
             ))
          ) : (
          updates.map((update) => (
            <Dialog key={update.id}>
              <Card className="flex flex-col transition-shadow duration-300 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-primary">{update.title}</CardTitle>
                  <CardDescription>{new Date(update.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/80">{update.summary}</p>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4">
                  <div className="flex gap-2">
                    {update.tags.map(tag => <Badge key={tag} variant={tag === 'GST' ? 'default' : 'secondary'}>{tag}</Badge>)}
                  </div>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">Read More & Summarize</Button>
                  </DialogTrigger>
                </CardFooter>
              </Card>
              <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="font-headline text-2xl">{update.title}</DialogTitle>
                  <DialogDescription>
                    {new Date(update.date).toLocaleDateString()}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <ScrollArea className="h-72 w-full rounded-md border p-4">
                        <p className="whitespace-pre-wrap">{update.content}</p>
                    </ScrollArea>
                    <TaxUpdateSummarizer articleContent={update.content} />
                </div>
              </DialogContent>
            </Dialog>
          )))}
        </div>
      </div>
    </section>
  );
}
