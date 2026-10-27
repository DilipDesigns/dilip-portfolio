"use client";
import React, { useEffect, useState } from "react";

export interface StickySidebarProps {
  sections: { id: string; label: string }[];
}

export default function StickySidebar({ sections }: StickySidebarProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset for sticky header

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;
          if (scrollPosition >= absoluteTop && scrollPosition < absoluteTop + bottom - top) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="w-full lg:w-[240px] shrink-0 sticky top-[100px] lg:top-[120px] self-start z-30 bg-white/90 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none pb-4 lg:pb-0 mb-8 lg:mb-0 border-b border-gray-100 lg:border-none">
      <div className="flex lg:flex-col gap-[16px] lg:gap-[24px] font-sans font-normal text-[14px] lg:text-[16px] leading-[28px] overflow-x-auto lg:overflow-visible hide-scrollbar lg:pt-[24px]">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => handleClick(e, section.id)}
            className={`transition-colors hover:text-black whitespace-nowrap lg:whitespace-normal ${activeSection === section.id ? "text-black font-medium" : "text-[#656565]"}`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </div>
  );
}
