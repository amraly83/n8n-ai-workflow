'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { FileTextIcon, PlusCircleIcon, SearchIcon, Trash2Icon, Edit3Icon, CopyIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

// Placeholder data - replace with actual data fetching
const sampleWorkflows = [
  { id: "1", name: "Social Media Scheduler", description: "Posts to Twitter and LinkedIn every morning.", createdAt: "2024-05-09", status: "Active" },
  { id: "2", name: "Email Attachment Saver", description: "Saves attachments from Gmail to Google Drive.", createdAt: "2024-05-08", status: "Active" },
  { id: "3", name: "RSS to Discord Bot", description: "Fetches RSS feeds and posts new items to Discord.", createdAt: "2024-05-07", status: "Inactive" },
  { id: "4", name: "Customer Onboarding Flow", description: "Sends welcome email and creates task in CRM.", createdAt: "2024-05-06", status: "Active" },
];

export default function MyWorkflowsPage() {
  // TODO: Implement search/filter state and logic
  // TODO: Implement actual data fetching, pagination

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            My Workflows
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage and view your AI-generated n8n workflows.
          </p>
        </div>
        <Button asChild className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white">
          <Link href="/dashboard/create">
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            Create New Workflow
          </Link>
        </Button>
      </header>

      <Card className="bg-white dark:bg-slate-800 shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl text-slate-800 dark:text-slate-100">All Workflows</CardTitle>
            <div className="relative w-full sm:w-auto sm:max-w-xs">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
              <Input 
                type="search" 
                placeholder="Search workflows..." 
                className="pl-10 dark:bg-slate-700 dark:text-white dark:border-slate-600"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {sampleWorkflows.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sampleWorkflows.map(workflow => (
                <Card key={workflow.id} className="flex flex-col bg-slate-50 dark:bg-slate-800/50 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                      <Link href={`/dashboard/workflows/${workflow.id}`}>{workflow.name}</Link>
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                      Created: {new Date(workflow.createdAt).toLocaleDateString()} | Status: {workflow.status}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{workflow.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-3">
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-sky-500 dark:text-slate-400 dark:hover:text-sky-400">
                      <CopyIcon className="h-4 w-4" /> <span className="sr-only">Copy JSON</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-yellow-500 dark:text-slate-400 dark:hover:text-yellow-400">
                      <Edit3Icon className="h-4 w-4" /> <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400">
                      <Trash2Icon className="h-4 w-4" /> <span className="sr-only">Delete</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileTextIcon className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" />
              <h3 className="mt-2 text-lg font-medium text-slate-900 dark:text-white">No workflows yet</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Get started by creating a new workflow.</p>
              <Button asChild className="mt-6 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white">
                <Link href="/dashboard/create">
                  <PlusCircleIcon className="mr-2 h-5 w-5" />
                  Create Workflow
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
        {/* TODO: Add pagination if many workflows */}
      </Card>
    </div>
  );
}
