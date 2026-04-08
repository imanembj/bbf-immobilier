'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { CSSProperties } from 'react';

interface AnimatedTextProps {
  text: string | string[];
  className?: string;
  style?: CSSProperties;
  delay?: number;
  staggerDelay?: number; // Délai entre chaque mot pour les animations séquentielles
  type?: 'simple' | 'sequential' | 'word-by-word';
}

export function AnimatedText({
  text,
  className = '',
  style,
  delay = 0,
  staggerDelay = 100,
  type = 'word-by-word',
}: AnimatedTextProps) {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Animation mot par mot (comme dans la page À propos)
  if (type === 'word-by-word') {
    const words = Array.isArray(text) ? text : text.split(' ');
    
    return (
      <span ref={elementRef as any} className={className} style={style}>
        {words.map((word, index) => (
          <span key={index}>
            <span
              className={`inline-block transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2'
              }`}
              style={{
                transitionDelay: isVisible
                  ? `${delay + index * staggerDelay}ms`
                  : '0ms',
              }}
            >
              {word}
            </span>
            {index < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    );
  }

  // Si c'est un tableau de mots (animation séquentielle)
  if (Array.isArray(text) && type === 'sequential') {
    return (
      <span
        ref={elementRef as any}
        className={`inline-flex flex-wrap gap-2 ${className}`}
        style={style}
      >
        {text.map((word, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: isVisible
                ? `${delay + index * staggerDelay}ms`
                : '0ms',
            }}
          >
            {word}
          </span>
        ))}
      </span>
    );
  }

  // Animation simple (un seul mot ou texte)
  const displayText = Array.isArray(text) ? text.join(' ') : text;

  return (
    <span
      ref={elementRef as any}
      className={`inline-block transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
      } ${className}`}
      style={{
        ...style,
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {displayText}
    </span>
  );
}
