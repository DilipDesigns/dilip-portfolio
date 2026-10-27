"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type RevealVariant = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "scale-in" 
  | "blur-in";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  duration?: number;
  delay?: number;
  once?: boolean;
}

export default function SectionReveal({ 
  children, 
  className = "", 
  variant = "fade-up",
  duration = 0.8,
  delay = 0,
  once = true
}: SectionRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Accessibility: Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(sectionRef.current, { opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" });
      return;
    }

    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = { 
      opacity: 1, 
      duration, 
      delay, 
      ease: "cubic-bezier(0.25, 1, 0.5, 1)" // Match --ease-premium
    };

    switch (variant) {
      case "fade-up":
        fromVars.y = 40;
        toVars.y = 0;
        break;
      case "fade-down":
        fromVars.y = -40;
        toVars.y = 0;
        break;
      case "fade-left":
        fromVars.x = 40;
        toVars.x = 0;
        break;
      case "fade-right":
        fromVars.x = -40;
        toVars.x = 0;
        break;
      case "scale-in":
        fromVars.scale = 0.95;
        toVars.scale = 1;
        break;
      case "blur-in":
        fromVars.filter = "blur(12px)";
        toVars.filter = "blur(0px)";
        fromVars.y = 20;
        toVars.y = 0;
        break;
    }

    const ctx = gsap.context(() => {
      toVars.scrollTrigger = {
        trigger: sectionRef.current,
        start: "top bottom-=10%",
        toggleActions: once ? "play none none none" : "play none none reverse",
      };
      
      gsap.fromTo(sectionRef.current, fromVars, toVars);
    }, sectionRef);

    return () => ctx.revert(); // Cleanup robustly
  }, [variant, duration, delay, once]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
