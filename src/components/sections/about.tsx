import { CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-4">
            About Perfect Consultancy Services
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Located in the heart of Ranchi, Perfect Consultancy Services (PCS) is a premier financial consultancy firm dedicated to providing top-tier tax, accounting, and business compliance solutions. With years of experience and a deep understanding of Indian regulatory frameworks, we empower businesses and individuals to achieve financial clarity and growth.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="p-8 bg-secondary rounded-2xl border border-border shadow-sm transition-all hover:shadow-md">
            <h3 className="font-bold text-xl text-primary flex items-center gap-2 mb-6">
              <CheckCircle2 className="h-6 w-6 text-accent" />
              GST Expertise
            </h3>
            <ul className="space-y-4 text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold mt-1">•</span>
                <span>GST Registration & Amendment: Smooth entry into the GST network for new businesses.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Monthly/Quarterly Return Filing: Timely and accurate filing of GSTR-1, GSTR-3B, and more.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold mt-1">•</span>
                <span>GST Audit & Annual Returns: Comprehensive reviews (GSTR-9 & 9C) to ensure total compliance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold mt-1">•</span>
                <span>LUT & Export Advisory: specialized guidance for exporters to maximize tax benefits.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 bg-secondary rounded-2xl border border-border shadow-sm transition-all hover:shadow-md">
            <h3 className="font-bold text-xl text-primary flex items-center gap-2 mb-6">
              <CheckCircle2 className="h-6 w-6 text-accent" />
              Income Tax Services
            </h3>
            <ul className="space-y-4 text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Individual & Corporate ITR Filing: expert filing for all types of taxpayers, from individuals to LLPs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Tax Planning & Optimization: Lawful strategies to minimize your tax liability and maximize savings.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold mt-1">•</span>
                <span>TDS/TCS Compliance: Accurate calculation and filing of TDS returns and certificates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Representation & Appeals: Professional support during tax assessments and dispute resolutions.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
