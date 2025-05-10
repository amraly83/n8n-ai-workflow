'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon, BotMessageSquareIcon, LogOutIcon, LayoutDashboardIcon } from 'lucide-react';
import { SignInModal } from '@/components/auth/SignInModal';
import { SignUpModal } from '@/components/auth/SignUpModal';
import { useSupabaseAuth } from '@/components/auth/SupabaseAuthProvider'; // Changed import
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { cn } from '@/lib/utils'; // Removed unused cn


// Simplified UserNav for the landing page header
function LandingPageUserNav() {
  const { user, signOut } = useSupabaseAuth();

  if (!user) return null;

  // Supabase stores custom user data in user_metadata
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const userEmail = user.email;
  const userImage = user.user_metadata?.avatar_url || user.user_metadata?.picture;


  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-9 w-9 border dark:border-slate-600">
            <AvatarImage src={userImage ?? undefined} alt={userName ?? 'User'} />
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-slate-900 dark:text-white">{userName}</p>
            <p className="text-xs leading-none text-slate-500 dark:text-slate-400">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard">
            <LayoutDashboardIcon className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => await signOut()} className="cursor-pointer text-red-600 dark:text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/10 focus:!bg-red-50 dark:focus:!bg-red-500/10 focus:!text-red-600 dark:focus:!text-red-400">
          <LogOutIcon className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


export default function StickyHeader() {
  const { user, isLoading } = useSupabaseAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact Us' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out 
                  ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-md dark:bg-slate-900/80' : 'bg-transparent'}`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <BotMessageSquareIcon className="h-7 w-7 text-slate-900 dark:text-white" />
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            AI n8n Flow
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link href={link.href} className={navigationMenuTriggerStyle()}>
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-2 lg:flex">
          {isLoading ? (
            <div className="h-10 w-24 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700"></div>
          ) : user ? (
            <LandingPageUserNav />
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsSignInModalOpen(true)}>
                Sign In
              </Button>
              <Button onClick={() => setIsSignUpModalOpen(true)}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          {!isLoading && user ? (
             <LandingPageUserNav />
          ) : isLoading ? (
             <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700"></div>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="grid gap-4 p-4">
                  <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => (document.querySelector('[data-radix-collection-item]') as HTMLElement)?.click()}> {/* Close sheet on nav */}
                    <BotMessageSquareIcon className="h-7 w-7 text-slate-900 dark:text-slate-50" />
                    <span className="text-xl font-bold text-slate-900 dark:text-slate-50">
                      AI n8n Flow
                    </span>
                  </Link>
                  {navLinks.map((link) => (
                    <SheetTrigger asChild key={link.href}>
                       <Link
                        href={link.href}
                        className="block rounded-md p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        {link.label}
                      </Link>
                    </SheetTrigger>
                  ))}
                  <hr className="my-2 border-slate-200 dark:border-slate-700" />
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full" onClick={() => setIsSignInModalOpen(true)}>
                      Sign In
                    </Button>
                  </SheetTrigger>
                  <SheetTrigger asChild>
                    <Button className="w-full" onClick={() => setIsSignUpModalOpen(true)}>
                      Sign Up
                    </Button>
                  </SheetTrigger>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
      {!isLoading && !user && (
        <>
          <SignInModal 
            open={isSignInModalOpen} 
            onOpenChange={setIsSignInModalOpen} 
          />
          <SignUpModal 
            open={isSignUpModalOpen} 
            onOpenChange={setIsSignUpModalOpen}
            onSignInClick={() => {
              setIsSignUpModalOpen(false);
              setIsSignInModalOpen(true);
            }}
          />
        </>
      )}
    </header>
  );
}
