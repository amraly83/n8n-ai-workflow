'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card"; // Removed CardHeader, CardTitle, CardDescription
// Removed unused MailIcon, PhoneIcon, MapPinIcon from lucide-react

export default function ContactUsSection() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    // For now, just log to console
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Contact form submitted:", data);
    // Potentially use sonner for a toast notification
    alert("Message sent! (Placeholder - check console)");
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Have questions or want to discuss a custom solution? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto"> {/* Centered and constrained width for the form card */}
          <Card className="bg-slate-50 dark:bg-slate-800/50 shadow-xl border border-slate-200 dark:border-slate-700">
            {/* Removed CardHeader for a cleaner look, title is already in the section header */}
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <Input 
                      type="text" 
                      name="name" 
                      id="name" 
                      required 
                      className="dark:bg-slate-700 dark:text-white dark:border-slate-600 focus:ring-sky-500 focus:border-sky-500" 
                      suppressHydrationWarning={true} 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <Input 
                      type="email" 
                      name="email" 
                      id="email" 
                      required 
                      className="dark:bg-slate-700 dark:text-white dark:border-slate-600 focus:ring-sky-500 focus:border-sky-500" 
                      suppressHydrationWarning={true} 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <Input 
                    type="text" 
                    name="subject" 
                    id="subject" 
                    required 
                    className="dark:bg-slate-700 dark:text-white dark:border-slate-600 focus:ring-sky-500 focus:border-sky-500" 
                    suppressHydrationWarning={true} 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Message
                  </label>
                  <Textarea 
                    name="message" 
                    id="message" 
                    rows={5} 
                    required 
                    className="dark:bg-slate-700 dark:text-white dark:border-slate-600 focus:ring-sky-500 focus:border-sky-500" 
                  />
                </div>
                <div>
                  <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 text-base font-semibold" suppressHydrationWarning={true}>
                    Send Your Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
