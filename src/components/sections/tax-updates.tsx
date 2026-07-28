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
import { Newspaper, Calendar, Sparkles } from 'lucide-react';

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
    <section id="tax-updates" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="mb-20 text-center space-y-4">
          <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Strategic <span className="liquid-text">Insights</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 font-medium">
            Stay ahead of regulatory changes with our curated financial intelligence.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
             Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-64 rounded-[2.5rem] bg-white glass animate-pulse" />
             ))
          ) : (
          updates.map((update) => (
            <Dialog key={update.id}>
              <Card className="group flex flex-col h-full rounded-[2.5rem] glass border-white/60 p-2 overflow-hidden hover:shadow-2xl transition-all duration-500">
                <CardHeader className="space-y-4 p-6">
                  <div className="flex justify-between items-start">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Newspaper className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="rounded-full border-slate-200 px-4 py-1 font-bold text-xs uppercase tracking-widest text-slate-500">
                      {new Date(update.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </Badge>
                  </div>
                  <CardTitle className="font-headline text-2xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">{update.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow p-6 pt-0">
                  <p className="text-slate-600 font-medium line-clamp-3 leading-relaxed">{update.summary}</p>
                </CardContent>
                
                <CardFooter className="flex-col items-start gap-6 p-6 border-t border-slate-100 bg-white/30">
                  <div className="flex flex-wrap gap-2">
                    {update.tags.map(tag => (
                      <Badge key={tag} className="rounded-xl px-3 py-1 bg-slate-100 text-slate-600 border-none font-bold uppercase tracking-tight text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <DialogTrigger asChild>
                    <Button variant="default" className="w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/10 group-hover:shadow-xl group-hover:shadow-primary/20 transition-all">
                      Read Full Article
                    </Button>
                  </DialogTrigger>
                </CardFooter>
              </Card>

              <DialogContent className="sm:max-w-4xl glass border-white/40 p-0 overflow-hidden rounded-[3rem] max-h-[90vh]">
                <div className="bg-primary/5 p-12 border-b border-white/40">
                  <div className="flex gap-4 mb-6">
                    {update.tags.map(tag => (
                      <Badge key={tag} className="bg-primary text-white rounded-lg px-3 py-1 font-bold text-xs uppercase tracking-widest">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <DialogHeader>
                    <DialogTitle className="text-4xl font-black text-slate-900 leading-tight mb-2">{update.title}</DialogTitle>
                    <DialogDescription className="text-primary font-black flex items-center gap-2 text-lg">
                      <Calendar className="h-5 w-5" />
                      {new Date(update.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </DialogDescription>
                  </DialogHeader>
                </div>

                <div className="p-12 overflow-y-auto max-h-[calc(90vh-220px)]">
                    <div className="grid lg:grid-cols-3 gap-12">
                      <div className="lg:col-span-2 space-y-8">
                        <div className="prose prose-slate max-w-none">
                          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                            {update.content}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-8">
                        <div className="p-6 rounded-3xl glass border-white/60 space-y-4">
                          <h4 className="flex items-center gap-2 font-black text-slate-900 uppercase tracking-widest text-sm">
                            <Sparkles className="h-4 w-4 text-accent" />
                            AI Insight Hub
                          </h4>
                          <p className="text-xs text-slate-500 font-bold leading-relaxed">
                            Generate an intelligent executive summary of this update to focus on key impacts.
                          </p>
                          <TaxUpdateSummarizer articleContent={update.content} />
                        </div>
                      </div>
                    </div>
                </div>
              </DialogContent>
            </Dialog>
          )))}
        </div>
      </div>
    </section>
  );
}
