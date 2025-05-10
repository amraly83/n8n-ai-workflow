'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
  value: string;
}

const faqData: FaqItem[] = [
  {
    question: "What is AI n8n Flow?",
    answer: "AI n8n Flow is a service that allows you to generate n8n workflow JSON simply by describing your automation needs in plain text. Our AI agent interprets your request and builds the workflow for you.",
    value: "item-1",
  },
  {
    question: "Do I need an n8n instance to use this service?",
    answer: "Yes, AI n8n Flow generates the JSON for n8n workflows. You will need your own n8n instance (cloud or self-hosted) to import and run these workflows.",
    value: "item-2",
  },
  {
    question: "What kind of workflows can I create?",
    answer: "You can describe a wide variety of workflows, from simple two-step automations to more complex processes involving multiple apps, conditional logic, and data transformations. The more clearly you describe your needs, the better the AI can assist.",
    value: "item-3",
  },
  {
    question: "Is there a limit to the complexity of workflows the AI can generate?",
    answer: "While our AI is powerful, extremely complex or niche workflows might require some manual tweaking after generation. We are continuously improving its capabilities.",
    value: "item-4",
  },
  {
    question: "How secure is my data and workflow information?",
    answer: "We take data security seriously. Your workflow descriptions are processed by our AI agent to generate JSON, and we adhere to best practices for data handling. For sensitive data within your workflows, always manage credentials and sensitive information directly within your secure n8n instance.",
    value: "item-5",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Have questions? We've got answers. If you don't find what you're looking for, feel free to contact us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq) => (
              <AccordionItem key={faq.value} value={faq.value}>
                <AccordionTrigger className="text-lg hover:no-underline text-left" suppressHydrationWarning={true}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
