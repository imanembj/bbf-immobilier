'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';
  threshold?: number;
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
  threshold = 0.1,
}: AnimatedSectionProps) {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold,
    triggerOnce: true,
  });

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    const animations = {
      'fade-up': isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-8',
      'fade-down': isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 -translate-y-8',
      'fade-left': isVisible
        ? 'opacity-100 translate-x-0'
        : 'opacity-0 translate-x-8',
      'fade-right': isVisible
        ? 'opacity-100 translate-x-0'
        : 'opacity-0 -translate-x-8',
      'zoom-in': isVisible
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-90',
      'zoom-out': isVisible
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-110',
    };

    return `${baseClasses} ${animations[animation]}`;
  };

  return (
    <div
      ref={elementRef as any}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}
