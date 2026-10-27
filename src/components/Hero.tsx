"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SecurioBackground from "./Hero/SecurioBackground";
import { RippleButton, RippleButtonRipples } from "@/components/animate-ui/components/buttons/ripple";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const clientLogos = [
  { id: 1, src: "/securio/logos/client-logo-1.webp", alt: "Client Logo 1" },
  { id: 2, src: "/securio/logos/client-logo-2.webp", alt: "Client Logo 2" },
  { id: 3, src: "/securio/logos/client-logo-3.webp", alt: "Client Logo 3" },
  { id: 4, src: "/securio/logos/client-logo-4.webp", alt: "Client Logo 4" },
  { id: 5, src: "/securio/logos/client-logo-5.webp", alt: "Client Logo 5" },
  { id: 6, src: "/securio/logos/client-logo-6.webp", alt: "Client Logo 6" },
];

const clientAvatars = [
  { id: 1, src: "/securio/avatars/avatar-1.webp", alt: "Client Avatar 1" },
  { id: 2, src: "/securio/avatars/avatar-2.webp", alt: "Client Avatar 2" },
  { id: 3, src: "/securio/avatars/avatar-3.webp", alt: "Client Avatar 3" },
  { id: 4, src: "/securio/avatars/avatar-4.webp", alt: "Client Avatar 4" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for animation targets
  const trustedRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // GSAP reveal animations + 3D Scroll Depth
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current || !sectionRef.current) return;

    const headlineWords = headlineRef.current?.querySelectorAll(".word-wrap .word") || [];

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(trustedRef.current, { opacity: 0, y: 20 });
      gsap.set(headlineWords, { opacity: 0, y: 35, filter: "blur(6px)" });
      gsap.set(paragraphRef.current, { opacity: 0, y: 20 });
      gsap.set(actionsRef.current?.children || [], { opacity: 0, y: 15 });
      
      const tl = gsap.timeline({ defaults: { ease: "cubic-bezier(0.25, 1, 0.5, 1)" } });
      tl.delay(0.2);

      // 1. Trusted by tag
      tl.to(trustedRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8
      });

      // 2. Headline words stagger
      tl.to(headlineWords, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.04
      }, "-=0.6");

      // 3. Subheadline
      tl.to(paragraphRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, "-=0.6");

      // 4. Action buttons
      tl.to(actionsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1
      }, "-=0.6");

      // 5. 3D Scroll Depth
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
    <>
      {/* =========================================================================
          class="section-hero-home"
          ========================================================================= */}
      <section 
        ref={sectionRef} 
        className="section-hero-home"
        style={{ perspective: 1200 }}
      >
        {/* Background & Animations */}
        <SecurioBackground />

        {/* Global Padding Container */}
        <div className="w-full max-w-[1500px] mx-auto px-6 md:px-[80px]">
          
          {/* class="home-hero" */}
          <div className="home-hero">
            
            {/* class="wrapper-home-hero" with 3D preserve & will-change */}
            <div 
              ref={containerRef} 
              style={{
                transformStyle: "preserve-3d",
                willChange: "opacity, transform",
              }}
              className="wrapper-home-hero"
            >
              
              {/* class="stack-hero-home" */}
              <div className="stack-hero-home">
                
                {/* class="stack-trusted-by" */}
                <div ref={trustedRef} className="stack-trusted-by">
                  <div className="stack-images-trusted-logos">
                    {clientAvatars.map((av) => (
                      <img 
                        key={av.id}
                        src={av.src}
                        alt={av.alt}
                        loading="eager"
                        className="single-testimonial-image"
                      />
                    ))}
                  </div>
                  <div className="font-mono text-[11px] sm:text-[12px] tracking-[0.14em] uppercase font-medium text-white/90">
                    Trusted by 300+ companies • AI-Native UX
                  </div>
                </div>

                {/* class="text-block-hero" */}
                <div className="text-block-hero">
                  <h1 
                    ref={headlineRef} 
                    className="font-jakarta font-bold text-[36px] sm:text-[50px] md:text-[64px] lg:text-[72px] leading-[1.08] tracking-[-0.025em] text-white flex flex-wrap drop-shadow-[0_2px_18px_rgba(0,0,0,0.4)]"
                  >
                    {headlineText.split(" ").map((word, i) => (
                      <span key={i} className="word-wrap overflow-hidden inline-block mr-[8px] sm:mr-[10px] md:mr-[12px] mb-1">
                        <span className="word inline-block">{word}</span>
                      </span>
                    ))}
                  </h1>

                  <p 
                    ref={paragraphRef} 
                    className="font-jakarta font-normal text-[15px] sm:text-[17px] md:text-[19px] leading-[1.65] text-white/85 max-w-[620px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]"
                  >
                    UX/UI Designer creating thoughtful digital experiences across healthcare, SaaS, AI concepts, branding, and modern web products. Focused on usability, workflows, visual clarity, and meaningful user experiences.
                  </p>
                </div>

              </div>

              {/* class="button-stack" */}
              <div ref={actionsRef} className="button-stack">
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
        </div>
      </section>

      {/* =========================================================================
          class="section-logos padding-top"
          ========================================================================= */}
      <section className="section-logos padding-top">
        {/* Repeating marquee tracks */}
        {[0, 1, 2].map((trackIdx) => (
          <div key={trackIdx} className="logos-container" aria-hidden={trackIdx > 0}>
            {clientLogos.map((logo) => (
              <img 
                key={`${trackIdx}-${logo.id}`}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="client-logo"
              />
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
