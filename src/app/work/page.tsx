import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import { RippleButton, RippleButtonRipples } from "@/components/animate-ui/components/buttons/ripple";

const projects = [
  {
    title: "EHNOTE",
    description: "Redesigning healthcare operations software to reduce workflow complexity, improve usability, and help medical teams work faster across clinics and practices.",
    tags: ["SaaS", "Product Design", "8 min read"],
    featuresText: "EMR • Practice Management • Multi-Location Healthcare",
    subFeatures: ["Enterprise Healthcare", "Inventory Management", "Workflow Automation"],
    imagePlacement: "left" as const,
  },
  {
    title: "EHNOTE",
    description: "Redesigning healthcare operations software to reduce workflow complexity, improve usability, and help medical teams work faster across clinics and practices.",
    tags: ["Healthcare SaaS", "Product Design", "8 min read"],
    featuresText: "EMR • Practice Management • Multi-Location Healthcare",
    subFeatures: ["Enterprise Healthcare", "Inventory Management", "Workflow Automation"],
    imagePlacement: "right" as const,
  }
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f2] relative pb-32">
      <div className="pt-[120px] md:pt-[164px] site-container relative z-10">
        <p className="font-sans text-[16px] leading-[28px] text-black mb-[24px]">
          Selected Works
        </p>
        <ScrollReveal
          containerClassName="max-w-[1280px]"
          textClassName="font-jakarta font-medium text-[40px] md:text-[64px] leading-tight md:leading-[72px] text-black"
          baseOpacity={0.2}
          blurStrength={10}
        >
          Designing products, workflows, and digital experiences that solve real problems.
        </ScrollReveal>
        <p className="font-sans text-[16px] md:text-[18px] leading-[28px] md:leading-[30px] text-black mt-[40px] max-w-[1280px]">
          A curated collection of projects across healthcare, SaaS, AI concepts, workflow systems, and digital experiences.
        </p>
      </div>

      {/* Projects Section */}
      <div className="mt-[80px] md:mt-[104px] site-container sticky top-0 md:top-[80px] bg-[#f5f5f2]/95 backdrop-blur-sm z-20 py-4">
        <div className="flex flex-col gap-[15px] max-w-[1280px] mx-auto">
          <p className="font-sans text-[16px] text-black leading-[28px] hidden md:block">
            Explore.
          </p>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-[24px]">
            <div className="flex items-center gap-[12px] overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
               {["All", "Healthcare", "SaaS", "Concepts", "Brand & Web"].map((filter, i) => (
                <RippleButton 
                  key={i} 
                  variant="outline"
                  className={`border border-[#e4e4e4] rounded-[99px] px-[16px] py-[6px] flex items-center justify-center whitespace-nowrap hover:bg-gray-50 transition-colors ${i === 0 ? 'bg-gray-100' : ''}`}
                >
                  <span className="font-sans text-[14px] text-[#3d3d3d]">{filter}</span>
                  <RippleButtonRipples />
                </RippleButton>
              ))}
            </div>
            <div className="border border-[#e4e4e4] rounded-[99px] px-[16px] py-[6px] flex items-center justify-center w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Search projects, workflows, or ideas.." 
                className="font-sans text-[14px] text-[#3d3d3d] bg-transparent outline-none w-full md:w-[250px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="site-container mt-[40px] flex flex-col gap-[80px] relative z-10">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </main>
  );
}
