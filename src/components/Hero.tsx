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
  { id: 1, src: "/securio/logos/client-logo-1.webp", alt: "Enterprise Partner" },
  { id: 2, src: "/securio/logos/client-logo-2.webp", alt: "Design System Partner" },
  { id: 3, src: "/securio/logos/client-logo-3.webp", alt: "AI Innovation" },
  { id: 4, src: "/securio/logos/client-logo-4.webp", alt: "HealthTech UX" },
  { id: 5, src: "/securio/logos/client-logo-5.webp", alt: "SaaS Platform" },
  { id: 6, src: "/securio/logos/client-logo-6.webp", alt: "Cloud Ecosystem" },
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
      gsap.set(trustedRef.current, { opacity: 0, y: 18 });
      gsap.set(headlineWords, { opacity: 0, y: 32, filter: "blur(8px)" });
      gsap.set(paragraphRef.current, { opacity: 0, y: 20 });
      gsap.set(actionsRef.current?.children || [], { opacity: 0, y: 16 });
      
      const tl = gsap.timeline({ defaults: { ease: "cubic-bezier(0.22, 1, 0.36, 1)" } });
      tl.delay(0.2);

      // 1. Status badge
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
        stagger: 0.035
      }, "-=0.55");

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
        opacity: 0.4,
        y: 100,
        scale: 0.96,
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
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-center items-center">
          
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
                
                {/* class="stack-trusted-by" (Refined high-status designer indicator) */}
                <div ref={trustedRef} className="stack-trusted-by">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.14em] uppercase font-medium text-white/90">
                    Available for Design Systems & AI-Native UX
                  </span>
                </div>

                {/* class="text-block-hero" */}
                <div className="text-block-hero">
                  <h1 
                    ref={headlineRef} 
                    className="font-jakarta font-bold text-[36px] sm:text-[50px] md:text-[62px] lg:text-[72px] leading-[1.12] tracking-[-0.03em] text-white text-center max-w-[960px] mx-auto drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] flex flex-wrap justify-center"
                  >
                    {headlineText.split(" ").map((word, i) => (
                      <span key={i} className="word-wrap overflow-hidden inline-block mr-[8px] sm:mr-[10px] md:mr-[13px] mb-1">
                        <span className="word inline-block">{word}</span>
                      </span>
                    ))}
                  </h1>

                  <p 
                    ref={paragraphRef} 
                    className="font-jakarta font-normal text-[15px] sm:text-[17px] md:text-[19px] leading-[1.65] text-white/75 max-w-[680px] mx-auto text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
                  >
                    UX/UI Designer creating thoughtful digital experiences across healthcare, SaaS, AI concepts, and modern web products. Focused on usability, complex workflows, and visual clarity.
                  </p>
                </div>

              </div>

              {/* class="button-stack" */}
              <div ref={actionsRef} className="button-stack">
                <a href="#work" className="no-underline">
                  <RippleButton 
                    variant="primary"
                    className="bg-white hover:bg-white/95 text-[#070b14] font-semibold text-[15px] sm:text-[16px] px-8 py-3.5 rounded-full shadow-[0_0_24px_rgba(255,255,255,0.25)] hover:shadow-[0_0_36px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2.5"
                  >
                    <span className="font-jakarta font-semibold tracking-[-0.01em]">
                      View Selected Work
                    </span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="text-[#070b14]">
                      <path d="M7 13l5 5 5-5M12 4v14"/>
                    </svg>
                    <RippleButtonRipples />
                  </RippleButton>
                </a>
                
                <a href="#about" className="no-underline">
                  <RippleButton 
                    variant="secondary"
                    className="bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md text-white font-medium text-[15px] sm:text-[16px] px-8 py-3.5 rounded-full transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.2)] flex items-center gap-2.5"
                  >
                    <span className="font-jakarta font-medium text-white tracking-[-0.01em]">
                      Let’s Connect
                    </span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    <RippleButtonRipples />
                  </RippleButton>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          class="section-logos padding-top"
          ========================================================================= */}
      <section className="section-logos padding-top relative">
        <div className="logos-fade-left" />
        <div className="logos-fade-right" />
        <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white/40 mb-5 font-medium text-center relative z-10">
          Systems Architecture • AI Workflows • Digital Products
        </div>
        <div className="w-full flex overflow-hidden relative">
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
        </div>
      </section>
    </>
  );
}
