import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Facebook, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import ClientOnly from '@/components/client-only';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="container mx-auto px-4 pt-24 pb-12 md:px-6">
        <div className="grid gap-16 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-8 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 font-black text-2xl tracking-tighter">
              <div className="p-1 bg-primary rounded-xl overflow-hidden">
                <Image 
                  src="https://i.ibb.co/7Pkj4jM/perfect.jpg" 
                  alt="Perfect Consultancy Services Ranchi - Best Tax Consultant" 
                  width={32} 
                  height={32} 
                  className="rounded-sm object-cover"
                />
              </div>
              <span className="text-primary uppercase">Perfect Consultancy</span>
            </Link>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Perfect Consultancy Services: Redefining financial excellence through precision and professional integrity in Ranchi.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-xl glass hover:bg-primary hover:text-white transition-all"><Twitter className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="rounded-xl glass hover:bg-primary hover:text-white transition-all"><Linkedin className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="rounded-xl glass hover:bg-primary hover:text-white transition-all"><Facebook className="h-5 w-5" /></Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-12 lg:col-span-1">
            <div>
              <h3 className="font-black mb-8 text-slate-900 uppercase tracking-widest text-xs">Our Services</h3>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><Link href="#services" className="hover:text-primary transition-all flex items-center gap-1 group">GST Strategy <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
                <li><Link href="#services" className="hover:text-primary transition-all flex items-center gap-1 group">Income Tax <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
                <li><Link href="#services" className="hover:text-primary transition-all flex items-center gap-1 group">Audit & Assurance <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
                <li><Link href="#services" className="hover:text-primary transition-all flex items-center gap-1 group">Compliance <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-black mb-8 text-slate-900 uppercase tracking-widest text-xs">Firm</h3>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><Link href="#about" className="hover:text-primary transition-all">About Us</Link></li>
                <li><Link href="#jobs" className="hover:text-primary transition-all">Careers</Link></li>
                <li><Link href="#contact" className="hover:text-primary transition-all">Contact</Link></li>
                <li><Link href="#team" className="hover:text-primary transition-all">Leadership</Link></li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Locate Excellence in Ranchi
            </h3>
            <div className="relative h-[300px] w-full overflow-hidden rounded-[2.5rem] glass border-white shadow-2xl group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.38459450346!2d85.32306737525313!3d23.370716878931135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e106969586fb%3A0x628006b53297a7e8!2sRoshpa%20Tower!5e0!3m2!1sen!2sin!4v1709194240000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                title="Perfect Consultancy Roshpa Tower Office Location"
                className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              ></iframe>
              <div className="absolute inset-0 bg-primary/10 pointer-events-none group-hover:bg-transparent transition-all duration-700" />
              <div className="absolute bottom-6 left-6 right-6">
                 <Button asChild className="w-full h-14 bg-slate-900/90 backdrop-blur text-white rounded-2xl shadow-xl hover:bg-primary border-white/20 transition-all">
                    <a href="https://maps.app.goo.gl/hzE9hHufohWSZtSq8" target="_blank" rel="noopener noreferrer">
                        <MapPin className="h-4 w-4 mr-2" />
                        Visit us at Roshpa Tower, Ranchi
                    </a>
                 </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="sr-only">
          <p>Perfect Consultancy, Perfect Consultancy Services, Tax consultant in Ranchi, Tax consultancy in Roshpa Tower, GST Registration Ranchi, Income Tax return filing Ranchi, ITR filing Ranchi, Chartered Accountant Ranchi, Accounting services in Ranchi, Roshpa Tower Ranchi services.</p>
        </div>

        <div className="mt-24 pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <ClientOnly>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} PERFECT CONSULTANCY SERVICES RANCHI.
            </p>
          </ClientOnly>
          <div className="flex gap-8 text-xs font-black text-slate-400 uppercase tracking-widest">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}