'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/ui/Button';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTA() {
  const sectionRef = useRef(null);

  // Initialize animations on mount
  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate CTA section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black" />

      {/* Animated particles */}
      {typeof window !== 'undefined' && (
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => {
            // Use a deterministic seed based on index instead of Math.random()
            const width = 5 + ((i * 7) % 10);
            const height = 5 + ((i * 11) % 10);
            const top = ((i * 13) % 100);
            const left = ((i * 17) % 100);
            const animationDuration = 10 + ((i * 19) % 10);

            return (
              <div
                key={i}
                className="absolute rounded-full bg-blue-500/20"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  animation: `float ${animationDuration}s infinite ease-in-out`,
                }}
              />
            );
          })}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Hiring and Training Process?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the companies that have reduced mis-hires by 72% and cut
            onboarding time in half with SimWork.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button size="lg" variant="primary">
                Try Demo
              </Button>
            </Link>
            <Link href="/pitch-deck">
              <Button size="lg" variant="outline">
                View Pitch Deck
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
