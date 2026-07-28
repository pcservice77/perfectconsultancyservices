import Link from 'next/link';
import { Mountain, Twitter, Linkedin, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import ClientOnly from '@/components/client-only';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-primary">PERFECT CONSULTANCY SERVICES</span>
            </Link>
            <p className="text-sm max-w-xs text-muted-foreground">
              Professional Tax, Accounting & Business Compliance. Fast, Accurate, Trusted.
            </p>
            <div className="space-y-3 mt-2 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Roshpa Tower 5th Floor, Ranchi, Jharkhand 834001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:8809992225" className="hover:text-primary transition-colors">8809992225</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:pcservice.77@gmail.com" className="hover:text-primary transition-colors">pcservice.77@gmail.com</a>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 hover:text-primary transition-colors" /></Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h3 className="font-semibold mb-4 text-primary uppercase tracking-wider text-sm">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#services" className="hover:text-primary transition-colors">GST Filing</Link></li>
                <li><Link href="#services" className="hover:text-primary transition-colors">Income Tax</Link></li>
                <li><Link href="#services" className="hover:text-primary transition-colors">Audit</Link></li>
                <li><Link href="#services" className="hover:text-primary transition-colors">Company Registration</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-primary uppercase tracking-wider text-sm">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#jobs" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <ClientOnly>
            <p>&copy; {new Date().getFullYear()} PERFECT CONSULTANCY SERVICES. All rights reserved.</p>
          </ClientOnly>
        </div>
      </div>
    </footer>
  );
}
