"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { RippleButton, RippleButtonRipples } from "./animate-ui/components/buttons/ripple";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const lastScrollY = useRef(0);
  
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const heroThreshold = 80;
          
          if (currentScrollY > heroThreshold) {
            setIsScrolled(true);
            const scrollDelta = currentScrollY - lastScrollY.current;
            if (scrollDelta > 10) {
              setIsHidden(true);
            } else if (scrollDelta < -10) {
              setIsHidden(false);
            }
          } else {
            setIsScrolled(false);
            setIsHidden(false);
          }
          
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const navLinks = ["Work", "Lab", "About", "Contact"];

  return (
    <>
      <header 
        className={clsx(
          "fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          isHidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div 
          className={clsx(
            "mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
            isScrolled 
              ? "max-w-[1000px] px-4 md:px-6 h-[64px] bg-[#f5f5f2]/70 backdrop-blur-xl rounded-full shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] border border-white/50 mt-4 mx-4 md:mx-auto" 
              : "max-w-[1400px] px-6 md:px-12 min-[1400px]:px-[120px] h-[80px] bg-transparent border-transparent mt-0"
          )}
        >
          {/* Logo */}
          <div className="flex items-center relative shrink-0">
            <Link href="/" className="flex items-center relative shrink-0 hover:opacity-80 transition-opacity">
              <div className="relative shrink-0 w-[44px] h-[44px] flex items-center justify-center">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect x="10" y="15" width="8" height="70" fill={isScrolled ? "#040b26" : "#ffffff"} />
                  <rect x="26" y="15" width="14" height="70" fill={isScrolled ? "#040b26" : "#ffffff"} />
                  <path d="M 48 15 H 58 A 35 35 0 0 1 58 85 H 48 V 15 Z" fill={isScrolled ? "#040b26" : "#ffffff"} />
                </svg>
              </div>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-[4px] items-center ml-8 relative shrink-0">
              {navLinks.map((tab) => {
                const path = `/${tab.toLowerCase()}`;
                const isActive = pathname === path || (pathname?.startsWith(path) && path !== '/');
                return (
                  <Link
                    key={tab}
                    href={path}
                    className={clsx(
                      "flex items-center justify-center px-[20px] py-[8px] rounded-full transition-colors",
                      isScrolled
                        ? (isActive ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-[#656565] hover:text-black")
                        : (isActive ? "bg-white/20 text-white font-medium backdrop-blur-md" : "hover:bg-white/10 text-white/90 hover:text-white")
                    )}
                  >
                    <span className={clsx(
                      "font-jakarta leading-[24px] text-[15px] whitespace-nowrap",
                      isActive ? "font-medium" : "font-normal"
                    )}>
                      {tab}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex gap-[16px] items-center relative shrink-0">
            <div className="hidden md:flex gap-[8px] items-center justify-center px-[10px] py-[16px] relative shrink-0">
              <div className="relative shrink-0 w-[8px] h-[8px] bg-[#02ae78] rounded-full" />
              <span className="font-inter font-medium leading-[20px] relative shrink-0 text-[#02ae78] text-[15px] whitespace-nowrap">
                Available
              </span>
            </div>
            
            {/* AI Button */}
            <div className="hidden sm:flex relative rounded-[99px] p-[1.5px] overflow-hidden items-center justify-center shrink-0">
              {/* Spinning Gradient Background */}
              <div className="absolute w-[300%] aspect-square bg-[conic-gradient(from_0deg,transparent_70%,#ffffff_100%)] animate-[spin_4s_linear_infinite]" />
              
              <RippleButton 
                variant="dark"
                rippleColor="rgba(255, 255, 255, 0.25)"
                className="bg-[#1d1d1d] cursor-pointer flex gap-[4px] items-center justify-center px-[16px] py-[8px] relative rounded-[99px] w-full h-full z-10 hover:bg-black transition-colors"
              >
                <span className="shiny-text font-jakarta font-normal leading-[28px] relative shrink-0 text-[15px] whitespace-nowrap">
                  Talk to My AI
                </span>
                <div className="relative shrink-0 w-[24px] h-[24px] flex items-center justify-center">
                  <span className="text-white text-lg">✨</span>
                </div>
                <RippleButtonRipples />
              </RippleButton>
            </div>
            
            {/* Mobile Menu Button */}
            <RippleButton 
              onClick={() => setIsMobileMenuOpen(true)}
              className="bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] rounded-full shrink-0 md:hidden hover:bg-white/25 transition-colors text-white"
            >
              <span className="text-lg">☰</span>
              <RippleButtonRipples />
            </RippleButton>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={clsx(
          "fixed inset-0 z-[100] bg-[#f5f5f2]/95 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)]",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <RippleButton 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 w-[48px] h-[48px] bg-gray-100 rounded-full flex items-center justify-center text-xl hover:bg-gray-200 transition-colors text-black"
        >
          ✕
          <RippleButtonRipples />
        </RippleButton>

        <nav className="flex flex-col gap-8 items-center text-center">
          {navLinks.map((tab) => {
            const path = `/${tab.toLowerCase()}`;
            const isActive = pathname === path || (pathname?.startsWith(path) && path !== '/');
            return (
              <Link
                key={tab}
                href={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  "font-jakarta text-[36px] transition-colors",
                  isActive ? "text-black font-semibold" : "text-[#656565] font-medium hover:text-black"
                )}
              >
                {tab}
              </Link>
            );
          })}
          
          <div className="mt-12 flex gap-[12px] items-center justify-center">
            <div className="relative shrink-0 w-[12px] h-[12px] bg-[#02ae78] rounded-full" />
            <span className="font-inter font-medium leading-[20px] relative shrink-0 text-[#02ae78] text-[18px]">
              Available for work
            </span>
          </div>
        </nav>
      </div>
    </>
  );
}
