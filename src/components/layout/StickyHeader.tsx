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
import { MenuIcon, BotMessageSquareIcon } from 'lucide-react'; // Removed LogOutIcon, LayoutDashboardIcon
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs';
// import { cn } from '@/lib/utils'; // Removed unused cn

export default function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  // Removed state for custom modals: isSignInModalOpen, isSignUpModalOpen
  // Removed useSupabaseAuth hook

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
            <SignedIn>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/dashboard" className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </SignedIn>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-2 lg:flex">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
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
                  <SignedIn>
                    <SheetTrigger asChild>
                      <Link
                        href="/dashboard"
                        className="block rounded-md p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        Dashboard
                      </Link>
                    </SheetTrigger>
                  </SignedIn>
                  <hr className="my-2 border-slate-200 dark:border-slate-700" />
                  <SheetTrigger asChild>
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </SignInButton>
                  </SheetTrigger>
                  <SheetTrigger asChild>
                     <SignUpButton mode="modal">
                        <Button className="w-full">Sign Up</Button>
                     </SignUpButton>
                  </SheetTrigger>
                </div>
              </SheetContent>
            </Sheet>
          </SignedOut>
        </div>
      </div>
      {/* Removed custom SignInModal and SignUpModal, Clerk handles its own modals */}
    </header>
  );
}
