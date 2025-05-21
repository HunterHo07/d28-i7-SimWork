'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/ui/Section';
import { stats } from '@/lib/data';
import { animateCounter } from '@/lib/animations';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Stats() {
  const sectionRef = useRef(null);
  const statsRefs = useRef([]);

  // Set up refs array
  useEffect(() => {
    statsRefs.current = statsRefs.current.slice(0, stats.length);
  }, []);

  // Initialize animations on mount
  useEffect(() => {
    if (!sectionRef.current) return;

    // Create scroll trigger for stats section
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        // Animate each stat counter
        statsRefs.current.forEach((statRef, index) => {
          if (statRef) {
            const stat = stats[index];
            animateCounter(
              statRef,
              stat.value,
              2,
              '',
              stat.suffix || ''
            );
          }
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <Section id="stats" className="py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="text-center p-6 bg-gray-900/50 rounded-lg border border-gray-800"
            >
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">
                  <span ref={(el) => (statsRefs.current[index] = el)}>0</span>
                  {stat.suffix}
                </div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
