"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('admin-auth-token');
    if (!token) {
      router.replace('/admin');
    }
  }, [router]);

  if (!isClient) {
    return null; // Or a loading spinner
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, Admin!</CardTitle>
            <CardDescription>Here's an overview of your site.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You can manage your site's content from the sidebar navigation.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
