'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import ProblemSolution from '@/components/home/ProblemSolution';
import DemoPreview from '@/components/home/DemoPreview';
import Testimonials from '@/components/home/Testimonials';
import Pricing from '@/components/home/Pricing';
import Stats from '@/components/home/Stats';

// Dynamically import the CTA component with no SSR to avoid hydration errors
const CTA = dynamic(() => import('@/components/home/CTA'), { ssr: false });

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
      <Suspense fallback={<div className="py-24 bg-gray-900">Loading...</div>}>
        <CTA />
      </Suspense>
    </>
  );
}
