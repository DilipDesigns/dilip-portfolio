"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from "react";

interface TextRevealContextType {
  progress: number;
  totalTokens: number;
}

const TextRevealContext = createContext<TextRevealContextType>({ progress: 0, totalTokens: 0 });

interface TextRevealProps {
  body: string;
  className?: string;
  children: (tokens: string[]) => React.ReactNode;
}

export const TextReveal = ({ body, className, children }: TextRevealProps) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const words = useMemo(() => {
    // Split into words, preserving spaces by appending a trailing space to each word,
    // except perhaps the last one, or just let CSS gap handle it. 
    // Usually a regex matching non-whitespace followed by whitespace works well.
    const matches = body.match(/\S+\s*/g);
    return matches ? matches : [];
  }, [body]);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // The container has height e.g. 200vh.
          // We track progress from when container hits top of viewport (rect.top = 0)
          // to when the bottom of container hits bottom of viewport.
          const scrollableDistance = rect.height - windowHeight;
          let p = 0;
          if (scrollableDistance > 0) {
            p = -rect.top / scrollableDistance;
          }
          
          p = Math.max(0, Math.min(1, p));
          setProgress(p);
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <TextRevealContext.Provider value={{ progress, totalTokens: words.length }}>
        {children(words)}
      </TextRevealContext.Provider>
    </div>
  );
};

interface TokenProps {
  index: number;
  children: (isActive: boolean) => React.ReactNode;
}

TextReveal.Token = function Token({ index, children }: TokenProps) {
  const { progress, totalTokens } = useContext(TextRevealContext);
  
  // Calculate threshold for this token
  const step = 1 / totalTokens;
  const start = index * step;
  
  const isActive = progress > start;
  
  return <>{children(isActive)}</>;
};
