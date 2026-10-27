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
      // 1. Entrance animation (exact Webflow timeline: t-ef8ddc81)
      gsap.fromTo(
        darkCircleRef.current,
        { x: "-10rem", y: "-20rem" },
        { x: "0rem", y: "0rem", duration: 1.8, delay: 0.4, ease: "power2.out" }
      );

      gsap.fromTo(
        primaryCircleRef.current,
        { x: "-8rem", y: "-12rem" },
        { x: "0rem", y: "0rem", duration: 1.2, ease: "power2.out" }
      );

      gsap.fromTo(
        secondaryCircleRef.current,
        { x: "-4rem", y: "-12rem" },
        { x: "0rem", y: "0rem", duration: 1.8, ease: "power2.out" }
      );

      // 2. Continuous ambient floating movement for organic cyber radiance
      gsap.to(darkCircleRef.current, {
        x: "+=2.5rem",
        y: "+=3.5rem",
        scale: 1.05,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.2
      });

      gsap.to(primaryCircleRef.current, {
        x: "-=2rem",
        y: "+=2.5rem",
        scale: 1.08,
        duration: 7.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.6
      });

      gsap.to(secondaryCircleRef.current, {
        x: "+=3rem",
        y: "-=2rem",
        scale: 1.04,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.0
      });

      // 3. Continuous vertical scrolling of dots-vector
      if (dots1Ref.current) {
        gsap.fromTo(
          dots1Ref.current,
          { y: 0 },
          { y: -2000, duration: 30, ease: "none", repeat: -1 }
        );
      }
      if (dots2Ref.current) {
        gsap.fromTo(
          dots2Ref.current,
          { y: 0 },
          { y: -2000, duration: 30, ease: "none", repeat: -1 }
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
      className={`gradient-background ${className}`}
    >
      {/* Securio Layer 1: Dark Circle (deep midnight navy vignetting top-left) */}
      <img
        ref={darkCircleRef}
        src="/securio/dark-circle.avif"
        alt="Dark Gradient"
        loading="eager"
        className="dark-circle will-change-transform pointer-events-none select-none"
      />

      {/* Securio Layer 2: Primary Circle (vibrant electric cyber blue center) */}
      <img
        ref={primaryCircleRef}
        src="/securio/blue-circle.avif"
        alt="Blue Gradient"
        loading="eager"
        className="primary-circle will-change-transform pointer-events-none select-none"
      />

      {/* Securio Layer 3: Grid Dots Vector (continuous ambient scroll) */}
      <div
        ref={dots1Ref}
        className="dots-vector will-change-transform pointer-events-none select-none"
      />
      <div
        ref={dots2Ref}
        className="dots-vector will-change-transform pointer-events-none select-none"
        style={{ marginTop: "-2000px" }}
      />

      {/* Securio Layer 4: Secondary Circle (luminous cyan / azure atmospheric spread) */}
      <img
        ref={secondaryCircleRef}
        src="/securio/light-circle.avif"
        alt="Light Blue Gradient"
        loading="eager"
        className="secondary-circle will-change-transform pointer-events-none select-none"
      />

      {/* Securio Layer 5: Overlay Light (smooth transition gradient to #f0f1f3) */}
      <div className="overlay-light pointer-events-none select-none" />
    </div>
  );
}
