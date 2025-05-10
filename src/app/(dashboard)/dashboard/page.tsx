'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon, FileTextIcon, ZapIcon, UserCircle2Icon } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function DashboardOverviewPage() {
  const { user } = useUser();

  const userName = user?.fullName?.split(' ')[0] || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User';

  return (
    <div className="flex flex-col gap-6">
      <header className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Welcome back, {userName}!
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Ready to create some amazing n8n automations?
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Workflows Generated
            </CardTitle>
            <ZapIcon className="h-5 w-5 text-sky-500 dark:text-sky-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">0</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              +0 this month (Placeholder)
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Subscription Tier
            </CardTitle>
            <UserCircle2Icon className="h-5 w-5 text-sky-500 dark:text-sky-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">Free Plan</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              (Placeholder)
            </p>
          </CardContent>
        </Card>
        
        {/* Placeholder for another stat or quick action */}
         <Card className="bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Quick Links
            </CardTitle>
             <PlusCircleIcon className="h-5 w-5 text-sky-500 dark:text-sky-400" />
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
             <Button variant="outline" asChild className="justify-start">
                <Link href="/dashboard/create">
                    <PlusCircleIcon className="mr-2 h-4 w-4" /> Create New Workflow
                </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start">
                <Link href="/dashboard/workflows">
                    <FileTextIcon className="mr-2 h-4 w-4" /> View My Workflows
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Recent Activity</h2>
        <Card className="bg-white dark:bg-slate-800 shadow-md">
          <CardContent className="p-6">
            <p className="text-slate-500 dark:text-slate-400">No recent activity to display. (Placeholder)</p>
            {/* Later, this will list recently created/modified workflows */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
