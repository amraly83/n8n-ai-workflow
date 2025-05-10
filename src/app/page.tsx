// Sections will be imported from components/landing/*
// For now, we'll just put placeholders.

import HeroSection from "@/components/landing/HeroSection"; // Uncommented
import FeaturesSection from "@/components/landing/FeaturesSection"; // Uncommented
import HowItWorksSection from "@/components/landing/HowItWorksSection"; // Uncommented
import PricingSection from "@/components/landing/PricingSection"; // Uncommented
import TestimonialsSection from "@/components/landing/TestimonialsSection"; // Uncommented
import FaqSection from "@/components/landing/FaqSection"; // Added import
import ContactUsSection from "@/components/landing/ContactUsSection"; // Uncommented
import StickyHeader from "@/components/layout/StickyHeader"; // Uncommented and path confirmed
import Footer from "@/components/layout/Footer"; // Uncommented and path confirmed

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <StickyHeader /> {/* Added StickyHeader component */}
      <main className="flex-grow"> {/* Removed pt-16 */}
        <HeroSection /> {/* Replaced placeholder with HeroSection component */}
        <FeaturesSection /> {/* Replaced placeholder with FeaturesSection component */}
        <HowItWorksSection /> {/* Replaced placeholder with HowItWorksSection component */}
        <PricingSection /> {/* Replaced placeholder with PricingSection component */}
        <TestimonialsSection /> {/* Replaced placeholder with TestimonialsSection component */}
        <FaqSection /> {/* Added FaqSection component */}
        <ContactUsSection /> {/* Replaced placeholder with ContactUsSection component */}
      </main>
      <Footer /> {/* Added Footer component */}
    </div>
  );
}
