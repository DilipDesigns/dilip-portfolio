"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SecurioBackground from "./Hero/SecurioBackground";
import { RippleButton, RippleButtonRipples } from "@/components/animate-ui/components/buttons/ripple";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for animation targets
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // GSAP reveal animations (Play once on mount) + 3D Scroll Depth
  useEffect(() => {
    // Accessibility: Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current || !sectionRef.current) return;

    const headlineWords = headlineRef.current?.querySelectorAll(".word-wrap .word") || [];

    const ctx = gsap.context(() => {
      // Set initial states (hidden and translated down)
      gsap.set(labelRef.current, { opacity: 0, y: 20 });
      gsap.set(headlineWords, { opacity: 0, y: 40, filter: "blur(8px)" });
      gsap.set(paragraphRef.current, { opacity: 0, y: 20 });
      gsap.set(actionsRef.current?.children || [], { opacity: 0, y: 15 });
      
      const tl = gsap.timeline({ defaults: { ease: "cubic-bezier(0.25, 1, 0.5, 1)" } });

      // Small delay to ensure paint
      tl.delay(0.2);

      // Stage 1: Introductory Tagline
      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8
      });

      // Stage 2: Main Headline (fast word/line stagger)
      tl.to(headlineWords, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.04
      }, "-=0.6");

      // Stage 3: Supporting Content
      tl.to(paragraphRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, "-=0.6");

      // Stage 4: Actions
      tl.to(actionsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1
      }, "-=0.6");

      // Interactive 3D Scroll Depth Effect:
      // Smoothly animates opacity, translate3d (Y translation), and scale3d
      // Matching the specified Webflow style progression:
      // at mid-scroll: opacity ~0.82, y: ~35.7px, scale: ~0.982
      // at further scroll: opacity ~0.59, y: ~81.8px, scale: ~0.959
      // fully scrolled: opacity ~0.2, y: ~150px, scale: ~0.92
      gsap.to(containerRef.current, {
        opacity: 0.35,
        y: 120,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineText = "From 0 → 1, Designing human-centered interfaces for the AI era.";
  
  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center bg-[#070b14]"
      style={{ perspective: 1200 }}
    >
      {/* 1. Securio Background & Dynamic Motion */}
      <SecurioBackground />

      {/* 2. Hero Content Container */}
      <div 
        ref={containerRef} 
        style={{
          transformStyle: "preserve-3d",
          willChange: "opacity, transform",
        }}
        className="relative z-10 w-full flex flex-col items-center justify-center pt-32 pb-24 px-4 sm:px-6 md:px-8 pointer-events-auto"
      >
        <div className="flex flex-col items-center justify-center text-center mx-auto w-full max-w-[880px]">
          
          {/* Eyebrow Tagline Badge */}
          <div className="flex flex-wrap items-center justify-center mb-6 sm:mb-8">
            <div 
              ref={labelRef} 
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-md border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
              <p className="font-mono text-[11px] sm:text-[12px] leading-tight text-white/95 tracking-[0.14em] uppercase font-medium">
                PRODUCT DESIGNER • SYSTEMS & AI-NATIVE UX
              </p>
            </div>
          </div>

          {/* Main Headline */}
          <div className="flex flex-col items-center justify-center w-full mb-4 sm:mb-6">
            <h1 
              ref={headlineRef} 
              className="font-jakarta font-bold text-[36px] sm:text-[48px] md:text-[62px] lg:text-[72px] leading-[1.08] tracking-[-0.025em] text-white flex flex-wrap justify-center drop-shadow-[0_2px_18px_rgba(0,0,0,0.4)]"
            >
              {headlineText.split(" ").map((word, i) => (
                <span key={i} className="word-wrap overflow-hidden inline-block mx-[5px] sm:mx-[7px] md:mx-[9px] mb-1 sm:mb-2">
                  <span className="word inline-block">{word}</span>
                </span>
              ))}
            </h1>
          </div>

          {/* Subheadline Description */}
          <div className="flex items-center justify-center w-full mb-8 sm:mb-10 overflow-hidden">
            <p 
              ref={paragraphRef} 
              className="font-jakarta font-normal text-[15px] sm:text-[17px] md:text-[19px] leading-[1.65] text-white/85 max-w-[680px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]"
            >
              UX/UI Designer creating thoughtful digital experiences across healthcare, SaaS, AI concepts, branding, and modern web products. Focused on usability, workflows, visual clarity, and meaningful user experiences.
            </p>
          </div>

          {/* CTA Action Buttons */}
          <div ref={actionsRef} className="flex flex-wrap gap-3.5 sm:gap-4 items-center justify-center">
            <RippleButton 
              variant="primary"
              className="bg-white hover:bg-white/95 text-[#070b14] font-semibold text-[15px] sm:text-[16px] px-8 py-3.5 rounded-full shadow-[0_4px_24px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_32px_rgba(255,255,255,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="font-jakarta font-semibold tracking-[-0.01em]">
                View Selected Work
              </span>
              <RippleButtonRipples />
            </RippleButton>
            <RippleButton 
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md text-white font-medium text-[15px] sm:text-[16px] px-8 py-3.5 rounded-full transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
            >
              <span className="font-jakarta font-medium text-white tracking-[-0.01em]">
                Let’s Connect
              </span>
              <RippleButtonRipples />
            </RippleButton>
          </div>

        </div>
      </div>

      {/* 3. Scroll Cue */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 text-[10px] font-mono tracking-widest pointer-events-none"
      >
        <div className="w-[18px] h-[30px] border border-white/25 rounded-full flex justify-center p-[4px]">
          <div className="w-[2px] h-[6px] bg-white/60 rounded-full animate-bounce" />
        </div>
        <span>SCROLL</span>
      </div>
    </section>
  );
}
