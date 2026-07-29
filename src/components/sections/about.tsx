import { CheckCircle2, Award, Users, ShieldCheck } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Perfect Consultancy: Financial <span className="liquid-text">Clarity</span> in Ranchi.
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed font-medium">
                <strong>Perfect Consultancy Services (PCS)</strong> is your strategic partner for tax consultancy in Ranchi. Located centrally at <strong>Roshpa Tower</strong>, we blend local insight with professional excellence to handle GST, ITR, and Audits.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4 p-6 glass-dark rounded-[2rem]">
                <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Unmatched Expertise</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Top-rated tax consultant in Ranchi specializing in GST registration and complex auditing.</p>
              </div>
              <div className="space-y-4 p-6 glass-dark rounded-[2rem]">
                <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Bulletproof Security</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Your data and compliance are handled with bank-grade integrity at our Roshpa Tower office.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-8 glass-dark rounded-[2.5rem] space-y-8 border-white/5">
              <h3 className="text-3xl font-black liquid-text">Our Core Pillars</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 h-6 w-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-bold">GST Strategy & Excellence</p>
                    <p className="text-slate-400 text-sm">Comprehensive GST registration and monthly compliance for Ranchi businesses.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-bold">Income Tax Optimization</p>
                    <p className="text-slate-400 text-sm">Professional ITR filing and advanced tax planning from the heart of Ranchi.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1 h-6 w-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-bold">Corporate Compliance</p>
                    <p className="text-slate-400 text-sm">Full regulatory lifecycle support at Roshpa Tower office.</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-12 w-12 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center font-bold text-xs">
                      {i === 4 ? '+1500' : 'U'}
                    </div>
                  ))}
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Happy Ranchi Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
