'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProblemSolution() {
  const sectionRef = useRef(null);
  const problemsRef = useRef(null);
  const solutionsRef = useRef(null);

  // Initialize animations on mount
  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate problems and solutions
    gsap.fromTo(
      problemsRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
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

    gsap.fromTo(
      solutionsRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
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

  // Problem data
  const problems = [
    {
      id: 1,
      title: 'Wrong Hires, Wasted Money',
      description:
        "Companies keep hiring the wrong people—time, salary, and training costs wasted. Real candidates also lose out due to bad screening and vague interviews.",
    },
    {
      id: 2,
      title: 'Fake Skills, No Real Test',
      description:
        "Many hires pass interviews but fail on the job. There's no hands-on task or live environment to prove they can actually do the daily work—even with AI tools.",
    },
    {
      id: 3,
      title: 'Slow, Inefficient Hiring Process',
      description:
        "Too many rounds, test sheets, and guesswork. No live data, no real output. Hiring managers waste time when they could just watch candidates solve actual tasks.",
    },
    {
      id: 4,
      title: 'No KPI or Proof of Skill',
      description:
        "Current systems don't track real performance. Without real-time KPIs, logs, and session recordings, it's all talk—no proof.",
    },
  ];

  // Solution data
  const solutions = [
    {
      id: 1,
      title: 'Immersive, Multi-Role Game World',
      description:
        "SimWork places users in a 3D office with stations for Developer, Designer, PM, Data Entry, and AI Engineer roles. Trainees navigate to desks equipped with real tools to complete authentic tasks.",
    },
    {
      id: 2,
      title: 'AI-Powered Adaptivity & Agents',
      description:
        "Integrated GPT-based agents guide scenarios, perform OCR on designer-submitted assets, and dynamically adjust task complexity. This prevents mis-hires by exposing candidates to true job demands.",
    },
    {
      id: 3,
      title: 'Real-Time Analytics & Feedback',
      description:
        "A dashboard tracks KPIs (accuracy, speed, decision quality), generates personalized feedback loops, and offers hiring managers live or recorded sessions.",
    },
    {
      id: 4,
      title: 'Phased Rollout Approach',
      description:
        "Starting with a web-based 2.5D simulation game, SimWork will evolve to include desktop/mobile apps and eventually VR/AR integration for a fully immersive experience.",
    },
  ];

  return (
    <Section id="problem-solution" ref={sectionRef} className="bg-gray-900/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">Problem & Solution</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          SimWork addresses critical gaps in corporate and educational training
          with an innovative approach to skill development and assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div ref={problemsRef}>
          <h3 className="text-2xl font-bold mb-6 text-red-500">The Problems</h3>
          <div className="space-y-6">
            {problems.map((problem) => (
              <Card key={problem.id} variant="danger" className="border-red-800/30">
                <h4 className="text-xl font-bold mb-2">{problem.title}</h4>
                <p className="text-gray-300">{problem.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div ref={solutionsRef}>
          <h3 className="text-2xl font-bold mb-6 text-green-500">Our Solutions</h3>
          <div className="space-y-6">
            {solutions.map((solution) => (
              <Card key={solution.id} variant="success" className="border-green-800/30">
                <h4 className="text-xl font-bold mb-2">{solution.title}</h4>
                <p className="text-gray-300">{solution.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
