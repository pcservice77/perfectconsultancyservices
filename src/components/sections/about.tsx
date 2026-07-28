
import { CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-4">
                About Perfect Consultancy Services
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Located in the heart of Ranchi, Perfect Consultancy Services (PCS) is a premier financial consultancy firm dedicated to providing top-tier tax, accounting, and business compliance solutions. With years of experience and a deep understanding of Indian regulatory frameworks, we empower businesses and individuals to achieve financial clarity and growth.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-bold text-xl text-primary flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  GST Expertise
                </h3>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• GST Registration & Amendment</li>
                  <li>• Monthly/Quarterly Return Filing</li>
                  <li>• GST Audit & Annual Returns</li>
                  <li>• LUT & Export Advisory</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-xl text-primary flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  Income Tax Services
                </h3>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• Individual & Corporate ITR Filing</li>
                  <li>• Tax Planning & Optimization</li>
                  <li>• TDS/TCS Compliance</li>
                  <li>• Representation & Appeals</li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-secondary rounded-xl border border-border">
              <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                Our Office Details
              </h4>
              <div className="space-y-3 text-sm">
                <p className="flex items-start gap-3">
                  <span className="font-semibold shrink-0 w-20">Address:</span>
                  <span>Roshpa Tower 5th Floor, Ranchi, Jharkhand 834001</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-semibold shrink-0 w-20">Phone:</span>
                  <a href="tel:8809992225" className="hover:text-primary transition-colors">8809992225</a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-semibold shrink-0 w-20">Email:</span>
                  <a href="mailto:pcservice.77@gmail.com" className="hover:text-primary transition-colors">pcservice.77@gmail.com</a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-semibold shrink-0 w-20">Hours:</span>
                  <span>Mon - Sat: 10:00 AM - 07:00 PM</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative group h-[400px] lg:h-[500px]">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border shadow-2xl bg-muted">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.38459450346!2d85.32306737525313!3d23.370716878931135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e106969586fb%3A0x628006b53297a7e8!2sRoshpa%20Tower!5e0!3m2!1sen!2sin!4v1709194240000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Roshpa Tower Location"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
              <div className="absolute bottom-4 left-4 right-4">
                 <Button asChild className="w-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90">
                    <a 
                      href="https://maps.app.goo.gl/hzE9hHufohWSZtSq8" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2"
                    >
                        <MapPin className="h-4 w-4" />
                        Open in Google Maps
                    </a>
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
