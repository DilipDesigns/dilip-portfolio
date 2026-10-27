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
      // 1. Entrance animation (Webflow load timeline: t-ef8ddc81)
      // dark-circle: x -10rem -> 0, y -20rem -> 0, duration 1.8s, position 0.4s
      // primary-circle: x -8rem -> 0, y -12rem -> 0, duration 1.2s
      // secondary-circle: x -4rem -> 0, y -12rem -> 0, duration 1.8s
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

      // 3. Continuous vertical scrolling of dots-vector (Webflow timeline: t-628d9354)
      // duration: 20s, ease: none, repeat: -1, y: 0 -> -1000px
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

    // 4. Subtle interactive mouse parallax for extra polish
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const { innerWidth, innerHeight } = window;
      const mouseX = (e.clientX / innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(primaryCircleRef.current, {
        xPercent: mouseX * 2.5,
        yPercent: mouseY * 2.5,
        duration: 1.2,
        ease: "power1.out",
        overwrite: "auto"
      });
      gsap.to(secondaryCircleRef.current, {
        xPercent: -mouseX * 3,
        yPercent: -mouseY * 3,
        duration: 1.5,
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
      {/* Securio Layer 1: Dark Circle (deep midnight navy vignetting layer) */}
      <img
        ref={darkCircleRef}
        src="/securio/dark-circle.avif"
        alt=""
        loading="eager"
        className="absolute pointer-events-none will-change-transform"
        style={{
          zIndex: 9,
          minWidth: "140vw",
          maxWidth: "140vw",
          minHeight: "80rem",
          maxHeight: "80rem",
          marginTop: "-25rem",
          marginLeft: "-20vw",
          objectFit: "contain",
          mixBlendMode: "multiply",
        }}
      />

      {/* Securio Layer 2: Primary Circle (vibrant electric cyber blue core) */}
      <img
        ref={primaryCircleRef}
        src="/securio/blue-circle.avif"
        alt=""
        loading="eager"
        className="absolute pointer-events-none will-change-transform"
        style={{
          zIndex: 8,
          minWidth: "160vw",
          maxWidth: "160vw",
          minHeight: "80rem",
          maxHeight: "80rem",
          marginTop: "-15rem",
          marginLeft: "-20vw",
          objectFit: "contain",
          filter: "drop-shadow(0 0 60px rgba(31,74,244,0.45))",
        }}
      />

      {/* Securio Layer 3: Grid Dots Vector (ambient continuous upward motion) */}
      <div
        ref={dots1Ref}
        className="absolute will-change-transform pointer-events-none opacity-45"
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
        className="absolute will-change-transform pointer-events-none opacity-45"
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

      {/* Securio Layer 4: Secondary Circle (luminous cyan / azure atmospheric spread) */}
      <img
        ref={secondaryCircleRef}
        src="/securio/light-circle.avif"
        alt=""
        loading="eager"
        className="absolute pointer-events-none will-change-transform"
        style={{
          zIndex: 4,
          minWidth: "180vw",
          maxWidth: "180vw",
          minHeight: "75rem",
          maxHeight: "80rem",
          marginTop: "-8rem",
          marginLeft: "-20vw",
          objectFit: "contain",
          opacity: 0.85,
        }}
      />
    </div>
  );
}
