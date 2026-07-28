import Link from 'next/link';
import { Mountain, Twitter, Linkedin, Facebook, Phone, Mail, MapPin, Clock } from 'lucide-react';
import ClientOnly from '@/components/client-only';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-primary">PCS</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Professional Tax, Accounting & Business Compliance. Fast, Accurate, Trusted.
            </p>
            <div className="space-y-4 text-sm w-full">
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
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <span>Mon - Sat: 10:00 AM - 07:00 PM</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 lg:col-span-1">
            <div>
              <h3 className="font-semibold mb-4 text-primary uppercase tracking-wider text-sm">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#services" className="hover:text-primary transition-colors">GST Filing</Link></li>
                <li><Link href="#services" className="hover:text-primary transition-colors">Income Tax</Link></li>
                <li><Link href="#services" className="hover:text-primary transition-colors">Audit</Link></li>
                <li><Link href="#services" className="hover:text-primary transition-colors">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-primary uppercase tracking-wider text-sm">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#jobs" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="#team" className="hover:text-primary transition-colors">Leadership</Link></li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4 text-primary uppercase tracking-wider text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Find Us on Google Maps
            </h3>
            <div className="relative h-[250px] w-full overflow-hidden rounded-xl border border-border shadow-sm bg-muted group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.38459450346!2d85.32306737525313!3d23.370716878931135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e106969586fb%3A0x628006b53297a7e8!2sRoshpa%20Tower!5e0!3m2!1sen!2sin!4v1709194240000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Roshpa Tower Location"
                className="grayscale group-hover:grayscale-0 transition-all duration-500"
              ></iframe>
              <div className="absolute bottom-4 left-4 right-4">
                 <Button asChild size="sm" className="w-full bg-primary/90 text-primary-foreground shadow-lg hover:bg-primary">
                    <a 
                      href="https://maps.app.goo.gl/hzE9hHufohWSZtSq8" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2"
                    >
                        <MapPin className="h-3 w-3" />
                        Open in Google Maps
                    </a>
                 </Button>
              </div>
            </div>
            <div className="flex gap-4 mt-6 justify-end">
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 hover:text-primary transition-colors" /></Link>
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
