import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Landmark, ClipboardCheck, Building, FileSignature, BookOpen, BrainCircuit } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  { icon: FileText, title: 'GST Filing', description: 'Comprehensive GST return filing and compliance services for your business.' },
  { icon: Landmark, title: 'Income Tax', description: 'Expert assistance with income tax returns for individuals and businesses.' },
  { icon: ClipboardCheck, title: 'Audit & Assurance', description: 'Thorough auditing services to ensure financial accuracy and compliance.' },
  { icon: Building, title: 'Company Registration', description: 'Hassle-free registration for all types of companies and LLPs.' },
  { icon: FileSignature, title: 'ROC Filings', description: 'Timely and accurate ROC filings to keep your company compliant.' },
  { icon: BookOpen, title: 'Bookkeeping', description: 'Systematic and professional bookkeeping services to manage your finances.' },
  { icon: BrainCircuit, title: 'Business Advisory', description: 'Strategic advisory services to help your business grow and succeed.' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Our Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            We offer a wide range of services to meet your business needs.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-full bg-accent/10 p-3">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="font-headline text-xl text-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-grow flex-col">
                <p className="flex-grow text-foreground/80">{service.description}</p>
                <Button variant="outline" className="mt-4 self-start">Request Service</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
