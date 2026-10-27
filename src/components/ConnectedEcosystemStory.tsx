"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { RippleButton, RippleButtonRipples } from "./animate-ui/components/buttons/ripple";

// Types for story config
interface Artifact {
  id: string;
  badge: string;
  text: string;
  type: "insight" | "quote" | "flow" | "architecture" | "metric" | "action" | "sync" | "nodes";
  meta?: string;
  // Position properties for desktop (Tailwind classes for placement)
  desktopClass: string;
  // Position properties for tablet (to reduce overlap, only some cards show on tablet)
  tabletShow: boolean;
  tabletClass?: string;
  // Custom graphics content renderer
  graphic?: React.ReactNode;
}

interface Chapter {
  id: string;
  phrase: string;
  phraseId: string; // DOM ID to target the phrase span
  accentClass: string;
  artifacts: Artifact[];
}

const storyChapters: Chapter[] = [
  {
    id: "people",
    phrase: "people",
    phraseId: "phrase-people",
    accentClass: "text-[#0ea5e9] drop-shadow-[0_0_12px_rgba(14,165,233,0.15)]",
    artifacts: [
      {
        id: "people-insight",
        badge: "INSIGHT • #12",
        text: "Physicians experience cognitive fatigue within 15 minutes of shift changes due to disjointed handoff logs.",
        type: "insight",
        meta: "CLINICAL RESEARCH",
        desktopClass: "top-[12%] left-[6%] w-[290px] xl:w-[320px]",
        tabletShow: true,
        tabletClass: "top-[15%] left-[8%] w-[280px]",
        graphic: (
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-mono text-gray-400">FATIGUE INDEX: CRITICAL</span>
          </div>
        )
      },
      {
        id: "people-quote",
        badge: "FEEDBACK • CHIEF OF MEDICINE",
        text: "The EHR transition was supposed to save time, but I spend more hours staring at screens than listening to patients.",
        type: "quote",
        meta: "INTERVIEW TRANSCRIPT",
        desktopClass: "top-[10%] right-[6%] w-[320px] xl:w-[360px]",
        tabletShow: true,
        tabletClass: "top-[12%] right-[8%] w-[300px]",
        graphic: (
          <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-gray-100">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">Dr. A</div>
            <span className="text-[10px] text-gray-400 font-sans">University Hospital System</span>
          </div>
        )
      },
      {
        id: "people-observation",
        badge: "OBSERVATION • USABILITY",
        text: "Users frequently miss the critical drug-allergy flag due to visual clutter on the patient header.",
        type: "insight",
        meta: "COGNITIVE TASK ANALYSIS",
        desktopClass: "bottom-[14%] left-[8%] w-[300px] xl:w-[330px]",
        tabletShow: false,
        graphic: (
          <div className="mt-2.5 px-2 py-1 rounded bg-red-50 border border-red-100 text-[10px] text-red-600 font-mono inline-block">
            ALERT FLAG RECOGNITION: 42%
          </div>
        )
      },
      {
        id: "people-journey",
        badge: "JOURNEY MATRIX",
        text: "Patient ingest workflow involves 3 distinct handoffs across clinical and billing personnel.",
        type: "flow",
        meta: "SERVICE BLUEPRINT",
        desktopClass: "bottom-[12%] right-[8%] w-[290px] xl:w-[320px]",
        tabletShow: false,
        graphic: (
          <div className="flex items-center justify-between gap-1 mt-3 px-1">
            <span className="text-[9px] font-mono bg-gray-50 px-1.5 py-0.5 rounded text-gray-600 border border-gray-100">Adm</span>
            <span className="text-gray-300">→</span>
            <span className="text-[9px] font-mono bg-sky-50 px-1.5 py-0.5 rounded text-sky-600 border border-sky-100">Triage</span>
            <span className="text-gray-300">→</span>
            <span className="text-[9px] font-mono bg-gray-50 px-1.5 py-0.5 rounded text-gray-600 border border-gray-100">Room</span>
          </div>
        )
      }
    ]
  },
  {
    id: "workflows",
    phrase: "workflows",
    phraseId: "phrase-workflows",
    accentClass: "text-[#6366f1] drop-shadow-[0_0_12px_rgba(99,102,241,0.15)]",
    artifacts: [
      {
        id: "workflow-status",
        badge: "WORKFLOW • STATUS",
        text: "Simplifying handoff steps from 12 separate interactions down to 4 structured user actions.",
        type: "flow",
        meta: "INTERACTION CONSOLIDATION",
        desktopClass: "top-[14%] left-[8%] w-[300px] xl:w-[335px]",
        tabletShow: true,
        tabletClass: "top-[16%] left-[8%] w-[280px]",
        graphic: (
          <div className="flex items-end gap-3 mt-3.5">
            <div className="flex flex-col text-center">
              <span className="text-xs font-mono line-through text-gray-400">12</span>
              <span className="text-[8px] font-mono text-gray-400">STEPS</span>
            </div>
            <span className="text-gray-400 pb-1">→</span>
            <div className="flex flex-col text-center">
              <span className="text-lg font-mono font-bold text-indigo-600 leading-none">4</span>
              <span className="text-[8px] font-mono text-indigo-600">STEPS</span>
            </div>
            <div className="flex-1 bg-indigo-50 border border-indigo-100 text-[10px] text-indigo-700 py-1 px-2 rounded font-mono text-center ml-2">
              -66% friction
            </div>
          </div>
        )
      },
      {
        id: "workflow-trigger",
        badge: "AUTOMATION TRIGGER",
        text: "Auto-routing algorithm evaluates intake data and paths pre-op checklists immediately.",
        type: "architecture",
        meta: "LOGIC SCHEMATIC",
        desktopClass: "top-[12%] right-[8%] w-[280px] xl:w-[310px]",
        tabletShow: false,
        graphic: (
          <div className="mt-2.5 font-mono text-[9px] bg-slate-950 text-slate-300 p-2 rounded-lg border border-slate-800">
            <span className="text-indigo-400">if</span> (admission.type === <span className="text-emerald-400">&quot;ASC&quot;</span>) &#123;<br />
            &nbsp;&nbsp;routeChecklist(<span className="text-sky-400">preOp</span>);<br />
            &#125;
          </div>
        )
      },
      {
        id: "workflow-nodes",
        badge: "TASK FLOW",
        text: "Interactive patient documentation pipeline showing state transitions.",
        type: "nodes",
        meta: "STATE MATRIX",
        desktopClass: "bottom-[14%] left-[6%] w-[320px] xl:w-[350px]",
        tabletShow: true,
        tabletClass: "bottom-[14%] right-[8%] w-[300px]",
        graphic: (
          <div className="flex items-center gap-2 mt-3.5">
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded px-1.5 py-0.5 text-[9px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Ingest
            </div>
            <span className="text-gray-300 font-mono text-xs">→</span>
            <div className="flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded px-1.5 py-0.5 text-[9px] font-mono animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Triage
            </div>
            <span className="text-gray-300 font-mono text-xs">→</span>
            <div className="flex items-center gap-1 bg-gray-50 text-gray-400 border border-gray-100 rounded px-1.5 py-0.5 text-[9px] font-mono">
              Review
            </div>
          </div>
        )
      },
      {
        id: "workflow-navigation",
        badge: "NAVIGATION TREE",
        text: "Modular dashboard directory for rapid sub-specialty workspace switching.",
        type: "architecture",
        meta: "INFORMATION ARCHITECTURE",
        desktopClass: "bottom-[10%] right-[10%] w-[290px] xl:w-[320px]",
        tabletShow: false,
        graphic: (
          <div className="mt-3.5 font-mono text-[10px] text-gray-500 border-l-2 border-indigo-100 pl-2 ml-1">
            <div>Patients</div>
            <div className="text-indigo-600 pl-2">└─ Active Cases</div>
            <div className="pl-2">└─ Discharge Logs</div>
          </div>
        )
      }
    ]
  },
  {
    id: "intelligence",
    phrase: "intelligent systems",
    phraseId: "phrase-intelligence",
    accentClass: "text-[#10b981] drop-shadow-[0_0_12px_rgba(16,185,129,0.15)]",
    artifacts: [
      {
        id: "intelligence-summary",
        badge: "CO-PILOT • CLINICAL SUMMARY",
        text: "Drafting discharge summary based on 3 clinical progress logs and 1 diagnostic report.",
        type: "sync",
        meta: "HUMAN+AI HYBRID WORKSPACE",
        desktopClass: "top-[10%] left-[8%] w-[310px] xl:w-[340px]",
        tabletShow: true,
        tabletClass: "top-[14%] left-[8%] w-[290px]",
        graphic: (
          <div className="mt-3.5 p-2 bg-emerald-50/50 border border-emerald-100/80 rounded-lg">
            <div className="flex justify-between items-center text-[9px] font-mono text-emerald-700 mb-1">
              <span>GENERATED CO-PILOT DRAFT</span>
              <span className="text-emerald-500 animate-pulse">●</span>
            </div>
            <span className="text-[10px] text-gray-600 font-sans italic leading-tight block">
              &quot;Patient exhibits stable vitals. Recommend scheduling post-op follow-up within 7 days...&quot;
            </span>
          </div>
        )
      },
      {
        id: "intelligence-confidence",
        badge: "CONFIDENCE INDEX",
        text: "Clinical coding recommendation confidence index.",
        type: "metric",
        meta: "DECISION MATRIX MODEL",
        desktopClass: "top-[14%] right-[6%] w-[280px] xl:w-[310px]",
        tabletShow: false,
        graphic: (
          <div className="mt-3">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[28px] font-mono font-bold text-emerald-600 leading-none">94%</span>
              <span className="text-[9px] font-mono text-gray-400">HIGH CONFIDENCE</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "94%" }} />
            </div>
          </div>
        )
      },
      {
        id: "intelligence-recommendation",
        badge: "RECOMMENDATION ENGINE",
        text: "Contextual billing code suggestion matches documented diagnostic terminology.",
        type: "action",
        meta: "ICD-10 COGNITIVE ENGINE",
        desktopClass: "bottom-[12%] left-[6%] w-[320px] xl:w-[350px]",
        tabletShow: false,
        graphic: (
          <div className="flex items-center justify-between gap-3 mt-3.5 pt-2.5 border-t border-gray-100">
            <div className="font-mono text-[10px] text-gray-700">
              <span className="bg-gray-100 px-1 rounded font-bold">J45.909</span> Asthma, unspecified
            </div>
            <RippleButton 
              variant="primary"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-[10px] font-medium py-1 px-2.5 rounded transition-all cursor-pointer"
            >
              Apply
              <RippleButtonRipples />
            </RippleButton>
          </div>
        )
      },
      {
        id: "intelligence-checkpoint",
        badge: "HUMAN CHECKPOINT",
        text: "Clinical decisions require verification before system updates are permanently written.",
        type: "action",
        meta: "HUMAN-IN-THE-LOOP DESIGN",
        desktopClass: "bottom-[14%] right-[8%] w-[300px] xl:w-[330px]",
        tabletShow: true,
        tabletClass: "bottom-[16%] right-[8%] w-[280px]",
        graphic: (
          <div className="flex gap-2 mt-3.5">
            <RippleButton 
              variant="outline"
              className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-[10px] py-1 rounded font-sans cursor-pointer"
            >
              Override
              <RippleButtonRipples />
            </RippleButton>
            <RippleButton 
              variant="secondary"
              rippleColor="rgba(16, 185, 129, 0.15)"
              className="flex-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-[10px] py-1 rounded font-sans font-medium cursor-pointer"
            >
              Approve
              <RippleButtonRipples />
            </RippleButton>
          </div>
        )
      }
    ]
  },
  {
    id: "ecosystem",
    phrase: "ecosystem",
    phraseId: "phrase-ecosystem",
    accentClass: "text-[#f59e0b] drop-shadow-[0_0_12px_rgba(245,158,11,0.15)]",
    artifacts: [
      {
        id: "ecosystem-sync",
        badge: "SYSTEM SYNC • TELEMETRY",
        text: "Patient-facing mobile data streams real-time health events to physician clinical dashboards.",
        type: "sync",
        meta: "CROSS-PLATFORM ARCHITECTURE",
        desktopClass: "top-[12%] left-[6%] w-[300px] xl:w-[330px]",
        tabletShow: true,
        tabletClass: "top-[12%] left-[8%] w-[280px]",
        graphic: (
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="text-[10px] font-mono text-gray-500 bg-gray-50 p-1.5 rounded border border-gray-100 flex items-center gap-1">
              <span>Patient Mobile</span>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-amber-300 relative flex items-center justify-center">
              <span className="absolute w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            </div>
            <div className="text-[10px] font-mono text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-100 flex items-center gap-1">
              <span>Clinic Web</span>
            </div>
          </div>
        )
      },
      {
        id: "ecosystem-nodes",
        badge: "PLATFORM INTEGRATION",
        text: "ASC scheduling platforms connected directly with inpatient EHR core workflows.",
        type: "nodes",
        meta: "API DECOUPLED MODULES",
        desktopClass: "top-[10%] right-[8%] w-[310px] xl:w-[340px]",
        tabletShow: false,
        graphic: (
          <div className="flex justify-between items-center gap-2 mt-3.5">
            <div className="w-[30%] h-8 rounded border border-gray-200 bg-white flex items-center justify-center text-[9px] font-mono text-gray-500 text-center leading-none">
              Inpatient<br />EHR
            </div>
            <div className="text-amber-500 font-mono text-sm leading-none">+</div>
            <div className="w-[30%] h-8 rounded border border-amber-200 bg-amber-50/50 flex items-center justify-center text-[9px] font-mono text-amber-800 text-center leading-none">
              ASC Portal
            </div>
            <div className="text-amber-500 font-mono text-sm leading-none">+</div>
            <div className="w-[30%] h-8 rounded border border-gray-200 bg-white flex items-center justify-center text-[9px] font-mono text-gray-500 text-center leading-none">
              RCM Billing
            </div>
          </div>
        )
      },
      {
        id: "ecosystem-portal",
        badge: "TENANT PORTAL VIEW",
        text: "Consolidated role-based workflow interfaces matching doctor, nurse, and admin views.",
        type: "architecture",
        meta: "MULTI-ROLE INTERFACING",
        desktopClass: "bottom-[12%] left-[8%] w-[290px] xl:w-[320px]",
        tabletShow: false,
        graphic: (
          <div className="flex gap-1 mt-3 px-1">
            <div className="flex-1 bg-amber-100 text-amber-800 text-[8px] font-mono py-1 rounded text-center font-bold">Clinician</div>
            <div className="flex-1 bg-gray-50 text-gray-400 text-[8px] font-mono py-1 rounded text-center">Scheduler</div>
            <div className="flex-1 bg-gray-50 text-gray-400 text-[8px] font-mono py-1 rounded text-center">Billing</div>
          </div>
        )
      },
      {
        id: "ecosystem-capacity",
        badge: "ECOSYSTEM DASHBOARD",
        text: "Live clinic capacity mapping matches real-time room occupancy to active staff schedules.",
        type: "metric",
        meta: "OPERATIONAL METRIC ENGINE",
        desktopClass: "bottom-[14%] right-[6%] w-[300px] xl:w-[330px]",
        tabletShow: true,
        tabletClass: "bottom-[14%] right-[8%] w-[280px]",
        graphic: (
          <div className="flex gap-2 items-end h-[36px] mt-3.5 px-2">
            <div className="w-3 bg-gray-100 rounded-t h-[40%]" />
            <div className="w-3 bg-gray-100 rounded-t h-[60%]" />
            <div className="w-3 bg-amber-500 rounded-t h-[95%]" />
            <div className="w-3 bg-amber-600 rounded-t h-[80%]" />
            <div className="w-3 bg-gray-100 rounded-t h-[50%]" />
            <span className="text-[9px] font-mono text-gray-400 ml-auto leading-none mb-1">LIVE CAPACITY</span>
          </div>
        )
      }
    ]
  }
];

export default function ConnectedEcosystemStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    // If reduced motion is requested, do not run animations
    if (prefersReducedMotion) return;

    if (!sectionRef.current || !triggerRef.current || !statementRef.current || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set initial states for statement
      gsap.set(statementRef.current, {
        opacity: 0,
        y: 24,
        filter: "blur(6px)"
      });

      // Set initial states for all desktop cards (hidden, scale down, slide out)
      const allCards = containerRef.current?.querySelectorAll(".story-card-desktop");
      if (allCards) {
        gsap.set(allCards, {
          opacity: 0,
          scale: 0.95,
          y: 25,
          filter: "blur(4px)",
          pointerEvents: "none"
        });
      }

      // Master scrubbing timeline
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=380%", // Scroll distance height
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true
        }
      });

      // --- 0. Introduction State (0.00 - 0.15) ---
      masterTimeline.to(statementRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out"
      });

      // Add a slight pause after statement entry
      masterTimeline.to({}, { duration: 0.4 });

      // --- 1. People Chapter (0.15 - 0.35) ---
      // Highlight "people" span
      masterTimeline.to("#phrase-people", {
        color: "#0ea5e9", // Sky-500
        textShadow: "0px 0px 20px rgba(14,165,233,0.25)",
        fontWeight: "700",
        duration: 0.6
      }, "+=0.1");

      // Animate People cards in (staggered)
      const peopleCards = containerRef.current?.querySelectorAll(".card-people");
      if (peopleCards) {
        masterTimeline.to(peopleCards, {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          pointerEvents: "auto",
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out"
        }, "<");
      }

      // Pause inside People chapter
      masterTimeline.to({}, { duration: 0.8 });

      // --- 2. Workflow Chapter (0.35 - 0.55) ---
      // Reset "people" span and exit people cards
      masterTimeline.to("#phrase-people", {
        color: "inherit",
        textShadow: "none",
        fontWeight: "inherit",
        duration: 0.5
      });
      if (peopleCards) {
        masterTimeline.to(peopleCards, {
          opacity: 0,
          scale: 0.96,
          y: -20,
          filter: "blur(4px)",
          pointerEvents: "none",
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.in"
        }, "<");
      }

      // Highlight "workflows" span
      masterTimeline.to("#phrase-workflows", {
        color: "#6366f1", // Indigo-500
        textShadow: "0px 0px 20px rgba(99,102,241,0.25)",
        fontWeight: "700",
        duration: 0.6
      }, "-=0.2");

      // Animate Workflow cards in
      const workflowCards = containerRef.current?.querySelectorAll(".card-workflows");
      if (workflowCards) {
        masterTimeline.to(workflowCards, {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          pointerEvents: "auto",
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out"
        }, "<");
      }

      // Pause inside Workflow chapter
      masterTimeline.to({}, { duration: 0.8 });

      // --- 3. Intelligent Systems Chapter (0.55 - 0.75) ---
      // Reset "workflows" span and exit workflow cards
      masterTimeline.to("#phrase-workflows", {
        color: "inherit",
        textShadow: "none",
        fontWeight: "inherit",
        duration: 0.5
      });
      if (workflowCards) {
        masterTimeline.to(workflowCards, {
          opacity: 0,
          scale: 0.96,
          y: -20,
          filter: "blur(4px)",
          pointerEvents: "none",
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.in"
        }, "<");
      }

      // Highlight "intelligent systems" span
      masterTimeline.to("#phrase-intelligence", {
        color: "#10b981", // Emerald-500
        textShadow: "0px 0px 20px rgba(16,185,129,0.25)",
        fontWeight: "700",
        duration: 0.6
      }, "-=0.2");

      // Animate Intelligence cards in
      const intelligenceCards = containerRef.current?.querySelectorAll(".card-intelligence");
      if (intelligenceCards) {
        masterTimeline.to(intelligenceCards, {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          pointerEvents: "auto",
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out"
        }, "<");
      }

      // Pause inside Intelligence chapter
      masterTimeline.to({}, { duration: 0.8 });

      // --- 4. Ecosystem Chapter (0.75 - 0.90) ---
      // Reset "intelligent systems" span and exit intelligence cards
      masterTimeline.to("#phrase-intelligence", {
        color: "inherit",
        textShadow: "none",
        fontWeight: "inherit",
        duration: 0.5
      });
      if (intelligenceCards) {
        masterTimeline.to(intelligenceCards, {
          opacity: 0,
          scale: 0.96,
          y: -20,
          filter: "blur(4px)",
          pointerEvents: "none",
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.in"
        }, "<");
      }

      // Highlight "ecosystem" span
      masterTimeline.to("#phrase-ecosystem", {
        color: "#f59e0b", // Amber-500
        textShadow: "0px 0px 20px rgba(245,158,11,0.25)",
        fontWeight: "700",
        duration: 0.6
      }, "-=0.2");

      // Animate Ecosystem cards in
      const ecosystemCards = containerRef.current?.querySelectorAll(".card-ecosystem");
      if (ecosystemCards) {
        masterTimeline.to(ecosystemCards, {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          pointerEvents: "auto",
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out"
        }, "<");
      }

      // Pause inside Ecosystem chapter
      masterTimeline.to({}, { duration: 0.8 });

      // --- 5. Resolution State (0.90 - 1.00) ---
      // Reset "ecosystem" span
      masterTimeline.to("#phrase-ecosystem", {
        color: "inherit",
        textShadow: "none",
        fontWeight: "inherit",
        duration: 0.6
      });
      // All cards fade and expand outward slightly
      if (ecosystemCards) {
        masterTimeline.to(ecosystemCards, {
          opacity: 0,
          scale: 1.04,
          y: 20,
          filter: "blur(6px)",
          pointerEvents: "none",
          stagger: 0.05,
          duration: 0.8,
          ease: "power2.inOut"
        }, "<");
      }

      // Clean, quiet statement at the very end before scroll release
      masterTimeline.to(statementRef.current, {
        opacity: 0.4,
        y: -12,
        duration: 0.6,
        ease: "power2.inOut"
      }, "-=0.2");
    });

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  // Mobile layout state management (purely CSS/JS sync based on scroll is nice, but we can also use scroll trigger to switch active mobile card indexes to avoid heavy React state triggers)
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(-1);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    // A secondary small observer to update mobile card active index based on scrollTrigger scroll progress
    const scrollObj = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=380%",
      onUpdate: (self) => {
        const progress = self.progress;
        let index = -1; // Default introduction state

        if (progress >= 0.15 && progress < 0.37) {
          index = 0; // People
        } else if (progress >= 0.37 && progress < 0.58) {
          index = 1; // Workflows
        } else if (progress >= 0.58 && progress < 0.79) {
          index = 2; // Intelligent Systems
        } else if (progress >= 0.79 && progress < 0.92) {
          index = 3; // Ecosystem
        } else if (progress >= 0.92) {
          index = 4; // Resolution
        }

        setMobileActiveIndex(index);
      }
    });

    return () => {
      scrollObj.kill();
    };
  }, [prefersReducedMotion]);

  // Render a CSS-based Dotted/System grid background
  const backgroundGrid = (
    <div className="absolute inset-0 pointer-events-none select-none z-0">
      <div 
        className="w-full h-full opacity-65"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(29, 29, 29, 0.05) 1px, transparent 0),
            linear-gradient(to right, rgba(29, 29, 29, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(29, 29, 29, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px, 120px 120px, 120px 120px",
          maskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 80%)"
        }}
      />
    </div>
  );

  // Render static fallback layout if reduced motion is active
  if (prefersReducedMotion) {
    return (
      <section className="py-24 bg-[#f5f5f2] border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 min-[1400px]:px-[120px]">
          <h2 className="font-sans font-semibold text-[32px] md:text-[48px] leading-tight text-[#1d1d1d] text-center max-w-[1000px] mx-auto mb-16">
            Designing experiences that connect <span className="text-sky-500 font-bold">people</span>, <span className="text-indigo-500 font-bold">workflows</span>, and <span className="text-emerald-500 font-bold">intelligent systems</span> into one clear, intuitive <span className="text-amber-500 font-bold">ecosystem</span>.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {storyChapters.map((chapter) => (
              <div key={chapter.id} className="flex flex-col gap-4 bg-white border border-gray-200/80 p-5 rounded-[20px] shadow-sm">
                <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">
                  {chapter.id}
                </span>
                <div className="flex flex-col gap-4">
                  {chapter.artifacts.slice(0, 2).map((art) => (
                    <div key={art.id} className="bg-[#f5f5f2] border border-gray-100 p-4 rounded-[12px] flex flex-col gap-2">
                      <span className="text-[9px] font-mono font-semibold tracking-wider text-gray-500">
                        {art.badge}
                      </span>
                      <p className="text-[12px] leading-relaxed text-[#3c3c3c]">
                        {art.text}
                      </p>
                      {art.graphic}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Helper to render Mobile Single Active Card
  const renderMobileActiveCard = () => {
    if (mobileActiveIndex < 0 || mobileActiveIndex >= 4) return null;
    const currentChapter = storyChapters[mobileActiveIndex];
    // Show the first artifact of the current chapter as the primary mobile view
    const art = currentChapter.artifacts[0];
    const accentBorder = 
      currentChapter.id === "people" ? "border-l-sky-500" :
      currentChapter.id === "workflows" ? "border-l-indigo-500" :
      currentChapter.id === "intelligence" ? "border-l-emerald-500" : "border-l-amber-500";

    return (
      <div 
        key={art.id}
        className={clsx(
          "w-full bg-white border border-gray-200/80 border-l-[3px] rounded-[16px] p-5 shadow-[0px_8px_24px_rgba(0,0,0,0.03)]",
          "animate-[mobileFadeIn_0.5s_ease-out] flex flex-col justify-between min-h-[160px]",
          accentBorder
        )}
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center w-full">
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#6c6c6c]">
              {art.badge}
            </span>
            {art.meta && (
              <span className="text-[8px] font-mono font-semibold text-gray-400 tracking-wider">
                {art.meta}
              </span>
            )}
          </div>
          <p className="text-[12px] leading-relaxed text-[#2c2c2c] font-sans antialiased">
            {art.text}
          </p>
        </div>
        {art.graphic && <div className="mt-2">{art.graphic}</div>}
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="relative w-full h-[450vh] bg-[#f5f5f2] z-10">
      
      {/* Sticky Stage */}
      <div ref={triggerRef} className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none">
        
        {/* CSS Pattern Background */}
        {backgroundGrid}

        {/* Story Elements Container */}
        <div ref={containerRef} className="relative w-full h-full max-w-[1400px] mx-auto px-6 md:px-12 min-[1400px]:px-[120px] flex items-center justify-center z-10">
          
          {/* ==================== CENTRAL STATEMENT ==================== */}
          <h2 
            ref={statementRef}
            className="w-full max-w-[1000px] text-center font-sans font-semibold tracking-tight text-[#c5c5c5] leading-[1.1] z-10 select-text"
            style={{
              fontSize: "48px"
            }}
          >
            Designing experiences that <br className="hidden sm:inline" />
            connect <span id="phrase-people" className="transition-all duration-[400ms] ease-out">people</span>,{" "}
            <span id="phrase-workflows" className="transition-all duration-[400ms] ease-out">workflows</span>, and <br className="hidden md:inline" />
            <span id="phrase-intelligence" className="transition-all duration-[400ms] ease-out">intelligent systems</span> into <br className="hidden sm:inline" />
            one clear, intuitive <span id="phrase-ecosystem" className="transition-all duration-[400ms] ease-out">ecosystem</span>.
          </h2>

          {/* ==================== DESKTOP & LAPTOP FLOATING ARTICFACS (Hidden on Mobile) ==================== */}
          <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block">
            {storyChapters.map((chapter) => {
              return chapter.artifacts.map((art) => {
                return (
                  <div
                    key={art.id}
                    className={clsx(
                      "story-card-desktop absolute bg-white border border-gray-200/80 rounded-[16px] p-5 shadow-[0px_8px_30px_rgba(0,0,0,0.02)]",
                      "flex flex-col justify-between min-h-[140px] select-text pointer-events-auto",
                      `card-${chapter.id}`,
                      art.desktopClass
                    )}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start w-full">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-[#7c7c7c]">
                          {art.badge}
                        </span>
                        {art.meta && (
                          <span className="text-[8px] font-mono font-semibold text-gray-400 tracking-wider">
                            {art.meta}
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] leading-relaxed text-[#3c3c3c] font-sans antialiased font-normal">
                        {art.text}
                      </p>
                    </div>
                    {art.graphic && (
                      <div className="mt-3.5 w-full pointer-events-auto">
                        {art.graphic}
                      </div>
                    )}
                  </div>
                );
              });
            })}
          </div>

          {/* ==================== TABLET FLOATING ARTIFACTS (lg > Viewport >= md) ==================== */}
          <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:block lg:hidden">
            {storyChapters.map((chapter) => {
              // Only filter artifacts that are marked to show on tablet size
              return chapter.artifacts
                .filter(art => art.tabletShow)
                .map((art) => {
                  return (
                    <div
                      key={art.id}
                      className={clsx(
                        "story-card-desktop absolute bg-white border border-gray-200/80 rounded-[16px] p-4.5 shadow-[0px_8px_24px_rgba(0,0,0,0.02)]",
                        "flex flex-col justify-between min-h-[130px] select-text pointer-events-auto",
                        `card-${chapter.id}`,
                        art.tabletClass || art.desktopClass
                      )}
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-start w-full">
                          <span className="text-[9px] font-mono font-bold tracking-widest text-[#7c7c7c]">
                            {art.badge}
                          </span>
                        </div>
                        <p className="text-[11.5px] leading-relaxed text-[#3c3c3c] font-sans antialiased">
                          {art.text}
                        </p>
                      </div>
                      {art.graphic && (
                        <div className="mt-2.5 w-full pointer-events-auto">
                          {art.graphic}
                        </div>
                      )}
                    </div>
                  );
                });
            })}
          </div>

          {/* ==================== MOBILE FLOATING ARTIFACT LAYOUT (Viewport < md) ==================== */}
          {/* Statement sits in upper-middle, active single artifact sits at the bottom */}
          <div className="absolute bottom-[8%] left-[24px] right-[24px] pointer-events-auto md:hidden flex justify-center z-20">
            <div className="w-full max-w-[340px] h-[190px] flex items-center justify-center">
              {renderMobileActiveCard()}
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes mobileFadeIn {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
      `}</style>

    </div>
  );
}
