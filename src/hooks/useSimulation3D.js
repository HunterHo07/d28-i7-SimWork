'use client';

import { useState, useEffect, useRef } from 'react';
import { useSimulation as useSimulationContext } from '@/context/SimulationContext';
import * as THREE from 'three';
import { initScene, createOfficeFloor, createOfficeLayout } from '@/lib/three-scene';

/**
 * Custom hook for managing the 3D simulation
 * @param {Object} options - Configuration options
 * @returns {Object} - Simulation methods and state
 */
export default function useSimulation3D(options = {}) {
  // Get simulation context
  const simulation = useSimulationContext();

  // Refs for Three.js objects
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const playerRef = useRef(null);

  // State for player position
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0, z: 0 });

  // State for interactive objects
  const [interactiveObjects, setInteractiveObjects] = useState([]);

  // State for current interaction
  const [currentInteraction, setCurrentInteraction] = useState(null);

  // Initialize the 3D scene
  const initializeScene = () => {
    if (!containerRef.current || sceneRef.current) return;

    // Initialize Three.js scene
    const { scene, camera, renderer, controls, cleanup } = initScene(containerRef.current);

    // Create office floor
    createOfficeFloor(scene);

    // Create office layout
    const desks = createOfficeLayout(scene);

    // Create player character
    const playerGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.8, 32);
    const playerMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.7,
    });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(0, 0.9, 0);
    player.castShadow = true;
    scene.add(player);

    // Store refs
    sceneRef.current = { scene, camera, renderer, controls, cleanup };
    playerRef.current = player;

    // Set interactive objects
    setInteractiveObjects(
      desks.map((desk, index) => ({
        id: `desk_${index}`,
        object: desk,
        position: desk.position,
        type: getZoneType(desk.position),
        interactionDistance: 2,
      }))
    );

    // Update player position
    setPlayerPosition({
      x: player.position.x,
      y: player.position.y,
      z: player.position.z,
    });

    // Return cleanup function
    return cleanup;
  };

  // Determine zone type based on position
  const getZoneType = (position) => {
    const { x, z } = position;

    if (x < 0 && z < 0) return 'developer';
    if (x > 0 && z < 0) return 'designer';
    if (x < 0 && z > 0) return 'pm';
    if (x > 0 && z > 0) return 'data';

    return 'common';
  };

  // Move player to a position
  const movePlayerTo = (position) => {
    if (!playerRef.current || !sceneRef.current) return;

    // Create animation
    const startPosition = {
      x: playerRef.current.position.x,
      z: playerRef.current.position.z,
    };

    const endPosition = {
      x: position.x,
      z: position.z,
    };

    // Calculate direction for rotation
    const direction = new THREE.Vector2(
      endPosition.x - startPosition.x,
      endPosition.z - startPosition.z
    ).normalize();

    // Set rotation to face movement direction
    playerRef.current.rotation.y = Math.atan2(direction.x, direction.y);

    // Animate movement
    const duration = 1000; // 1 second
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Interpolate position
      playerRef.current.position.x = startPosition.x + (endPosition.x - startPosition.x) * progress;
      playerRef.current.position.z = startPosition.z + (endPosition.z - startPosition.z) * progress;

      // Update player position state
      setPlayerPosition({
        x: playerRef.current.position.x,
        y: playerRef.current.position.y,
        z: playerRef.current.position.z,
      });

      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Start animation
    animate();
  };

  // Check for nearby interactive objects
  const checkInteractions = () => {
    if (!playerRef.current) return [];

    const playerPos = new THREE.Vector3(
      playerRef.current.position.x,
      0,
      playerRef.current.position.z
    );

    // Find nearby objects
    return interactiveObjects.filter((obj) => {
      const objPos = new THREE.Vector3(obj.position.x, 0, obj.position.z);
      const distance = playerPos.distanceTo(objPos);
      return distance <= obj.interactionDistance;
    });
  };

  // Interact with an object
  const interactWith = (objectId) => {
    const object = interactiveObjects.find((obj) => obj.id === objectId);
    if (!object) return;

    // Move player to object
    movePlayerTo(object.position);

    // Set current interaction
    setCurrentInteraction(object);

    // Select role based on zone
    if (object.type && simulation.selectRole) {
      simulation.selectRole(object.type);
    }

    return object;
  };

  // Initialize scene on mount
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const cleanup = initializeScene();

    return () => {
      if (cleanup) cleanup();
      if (sceneRef.current && sceneRef.current.cleanup) {
        sceneRef.current.cleanup();
      }
    };
  }, []);

  // Check for interactions when player moves
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const nearbyObjects = checkInteractions();
    // You could update UI here to show interaction prompts
  }, [playerPosition]);

  return {
    containerRef,
    playerPosition,
    interactiveObjects,
    currentInteraction,
    movePlayerTo,
    interactWith,
    checkInteractions,
  };
}
