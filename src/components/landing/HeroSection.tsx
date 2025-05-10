'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(75vh-4rem)] items-center justify-center overflow-hidden bg-slate-900 py-20 text-white md:min-h-[calc(65vh-4rem)]" // Slightly reduced min-height, simplified main bg
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 z-0">
        {/* Top-left subtle glow */}
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-sky-700/20 via-transparent to-transparent blur-3xl opacity-70"></div>
        {/* Bottom-right subtle glow */}
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-indigo-700/20 via-transparent to-transparent blur-3xl opacity-70"></div>
         {/* Central subtle pattern - e.g. faint grid or dots if desired, or keep it clean */}
        {/* <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('/path/to/subtle-pattern.svg')" }}></div> */}
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
          <span className="block">Create n8n Workflows</span>
          <span className="block bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            With the Power of AI
          </span>
        </h1>
        <p className="mx-auto mb-12 max-w-lg text-lg text-slate-300 sm:text-xl md:max-w-2xl md:text-2xl">
          Stop wrestling with complex JSON. Describe your automation needs in plain
          text, and let our AI agent build ready-to-import n8n workflows for
          you in seconds.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button 
            size="lg" 
            asChild 
            className="group bg-sky-500 hover:bg-sky-400 text-white shadow-lg hover:shadow-sky-500/40 transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/dashboard">
              Start Generating Workflows
              <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            asChild 
            className="bg-transparent border-slate-500 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-400 transition-all duration-300 transform hover:scale-105"
          >
            <Link href="#how-it-works">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
