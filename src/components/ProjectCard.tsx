"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RippleButton, RippleButtonRipples } from "./animate-ui/components/buttons/ripple";

const SparkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 2L9.5 9L3 11L9.5 13L11.5 20L13.5 13L20 11L13.5 9L11.5 2Z" fill="currentColor"/>
    <path d="M19 17L18.25 19.25L16 20L18.25 20.75L19 23L19.75 20.75L22 20L19.75 19.25L19 17Z" fill="currentColor"/>
  </svg>
);

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  featuresText: string;
  subFeatures: string[];
  imagePlacement?: "left" | "right";
  imageUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  featuresText,
  subFeatures,
  imagePlacement = "right",
  imageUrl
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=50px",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const imageSection = (
    <div className={`w-full lg:w-[560px] h-[300px] lg:h-[506px] rounded-[24px] overflow-hidden shrink-0 bg-[#d9d9d9] relative ${imagePlacement === 'left' ? 'lg:mr-[40px]' : 'lg:ml-[40px]'}`}>
      {imageUrl && <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[var(--duration-motion-content)] ease-[var(--ease-premium)]" />}
    </div>
  );

  const contentSection = (
    <div className="flex-1 flex flex-col gap-[40px] md:gap-[64px] min-w-0 py-4">
      <div className="flex flex-col gap-[32px] md:gap-[64px]">
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-wrap gap-[12px]">
            {tags.map((tag, i) => (
              <div key={i} className="border border-[#e4e4e4] rounded-[99px] px-[16px] py-[6px] flex items-center justify-center">
                <span className="font-sans text-[14px] text-[#3d3d3d] whitespace-nowrap">{tag}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-[12px] text-black">
            <h3 className="font-jakarta font-medium text-[32px] md:text-[40px] leading-tight">{title}</h3>
            <p className="font-sans font-normal text-[16px] md:text-[18px] leading-[30px] opacity-80">{description}</p>
          </div>
        </div>
        <p className="font-jakarta font-medium text-[18px] md:text-[20px] leading-[28px] text-black">
          {featuresText}
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center gap-[16px] md:gap-[24px] font-jakarta font-medium text-[18px] md:text-[24px] text-black leading-[32px]">
        {subFeatures.map((feat, i) => (
          <p key={i} className="flex-1">{feat}</p>
        ))}
      </div>

      <div className="flex flex-wrap gap-[16px] md:gap-[24px] items-center mt-auto pt-8 md:pt-0">
        <RippleButton 
          variant="dark"
          className="bg-[#1d1d1d] hover:bg-black transition-colors rounded-[99px] px-[16px] py-[8px] flex items-center gap-[8px] group"
        >
          <span className="font-sans text-[16px] text-white">View Summary</span>
          <span className="text-white group-hover:scale-110 transition-transform"><SparkIcon /></span>
          <RippleButtonRipples />
        </RippleButton>
        <RippleButton 
          variant="dark"
          className="bg-[#1d1d1d] hover:bg-black transition-colors rounded-[99px] px-[16px] py-[8px] flex items-center gap-[8px] group"
        >
          <span className="font-sans text-[16px] text-white">Request Access</span>
          <span className="text-white group-hover:scale-110 transition-transform"><SparkIcon /></span>
          <RippleButtonRipples />
        </RippleButton>
      </div>
    </div>
  );

  return (
    <div ref={cardRef} className="bg-[#f5f5f5] rounded-[24px] p-[24px] flex flex-col lg:flex-row items-stretch w-full max-w-[1280px] mx-auto gap-[24px] lg:gap-0 group hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-[var(--duration-motion-ui)] ease-[var(--ease-premium)]">
      {imagePlacement === "left" && imageSection}
      {contentSection}
      {imagePlacement === "right" && imageSection}
    </div>
  );
}
