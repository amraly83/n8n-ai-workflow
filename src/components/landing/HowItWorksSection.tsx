'use client';

import { PencilLineIcon, SparklesIcon, DownloadCloudIcon, WorkflowIcon } from "lucide-react"; // Example icons

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: PencilLineIcon,
    title: "1. Describe Your Workflow",
    description: "Simply type out what you want to automate in plain, natural language. No complex jargon or coding needed.",
  },
  {
    icon: SparklesIcon,
    title: "2. AI Generates the JSON",
    description: "Our intelligent AI agent processes your description and instantly crafts the complete n8n workflow JSON for you.",
  },
  {
    icon: DownloadCloudIcon,
    title: "3. Download & Import",
    description: "Copy or download the generated JSON. Import it directly into your n8n instance with a few clicks.",
  },
  {
    icon: WorkflowIcon,
    title: "4. Automate & Conquer",
    description: "Your new workflow is ready to run! Enjoy streamlined processes and boosted productivity.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Creating powerful n8n workflows has never been easier. Follow these simple steps.
          </p>
        </div>

        {/* Horizontal Timeline for medium screens and up, stacks vertically on small screens */}
        <div className="relative">
          {/* Connecting line - visible on md screens and up */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-sky-500/30 transform -translate-y-1/2" 
               style={{ top: 'calc(2rem + 8px)' }} // Position line relative to the icon circles center
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-0 relative">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center md:items-start md:text-left relative">
                {/* Timeline Node and Number */}
                <div className="relative z-10 mb-4 md:mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-500 text-white text-2xl font-bold shadow-lg">
                    {index + 1}
                  </div>
                  {/* Connecting line segment for vertical layout on small screens, except for the last item */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden absolute top-full left-1/2 w-0.5 h-12 bg-sky-500/30 transform -translate-x-1/2"></div>
                  )}
                </div>
                
                {/* Icon */}
                <div className="mb-3 text-sky-500 dark:text-sky-400">
                   <step.icon className="h-10 w-10 mx-auto md:mx-0" aria-hidden="true" />
                </div>

                {/* Title and Description */}
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                  {step.title.substring(step.title.indexOf(" ") + 1)} {/* Remove number from title */}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
