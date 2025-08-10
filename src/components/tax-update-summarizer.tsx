"use client";

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { summarizeTaxUpdate } from '@/ai/flows/tax-update-summarizer';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TaxUpdateSummarizerProps {
  articleContent: string;
}

export default function TaxUpdateSummarizer({ articleContent }: TaxUpdateSummarizerProps) {
  const [summary, setSummary] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSummarize = () => {
    startTransition(async () => {
      setSummary('');
      try {
        const result = await summarizeTaxUpdate({ articleContent });
        if (result && result.summary) {
          setSummary(result.summary);
        } else {
          throw new Error("No summary returned.");
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to summarize the article. Please try again.",
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleSummarize} disabled={isPending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
        {isPending ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing...</>
        ) : (
          <><Sparkles className="mr-2 h-4 w-4" /> Summarize with AI</>
        )}
      </Button>
      
      {summary && (
        <Card className="bg-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-headline text-primary">
              <Sparkles className="h-5 w-5 text-accent" />
              AI Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90 whitespace-pre-wrap">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
