'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useSimulation } from '@/context/SimulationContext';

export default function DemoHeader() {
  const { progress, selectedRole } = useSimulation();
  const headerRef = useRef(null);

  // Initialize animations on mount
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined' || !headerRef.current) return;

    // Animate header
    gsap.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <div
      ref={headerRef}
      className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 py-4 px-6 sticky top-0 z-40 mt-16"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">
            SimWork Demo
            {selectedRole && (
              <span className="ml-2 text-blue-500">
                - {selectedRole.title} Mode
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-400">
            Explore the interactive simulation and complete tasks
          </p>
        </div>

        <div className="flex items-center mt-4 md:mt-0">
          <div className="mr-6">
            <div className="text-sm text-gray-400">Level</div>
            <div className="text-xl font-bold">{progress.currentLevel}</div>
          </div>
          <div className="mr-6">
            <div className="text-sm text-gray-400">Score</div>
            <div className="text-xl font-bold">{progress.score}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Tasks</div>
            <div className="text-xl font-bold">
              {progress.completedTasks.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
