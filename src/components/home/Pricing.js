'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { pricingPlans } from '@/lib/data';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Pricing() {
  const sectionRef = useRef(null);
  const plansRef = useRef([]);
  const [billingPeriod, setBillingPeriod] = useState('month');

  // Set up refs array
  useEffect(() => {
    plansRef.current = plansRef.current.slice(0, pricingPlans.length);
  }, []);

  // Initialize animations on mount
  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate pricing plans
    gsap.fromTo(
      plansRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
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
  }, []);

  // Calculate price based on billing period
  const calculatePrice = (plan) => {
    if (billingPeriod === 'year') {
      return Math.round(plan.price * 10); // 2 months free
    }
    return plan.price;
  };

  return (
    <Section id="pricing" ref={sectionRef}>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">Simple, Transparent Pricing</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Choose the plan that works best for your needs. All plans include
          access to our core features and regular updates.
        </p>

        {/* Billing period toggle */}
        <div className="flex items-center justify-center mt-8">
          <button
            className={`px-4 py-2 rounded-l-md ${
              billingPeriod === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300'
            }`}
            onClick={() => setBillingPeriod('month')}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-r-md ${
              billingPeriod === 'year'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300'
            }`}
            onClick={() => setBillingPeriod('year')}
          >
            Yearly <span className="text-xs">Save 16%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <Card
            key={plan.id}
            ref={(el) => (plansRef.current[index] = el)}
            className={`flex flex-col ${
              plan.popular
                ? 'border-blue-500/50 relative'
                : 'border-gray-700'
            }`}
            variant={plan.popular ? 'primary' : 'default'}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-bold rounded-bl-lg rounded-tr-lg">
                Most Popular
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-400 mb-6">{plan.description}</p>

            <div className="mb-6">
              <span className="text-4xl font-bold">
                ${calculatePrice(plan)}
              </span>
              <span className="text-gray-400">
                /{billingPeriod}
                {plan.perSeat && '/seat'}
              </span>
              {plan.minSeats && (
                <p className="text-sm text-gray-400 mt-1">
                  Minimum {plan.minSeats} seats
                </p>
              )}
            </div>

            <ul className="mb-8 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start mb-3">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.popular ? 'primary' : 'outline'}
              className="w-full"
            >
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-400">
          Need a custom solution? <a href="#" className="text-blue-500 hover:underline">Contact our sales team</a> for enterprise pricing.
        </p>
      </div>
    </Section>
  );
}
