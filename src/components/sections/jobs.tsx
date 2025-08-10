import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, IndianRupee } from 'lucide-react';

interface Job {
  title: string;
  location: string;
  type: string;
  salary: string;
}

const jobs: Job[] = [
  { title: 'Senior Tax Consultant', location: 'Mumbai, India', type: 'Full-time', salary: '₹12,00,000 - ₹18,00,000 PA' },
  { title: 'Audit Assistant', location: 'Delhi, India', type: 'Full-time', salary: '₹4,00,000 - ₹6,00,000 PA' },
  { title: 'Junior Accountant', location: 'Remote', type: 'Part-time', salary: 'Competitive' },
];

export default function JobsSection() {
  return (
    <section id="jobs" className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Join Our Team</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            We are looking for talented individuals to join our growing team.
          </p>
        </div>
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job.title} className="transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <CardTitle className="font-headline text-xl text-primary">{job.title}</CardTitle>
                  <Button className="mt-4 md:mt-0 bg-accent text-accent-foreground hover:bg-accent/90">Apply Now</Button>
                </div>
                <CardDescription className="pt-2">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/70">
                    <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.type}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><IndianRupee className="h-4 w-4" /> {job.salary}</span>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
         <div className="mt-12 text-center">
            <Button variant="outline">View All Openings</Button>
        </div>
      </div>
    </section>
  );
}
