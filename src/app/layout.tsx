import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import TaxAssistantChat from '@/components/tax-assistant-chat';
import WhatsAppButton from '@/components/whatsapp-button';

export const metadata: Metadata = {
  metadataBase: new URL('https://perfectconsultancyservices.in'),
  title: 'Perfect Consultancy Services | Best Tax Consultant in Ranchi | GST & ITR',
  description: 'Looking for a reliable tax consultant in Ranchi? Perfect Consultancy Services offers expert GST registration, ITR filing, audit, and business compliance. Trusted by 1500+ businesses. Fast, accurate, and professional accounting services.',
  keywords: ['Tax Consultant in Ranchi', 'GST Registration Ranchi', 'Income Tax Filing Ranchi', 'Perfect Consultancy Services', 'Best Accountant in Ranchi', 'Business Compliance Ranchi', 'ITR filing services Jharkhand'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Perfect Consultancy Services | Best Tax Consultant in Ranchi',
    description: 'Expert Tax, Accounting & Business Compliance services in Ranchi. Professional, fast, and trusted.',
    url: 'https://perfectconsultancyservices.in',
    siteName: 'Perfect Consultancy Services',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <TaxAssistantChat />
          <WhatsAppButton />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
