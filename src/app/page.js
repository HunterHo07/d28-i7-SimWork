import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import ProblemSolution from '@/components/home/ProblemSolution';
import DemoPreview from '@/components/home/DemoPreview';
import Testimonials from '@/components/home/Testimonials';
import Pricing from '@/components/home/Pricing';
import Stats from '@/components/home/Stats';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ProblemSolution />
      <Stats />
      <DemoPreview />
      <Testimonials />
      <Pricing />
      <CTA />
    </>
  );
}
