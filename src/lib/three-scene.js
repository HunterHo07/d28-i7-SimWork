'use client';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Initialize a basic Three.js scene
 * @param {HTMLElement} container - Container element for the scene
 * @returns {Object} - Scene, camera, renderer, and controls
 */
export const initScene = (container) => {
  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111827);

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(5, 5, 10);

  // Create renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Better shadow quality
  renderer.outputColorSpace = THREE.SRGBColorSpace; // Correct color space

  // Clear any existing canvas before appending
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  container.appendChild(renderer.domElement);

  // Add orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 3;
  controls.maxDistance = 20;
  controls.maxPolarAngle = Math.PI / 2;

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  // Handle window resize
  const handleResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };

  window.addEventListener('resize', handleResize);

  // Animation loop
  let animationFrameId;
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  // Start animation
  animate();

  // Return scene objects and cleanup function
  return {
    scene,
    camera,
    renderer,
    controls,
    cleanup: () => {
      // Cancel animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Remove event listeners
      window.removeEventListener('resize', handleResize);

      // Dispose of Three.js resources
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose of all resources
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }

      // Clear references
      scene.clear();
    },
  };
};

/**
 * Create a simple office floor
 * @param {THREE.Scene} scene - Three.js scene
 */
export const createOfficeFloor = (scene) => {
  // Create floor
  const floorGeometry = new THREE.PlaneGeometry(50, 50);
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.8,
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Create grid
  const gridHelper = new THREE.GridHelper(50, 50, 0x555555, 0x333333);
  scene.add(gridHelper);

  return floor;
};

/**
 * Create a desk with a computer
 * @param {THREE.Scene} scene - Three.js scene
 * @param {Object} position - Position {x, y, z}
 * @param {number} rotation - Y-axis rotation in radians
 */
export const createDesk = (scene, position, rotation = 0) => {
  // Create desk group
  const deskGroup = new THREE.Group();
  deskGroup.position.set(position.x, position.y, position.z);
  deskGroup.rotation.y = rotation;

  // Create desk
  const deskGeometry = new THREE.BoxGeometry(2, 0.1, 1);
  const deskMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.7,
  });
  const desk = new THREE.Mesh(deskGeometry, deskMaterial);
  desk.position.y = 0.75;
  desk.castShadow = true;
  desk.receiveShadow = true;
  deskGroup.add(desk);

  // Create desk legs
  const legGeometry = new THREE.BoxGeometry(0.1, 0.75, 0.1);
  const legMaterial = new THREE.MeshStandardMaterial({
    color: 0x6b3e26,
    roughness: 0.5,
  });

  // Add legs at each corner
  const legPositions = [
    { x: 0.9, z: 0.4 },
    { x: 0.9, z: -0.4 },
    { x: -0.9, z: 0.4 },
    { x: -0.9, z: -0.4 },
  ];

  legPositions.forEach((pos) => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos.x, 0.375, pos.z);
    leg.castShadow = true;
    deskGroup.add(leg);
  });

  // Create computer monitor
  const monitorStandGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);
  const monitorStandMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.5,
  });
  const monitorStand = new THREE.Mesh(monitorStandGeometry, monitorStandMaterial);
  monitorStand.position.set(0, 0.95, -0.2);
  deskGroup.add(monitorStand);

  const monitorGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.05);
  const monitorMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.3,
  });
  const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
  monitor.position.set(0, 1.2, -0.2);
  monitor.castShadow = true;
  deskGroup.add(monitor);

  // Create screen
  const screenGeometry = new THREE.PlaneGeometry(0.7, 0.4);
  const screenMaterial = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    emissive: 0x3b82f6,
    emissiveIntensity: 0.5,
  });
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.set(0, 1.2, -0.17);
  deskGroup.add(screen);

  // Create keyboard
  const keyboardGeometry = new THREE.BoxGeometry(0.4, 0.02, 0.15);
  const keyboardMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.5,
  });
  const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
  keyboard.position.set(0, 0.81, 0);
  deskGroup.add(keyboard);

  // Add desk to scene
  scene.add(deskGroup);

  return deskGroup;
};

/**
 * Create multiple desks in an office layout
 * @param {THREE.Scene} scene - Three.js scene
 */
export const createOfficeLayout = (scene) => {
  // Create developer desks
  const devDesks = [
    { position: { x: -5, y: 0, z: -5 }, rotation: Math.PI / 4 },
    { position: { x: -8, y: 0, z: -5 }, rotation: Math.PI / 4 },
    { position: { x: -5, y: 0, z: -8 }, rotation: Math.PI / 4 },
    { position: { x: -8, y: 0, z: -8 }, rotation: Math.PI / 4 },
  ];

  // Create designer desks
  const designerDesks = [
    { position: { x: 5, y: 0, z: -5 }, rotation: -Math.PI / 4 },
    { position: { x: 8, y: 0, z: -5 }, rotation: -Math.PI / 4 },
    { position: { x: 5, y: 0, z: -8 }, rotation: -Math.PI / 4 },
    { position: { x: 8, y: 0, z: -8 }, rotation: -Math.PI / 4 },
  ];

  // Create PM desks
  const pmDesks = [
    { position: { x: -5, y: 0, z: 5 }, rotation: -Math.PI / 4 },
    { position: { x: -8, y: 0, z: 5 }, rotation: -Math.PI / 4 },
    { position: { x: -5, y: 0, z: 8 }, rotation: -Math.PI / 4 },
    { position: { x: -8, y: 0, z: 8 }, rotation: -Math.PI / 4 },
  ];

  // Create data analyst desks
  const dataDesks = [
    { position: { x: 5, y: 0, z: 5 }, rotation: Math.PI / 4 },
    { position: { x: 8, y: 0, z: 5 }, rotation: Math.PI / 4 },
    { position: { x: 5, y: 0, z: 8 }, rotation: Math.PI / 4 },
    { position: { x: 8, y: 0, z: 8 }, rotation: Math.PI / 4 },
  ];

  // Create all desks
  const allDesks = [...devDesks, ...designerDesks, ...pmDesks, ...dataDesks];
  const deskObjects = allDesks.map((desk) => createDesk(scene, desk.position, desk.rotation));

  return deskObjects;
};

export default {
  initScene,
  createOfficeFloor,
  createDesk,
  createOfficeLayout,
};
