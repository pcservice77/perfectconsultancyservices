import Link from 'next/link';
import { Mountain, Twitter, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-primary">Consultant Connect</span>
            </Link>
            <p className="text-sm">
              Professional Tax, Accounting & Business Compliance.
            </p>
            <div className="flex gap-4">
                <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-primary" /></Link>
                <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 hover:text-primary" /></Link>
                <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 hover:text-primary" /></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-2 md:grid-cols-4">
            <div>
              <h3 className="font-semibold mb-2">Services</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="#services" className="hover:text-primary">GST Filing</Link></li>
                <li><Link href="#services" className="hover:text-primary">Income Tax</Link></li>
                <li><Link href="#services" className="hover:text-primary">Audit</Link></li>
                <li><Link href="#services" className="hover:text-primary">Company Registration</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="#" className="hover:text-primary">About Us</Link></li>
                <li><Link href="#jobs" className="hover:text-primary">Careers</Link></li>
                <li><Link href="#contact" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Resources</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="#tax-updates" className="hover:text-primary">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary">FAQs</Link></li>
                <li><Link href="#" className="hover:text-primary">Downloads</Link></li>
              </ul>
            </div>
             <div>
              <h3 className="font-semibold mb-2">Legal</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Consultant Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
