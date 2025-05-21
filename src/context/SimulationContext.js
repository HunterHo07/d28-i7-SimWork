'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { demoRoles } from '@/lib/data';

// Create context
const SimulationContext = createContext();

// Custom hook to use the simulation context
export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};

// Simulation provider component
export const SimulationProvider = ({ children }) => {
  // State for selected role
  const [selectedRole, setSelectedRole] = useState(null);
  
  // State for current task
  const [currentTask, setCurrentTask] = useState(null);
  
  // State for user progress
  const [progress, setProgress] = useState({
    completedTasks: [],
    currentLevel: 1,
    score: 0,
    badges: [],
  });
  
  // State for simulation status
  const [simulationStatus, setSimulationStatus] = useState('idle'); // idle, running, paused, completed
  
  // Load saved progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProgress = localStorage.getItem('simwork_progress');
      const savedRole = localStorage.getItem('simwork_selected_role');
      
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
      
      if (savedRole) {
        setSelectedRole(demoRoles.find(role => role.id === savedRole) || null);
      }
    }
  }, []);
  
  // Save progress to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('simwork_progress', JSON.stringify(progress));
      
      if (selectedRole) {
        localStorage.setItem('simwork_selected_role', selectedRole.id);
      }
    }
  }, [progress, selectedRole]);
  
  // Select a role
  const selectRole = (roleId) => {
    const role = demoRoles.find(role => role.id === roleId);
    if (role) {
      setSelectedRole(role);
      // Reset current task when changing roles
      setCurrentTask(null);
    }
  };
  
  // Start a task
  const startTask = (taskIndex) => {
    if (selectedRole && selectedRole.tasks && selectedRole.tasks[taskIndex]) {
      setCurrentTask({
        id: `${selectedRole.id}_task_${taskIndex}`,
        name: selectedRole.tasks[taskIndex],
        roleId: selectedRole.id,
        index: taskIndex,
        startTime: new Date().getTime(),
      });
      setSimulationStatus('running');
    }
  };
  
  // Complete a task
  const completeTask = (result = {}) => {
    if (currentTask) {
      const endTime = new Date().getTime();
      const duration = endTime - currentTask.startTime;
      const taskScore = calculateTaskScore(result, duration);
      
      // Update progress
      setProgress(prev => {
        const newCompletedTasks = [...prev.completedTasks, {
          ...currentTask,
          endTime,
          duration,
          score: taskScore,
          result,
        }];
        
        const newScore = prev.score + taskScore;
        
        // Check if should level up
        const newLevel = Math.floor(newScore / 100) + 1;
        
        // Check if earned new badges
        const newBadges = [...prev.badges];
        if (newCompletedTasks.length === 5 && !prev.badges.includes('fast_learner')) {
          newBadges.push('fast_learner');
        }
        if (taskScore > 90 && !prev.badges.includes('perfectionist')) {
          newBadges.push('perfectionist');
        }
        
        return {
          completedTasks: newCompletedTasks,
          currentLevel: newLevel,
          score: newScore,
          badges: newBadges,
        };
      });
      
      setCurrentTask(null);
      setSimulationStatus('idle');
      
      return taskScore;
    }
    
    return 0;
  };
  
  // Calculate task score based on result and duration
  const calculateTaskScore = (result, duration) => {
    // Base score
    let score = result.accuracy || 70;
    
    // Time bonus (faster = better, up to a point)
    const optimalTime = 60000; // 1 minute is optimal
    const timeRatio = Math.min(optimalTime / duration, 2);
    score += timeRatio * 10;
    
    // Cap score at 100
    return Math.min(Math.round(score), 100);
  };
  
  // Reset progress
  const resetProgress = () => {
    setProgress({
      completedTasks: [],
      currentLevel: 1,
      score: 0,
      badges: [],
    });
    setCurrentTask(null);
    setSimulationStatus('idle');
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('simwork_progress');
    }
  };
  
  // Get available tasks for the selected role
  const getAvailableTasks = () => {
    if (!selectedRole) return [];
    
    return selectedRole.tasks.map((task, index) => {
      const isCompleted = progress.completedTasks.some(
        t => t.roleId === selectedRole.id && t.index === index
      );
      
      return {
        id: `${selectedRole.id}_task_${index}`,
        name: task,
        index,
        isCompleted,
      };
    });
  };
  
  // Context value
  const value = {
    selectedRole,
    currentTask,
    progress,
    simulationStatus,
    selectRole,
    startTask,
    completeTask,
    resetProgress,
    getAvailableTasks,
  };
  
  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};

export default SimulationContext;
