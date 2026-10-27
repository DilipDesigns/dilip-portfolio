"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { RippleButton, RippleButtonRipples } from "./animate-ui/components/buttons/ripple";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(true);

  // Maintain visual contrast: on Homepage ('/'), the top hero section is dark cyber-blue.
  // On inner pages ('/work', '/about', '/contact', '/lab', etc.) or past the homepage hero,
  // background is light, so text and logo adapt cleanly while layout and dimensions remain identical.
  useEffect(() => {
    if (pathname !== "/") {
      setIsDarkBg(false);
      return;
    }

    const checkDarkBg = () => {
      // Hero section height is roughly 750px-800px on desktop
      setIsDarkBg(window.scrollY < 750);
    };

    checkDarkBg();
    window.addEventListener("scroll", checkDarkBg, { passive: true });
    return () => window.removeEventListener("scroll", checkDarkBg);
  }, [pathname]);

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
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div className="w-full bg-transparent backdrop-blur-[8px]">
          <div className="site-container h-[80px] flex items-center justify-between pointer-events-auto">
            {/* Logo */}
            <div className="flex items-center relative shrink-0">
              <Link 
                href="/" 
                className="flex items-center relative shrink-0 hover:opacity-80 transition-opacity"
                aria-label="Dilip - Home"
              >
                <div className="relative shrink-0 w-[44px] h-[44px] flex items-center justify-center">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-colors duration-300">
                    <rect x="10" y="15" width="8" height="70" fill={isDarkBg ? "#ffffff" : "#040b26"} />
                    <rect x="26" y="15" width="14" height="70" fill={isDarkBg ? "#ffffff" : "#040b26"} />
                    <path d="M 48 15 H 58 A 35 35 0 0 1 58 85 H 48 V 15 Z" fill={isDarkBg ? "#ffffff" : "#040b26"} />
                  </svg>
                </div>
              </Link>
              
              {/* Desktop Nav */}
              <nav className="hidden md:flex gap-[4px] items-center ml-8 relative shrink-0" aria-label="Main Navigation">
                {navLinks.map((tab) => {
                  const path = `/${tab.toLowerCase()}`;
                  const isActive = pathname === path || (pathname?.startsWith(path) && path !== '/');
                  return (
                    <Link
                      key={tab}
                      href={path}
                      className={clsx(
                        "flex items-center justify-center px-[20px] py-[8px] rounded-full transition-colors",
                        isDarkBg
                          ? (isActive ? "bg-white/20 text-white font-medium backdrop-blur-md" : "hover:bg-white/10 text-white/90 hover:text-white")
                          : (isActive ? "bg-black/5 text-[#1d1d1d] font-semibold" : "hover:bg-black/[0.04] text-[#656565] hover:text-[#1d1d1d]")
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
              {/* Availability Indicator */}
              <div className="hidden md:flex gap-[8px] items-center justify-center px-[10px] py-[16px] relative shrink-0">
                <div className="relative shrink-0 w-[8px] h-[8px] bg-[#02ae78] rounded-full" />
                <span className="font-inter font-medium leading-[20px] relative shrink-0 text-[#02ae78] text-[15px] whitespace-nowrap">
                  Available
                </span>
              </div>
              
              {/* Talk to My AI Button */}
              <div className="hidden sm:flex relative rounded-[99px] p-[1.5px] overflow-hidden items-center justify-center shrink-0">
                {/* Spinning Gradient Background */}
                <div className="absolute w-[300%] aspect-square bg-[conic-gradient(from_0deg,transparent_70%,#ffffff_100%)] animate-[spin_4s_linear_infinite]" />
                
                <RippleButton 
                  variant="dark"
                  rippleColor="rgba(255, 255, 255, 0.25)"
                  className="bg-[#1d1d1d] cursor-pointer flex gap-[4px] items-center justify-center px-[16px] py-[8px] relative rounded-[99px] w-full h-full z-10 hover:bg-black transition-colors min-h-[44px]"
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
                aria-label="Open navigation menu"
                className={clsx(
                  "flex items-center justify-center w-[44px] h-[44px] rounded-full shrink-0 md:hidden transition-colors min-w-[44px] min-h-[44px]",
                  isDarkBg
                    ? "bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/25"
                    : "bg-black/5 border border-black/10 text-[#1d1d1d] hover:bg-black/10"
                )}
              >
                <span className="text-lg">☰</span>
                <RippleButtonRipples />
              </RippleButton>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={clsx(
          "fixed inset-0 z-[100] bg-[#f5f5f2]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full">
          <div className="relative shrink-0 w-[40px] h-[40px] flex items-center justify-center">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect x="10" y="15" width="8" height="70" fill="#040b26" />
              <rect x="26" y="15" width="14" height="70" fill="#040b26" />
              <path d="M 48 15 H 58 A 35 35 0 0 1 58 85 H 48 V 15 Z" fill="#040b26" />
            </svg>
          </div>

          <RippleButton 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="w-[44px] h-[44px] bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-xl transition-colors text-black"
          >
            ✕
            <RippleButtonRipples />
          </RippleButton>
        </div>

        <nav className="flex flex-col gap-6 items-center text-center my-auto py-8">
          {navLinks.map((tab) => {
            const path = `/${tab.toLowerCase()}`;
            const isActive = pathname === path || (pathname?.startsWith(path) && path !== '/');
            return (
              <Link
                key={tab}
                href={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  "font-jakarta text-[32px] sm:text-[36px] transition-colors",
                  isActive ? "text-black font-semibold" : "text-[#656565] font-medium hover:text-black"
                )}
              >
                {tab}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col items-center gap-4 pb-4">
          <div className="flex gap-[8px] items-center justify-center">
            <div className="relative shrink-0 w-[10px] h-[10px] bg-[#02ae78] rounded-full" />
            <span className="font-inter font-medium leading-[20px] relative shrink-0 text-[#02ae78] text-[16px]">
              Available for work
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
