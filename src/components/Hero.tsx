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
  { id: 1, src: "/securio/logos/client-logo-1.webp", alt: "Logoipsum Logo - Cyber security client - Securio" },
  { id: 2, src: "/securio/logos/client-logo-2.webp", alt: "Department of Fictional Logos - Cyber security client - Securio" },
  { id: 3, src: "/securio/logos/client-logo-3.webp", alt: "Logoipsum Academy - Cyber security client - Securio" },
  { id: 4, src: "/securio/logos/client-logo-4.webp", alt: "Logoipsum Tech - Cyber security client - Securio" },
  { id: 5, src: "/securio/logos/client-logo-5.webp", alt: "Logoipsum est 2019 - Cyber security client - Securio" },
  { id: 6, src: "/securio/logos/client-logo-6.webp", alt: "Logoipsum - Cyber security client - Securio" },
];

const clientAvatars = [
  { id: 1, src: "/securio/avatars/avatar-1.webp", alt: "Client Photo Four" },
  { id: 2, src: "/securio/avatars/avatar-2.webp", alt: "Client Photo Three" },
  { id: 3, src: "/securio/avatars/avatar-3.webp", alt: "Client Photo Two" },
  { id: 4, src: "/securio/avatars/avatar-4.webp", alt: "Client Photo" },
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
      gsap.set(headlineWords, { opacity: 0, y: 30, filter: "blur(6px)" });
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

      // 4. Action button
      tl.to(actionsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1
      }, "-=0.6");

      // 5. 3D Scroll Depth (preserve-3d, opacity & translate)
      gsap.to(containerRef.current, {
        opacity: 0.6,
        y: 60,
        scale: 0.97,
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

  const headlineText = "Cybersecurity services for a new era of risk";
  
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
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 relative z-10">
          
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
                  <div className="text-[13px] md:text-[14px] font-medium text-white/95">
                    Trusted by 300+ companies
                  </div>
                </div>

                {/* class="text-block-hero" */}
                <div className="text-block-hero">
                  <h1 
                    ref={headlineRef} 
                    className="font-jakarta font-semibold text-[40px] sm:text-[54px] md:text-[64px] leading-[1.08] tracking-[-0.03em] text-white flex flex-wrap"
                  >
                    {headlineText.split(" ").map((word, i) => (
                      <span key={i} className="word-wrap overflow-hidden inline-block mr-[8px] sm:mr-[10px] md:mr-[12px] mb-1">
                        <span className="word inline-block">{word}</span>
                      </span>
                    ))}
                  </h1>

                  <p 
                    ref={paragraphRef} 
                    className="font-jakarta font-normal text-[16px] sm:text-[18px] md:text-[20px] leading-[1.5] text-white/90 max-w-[34rem]"
                  >
                    Protect your business from cyber threats.
                  </p>
                </div>

              </div>

              {/* class="button-stack" */}
              <div ref={actionsRef} className="button-stack">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center bg-[#070b14] hover:bg-[#0f172a] text-white text-[15px] sm:text-[16px] font-medium px-7 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.25)] no-underline cursor-pointer"
                >
                  Book a Demo
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          class="section-logos padding-top"
          ========================================================================= */}
      <section className="section-logos padding-top">
        {/* 3 repeating marquee tracks */}
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
