'use client';

import { useState, useEffect } from 'react';
import { useSimulation } from '@/context/SimulationContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Image from 'next/image';

export default function SimulationView() {
  const { selectedRole, getAvailableTasks, startTask, currentTask, completeTask } = useSimulation();

  // State for client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [activeZone, setActiveZone] = useState(null);
  const [showTaskPanel, setShowTaskPanel] = useState(false);
  const [taskResult, setTaskResult] = useState(null);

  // Define office zones
  const officeZones = [
    { id: 'developer', name: 'Developer Bay', color: 'blue', variant: 'primary' },
    { id: 'designer', name: 'Design Lab', color: 'purple', variant: 'secondary' },
    { id: 'pm', name: 'PM Area', color: 'green', variant: 'success' },
    { id: 'data', name: 'Data Station', color: 'yellow', variant: 'warning' },
    { id: 'ai', name: 'AI Engineering', color: 'red', variant: 'danger' }
  ];

  // Handle zone click
  const handleZoneClick = (zoneType) => {
    setActiveZone(zoneType);
    setShowTaskPanel(true);
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
      {/* 2D Office View */}
      <div className="flex-1 relative">
        <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden relative"
          style={{
            minHeight: '500px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)'
          }}
        >
          {/* Office layout */}
          <div className="absolute inset-0 p-8 grid grid-cols-3 gap-6">
            {officeZones.map((zone) => (
              <div
                key={zone.id}
                className={`
                  relative flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer
                  transition-all duration-300 transform hover:scale-105
                  ${activeZone === zone.id ? 'ring-2 ring-offset-2 ring-' + zone.color + '-500 bg-' + zone.color + '-900/20' : 'bg-gray-800/50 hover:bg-gray-800/80'}
                `}
                onClick={() => handleZoneClick(zone.id)}
              >
                <div className={`w-16 h-16 rounded-full bg-${zone.color}-500/20 flex items-center justify-center mb-4`}>
                  <span className={`text-${zone.color}-500 text-2xl font-bold`}>
                    {zone.id.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{zone.name}</h3>
                <p className="text-sm text-gray-400 text-center">
                  {zone.id === 'developer' && 'Code, debug, and deploy applications'}
                  {zone.id === 'designer' && 'Create UI/UX designs and assets'}
                  {zone.id === 'pm' && 'Manage projects and coordinate teams'}
                  {zone.id === 'data' && 'Analyze data and create reports'}
                  {zone.id === 'ai' && 'Develop AI models and algorithms'}
                </p>
                <Button
                  className="mt-4"
                  size="sm"
                  variant={zone.variant}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoneClick(zone.id);
                  }}
                >
                  Enter Zone
                </Button>
              </div>
            ))}
          </div>

          {/* Character */}
          {activeZone && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mb-2 flex items-center justify-center text-white font-bold">
                {selectedRole?.title?.charAt(0) || 'Y'}
              </div>
              <div className="bg-gray-900/80 backdrop-blur-md px-3 py-1 rounded-full text-sm">
                {selectedRole?.title || 'You'} in {officeZones.find(z => z.id === activeZone)?.name}
              </div>
            </div>
          )}
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
