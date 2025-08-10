import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-secondary">
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center md:min-h-[80vh] md:px-6">
        <div className="max-w-4xl space-y-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Professional Tax, Accounting & Business Compliance
          </h1>
          <p className="text-lg text-foreground/80 md:text-xl">
            Fast, Accurate, Trusted. Your partner in financial clarity and growth.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#services">Explore Services</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
