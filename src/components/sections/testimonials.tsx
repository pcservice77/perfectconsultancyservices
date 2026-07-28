'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Rajesh Mahto",
    company: "Mahto Logistics",
    role: "CEO",
    content: "PCS completely streamlined our GST filing process. Their accuracy and proactive approach saved us from significant penalties last fiscal year.",
    image: "https://picsum.photos/seed/t1/100/100"
  },
  {
    name: "Anjali Verma",
    company: "Verma Tech Solutions",
    role: "Founder",
    content: "The level of expertise in income tax planning is exceptional. They helped us optimize our corporate tax structure in Ranchi perfectly.",
    image: "https://picsum.photos/seed/t2/100/100"
  },
  {
    name: "Sandeep Gupta",
    company: "Gupta Retailers",
    role: "Director",
    content: "Professional, transparent, and always reachable. Perfect Consultancy is truly the gold standard for compliance in our region.",
    image: "https://picsum.photos/seed/t3/100/100"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] opacity-30" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="mb-20 text-center space-y-4">
          <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight">
            Wall of <span className="liquid-text">Trust</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-slate-400 font-medium">
            Hear from the business leaders who have experienced financial clarity with PCS.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="group relative overflow-hidden rounded-[2.5rem] glass-dark border-white/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white/5">
              <CardContent className="p-0 space-y-8">
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-4 -left-2 h-10 w-10 text-primary/10 -z-10" />
                  <p className="text-lg font-medium text-slate-300 leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={t.image} alt={t.name} />
                    <AvatarFallback>{t.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-black text-white">{t.name}</h4>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t.role}, {t.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
