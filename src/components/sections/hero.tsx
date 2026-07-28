import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import images from '@/app/lib/placeholder-images.json';

export default function HeroSection() {
  const heroImage = images.hero[0];

  return (
    <section className="relative w-full overflow-hidden bg-primary">
      {/* Background Image */}
      <Image
        src={heroImage.url}
        alt="Perfect Consultancy Services Teamwork"
        fill
        className="object-cover opacity-40"
        priority
        data-ai-hint={heroImage.aiHint}
      />
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />

      <div className="container relative mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center md:min-h-[85vh] md:px-6">
        <div className="max-w-4xl space-y-6">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-md">
            Professional Tax, Accounting & Business Compliance
          </h1>
          <p className="text-lg text-white/90 md:text-xl font-medium drop-shadow-sm">
            Fast, Accurate, Trusted. Your partner in financial clarity and growth.
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
            <Link href="#services">Explore Services</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>
      </div>
      
      {/* Bottom Transition */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
