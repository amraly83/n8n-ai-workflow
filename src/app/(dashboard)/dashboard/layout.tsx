'use client';

import React, { useState } from 'react'; // Removed useEffect and useRouter
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs'; // Clerk imports
import {
  LayoutDashboardIcon,
  FileTextIcon,
  PlusCircleIcon,
  UserCircle2Icon,
  LogOutIcon,
  MenuIcon,
  // XIcon, // Removed unused XIcon
  BotMessageSquareIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboardIcon },
  { href: '/dashboard/create', label: 'Create Workflow', icon: PlusCircleIcon },
  { href: '/dashboard/workflows', label: 'My Workflows', icon: FileTextIcon },
  { href: '/dashboard/account', label: 'Account', icon: UserCircle2Icon },
];

function DashboardNav({ isMobile = false, onLinkClick }: { isMobile?: boolean, onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col gap-2", isMobile ? "p-4" : "p-2")}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onLinkClick}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-100 dark:hover:bg-slate-800",
            pathname === item.href && "bg-slate-100 dark:bg-slate-800 font-medium text-sky-600 dark:text-sky-400",
            isMobile ? "text-base" : "text-sm"
          )}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function UserMenu() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded || !user) {
    // Can return a loading skeleton or null
    return null; 
  }

  const userName = user.fullName || user.firstName || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User';
  const userEmail = user.primaryEmailAddress?.emailAddress;
  const userImage = user.imageUrl;

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    if (names[0]) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-9 w-9 border dark:border-slate-600">
            <AvatarImage src={userImage} alt={userName ?? 'User'} />
            <AvatarFallback>{getInitials(user.fullName || user.firstName)}</AvatarFallback>
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
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-600 dark:text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/10 focus:!bg-red-50 dark:focus:!bg-red-500/10 focus:!text-red-600 dark:focus:!text-red-400">
          <LogOutIcon className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Authentication and loading state are handled by Clerk's middleware and RootLayout <SignedIn>
  // No need for explicit user/isLoading checks here to prevent rendering or redirect

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar */}
      <aside className="hidden border-r bg-slate-50/40 dark:bg-slate-800/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <BotMessageSquareIcon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              <span>AI n8n Flow</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <DashboardNav />
          </div>
        </div>
      </aside>

      <div className="flex flex-col">
        {/* Mobile Header & Sidebar Trigger */}
        <header className="flex h-16 items-center gap-4 border-b bg-slate-50/40 dark:bg-slate-800/40 px-6 lg:hidden">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="flex h-16 items-center border-b px-6">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white" onClick={() => setIsSidebarOpen(false)}>
                  <BotMessageSquareIcon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  <span>AI n8n Flow</span>
                </Link>
              </div>
              <DashboardNav isMobile={true} onLinkClick={() => setIsSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
          
          <div className="flex-1">
             {/* Could add breadcrumbs or page title here */}
          </div>
          <UserMenu />
        </header>

        {/* Desktop Header (User Menu part) */}
         <header className="hidden lg:flex h-16 items-center gap-4 border-b bg-slate-50/40 dark:bg-slate-800/40 px-6 justify-end">
            <UserMenu />
        </header>

        <main className="flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8 bg-slate-100/60 dark:bg-slate-900/60">
          {children}
        </main>
      </div>
    </div>
  );
}
