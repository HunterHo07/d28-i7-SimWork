'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { demoRoles } from '@/lib/data';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DemoPreview() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const previewRef = useRef(null);
  const rolesRef = useRef([]);
  const [activeRole, setActiveRole] = useState(demoRoles[0]);

  // Set up refs array
  useEffect(() => {
    rolesRef.current = rolesRef.current.slice(0, demoRoles.length);
  }, []);

  // Initialize animations on mount
  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate title
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
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

    // Animate preview
    gsap.fromTo(
      previewRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate roles
    gsap.fromTo(
      rolesRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.4,
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

  // Render role icon
  const renderRoleIcon = (iconName, color) => {
    const colorClasses = {
      blue: 'text-blue-500',
      purple: 'text-purple-500',
      green: 'text-green-500',
      yellow: 'text-yellow-500',
      red: 'text-red-500',
    };

    return (
      <div
        className={`w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center ${colorClasses[color]}`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {iconName === 'CodeBracketIcon' && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          )}
          {iconName === 'PaintBrushIcon' && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          )}
          {iconName === 'ClipboardDocumentListIcon' && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          )}
          {iconName === 'ChartPieIcon' && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            />
          )}
          {iconName === 'CpuChipIcon' && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          )}
        </svg>
      </div>
    );
  };

  return (
    <Section id="demo-preview" ref={sectionRef}>
      <div ref={titleRef} className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">Experience the Demo</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Try our interactive simulation with multiple roles and realistic
          workplace scenarios. Choose a role and complete tasks to see how
          SimWork can transform your hiring and training process.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div
            ref={previewRef}
            className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden border border-gray-700 shadow-xl"
          >
            {/* Preview image based on active role */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                activeRole.color === 'blue'
                  ? 'from-blue-900/30 to-blue-600/10'
                  : activeRole.color === 'purple'
                  ? 'from-purple-900/30 to-purple-600/10'
                  : activeRole.color === 'green'
                  ? 'from-green-900/30 to-green-600/10'
                  : activeRole.color === 'yellow'
                  ? 'from-yellow-900/30 to-yellow-600/10'
                  : 'from-red-900/30 to-red-600/10'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="mx-auto mb-6">
                    {renderRoleIcon(activeRole.icon, activeRole.color)}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{activeRole.title} Simulation</h3>
                  <p className="text-gray-300 mb-6">{activeRole.description}</p>
                  <Link href="/demo">
                    <Button variant="primary">Try This Role</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Task examples */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h4 className="text-lg font-semibold mb-2">Example Tasks:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {activeRole.tasks.slice(0, 4).map((task, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center mr-2 text-xs">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-300">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Choose a Role</h3>
          <div className="space-y-4">
            {demoRoles.map((role, index) => (
              <Card
                key={role.id}
                ref={(el) => (rolesRef.current[index] = el)}
                className={`cursor-pointer transition-all ${
                  activeRole.id === role.id
                    ? `border-${role.color}-500/50 bg-${role.color}-900/20`
                    : ''
                }`}
                onClick={() => setActiveRole(role)}
              >
                <div className="flex items-center">
                  {renderRoleIcon(role.icon, role.color)}
                  <div className="ml-4">
                    <h4 className="font-bold">{role.title}</h4>
                    <p className="text-sm text-gray-400">
                      {role.tasks.length} tasks available
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/demo">
              <Button variant="primary" className="w-full">
                Start Full Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
