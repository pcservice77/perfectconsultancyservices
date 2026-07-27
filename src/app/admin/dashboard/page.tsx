
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Perfect Consultancy Services Admin</CardTitle>
            <CardDescription>Manage your services, team, and enquiries from here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Use the sidebar to navigate between different management sections. Any changes you make here will be updated in real-time on your public website.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
