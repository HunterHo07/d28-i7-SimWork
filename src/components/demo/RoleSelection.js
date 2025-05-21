'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useSimulation } from '@/context/SimulationContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { demoRoles } from '@/lib/data';

export default function RoleSelection() {
  const { selectRole, selectedRole } = useSimulation();
  const containerRef = useRef(null);
  const rolesRef = useRef([]);

  // Set up refs array
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    rolesRef.current = rolesRef.current.slice(0, demoRoles.length);
  }, []);

  // Initialize animations on mount
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Animate container
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Animate roles
    gsap.fromTo(
      rolesRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3,
        ease: 'power3.out',
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
        className={`w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center ${colorClasses[color]}`}
      >
        <svg
          className="w-8 h-8"
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
    <div ref={containerRef} className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Choose Your Role
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {demoRoles.map((role, index) => (
          <Card
            key={role.id}
            ref={(el) => (rolesRef.current[index] = el)}
            className={`cursor-pointer transition-all ${
              selectedRole?.id === role.id
                ? `border-${role.color}-500/50 bg-${role.color}-900/20`
                : ''
            }`}
            onClick={() => selectRole(role.id)}
          >
            <div className="flex flex-col items-center text-center">
              {renderRoleIcon(role.icon, role.color)}
              <h3 className="text-xl font-bold mt-4 mb-2">{role.title}</h3>
              <p className="text-gray-400 mb-6">{role.description}</p>
              <Button
                variant={selectedRole?.id === role.id ? role.color : 'outline'}
                onClick={() => selectRole(role.id)}
              >
                {selectedRole?.id === role.id ? 'Selected' : 'Select Role'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
