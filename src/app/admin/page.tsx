
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mountain, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth, useUser, useFirestore } from '@/firebase';

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const db = useFirestore();
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    if (!userLoading && user?.isAdmin) {
      router.push('/admin/dashboard');
    }
  }, [user, userLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

        // Create user profile in Firestore
        await setDoc(doc(db, 'users', newUser.uid), {
          email: email,
          isAdmin: false,
          createdAt: new Date().toISOString()
        });

        toast({
          title: "Registration Successful",
          description: "Your account has been created. If you are an admin, please contact support to enable dashboard access.",
        });
        setIsRegistering(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: isRegistering ? "Registration Failed" : "Login Failed",
        description: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
           <div className="flex justify-center items-center gap-2 mb-4">
             <Mountain className="h-8 w-8 text-primary" />
             <span className="text-2xl font-bold text-primary">PCS</span>
           </div>
          <CardTitle className="text-2xl">{isRegistering ? 'Create Account' : 'Client Login'}</CardTitle>
          <CardDescription>
            {isRegistering 
              ? 'Join Perfect Consultancy Services today.' 
              : 'Secure access to your client area.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isRegistering && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {isRegistering ? 'Register' : 'Login'}
            </Button>
            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-primary hover:underline"
              >
                {isRegistering 
                  ? 'Already have an account? Login' 
                  : "Don't have an account? Register"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
