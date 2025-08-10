import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
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
