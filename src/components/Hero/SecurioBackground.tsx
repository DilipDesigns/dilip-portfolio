"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface SecurioBackgroundProps {
  className?: string;
}

export default function SecurioBackground({ className = "" }: SecurioBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const darkCircleRef = useRef<HTMLImageElement>(null);
  const primaryCircleRef = useRef<HTMLImageElement>(null);
  const secondaryCircleRef = useRef<HTMLImageElement>(null);
  const dots1Ref = useRef<HTMLDivElement>(null);
  const dots2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance animation
      gsap.fromTo(
        primaryCircleRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 0.85, duration: 1.4, ease: "power2.out" }
      );

      gsap.fromTo(
        secondaryCircleRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 0.75, duration: 1.8, ease: "power2.out", delay: 0.2 }
      );

      gsap.fromTo(
        darkCircleRef.current,
        { opacity: 0 },
        { opacity: 0.9, duration: 2, ease: "power2.out" }
      );

      // 2. Continuous ambient breathing & floating movement
      gsap.to(primaryCircleRef.current, {
        scale: 1.05,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(secondaryCircleRef.current, {
        scale: 1.08,
        duration: 9.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Continuous vertical scrolling of dots-vector
      if (dots1Ref.current) {
        gsap.fromTo(
          dots1Ref.current,
          { y: 0 },
          { y: -1000, duration: 25, ease: "none", repeat: -1 }
        );
      }
      if (dots2Ref.current) {
        gsap.fromTo(
          dots2Ref.current,
          { y: 0 },
          { y: -1000, duration: 25, ease: "none", repeat: -1 }
        );
      }
    }, containerRef);

    // 4. Subtle interactive mouse parallax for organic responsiveness
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const { innerWidth, innerHeight } = window;
      const mouseX = (e.clientX / innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(primaryCircleRef.current, {
        x: mouseX * 24,
        y: mouseY * 24,
        duration: 1.2,
        ease: "power1.out",
        overwrite: "auto"
      });
      gsap.to(secondaryCircleRef.current, {
        x: -mouseX * 32,
        y: -mouseY * 32,
        duration: 1.6,
        ease: "power1.out",
        overwrite: "auto"
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{
        zIndex: 1,
        backgroundColor: "#070b14",
        minHeight: "100%",
      }}
    >
      {/* Securio Layer 1: Dark Circle (deep midnight navy vignette) */}
      <img
        ref={darkCircleRef}
        src="/securio/dark-circle.avif"
        alt=""
        loading="eager"
        className="absolute pointer-events-none will-change-transform"
        style={{
          zIndex: 9,
          width: "150vw",
          maxWidth: "1800px",
          height: "auto",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          objectFit: "contain",
          mixBlendMode: "multiply",
          opacity: 0.9,
        }}
      />

      {/* Securio Layer 2: Primary Circle (vibrant electric cyber blue core centered behind hero text) */}
      <img
        ref={primaryCircleRef}
        src="/securio/blue-circle.avif"
        alt=""
        loading="eager"
        className="absolute pointer-events-none will-change-transform"
        style={{
          zIndex: 8,
          width: "125vw",
          maxWidth: "1400px",
          height: "auto",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          objectFit: "contain",
          filter: "drop-shadow(0 0 100px rgba(31,74,244,0.5))",
          opacity: 0.85,
        }}
      />

      {/* Securio Layer 3: Grid Dots Vector (ambient continuous upward motion) */}
      <div
        ref={dots1Ref}
        className="absolute will-change-transform pointer-events-none opacity-35"
        style={{
          zIndex: 7,
          backgroundImage: 'url("/securio/grid-dots-single.webp")',
          backgroundPosition: "50% 50%",
          backgroundRepeat: "repeat",
          width: "200vw",
          minHeight: "2200px",
          marginLeft: "-50vw",
          top: "-200px",
        }}
      />
      <div
        ref={dots2Ref}
        className="absolute will-change-transform pointer-events-none opacity-35"
        style={{
          zIndex: 7,
          backgroundImage: 'url("/securio/grid-dots-single.webp")',
          backgroundPosition: "50% 50%",
          backgroundRepeat: "repeat",
          width: "200vw",
          minHeight: "2200px",
          marginLeft: "-50vw",
          top: "1000px",
        }}
      />

      {/* Securio Layer 4: Secondary Circle (luminous cyan / azure atmospheric spread centered) */}
      <img
        ref={secondaryCircleRef}
        src="/securio/light-circle.avif"
        alt=""
        loading="eager"
        className="absolute pointer-events-none will-change-transform"
        style={{
          zIndex: 4,
          width: "145vw",
          maxWidth: "1650px",
          height: "auto",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          objectFit: "contain",
          opacity: 0.75,
        }}
      />
    </div>
  );
}
