"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ButtonHTMLAttributes,
  HTMLAttributes
} from "react";
import Link from "next/link";
import clsx from "clsx";

interface Ripple {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface RippleContextType {
  ripples: Ripple[];
}

const RippleContext = createContext<RippleContextType | null>(null);

export interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark" | "icon";
  size?: "default" | "sm" | "lg" | "icon";
  rippleColor?: string; // Custom Hex or tailwind class for ripple color
  target?: string;
  rel?: string;
}

export function RippleButton({
  children,
  className,
  href,
  variant,
  size,
  rippleColor,
  onClick,
  onKeyDown,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLElement>(null);
  const lastTouchTime = useRef(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const addRipple = (clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;

    const rect = el.getBoundingClientRect();
    
    // Centered fallback if coordinates are empty/keyboard triggers
    const isKeyboard = clientX === 0 && clientY === 0;
    const x = isKeyboard ? rect.width / 2 : clientX - rect.left;
    const y = isKeyboard ? rect.top + rect.height / 2 : clientY - rect.top;
    
    const rippleSize = Math.max(rect.width, rect.height) * 2;
    const id = Math.random().toString(36).substring(2, 9);

    // Resolve color: default to currentColor, fallback based on variant if custom not defined
    let finalColor = rippleColor || "currentColor";
    if (!rippleColor) {
      if (variant === "primary" || variant === "dark") {
        finalColor = "rgba(255, 255, 255, 0.25)";
      } else if (variant === "secondary" || variant === "outline" || variant === "ghost") {
        finalColor = "rgba(29, 29, 29, 0.12)";
      }
    }

    const newRipple = { id, x, y, size: rippleSize, color: finalColor };
    setRipples((prev) => [...prev, newRipple]);

    // Cleanup after animation completes (600ms)
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (Date.now() - lastTouchTime.current < 800) return;
    addRipple(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    lastTouchTime.current = Date.now();
    const touch = e.touches[0];
    addRipple(touch.clientX, touch.clientY);
  };

  const handleKeyDown = (e: React.KeyboardEvent<any>) => {
    if (e.key === "Enter" || e.key === " ") {
      // Trigger centered fallback ripple
      addRipple(0, 0);
    }
    if (onKeyDown) onKeyDown(e);
  };

  const handleTriggerClick = (e: React.MouseEvent<any>) => {
    if (onClick) onClick(e);
  };

  // Base styling for structural container
  const baseClasses = "relative overflow-hidden transition-all active:scale-[0.98] duration-100 select-none cursor-pointer";
  const combinedClassName = clsx(baseClasses, className);

  const sharedProps = {
    className: combinedClassName,
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
    onKeyDown: handleKeyDown,
    onClick: handleTriggerClick,
    ...props
  };

  return (
    <RippleContext.Provider value={{ ripples }}>
      {href ? (
        <Link 
          href={href} 
          ref={containerRef as React.RefObject<HTMLAnchorElement>} 
          {...(sharedProps as any)}
        >
          {children}
        </Link>
      ) : (
        <button 
          type="button" 
          ref={containerRef as React.RefObject<HTMLButtonElement>} 
          {...sharedProps}
        >
          {children}
        </button>
      )}
    </RippleContext.Provider>
  );
}

export interface RippleButtonRipplesProps extends HTMLAttributes<HTMLDivElement> {}

export function RippleButtonRipples({ className, ...props }: RippleButtonRipplesProps) {
  const context = useContext(RippleContext);
  if (!context) {
    throw new Error("RippleButtonRipples must be rendered within a RippleButton provider container.");
  }

  return (
    <div 
      className={clsx("absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-0", className)}
      {...props}
    >
      {context.ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            backgroundColor: ripple.color,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 1);
            opacity: 1;
          }
          100% {
            transform: translate3d(-50%, -50%, 0) scale3d(1, 1, 1);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 600ms cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
