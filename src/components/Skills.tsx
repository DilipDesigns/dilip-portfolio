import React from "react";

const skills = [
  {
    num: "01",
    title: "Human First",
    desc: "Technology should adapt to people, not the other way around.",
  },
  {
    num: "02",
    title: "AI as a Partner",
    desc: "I see AI as a collaborator that helps people explore ideas, make decisions, and move faster.",
  },
  {
    num: "03",
    title: "Clarity Creates Trust",
    desc: "The smartest system means nothing if people don’t understand it.",
  },
  {
    num: "04",
    title: "Workflows Matter",
    desc: "I focus on understanding how people think, work, and make decisions before designing screens.",
  },
  {
    num: "05",
    title: "Curiosity Drives Innovation",
    desc: "I constantly explore new tools, technologies, and interaction models to understand what’s possible.",
  },
  {
    num: "06",
    title: "Designing Beyond Screens",
    desc: "Interfaces are evolving from pages and buttons to conversations, assistants, and intelligent experiences.",
  },
];

export default function Skills() {
  return (
    <section className="py-24 md:py-32 bg-[#f5f5f2] text-[#1d1d1d] w-full">
      <div className="max-w-[1500px] mx-auto px-6 md:px-[80px] flex flex-col gap-16 md:gap-[80px] w-full">
        
        {/* Header Text */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 w-full">
          <h2 className="font-sans font-bold text-[36px] md:text-[56px] leading-[1.15] text-[#1d1d1d] max-w-[737px] tracking-tight">
            How I think about Design in the age of intelligence.
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div 
              key={skill.num} 
              className="bg-white border border-[#e4e4e4] rounded-[16px] p-6 flex flex-col justify-between min-h-[280px]"
            >
              <div className="flex flex-col">
                {/* Number Badge */}
                <div className="bg-[#0a1341] w-[56px] h-[56px] rounded-[12px] flex items-center justify-center shadow-[0px_16px_12px_rgba(10,19,65,0.22)] shrink-0">
                  <span className="text-white font-semibold font-sans text-[22px]">{skill.num}</span>
                </div>
                
                {/* Title */}
                <h3 className="font-sans font-medium text-[24px] text-[#091033] mt-8 leading-[32px] tracking-tight">
                  {skill.title}
                </h3>
                
                {/* Divider Line */}
                <div className="w-[133px] h-[1px] bg-gradient-to-r from-gray-200 to-transparent mt-6 mb-6" />
              </div>
              
              {/* Description */}
              <p className="font-sans text-[16px] text-[#8c93b9] leading-[28px]">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Statement */}
        <div className="flex items-center justify-center w-full mt-4 border-t border-[#e4e4e4] pt-12 md:pt-16">
          <div className="font-sans font-medium text-[16px] md:text-[18px] text-[#1d1d1d] text-center leading-[28px] max-w-[650px] mx-auto">
            <p className="mb-0">The future isn’t designing better screens.</p>
            <p className="text-[#8c93b9]">It’s designing better relationships between people and intelligence.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
