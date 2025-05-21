'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SimulationProvider } from '@/context/SimulationContext';
import DemoHeader from '@/components/demo/DemoHeader';
import RoleSelection from '@/components/demo/RoleSelection';
import Button from '@/components/ui/Button';

// Dynamically import the SimulationView component with no SSR
const SimulationView = dynamic(
  () => import('@/components/demo/SimulationView'),
  { ssr: false }
);

export default function DemoPage() {
  const [step, setStep] = useState('role-selection'); // role-selection, simulation
  const [isClient, setIsClient] = useState(false);

  // Set client-side state on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <SimulationProvider>
      <main className="min-h-screen">
        <DemoHeader />

        {step === 'role-selection' ? (
          <div className="container mx-auto px-4">
            <RoleSelection />
            <div className="flex justify-center mt-8 mb-16">
              <Button
                size="lg"
                variant="primary"
                onClick={() => setStep('simulation')}
              >
                Start Simulation
              </Button>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            {isClient && <SimulationView />}
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={() => setStep('role-selection')}
              >
                Back to Role Selection
              </Button>
            </div>
          </div>
        )}
      </main>
    </SimulationProvider>
  );
}
