"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "./ScrollReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { id: "01", title: "Experience", value: "4.5+", desc: "Years designing complex digital products across healthcare, SaaS, fintech, and emerging technology." },
  { id: "02", title: "Projects", value: "10+", desc: "Projects delivered across multiple industries, shaping end-to-end product experiences." },
  { id: "03", title: "Modules", value: "20+", desc: "Complex modules designed across EHR, ASC, RCM, CRM, trading, and enterprise workflows." },
  { id: "04", title: "Products", value: "8+", desc: "Digital products shaped from early concepts to scalable, shipped systems." },
];


export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRevealContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Staggered reveal for right side content + left profile card
      gsap.fromTo(
        ".reveal-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-10 to +10 degrees)
    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="section-padding-y bg-[#FFFFFF] text-[#1d1d1d] relative w-full"
    >
      <div className="site-container flex flex-col lg:flex-row gap-12 lg:gap-20 xl:gap-24 justify-between items-start">
        
        {/* Left Side: Sticky Image Card */}
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.5s ease-out',
          }}
          className="lg:sticky lg:top-[120px] w-full lg:w-[468px] bg-[#f9f9f9] p-[24px] rounded-[16px] border border-[#e4e4e4] shadow-sm shrink-0 flex flex-col z-10 reveal-item"
        >
          <div className="flex justify-between items-center mb-[24px]">
            <span className="font-inter font-medium text-[14px] text-black tracking-[-0.14px]">Product Designer</span>
            <span className="font-inter font-medium text-[14px] text-black tracking-[-0.14px]">Visual Storyteller</span>
          </div>
          
          <div className="w-full h-[417px] relative overflow-hidden rounded-[8px] mb-[24px]">
            <img 
              src="/profile-pic.jpg" 
              alt="Profile" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="font-inter font-medium text-[14px] text-black tracking-[-0.14px]">Based in Hyderabad, India 🇮🇳</span>
            <div className="flex items-center gap-[6px]">
              <span className="font-inter font-medium text-[14px] text-black tracking-[-0.14px]">Available for Work</span>
              <div className="w-[8px] h-[8px] bg-[#22c55e] rounded-[4px] shadow-[0_0_0_2px_rgba(34,197,94,0.2)]"></div>
            </div>
          </div>
        </div>

        {/* Right Side: Scrolling Content */}
        <div className="flex flex-col gap-[44px] w-full lg:w-[628px] lg:pt-[60px] pb-32">
          
          <div className="flex flex-col gap-[44px]">
            
            <div ref={textRevealContainerRef} className="reveal-item w-full h-[150vh] relative">
              <div className="sticky top-[30vh] lg:top-[200px] w-full flex flex-col gap-[24px] items-start">
                <div className="flex items-start">
                  <div className="bg-[#f5f5f5] px-[12px] py-[8px] rounded-[4px]">
                    <span className="font-mono text-[12px] text-[#1d1d1d] tracking-[0.12px]">
                      {"//About Me"}
                    </span>
                  </div>
                </div>
                
                <ScrollReveal 
                  triggerRef={textRevealContainerRef}
                  wordAnimationEnd="bottom bottom"
                  baseOpacity={0.1}
                  enableBlur={true}
                  baseRotation={0}
                  blurStrength={4}
                  containerClassName="font-jakarta font-medium text-[32px] md:text-[40px] leading-[1.2] text-[#00012d]"
                >
                  Hi, I’m Dilip, a product designer focused on making complex systems simple and intuitive. I work across healthcare, SaaS, fintech, and AI, designing clear workflows and scalable systems that align with how people actually work.
                </ScrollReveal>
              </div>
            </div>

            <p className="font-jakarta italic font-medium text-[20px] md:text-[24px] leading-[1.5] text-[#1d1d1d] mt-4 reveal-item">
              “For me, good design is not just about how something looks — it’s about how naturally it works.”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-12 relative pb-20">
            {stats.map((stat, idx) => (
              <div 
                key={stat.id} 
                className={`bg-white border border-[#e4e4e4] p-[24px] rounded-[16px] flex flex-col gap-[24px] shadow-sm reveal-item ${idx % 2 !== 0 ? 'md:translate-y-24' : ''}`}
              >
                <div className="flex flex-col gap-[32px]">
                  <div className="flex gap-[12px] items-end">
                    <span className="font-jakarta font-semibold text-[20px] text-[#091033] opacity-60">
                      {stat.id}
                    </span>
                    <span className="font-jakarta font-semibold text-[20px] text-[#091033]">
                      {stat.title}
                    </span>
                  </div>
                  <span className="font-jakarta font-semibold text-[56px] leading-[1] text-[#091033]">
                    {stat.value}
                  </span>
                </div>
                <p className="font-jakarta text-[16px] text-[#8c93b9] leading-[1.2]">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
