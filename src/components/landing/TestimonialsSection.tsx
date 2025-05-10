'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming shadcn has Avatar, if not, we'll need to add it or use a placeholder
import { StarIcon } from "lucide-react"; // For ratings

interface Testimonial {
  name: string;
  role: string;
  avatarSrc?: string;
  avatarFallback: string;
  testimonial: string;
  rating: number; // e.g., 1-5
}

const testimonials: Testimonial[] = [
  {
    name: "Alice Wonderland",
    role: "Automation Specialist",
    avatarFallback: "AW",
    avatarSrc: "https://randomuser.me/api/portraits/women/44.jpg", // Placeholder image
    testimonial:
      "AI n8n Flow has revolutionized how I create workflows. What used to take hours now takes minutes. It's incredibly intuitive!",
    rating: 5,
  },
  {
    name: "Bob The Builder",
    role: "Freelance Developer",
    avatarFallback: "BB",
    avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg", // Placeholder image
    testimonial:
      "As a developer, I appreciate the clean JSON output. It's a massive time-saver and allows me to focus on more complex automation logic.",
    rating: 5,
  },
  {
    name: "Charlie Brown",
    role: "Small Business Owner",
    avatarFallback: "CB",
    avatarSrc: "https://randomuser.me/api/portraits/men/46.jpg", // Placeholder image
    testimonial:
      "I'm not very technical, but AI n8n Flow made it possible for me to automate key parts of my business. Highly recommended!",
    rating: 4,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Loved by Automators Worldwide
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Hear what our users are saying about the power and simplicity of AI n8n Flow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col bg-white dark:bg-slate-800 shadow-lg overflow-hidden">
              <CardContent className="p-6 flex-grow">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    {testimonial.avatarSrc && <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />}
                    <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {Array(5).fill(0).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
                      />
                    ))}
                </div>
                <blockquote className="text-slate-700 dark:text-slate-300 italic">
                  <p>&ldquo;{testimonial.testimonial}&rdquo;</p>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
