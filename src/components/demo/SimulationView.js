'use client';

import { useRef, useEffect, useState } from 'react';
import { useSimulation } from '@/context/SimulationContext';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// Dynamically import the 3D simulation hook with no SSR
const DynamicSimulation3D = dynamic(
  () => import('@/hooks/useSimulation3D'),
  { ssr: false }
);

export default function SimulationView() {
  const { selectedRole, getAvailableTasks, startTask, currentTask, completeTask } = useSimulation();

  // State for client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use a ref for the container
  const containerRef = useRef(null);

  // Default values for server-side rendering
  const defaultSimulation = {
    interactiveObjects: [],
    interactWith: () => {},
    movePlayerTo: () => {},
  };

  // Only use the 3D simulation hook on the client
  const simulation3D = isClient ? DynamicSimulation3D() : defaultSimulation;
  const { interactiveObjects, interactWith, movePlayerTo } = simulation3D;
  const [activeZone, setActiveZone] = useState(null);
  const [showTaskPanel, setShowTaskPanel] = useState(false);
  const [taskResult, setTaskResult] = useState(null);

  // Handle zone click
  const handleZoneClick = (zoneType) => {
    // Check if interactiveObjects is defined
    if (!interactiveObjects || !Array.isArray(interactiveObjects)) {
      // If not defined, just set the active zone and show task panel
      setActiveZone(zoneType);
      setShowTaskPanel(true);
      return;
    }

    // Find an object in the zone
    const object = interactiveObjects.find((obj) => obj.type === zoneType);
    if (object) {
      interactWith(object.id);
      setActiveZone(zoneType);
      setShowTaskPanel(true);
    } else {
      // If no object found, just set the active zone and show task panel
      setActiveZone(zoneType);
      setShowTaskPanel(true);
    }
  };

  // Handle task completion
  const handleCompleteTask = (taskIndex) => {
    // Simulate task completion with random result
    const accuracy = Math.floor(Math.random() * 30) + 70; // 70-100%
    const result = {
      accuracy,
      details: {
        correctAnswers: Math.floor(accuracy / 10),
        totalQuestions: 10,
        timeSpent: Math.floor(Math.random() * 300) + 60, // 60-360 seconds
      },
    };

    // Complete the task
    const score = completeTask(result);

    // Show result
    setTaskResult({
      score,
      accuracy: result.accuracy,
      message: accuracy > 90
        ? 'Excellent work! You completed the task with high accuracy.'
        : accuracy > 80
        ? 'Good job! You completed the task successfully.'
        : 'Task completed. There\'s room for improvement.',
    });

    // Hide task panel after showing result
    setTimeout(() => {
      setTaskResult(null);
      setShowTaskPanel(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-12rem)]">
      {/* 3D Simulation View */}
      <div className="flex-1 relative">
        <div
          ref={containerRef}
          className="w-full h-full bg-gray-900 rounded-lg overflow-hidden"
        />

        {/* Zone selection overlay */}
        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-md p-4 rounded-lg border border-gray-800">
          <h3 className="text-lg font-bold mb-2">Office Zones</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant={activeZone === 'developer' ? 'primary' : 'outline'}
              onClick={() => isClient && handleZoneClick('developer')}
            >
              Developer Bay
            </Button>
            <Button
              size="sm"
              variant={activeZone === 'designer' ? 'secondary' : 'outline'}
              onClick={() => isClient && handleZoneClick('designer')}
            >
              Design Lab
            </Button>
            <Button
              size="sm"
              variant={activeZone === 'pm' ? 'success' : 'outline'}
              onClick={() => isClient && handleZoneClick('pm')}
            >
              PM Area
            </Button>
            <Button
              size="sm"
              variant={activeZone === 'data' ? 'warning' : 'outline'}
              onClick={() => isClient && handleZoneClick('data')}
            >
              Data Station
            </Button>
          </div>
        </div>

        {/* Controls overlay */}
        <div className="absolute bottom-4 right-4 bg-gray-900/80 backdrop-blur-md p-4 rounded-lg border border-gray-800">
          <div className="grid grid-cols-3 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => isClient && movePlayerTo({ x: -5, z: -5 })}
            >
              ↖
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => isClient && movePlayerTo({ x: 0, z: -5 })}
            >
              ↑
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => isClient && movePlayerTo({ x: 5, z: -5 })}
            >
              ↗
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => isClient && movePlayerTo({ x: -5, z: 0 })}
            >
              ←
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => isClient && movePlayerTo({ x: 0, z: 0 })}
            >
              ○
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => isClient && movePlayerTo({ x: 5, z: 0 })}
            >
              →
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => isClient && movePlayerTo({ x: -5, z: 5 })}
            >
              ↙
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => isClient && movePlayerTo({ x: 0, z: 5 })}
            >
              ↓
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => isClient && movePlayerTo({ x: 5, z: 5 })}
            >
              ↘
            </Button>
          </div>
        </div>
      </div>

      {/* Task Panel */}
      {showTaskPanel && (
        <div className="w-full lg:w-96 bg-gray-900 border-l border-gray-800 p-6 overflow-y-auto">
          {taskResult ? (
            <Card className="mb-4">
              <h3 className="text-xl font-bold mb-2">Task Result</h3>
              <div className="mb-4">
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {taskResult.score}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${taskResult.accuracy}%` }}
                  ></div>
                </div>
                <p className="text-gray-300">{taskResult.message}</p>
              </div>
            </Card>
          ) : (
            <>
              <h3 className="text-xl font-bold mb-4">
                {selectedRole?.title} Tasks
              </h3>

              {getAvailableTasks().map((task) => (
                <Card key={task.id} className="mb-4">
                  <h4 className="font-bold mb-2">{task.name}</h4>
                  <p className="text-sm text-gray-400 mb-4">
                    Complete this task to earn points and level up.
                  </p>
                  {task.isCompleted ? (
                    <Button variant="success" disabled>
                      Completed
                    </Button>
                  ) : currentTask?.id === task.id ? (
                    <Button
                      variant="primary"
                      onClick={() => handleCompleteTask(task.index)}
                    >
                      Submit Task
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => startTask(task.index)}
                    >
                      Start Task
                    </Button>
                  )}
                </Card>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
