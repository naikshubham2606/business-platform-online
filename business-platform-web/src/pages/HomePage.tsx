import { Hero } from '@/components/home/Hero';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { AboutPreview } from '@/components/home/AboutPreview';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CallToAction } from '@/components/home/CallToAction';

/**
 * Home page — composes all home sections.
 *
 * Each section handles its own loading and error state independently,
 * so a slow or failed endpoint never blocks the whole page from rendering.
 *
 * Data flows: BusinessProvider (in AppRouter) → useBusiness() hook
 *   → each section reads only the slice it needs.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <AboutPreview />
      <FeaturedProjects />
      <WhyChooseUs />
      <CallToAction />
    </>
  );
}
