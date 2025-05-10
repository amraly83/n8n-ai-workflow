'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Added useRouter
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger, // Removed unused import
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Assuming Label component exists or is needed
import { GithubIcon } from 'lucide-react'; // Or your preferred GitHub icon

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignInModal({ open, onOpenChange }: SignInModalProps) {
  const router = useRouter(); // Initialize useRouter
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        toast.error(error.message || "Sign in failed.");
      } else {
        toast.success("Signed in successfully!");
        onOpenChange(false); // Close modal on successful sign-in
        // Ensure session is refreshed before redirecting
        await supabase.auth.getSession(); // Force session refresh
        router.push('/dashboard'); // Redirect to dashboard
        // Auth state change will also be handled by SupabaseAuthProvider
      }
    } catch (err: unknown) { // Typed err as unknown
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      // options: {
      //   redirectTo: window.location.origin // Or a specific callback URL
      // }
    });
    if (error) {
      setError(error.message);
      toast.error(error.message || "GitHub sign in failed.");
      setIsLoading(false);
    }
    // On success, Supabase handles redirection and auth state update
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8 bg-white dark:bg-slate-900 rounded-lg shadow-xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome Back!</DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            Sign in to continue to AI n8n Flow.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          <form onSubmit={handleCredentialsSignIn} className="space-y-6">
            <div>
              <Label htmlFor="email-signin" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </Label>
              <Input
                id="email-signin"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-800 dark:text-white"
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="password-signin" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </Label>
              <Input
                id="password-signin"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-800 dark:text-white"
                required
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>
            )}

            <Button 
              type="submit" 
              className="w-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold py-3 rounded-md transition-colors duration-150 ease-in-out" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-300 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-slate-900 px-2 text-slate-500 dark:text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium py-3 rounded-md transition-colors duration-150 ease-in-out flex items-center justify-center" 
            onClick={handleGitHubSignIn} 
            disabled={isLoading}
          >
            <GithubIcon className="mr-2 h-5 w-5" />
            Sign In with GitHub
          </Button>
        </div>
        <DialogFooter className="mt-6 sm:mt-8 text-center">
           <DialogClose asChild>
             <Button type="button" variant="ghost" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200" disabled={isLoading}>
                Cancel
              </Button>
           </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
