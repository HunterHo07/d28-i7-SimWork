'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

/**
 * Initialize hero section animations
 * @param {Object} refs - React refs for animation targets
 */
export const initHeroAnimation = (refs) => {
  const { heroRef, titleRef, subtitleRef, ctaRef, imageRef } = refs;

  // Create a timeline for hero animations
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
  });

  // Animate hero elements
  tl.fromTo(
    titleRef.current,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 }
  )
    .fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      imageRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 },
      '-=0.8'
    );

  return tl;
};

/**
 * Initialize scroll-triggered animations
 * @param {Object} refs - React refs for animation targets
 */
export const initScrollAnimations = (refs) => {
  const { sectionsRef } = refs;

  // Animate sections on scroll
  sectionsRef.forEach((section) => {
    gsap.fromTo(
      section,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
};

/**
 * Animate a counter from 0 to target value
 * @param {HTMLElement} element - Target element
 * @param {number} target - Target value
 * @param {number} duration - Animation duration in seconds
 * @param {string} prefix - Prefix for the counter (e.g., '$')
 * @param {string} suffix - Suffix for the counter (e.g., '%')
 */
export const animateCounter = (element, target, duration = 2, prefix = '', suffix = '') => {
  let start = 0;
  const increment = target / (duration * 60); // 60fps
  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = `${prefix}${Math.floor(start)}${suffix}`;
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = `${prefix}${target}${suffix}`;
    }
  };
  updateCounter();
};

/**
 * Create a particle animation effect
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {number} particleCount - Number of particles
 */
export const createParticleEffect = (canvas, particleCount = 100) => {
  const ctx = canvas.getContext('2d');
  const particles = [];

  // Set canvas size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  // Create particles
  const createParticles = () => {
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
        velocity: {
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1,
        },
      });
    }
  };

  // Animate particles
  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      // Update position
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.velocity.x *= -1;
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.velocity.y *= -1;
      }
    });

    requestAnimationFrame(animateParticles);
  };

  // Initialize
  resizeCanvas();
  createParticles();
  animateParticles();

  // Handle window resize
  window.addEventListener('resize', resizeCanvas);

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', resizeCanvas);
  };
};

/**
 * Smooth scroll to a target element
 * @param {string} target - Target element selector
 * @param {number} duration - Animation duration in seconds
 */
export const smoothScrollTo = (target, duration = 1) => {
  gsap.to(window, {
    duration,
    scrollTo: {
      y: target,
      offsetY: 80,
    },
    ease: 'power3.inOut',
  });
};

export default {
  initHeroAnimation,
  initScrollAnimations,
  animateCounter,
  createParticleEffect,
  smoothScrollTo,
};
