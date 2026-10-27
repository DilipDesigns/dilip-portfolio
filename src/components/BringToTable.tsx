"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

interface Capability {
  label: string;
  left: number; // percentage
  top: number; // percentage
  rot: number; // degrees
  delay: number; // stagger delay
  // Drift multipliers for idle floating
  driftX: number;
  driftY: number;
}

const capabilities: Capability[] = [
  { label: "Product Design", left: 38, top: 0, rot: -10, delay: 0.0, driftX: 3, driftY: 6 },
  { label: "User Experience Design", left: 66, top: 9, rot: -9, delay: 0.08, driftX: -4, driftY: 8 },
  { label: "User Interface Design", left: 79, top: 37, rot: 7, delay: 0.16, driftX: 5, driftY: -5 },
  { label: "Branding", left: 80, top: 67, rot: 9, delay: 0.24, driftX: -3, driftY: 7 },
  { label: "Visual Design", left: 62, top: 84, rot: -15, delay: 0.32, driftX: 4, driftY: -8 },
  { label: "Framer Development", left: 29, top: 89, rot: -4, delay: 0.40, driftX: -5, driftY: 5 },
  { label: "Pitch Deck Design", left: 3, top: 72, rot: 3, delay: 0.48, driftX: 3, driftY: -6 },
  { label: "User Research", left: 0, top: 39, rot: -7, delay: 0.56, driftX: -4, driftY: 7 },
  { label: "Design Systems", left: 10, top: 15, rot: 8, delay: 0.64, driftX: 5, driftY: 6 },
];

export default function BringToTable() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Setup refs callback
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el) {
      if (!pillsRef.current.includes(el)) {
        pillsRef.current.push(el);
      }
    }
  };

  // Detect prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // GSAP animations
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!sectionRef.current || !containerRef.current || !contentRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Text entrance animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom-=10%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Pills fly-out expansion animation
      pillsRef.current.forEach((pill, idx) => {
        if (!pill) return;
        const cap = capabilities[idx];
        
        // Calculate offset vector pointing towards center (50%, 50%)
        const dx = cap.left - 50;
        const dy = cap.top - 50;
        const startX = -dx * 4.5; // fly out from center
        const startY = -dy * 4.5;

        gsap.fromTo(
          pill,
          {
            opacity: 0,
            scale: 0.35,
            x: startX,
            y: startY,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            duration: 1.3,
            delay: cap.delay * 0.5, // staggered delays
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom-=20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 3. Mouse Parallax effect (Desktop only)
      const handleMouseMove = (e: MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        // Normalized mouse position: -1 to 1
        const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

        pillsRef.current.forEach((pill, idx) => {
          if (!pill) return;
          const cap = capabilities[idx];
          // Staggered parallax depth based on drift multipliers
          const px = mouseX * cap.driftX * 2.8;
          const py = mouseY * cap.driftY * 2.8;

          gsap.to(pill, {
            x: px,
            y: py,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      const handleMouseLeave = () => {
        pillsRef.current.forEach((pill) => {
          if (!pill) return;
          gsap.to(pill, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      const containerEl = containerRef.current;
      if (containerEl) {
        containerEl.addEventListener("mousemove", handleMouseMove);
        containerEl.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (containerEl) {
          containerEl.removeEventListener("mousemove", handleMouseMove);
          containerEl.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 md:py-32 bg-[#f5f5f2] overflow-hidden w-full flex flex-col items-center border-t border-[#e4e4e4]"
    >
      {/* Outer wrapper matching portfolio spacing standard */}
      <div className="max-w-[1500px] mx-auto w-full px-6 md:px-[80px] flex flex-col items-center justify-center relative">
        
        {/* ==================== DESKTOP & LAPTOP LAYOUT (Orbiting Pills) ==================== */}
        <div 
          ref={containerRef}
          className="relative w-full max-w-[1050px] h-[660px] hidden lg:flex items-center justify-center select-none"
        >
          {/* Central Statement Box */}
          <div ref={contentRef} className="flex flex-col gap-6 items-center justify-center text-center z-10 max-w-[520px]">
            <h2 className="font-sans font-bold text-[64px] leading-[72px] text-[#001666] tracking-tight">
              What I bring to the table
            </h2>
            <p className="font-sans text-[18px] leading-[30px] text-[#5f6566]">
              Digital experiences that engage users and help your startup stand out from day one.
            </p>
          </div>

          {/* Floating Orbiting Pills */}
          {capabilities.map((cap, idx) => {
            return (
              <div
                key={cap.label}
                className="absolute transition-opacity duration-300 pointer-events-none"
                style={{
                  left: `${cap.left}%`,
                  top: `${cap.top}%`,
                }}
              >
                {/* Parallax and Scroll trigger wrapper */}
                <div 
                  ref={addToRefs} 
                  className="pointer-events-auto"
                >
                  {/* Floating idle breathing wrapper */}
                  <div
                    className="bg-[#cadcfc] hover:bg-[#b9d3fc] transition-colors duration-300 px-6 py-3.5 rounded-[70px] flex items-center justify-center shadow-[0_4px_20px_rgba(202,220,252,0.18)] cursor-grab active:cursor-grabbing"
                    style={{
                      transform: `rotate(${cap.rot}deg)`,
                      // Staggered animation values
                      animationName: prefersReducedMotion ? "none" : "idleFloat",
                      animationDuration: `${5 + (idx % 3) * 1.5}s`,
                      animationTimingFunction: "ease-in-out",
                      animationIterationCount: "infinite",
                      animationDirection: "alternate",
                      animationDelay: `${idx * -0.4}s`,
                      // Set custom properties for drift magnitudes in keyframes
                      ["--drift-x" as any]: `${cap.driftX}px`,
                      ["--drift-y" as any]: `${cap.driftY}px`,
                      ["--base-rot" as any]: `${cap.rot}deg`,
                    }}
                  >
                    <span className="font-sans font-normal text-[16px] leading-[28px] text-[#001666] whitespace-nowrap select-none">
                      {cap.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ==================== MOBILE & TABLET RESPONSIVE LAYOUT (Clean centered capsules) ==================== */}
        <div className="flex flex-col gap-10 items-center text-center lg:hidden w-full max-w-[600px]">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <h2 className="font-sans font-bold text-[38px] md:text-[48px] leading-[1.2] text-[#001666]">
              What I bring to the table
            </h2>
            <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-[#5f6566]">
              Digital experiences that engage users and help your startup stand out from day one.
            </p>
          </div>

          {/* Simple organic list layout for tablets and mobiles */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 w-full">
            {capabilities.map((cap) => (
              <div
                key={cap.label}
                className="bg-[#cadcfc] px-5 py-3 rounded-[70px] shadow-[0_4px_12px_rgba(202,220,252,0.12)] border border-[#cadcfc]"
              >
                <span className="font-sans font-normal text-[14px] md:text-[16px] text-[#001666] whitespace-nowrap">
                  {cap.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes idleFloat {
          0% {
            transform: translate3d(0, 0, 0) rotate(var(--base-rot));
          }
          100% {
            transform: translate3d(var(--drift-x), var(--drift-y), 0) rotate(var(--base-rot));
          }
        }
      `}</style>
    </section>
  );
}
