import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import OffersSection from "@/components/home/OffersSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import BuilderSection from "@/sections/BuilderSection/builders";
import TestimonialsSection from "@/sections/TestimonialsSection/testimonials";
import CTASection from "@/sections/CTASection/cta";
import { getFeaturedProjects } from "@/lib/data/projects";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects(3);

  return (
    <>
      <Hero />
      <OffersSection />
      <FeaturedProjects projects={featuredProjects} />
      <WhyChooseUs />
      <BuilderSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
