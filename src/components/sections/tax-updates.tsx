"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import TaxUpdateSummarizer from '@/components/tax-update-summarizer';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TaxUpdate {
  title: string;
  summary: string;
  content: string;
  date: string;
  tags: string[];
}

const updates: TaxUpdate[] = [
  {
    title: 'New GST Return Filing System: An Overview',
    summary: 'The government has introduced a new, simplified GST return filing system. Learn about the key changes and how they affect your business.',
    content: `The Goods and Services Tax (GST) Council has announced a new return filing system aimed at simplifying compliance for taxpayers. The new system introduces two new forms: RET-1 (Normal), RET-2 (Sahaj), and RET-3 (Sugam). These forms are designed to cater to different types of taxpayers based on their business activities and turnover.
    
Key changes include:
- **Quarterly filing for small taxpayers:** Businesses with a turnover of up to ₹5 crore can opt to file their returns quarterly.
- **Real-time invoice matching:** The new system features a real-time invoice matching mechanism, which will help in the seamless flow of input tax credit (ITC).
- **Annexures of supplies and purchases:** Taxpayers will need to upload annexures of supplies (ANX-1) and purchases (ANX-2). ANX-2 will be auto-populated from the suppliers' ANX-1.
- **Simplified amendment process:** Amendments to returns can be made more easily through a separate amendment return form.

**Deadlines:** The new system is expected to be rolled out in a phased manner. The first phase for large taxpayers is scheduled to begin from October 2024. Small taxpayers will be onboarded from January 2025. It is crucial for businesses to familiarize themselves with the new forms and processes to ensure a smooth transition. Failure to comply with the new deadlines can result in penalties and interest.`,
    date: 'August 15, 2024',
    tags: ['GST', 'Notification'],
  },
  {
    title: 'Income Tax: Changes in TDS/TCS Provisions for FY 2024-25',
    summary: 'Several changes have been made to the TDS and TCS provisions in the latest budget. Understand the implications for your transactions.',
    content: `The Finance Act 2024 has introduced significant changes to the provisions related to Tax Deducted at Source (TDS) and Tax Collected at Source (TCS). These changes are applicable from the financial year 2024-25.

Key updates include:
1.  **Section 194R:** The threshold for TDS on benefits or perquisites has been increased from ₹20,000 to ₹30,000.
2.  **Section 206C(1G):** The TCS rate on foreign remittance under the Liberalised Remittance Scheme (LRS) for purposes other than education and medical treatment has been increased to 20% for amounts exceeding ₹7 lakh.
3.  **Higher TDS/TCS for non-filers:** The scope of sections 206AB and 206CCA has been expanded. Higher rates of TDS/TCS will now apply to non-filers of income tax returns for the immediately preceding two assessment years.

Businesses and individuals must ensure their accounting systems are updated to incorporate these new rates and provisions. Proper compliance is essential to avoid interest and penalties from the tax authorities. The deadline for depositing TDS/TCS and filing the corresponding returns remains unchanged.`,
    date: 'July 30, 2024',
    tags: ['Income Tax', 'Circular'],
  },
];

export default function TaxUpdatesSection() {
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
          {updates.map((update) => (
            <Dialog key={update.title}>
              <Card className="flex flex-col transition-shadow duration-300 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-primary">{update.title}</CardTitle>
                  <CardDescription>{update.date}</CardDescription>
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
                    {update.date}
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
          ))}
        </div>
      </div>
    </section>
  );
}
