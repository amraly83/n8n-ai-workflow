'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GithubIcon } from 'lucide-react';
import { toast } from 'sonner'; // For showing success/error messages

interface SignUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignInClick?: () => void; // Optional: to switch to SignIn modal
}

export function SignUpModal({ open, onOpenChange, onSignInClick }: SignUpModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleCredentialsSignUp called"); // Debug log
    setError(null);
    setIsLoading(true);
    console.log("Attempting Supabase signUp with:", { email, name }); // Debug log
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({ // Renamed error to signUpError
        email,
        password,
        options: {
          data: {
            full_name: name || '', 
          },
        },
      });
      console.log("Supabase signUp response:", { data, signUpError }); // Debug log

      if (signUpError) {
        setError(signUpError.message);
        toast.error(signUpError.message || "Sign up failed.");
      } else if (data.user && !data.session) {
        toast.success('Account created! Please check your email to confirm your account.');
        onOpenChange(false);
      } else if (data.user && data.session) {
        toast.success('Account created and signed in successfully!');
        onOpenChange(false); 
      } else if (data.user && data.session === null && data.user.email_confirmed_at === null) { // More specific check for pending confirmation
        toast.success('Account created! Please check your email to confirm your account.');
        onOpenChange(false);
      }
       else {
        // Fallback for unexpected scenarios
        console.warn("Supabase signUp: User created but no session, and not clearly pending confirmation.", data);
        toast.info('Sign up successful. Please proceed to sign in.');
        onOpenChange(false);
      }
    } catch (err: unknown) { // Typed err as unknown
      console.error("Error in handleCredentialsSignUp catch block:", err); // Debug log
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
      toast.error(error.message || "GitHub sign up failed.");
      setIsLoading(false);
    }
    // On success, Supabase handles redirection and auth state update
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8 bg-white dark:bg-slate-900 rounded-lg shadow-xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Create your Account</DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            Get started with AI n8n Flow in seconds.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <form onSubmit={handleCredentialsSignUp} className="space-y-6">
            <div>
              <Label htmlFor="name-signup" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Full Name (Optional)
              </Label>
              <Input
                id="name-signup"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-800 dark:text-white"
                placeholder="Your Name"
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="email-signup" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </Label>
              <Input
                id="email-signup"
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
              <Label htmlFor="password-signup" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </Label>
              <Input
                id="password-signup"
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
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-300 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-slate-900 px-2 text-slate-500 dark:text-slate-400">
                Or sign up with
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
            Sign Up with GitHub
          </Button>
        </div>
        <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
          {onSignInClick && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto font-medium text-sky-600 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300" 
                onClick={() => { onOpenChange(false); onSignInClick(); }}
                disabled={isLoading}
              >
                Sign In
              </Button>
            </p>
          )}
           <DialogClose asChild>
             <Button type="button" variant="ghost" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 sm:ml-auto" disabled={isLoading}>
                Cancel
              </Button>
           </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
