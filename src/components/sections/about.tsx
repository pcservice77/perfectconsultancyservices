
import Image from 'next/image';
import { CheckCircle2, MapPin, Phone, Mail, Clock } from 'lucide-react';
import images from '@/app/lib/placeholder-images.json';

export default function AboutSection() {
  const officeImage = images.about[0];

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

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl">
              <Image
                src={officeImage.url}
                alt="PCS Office Ranchi"
                width={officeImage.width}
                height={officeImage.height}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                data-ai-hint={officeImage.aiHint}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Roshpa Tower, Ranchi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
