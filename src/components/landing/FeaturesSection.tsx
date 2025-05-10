'use client';

// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; // Removed unused import
import { ZapIcon, BrainCircuitIcon, FastForwardIcon, PaletteIcon, UsersIcon, ShieldCheckIcon } from "lucide-react"; // Changed ClockFastForwardIcon to FastForwardIcon

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: BrainCircuitIcon,
    title: "AI-Powered Generation",
    description: "Simply describe your desired workflow in plain text. Our intelligent AI handles the complex n8n JSON creation for you.",
  },
  {
    icon: FastForwardIcon, // Changed ClockFastForwardIcon to FastForwardIcon
    title: "Rapid Workflow Creation",
    description: "Go from idea to a functional n8n workflow in minutes, not hours. Drastically reduce manual configuration time.",
  },
  {
    icon: ZapIcon,
    title: "Effortless Import",
    description: "Generated JSON is ready to be directly imported into your n8n instance, ensuring seamless integration.",
  },
  {
    icon: PaletteIcon,
    title: "Premium & Intuitive UI",
    description: "Enjoy a modern, minimalist, and user-friendly interface designed for a delightful and efficient experience.",
  },
  {
    icon: UsersIcon,
    title: "Accessible to All",
    description: "No deep n8n expertise required. Empower both technical and non-technical users to build powerful automations.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure & Reliable",
    description: "Built with security best practices in mind, ensuring your data and workflows are handled safely.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
            Unlock the Full Potential of n8n with AI
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Discover how AI n8n Flow transforms your automation experience, making it faster, smarter, and more accessible than ever before.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="group relative p-6 rounded-xl bg-white dark:bg-slate-800/70 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-transparent hover:border-sky-500/50">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-gradient-to-br from-sky-400 to-cyan-400 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8" aria-hidden="true" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-center text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-sm text-center text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
