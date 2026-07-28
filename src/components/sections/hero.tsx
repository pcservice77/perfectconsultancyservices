import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-slate-50">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/60 text-primary font-bold text-sm">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
              Trusted By 1500+ Businesses In Ranchi
            </div>
            
            <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Perfect Consultancy: Best <span className="liquid-text">Tax Consultant in Ranchi</span>.
            </h1>
            
            <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
              Experience a new standard of tax, accounting, and business compliance. Seamlessly professional, modernly efficient, and Ranchi's most trusted firm for your financial growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="h-16 px-8 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/20 group">
                <Link href="#services">
                  Our Services
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-16 px-8 rounded-2xl text-lg font-bold glass border-white/80 hover:bg-white/80 transition-all">
                <Link href="#contact">Consult with Experts</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200/50">
              <div className="space-y-1">
                <p className="text-2xl font-black text-slate-900">15+</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Years Exp</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-black text-slate-900">100%</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Compliance</p>
              </div>
              <div className="hidden sm:block space-y-1">
                <p className="text-2xl font-black text-slate-900">24/7</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Expert Support</p>
              </div>
            </div>
          </div>

          <div className="relative group perspective-1000 hidden lg:block">
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl glass border-white/40 aspect-[4/5]">
              <Image
                src="https://i.ibb.co/7N1kNv7D/Stock-Cake-Teamwork-in-Office-996932-medium.jpg"
                alt="Perfect Consultancy Services Ranchi Office"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-3xl border-white/20">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-white font-black text-lg">Secure & Accurate</p>
                    <p className="text-white/70 text-sm">Certified Professional Compliance</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Liquid Blobs */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse delay-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
