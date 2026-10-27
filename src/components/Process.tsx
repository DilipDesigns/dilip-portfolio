"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { RippleButton, RippleButtonRipples } from "./animate-ui/components/buttons/ripple";

const processStages = [
  {
    id: "discover",
    title: "Discover & Understand",
    description: "Understand the product, users, business goals, constraints, and existing workflows before deciding what needs to be designed.",
    tags: ["Research", "Stakeholder Inputs", "Product Audit", "User Flows"],
  },
  {
    id: "define",
    title: "Define & Structure",
    description: "Synthesize findings into clear problems. Define system architecture, user journeys, and information hierarchy.",
    tags: ["Information Architecture", "Journey Mapping", "Wireframing", "Strategy"],
  },
  {
    id: "design",
    title: "Design & Validate",
    description: "Craft intuitive interfaces and test them with real users. Iterate based on feedback to ensure usability and accessibility.",
    tags: ["UI Design", "Prototyping", "Usability Testing", "Design Systems"],
  },
  {
    id: "deliver",
    title: "Deliver & Launch",
    description: "Partner closely with engineering to ensure high-quality implementation. Monitor launch metrics and gather post-launch feedback.",
    tags: ["Developer Handoff", "QA Support", "Design QA", "Iterative Polish"],
  },
];

export default function Process() {
  const [activeId, setActiveId] = useState<string>("discover");

  return (
    <section id="process" className="section-padding-y bg-[#FFFFFF] overflow-hidden flex flex-col items-center w-full">
      <div className="site-container flex flex-col gap-12 md:gap-16 lg:gap-20">
        
        {/* Header Text */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-[24px] lg:gap-[100px] xl:gap-[350px] w-full">
          <h2 className="font-sans font-medium text-[40px] md:text-[56px] leading-[1.1] text-[#1d1d1d] shrink-0 xl:w-[411px]">
            My Process
          </h2>
          <p className="font-sans text-[16px] leading-[28px] text-[#1d1d1d] flex-1 max-w-[600px] xl:max-w-none">
            A flexible product design process built around understanding complexity, defining the right problems, and turning them into clear, scalable experiences.
          </p>
        </div>

        {/* Interactive Cards */}
        <div className="flex flex-col lg:flex-row gap-[24px] w-full lg:min-h-[460px]">
          {processStages.map((stage) => {
            const isActive = activeId === stage.id;
            
            return (
              <div
                key={stage.id}
                onClick={() => setActiveId(stage.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId(stage.id);
                  }
                }}
                tabIndex={0}
                aria-expanded={isActive}
                role="button"
                className={clsx(
                  "group relative rounded-[24px] px-[24px] py-[32px] md:px-[32px] lg:py-[44px] flex flex-col justify-between overflow-hidden cursor-pointer border border-[#e4e4e4]",
                  "transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] outline-none focus-visible:ring-2 focus-visible:ring-[#1d1d1d]",
                  isActive 
                    ? "bg-white shadow-[0px_8px_40px_rgba(0,0,0,0.06)] lg:flex-[1.4_1.4_0%] xl:flex-[1.55_1.55_0%]" 
                    : "bg-[#fafafa] hover:bg-white shadow-none hover:border-gray-300 lg:flex-[1_1_0%]"
                )}
              >
                {/* Content Container */}
                <div className="flex flex-col h-full w-full justify-between z-10 relative">
                  
                  <div className="flex flex-col w-full">
                    {/* Heading */}
                    <div className="flex justify-between items-start w-full">
                      <h3 className={clsx(
                        "font-sans font-medium text-[24px] lg:text-[32px] leading-[1.25] text-black pr-[24px] lg:pr-0",
                        "transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] origin-left",
                        !isActive && "group-hover:translate-x-[4px]"
                      )}>
                        {stage.title}
                      </h3>
                      
                      {/* Mobile Plus Icon (hidden on lg) */}
                      <RippleButton
                        tabIndex={-1}
                        className={clsx(
                          "lg:hidden rounded-full w-[44px] h-[44px] flex items-center justify-center shrink-0 border-none outline-none",
                          "transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
                          isActive 
                            ? "opacity-0 scale-50 pointer-events-none" 
                            : "opacity-100 scale-100 bg-[#f5f5f5] group-hover:bg-[#e4e4e4]"
                        )}
                        rippleColor="rgba(0, 0, 0, 0.15)"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d1d1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-[500ms]">
                          <path d="M12 5v14m-7-7h14"/>
                        </svg>
                        <RippleButtonRipples />
                      </RippleButton>
                    </div>

                    {/* Expandable Description and Tags (Mobile + Desktop) */}
                    <div className={clsx(
                      "grid transition-[grid-template-rows] duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}>
                      <div className="overflow-hidden">
                        <div className={clsx(
                          "flex flex-col gap-[16px] pt-[32px] md:pt-[44px] pb-[32px] lg:pb-0",
                          "transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] delay-[100ms]",
                          isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-[8px] pointer-events-none"
                        )}>
                          <p className="font-sans text-[16px] leading-[28px] text-[#3c3c3c]">
                            {stage.description}
                          </p>
                          
                          {/* Tags - visible inside the flow on both mobile and desktop */}
                          <div className="flex flex-wrap gap-[8px]">
                            {stage.tags.map((tag, i) => (
                              <div key={i} className="bg-[#f5f5f5] px-[16px] py-[4px] rounded-[24px] flex items-center justify-center shrink-0">
                                <span className="font-sans text-[14px] leading-[28px] text-[#3c3c3c] whitespace-nowrap">
                                  {tag}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Inactive Action Region (Hidden on mobile and hidden when active) */}
                  <div className={clsx(
                    "hidden lg:flex flex-row items-center mt-auto w-full",
                    "transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
                    isActive ? "opacity-0 pointer-events-none absolute bottom-0 left-0" : "opacity-100 relative"
                  )}>
                    {/* Desktop Plus Icon */}
                    <RippleButton
                      tabIndex={-1}
                      className={clsx(
                        "rounded-full w-[44px] h-[44px] flex items-center justify-center shrink-0 bg-[#f5f5f5] group-hover:bg-[#e4e4e4] group-hover:rotate-90 border-none outline-none",
                        "transition-all duration-[500ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                      )}
                      rippleColor="rgba(0, 0, 0, 0.15)"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d1d1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-[500ms]">
                        <path d="M12 5v14m-7-7h14"/>
                      </svg>
                      <RippleButtonRipples />
                    </RippleButton>
                  </div>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
