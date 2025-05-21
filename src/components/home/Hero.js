'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import Button from '@/components/ui/Button';

export default function Hero() {
  // Refs for animation targets
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const particlesRef = useRef(null);

  // Initialize animations on mount
  useEffect(() => {
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

    // Create particle effect
    if (particlesRef.current) {
      const canvas = particlesRef.current;
      const ctx = canvas.getContext('2d');
      const particles = [];
      const particleCount = 100;

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
            color: `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.1})`,
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

      // Cleanup
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Particle background */}
      <canvas
        ref={particlesRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      {/* Aurora background */}
      <div className="aurora-bg" />

      <div className="container mx-auto px-4 py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">SimWork</span>
            <br />
            <span>The Future of Work Simulation</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
          >
            Train, assess, and hire with confidence using our AI-driven,
            immersive work simulation platform.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/demo">
              <Button size="lg" variant="primary">
                Try Demo
              </Button>
            </Link>
            <Link href="/why-us">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <div ref={imageRef} className="flex-1 relative">
          <div className="relative w-full h-[400px] lg:h-[500px]">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-500/20 rounded-lg blur-[100px]" />
            <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-700 shadow-xl">
              <img
                src="/assets/images/office-3d.jpg"
                alt="3D office visualization"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-blue-900/40 to-purple-900/30">
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-4 p-8">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white/5 rounded-md border border-white/10"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        animation: 'pulse 3s infinite ease-in-out',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold mb-2">Immersive Office Environment</h3>
                <p className="text-gray-300">
                  Experience realistic work scenarios in our interactive 3D simulation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
