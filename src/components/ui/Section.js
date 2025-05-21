'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function Section({
  children,
  className = '',
  id,
  fullHeight = false,
  centered = false,
  delay = 0,
  ...props
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`w-full px-4 py-16 md:py-24 ${
        fullHeight ? 'min-h-screen' : ''
      } ${
        centered ? 'flex flex-col items-center justify-center' : ''
      } ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </motion.section>
  );
}
