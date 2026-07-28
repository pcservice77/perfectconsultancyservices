import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import ServicesSection from '@/components/sections/services';
import StaffSection from '@/components/sections/staff';
import JobsSection from '@/components/sections/jobs';
import TaxUpdatesSection from '@/components/sections/tax-updates';
import ToolsSection from '@/components/sections/tools';
import TestimonialsSection from '@/components/sections/testimonials';
import ContactSection from '@/components/sections/contact';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ToolsSection />
      <StaffSection />
      <TestimonialsSection />
      <JobsSection />
      <TaxUpdatesSection />
      <Separator className="my-12 md:my-24" />
      <ContactSection />
    </>
  );
}
