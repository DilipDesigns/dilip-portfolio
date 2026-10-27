"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !leftHandRef.current || !rightHandRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(textRef.current, { scale: 0.5, opacity: 0 });
      gsap.set(leftHandRef.current, { xPercent: -50, opacity: 0 });
      gsap.set(rightHandRef.current, { xPercent: 50, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Pins for 150% of viewport height to give scroll duration
          scrub: 1,
          pin: true,
        }
      });

      tl.to(textRef.current, { scale: 1, opacity: 1, duration: 1 }, 0)
        .to(leftHandRef.current, { xPercent: -8, opacity: 1, duration: 1 }, 0)
        .to(rightHandRef.current, { xPercent: 8, opacity: 1, duration: 1 }, 0);

      // Add a small pause where nothing moves so the user can see the perfect touching state
      tl.to({}, { duration: 0.4 });

      // Outro animation: blur, fade out, and move up as they scroll out of the section
      tl.to([textRef.current, leftHandRef.current, rightHandRef.current], {
        y: -100,
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.6,
        ease: "power2.inOut"
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="w-full relative">
      <section 
        ref={containerRef} 
        id="philosophy" 
        className="intro-v1 h-screen w-full relative overflow-hidden flex flex-col items-center justify-between"
      >
        {/* Text Block - Positioned near top with generous space */}
        <div 
          ref={textRef} 
          className="relative z-10 flex flex-col gap-[24px] items-center text-center max-w-[800px] px-6 mt-4 md:mt-8"
        >
          <h2 className="font-jakarta font-medium text-[32px] md:text-[48px] leading-[1.2] text-[#1d1d1d]">
            Where creativity meets intelligence.
          </h2>
          <p className="font-jakarta text-[16px] md:text-[18px] text-[#656565] leading-[1.6]">
            I don’t see AI as a replacement for creativity. I see it as a tool that helps us think faster, explore further, and build more meaningful experiences.
          </p>
        </div>

        {/* Hands Container - Positioned below text */}
        <div className="absolute top-[48%] md:top-[52%] w-full h-[220px] md:h-[400px] pointer-events-none z-0">
          {/* Left Hand (Human Hand) */}
          <img 
            ref={leftHandRef}
            src="/hand-1.png" 
            alt="Human Hand" 
            className="absolute left-0 top-0 w-[55%] h-auto object-contain object-left shrink-0"
          />

          {/* Right Hand (Robot Hand) */}
          <img 
            ref={rightHandRef}
            src="/hand-2.png" 
            alt="Robot Hand" 
            className="absolute right-0 top-0 w-[55%] h-auto object-contain object-right shrink-0"
          />
        </div>
      </section>
    </div>
  );
}
