'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { testimonials } from '@/lib/data';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize animations on mount
  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
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

    // Set up auto-rotation
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle manual navigation
  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-500' : 'text-gray-600'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <Section id="testimonials" ref={sectionRef} className="bg-gray-900/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">What Our Users Say</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Hear from HR directors, engineering managers, and learning &
          development professionals who have transformed their hiring and
          training processes with SimWork.
        </p>
      </div>

      <div
        ref={carouselRef}
        className="relative max-w-4xl mx-auto overflow-hidden"
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-full flex-shrink-0 px-4"
            >
              <Card className="h-full">
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                        <img
                          src={`/assets/testimonials/${testimonial.name.split(' ')[0].toLowerCase()}.jpg`}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <blockquote className="flex-grow">
                    <p className="text-gray-300 italic">
                      "{testimonial.quote}"
                    </p>
                  </blockquote>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 mx-1 rounded-full transition-all ${
                activeIndex === index
                  ? 'bg-blue-500 w-6'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-white hover:bg-gray-700/80 transition-colors"
          onClick={() =>
            setActiveIndex(
              (prev) => (prev - 1 + testimonials.length) % testimonials.length
            )
          }
          aria-label="Previous testimonial"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-white hover:bg-gray-700/80 transition-colors"
          onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
          aria-label="Next testimonial"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </Section>
  );
}
