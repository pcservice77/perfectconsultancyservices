import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Get in Touch</h2>
            <p className="mt-4 text-lg text-foreground/80">
              Have a question or need a custom service? Fill out the form and we'll get back to you.
            </p>
            <form className="mt-8 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={5} />
              </div>
              <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
            </form>
          </div>
          <div>
            <Card className="bg-secondary h-full flex flex-col justify-center">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Subscribe to Our Newsletter</CardTitle>
                <CardDescription>
                  Get the latest tax updates, job postings, and news delivered to your inbox.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4 sm:flex-row">
                  <Input type="email" placeholder="your@email.com" className="flex-grow bg-background" />
                  <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Subscribe</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
