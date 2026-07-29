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
  title: 'Perfect Consultancy Services | Best Tax Consultant in Ranchi & Roshpa Tower',
  description: 'Looking for Perfect Consultancy Services? We are the leading tax consultant in Ranchi located at Roshpa Tower. Expert GST registration, ITR filing, audit, and business compliance. Trusted by 1500+ businesses in Jharkhand.',
  keywords: [
    'Perfect Consultancy Services', 
    'Perfect Consultancy', 
    'Tax Consultancy Services in Ranchi', 
    'Tax Consultant in Roshpa Tower', 
    'Perfect Tax Consultant', 
    'Tax Consultant Ranchi', 
    'GST Registration Ranchi', 
    'Income Tax Filing Ranchi', 
    'Best Accountant in Ranchi', 
    'Business Compliance Ranchi', 
    'ITR filing services Jharkhand',
    'Chartered Accountant Ranchi',
    'Roshpa Tower Ranchi Services',
    'Perfect Tax Ranchi',
    'Accounting services in Ranchi',
    'GST Consultant Ranchi',
    'Income Tax Ranchi',
    'Audit Ranchi',
    'PCS Ranchi',
    'PCS Tax Consultant'
  ],
  icons: {
    icon: [
      { url: 'https://i.ibb.co/7Pkj4jM/perfect.jpg' },
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: 'https://i.ibb.co/7Pkj4jM/perfect.jpg', sizes: '180x180', type: 'image/jpeg' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Perfect Consultancy Services | Ranchi’s Most Trusted Tax Firm',
    description: 'Expert Tax, Accounting & Business Compliance services in Ranchi. Professional, fast, and trusted at Roshpa Tower.',
    url: 'https://perfectconsultancyservices.in',
    siteName: 'Perfect Consultancy Services',
    images: [
      {
        url: 'https://i.ibb.co/7Pkj4jM/perfect.jpg',
        width: 800,
        height: 600,
        alt: 'Perfect Consultancy Services Ranchi',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Perfect Consultancy Services",
    "alternateName": [
      "Perfect Consultancy", 
      "Perfect Tax Consultant", 
      "Perfect Tax Ranchi", 
      "PCS Ranchi", 
      "PCS Tax Services",
      "Perfect Accounting Ranchi"
    ],
    "image": "https://i.ibb.co/7Pkj4jM/perfect.jpg",
    "@id": "https://perfectconsultancyservices.in",
    "url": "https://perfectconsultancyservices.in",
    "telephone": "+918809992225",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Roshpa Tower, 5th Floor",
      "addressLocality": "Ranchi",
      "addressRegion": "JH",
      "postalCode": "834001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.3707,
      "longitude": 85.3231
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.facebook.com/pcservice77",
      "https://www.linkedin.com/company/perfect-consultancy-services"
    ],
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": "Ranchi"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
