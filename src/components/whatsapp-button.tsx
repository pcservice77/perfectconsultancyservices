'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "8809992225";
  const message = "Hello Perfect Consultancy Services, I would like to enquire about your professional services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button 
        asChild
        className="h-16 w-16 rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-110 transition-all group p-0"
      >
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="h-8 w-8 group-hover:rotate-12 transition-transform" />
          <span className="sr-only">Contact on WhatsApp</span>
        </a>
      </Button>
    </div>
  );
}
