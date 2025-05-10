'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

interface PricingTier {
  name: string;
  priceMonthly: string;
  priceYearly?: string; // Optional, if offering annual discount
  description: string;
  features: string[];
  ctaText: string;
  href: string;
  isFeatured?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: "Free",
    priceMonthly: "$0",
    description: "Get started and explore basic features.",
    features: ["5 Workflow Generations/month", "Basic AI Model", "Community Support"],
    ctaText: "Start for Free",
    href: "/auth/signup?plan=free",
  },
  {
    name: "Pro",
    priceMonthly: "$29",
    priceYearly: "$290", // Example: 2 months free
    description: "For power users and small teams.",
    features: [
      "100 Workflow Generations/month",
      "Advanced AI Model",
      "Priority Email Support",
      "Save & Manage Workflows",
    ],
    ctaText: "Get Started with Pro",
    href: "/auth/signup?plan=pro",
    isFeatured: true,
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    description: "Tailored solutions for large organizations.",
    features: [
      "Unlimited Workflow Generations",
      "Dedicated AI Model Option",
      "24/7 Priority Support",
      "Custom Integrations",
      "Team Management",
    ],
    ctaText: "Contact Sales",
    href: "#contact",
  },
];

export default function PricingSection() {
  // const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Choose the plan that&apos;s right for you and start automating today.
          </p>
          {/* Optional: Monthly/Annually Toggle
          <div className="mt-6">
            <ToggleGroup type="single" defaultValue="monthly" onValueChange={(value) => setBillingCycle(value as any)}>
              <ToggleGroupItem value="monthly" aria-label="Monthly billing">Monthly</ToggleGroupItem>
              <ToggleGroupItem value="annually" aria-label="Annual billing">Annually (Save 15%)</ToggleGroupItem>
            </ToggleGroup>
          </div>
          */}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col rounded-xl transition-all duration-300 ease-in-out group
                          ${tier.isFeatured 
                            ? 'bg-slate-800 dark:bg-slate-50 text-white dark:text-slate-900 shadow-2xl lg:scale-105 lg:z-10 border-2 border-sky-500 dark:border-sky-400' 
                            : 'bg-white dark:bg-slate-800/60 shadow-lg hover:shadow-xl border dark:border-slate-700'
                          }`}
            >
              {tier.isFeatured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-1.5 text-xs font-semibold text-white shadow-md">
                  Most Popular
                </div>
              )}
              <CardHeader className="p-6 pb-4">
                <CardTitle className={`text-2xl font-bold ${tier.isFeatured ? 'text-white dark:text-slate-900' : 'text-slate-900 dark:text-white'}`}>
                  {tier.name}
                </CardTitle>
                <CardDescription className={`text-sm min-h-[40px] ${tier.isFeatured ? 'text-slate-300 dark:text-slate-600' : 'text-slate-600 dark:text-slate-400'}`}>
                  {tier.description}
                </CardDescription>
                <div className="mt-6">
                  <span className={`text-5xl font-extrabold ${tier.isFeatured ? 'text-white dark:text-slate-900' : 'text-slate-900 dark:text-white'}`}>
                    {tier.priceMonthly}
                  </span>
                  <span className={`text-base font-medium ${tier.isFeatured ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
                    {tier.priceMonthly !== "Custom" ? "/month" : ""}
                  </span>
                  {/* Optional Yearly Price Display */}
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6 pt-0">
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className={`mr-3 mt-1 h-5 w-5 flex-shrink-0 ${tier.isFeatured ? 'text-sky-400 dark:text-sky-600' : 'text-sky-500 dark:text-sky-400'}`} />
                      <span className={`text-sm ${tier.isFeatured ? 'text-slate-200 dark:text-slate-700' : 'text-slate-700 dark:text-slate-300'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-6 pt-4 mt-auto">
                <Button
                  asChild
                  className={`w-full py-3 text-base font-semibold transition-all duration-300 transform group-hover:scale-105
                              ${tier.isFeatured 
                                ? 'bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-500 hover:to-cyan-500 text-white shadow-lg hover:shadow-sky-500/30' 
                                : 'bg-slate-700 hover:bg-slate-600 text-white dark:bg-slate-300 dark:text-slate-900 dark:hover:bg-slate-200 shadow-md hover:shadow-lg'
                              }`}
                  size="lg"
                >
                  <Link href={tier.href}>{tier.ctaText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
