
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/firebase';
import { seedDatabase } from '@/services/seed';
import { useToast } from '@/hooks/use-toast';
import { Database, Loader2, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedDatabase(db);
      toast({
        title: "Success",
        description: "Sample data has been added to your database.",
      });
      // Refreshing the page to show new data in other sections might be helpful
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add sample data. Make sure you are logged in as an Admin.",
      });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Welcome to Perfect Consultancy Services Admin</CardTitle>
            <CardDescription>Manage your services, team, and enquiries from here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Use the sidebar to navigate between different management sections. Any changes you make here will be updated in real-time on your public website.
            </p>
            
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="font-semibold flex items-center gap-2 text-primary mb-2">
                <Database className="h-4 w-4" />
                Database Setup
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                If your database is currently empty, you can initialize it with sample data to see how the website looks.
              </p>
              <Button onClick={handleSeed} disabled={seeding} variant="secondary" className="w-full sm:w-auto">
                {seeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Initialize Sample Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Database Connection:</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Auth Service:</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
