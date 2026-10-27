import React from "react";
import { RippleButton, RippleButtonRipples } from "./animate-ui/components/buttons/ripple";

export default function SelectedWork() {
  return (
    <section id="work" className="py-32 bg-[#f5f5f2] text-[#1d1d1d] w-full">
      <div className="max-w-[1500px] mx-auto px-6 md:px-[80px] flex flex-col md:flex-row md:items-end justify-between gap-8 w-full">
        <div className="flex flex-col gap-[24px] max-w-[519px]">
          <h2 className="font-inter font-medium text-[40px] md:text-[56px] leading-tight">
            Selected Work.
          </h2>
          <p className="font-inter font-normal text-[16px] md:text-[18px] text-[#1d1d1d] opacity-80">
            A curated selection of projects focused on thoughtful user experiences, purposeful design, and solving real product problems with clarity and intention.
          </p>
        </div>
        <RippleButton 
          variant="secondary"
          className="bg-[#f5f5f5] hover:bg-[#e4e4e4] transition-colors flex items-center justify-center px-[24px] py-[16px] rounded-[12px] self-start md:self-end text-[#1d1d1d]"
        >
          <span className="font-inter font-semibold text-[16px]">
            View all projects.
          </span>
          <RippleButtonRipples />
        </RippleButton>
      </div>
      
      {/* Work Grid Placeholder */}
      <div className="max-w-[1500px] mx-auto px-6 md:px-[80px] mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="aspect-[4/3] bg-gray-200 rounded-[24px] flex items-center justify-center overflow-hidden relative group">
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="font-inter text-gray-400 font-medium text-lg">Project Case Study</span>
          </div>
        ))}
      </div>
    </section>
  );
}
