'use client';

import React, { useState } from 'react'; // Added useState
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LightbulbIcon, SparklesIcon, CopyIcon, DownloadIcon, AlertTriangleIcon } from "lucide-react"; // Added more icons
import { toast } from "sonner";

export default function CreateWorkflowPage() {
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [generatedJson, setGeneratedJson] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedJson(null);

    try {
      const response = await fetch('/api/generate-workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: workflowDescription }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        const errorMessage = `Error ${response.status}: ${errorData || response.statusText}`;
        setError(errorMessage);
        toast.error("Workflow generation failed.", { description: errorMessage });
        return;
      }

      const data = await response.json();
      setGeneratedJson(data);
      toast.success("Workflow JSON generated successfully!");

    } catch (err: unknown) { // Typed err as unknown
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast.error("Failed to connect to the generation service.", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyJson = () => {
    if (generatedJson) {
      navigator.clipboard.writeText(JSON.stringify(generatedJson, null, 2))
        .then(() => toast.success("JSON copied to clipboard!"))
        .catch(() => toast.error("Failed to copy JSON."));
    }
  };

  const handleDownloadJson = () => {
    if (generatedJson) {
      const jsonString = JSON.stringify(generatedJson, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "workflow.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("JSON download started!");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create New Workflow
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Describe the automation you want to build in plain text.
        </p>
      </header>

      <Card className="bg-white dark:bg-slate-800 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-slate-800 dark:text-slate-100">
            <LightbulbIcon className="h-6 w-6 text-sky-500 dark:text-sky-400" />
            Your Workflow Idea
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Be as specific as possible for the best results. For example: "When a new row is added to my Google Sheet, send an email via Gmail and then post a message to Slack."
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Textarea
                name="workflowDescription"
                id="workflowDescription"
                rows={8}
                className="dark:bg-slate-700 dark:text-white dark:border-slate-600 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-70"
                placeholder={`e.g., Every Monday at 9 AM, fetch new posts from an RSS feed, summarize them using AI, and send the summaries to a &quot;Discord&quot; channel...`} 
                required
                value={workflowDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setWorkflowDescription(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <Button 
                type="submit" 
                className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold py-3 disabled:opacity-70"
                disabled={isLoading || !workflowDescription.trim()}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="mr-2 h-5 w-5" />
                    Generate Workflow with AI
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-slate-800 shadow-md mt-8">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800 dark:text-slate-100">Generated n8n JSON</CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            The AI-generated n8n workflow JSON will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-4 mb-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-md">
              <div className="flex items-center">
                <AlertTriangleIcon className="h-5 w-5 mr-2"/>
                <h3 className="font-semibold">Generation Failed</h3>
              </div>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}
          <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-md min-h-[200px] text-sm text-slate-700 dark:text-slate-300 overflow-x-auto">
            {generatedJson ? (
              <pre><code>{JSON.stringify(generatedJson, null, 2)}</code></pre>
            ) : (
              <p className="italic">{isLoading ? "Generating, please wait..." : "Awaiting your description..."}</p>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={handleCopyJson} disabled={!generatedJson || isLoading}>
              <CopyIcon className="mr-2 h-4 w-4"/> Copy JSON
            </Button>
            <Button variant="outline" onClick={handleDownloadJson} disabled={!generatedJson || isLoading}>
              <DownloadIcon className="mr-2 h-4 w-4"/> Download JSON
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
