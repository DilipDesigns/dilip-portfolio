import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionReveal from "@/components/CaseStudy/SectionReveal";
import StickySidebar from "@/components/CaseStudy/StickySidebar";

const caseStudySections = [
  { id: "overview", label: "Overview" },
  { id: "background", label: "Background" },
  { id: "project-info", label: "Project Information" },
  { id: "business-challenge", label: "Business Challenge" },
  { id: "problem-statement", label: "Problem Statement" },
  { id: "solution", label: "Solution" },
];

export default function EhnoteCaseStudyPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f2] relative pb-32">
      {/* Hero Section */}
      <div className="pt-[120px] md:pt-[164px] max-w-[1400px] mx-auto px-6 md:px-12 min-[1400px]:px-[120px] relative z-10 flex flex-col items-center text-center">
        <p className="font-sans text-[16px] leading-[28px] text-black mb-[24px]">
          Healthcare Platform
        </p>
        <ScrollReveal
          containerClassName="max-w-[1280px]"
          textClassName="font-jakarta font-medium text-[40px] md:text-[64px] leading-tight md:leading-[72px] text-black"
          baseOpacity={0.2}
          blurStrength={10}
        >
          Designing traceable implant inventory workflows for ophthalmology clinics.
        </ScrollReveal>
        <p className="font-sans text-[16px] md:text-[18px] leading-[28px] md:leading-[30px] text-black mt-[40px] max-w-[900px]">
          A centralized inventory experience that helps healthcare teams track, assign, return, and manage intraocular lenses (IOLs) across multiple locations while maintaining complete operational visibility.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-[12px] mt-[40px]">
          {["Product Designer", "SaaS • Healthcare", "Web Application", "Shipped", "NDA Protected"].map((tag, i) => (
            <div key={i} className="border border-[#e4e4e4] rounded-[99px] px-[16px] py-[6px] flex items-center justify-center">
              <span className="font-sans text-[14px] text-[#3d3d3d] whitespace-nowrap">{tag}</span>
            </div>
          ))}
        </div>

        {/* Large Hero Image Placeholder */}
        <div className="w-full h-[400px] md:h-[646px] bg-[#d9d9d9] rounded-[24px] mt-[64px] relative overflow-hidden" />
      </div>

      {/* Role / Timeline / Platform / Domain / Users Info Bar */}
      <SectionReveal className="max-w-[1400px] mx-auto px-6 md:px-12 min-[1400px]:px-[120px] mt-[80px]">
        <div className="border-t border-[#e4e4e4] pt-[40px] flex flex-col md:flex-row flex-wrap gap-[40px] md:gap-[24px] justify-between">
          <div className="flex flex-col gap-[4px] min-w-[150px]">
            <p className="font-jakarta font-medium text-[18px] text-black">Role</p>
            <p className="font-sans text-[16px] text-black opacity-80">UX / UI Designer</p>
          </div>
          <div className="flex flex-col gap-[4px] min-w-[150px]">
            <p className="font-jakarta font-medium text-[18px] text-black">Timeline</p>
            <p className="font-sans text-[16px] text-black opacity-80">Weekly Sprint</p>
          </div>
          <div className="flex flex-col gap-[4px] min-w-[150px]">
            <p className="font-jakarta font-medium text-[18px] text-black">Platform</p>
            <p className="font-sans text-[16px] text-black opacity-80">Web Application</p>
          </div>
          <div className="flex flex-col gap-[4px] min-w-[150px]">
            <p className="font-jakarta font-medium text-[18px] text-black">Domain</p>
            <p className="font-sans text-[16px] text-black opacity-80">Healthcare</p>
          </div>
          <div className="flex flex-col gap-[4px] min-w-[150px]">
            <p className="font-jakarta font-medium text-[18px] text-black">Users</p>
            <p className="font-sans text-[16px] text-black opacity-80">Nurses, Administrators, ASC Teams</p>
          </div>
        </div>
      </SectionReveal>

      {/* TL;DR Section */}
      <SectionReveal className="max-w-[1400px] mx-auto px-6 md:px-12 min-[1400px]:px-[120px] mt-[120px] md:mt-[180px] flex flex-col lg:flex-row gap-[40px] lg:gap-[120px]">
        <h2 className="font-jakarta font-medium text-[32px] md:text-[40px] text-black w-full lg:w-[200px] shrink-0">
          TL;DR
        </h2>
        
        <div className="flex-1 flex flex-col gap-[80px]">
          {/* Summary Text Blocks */}
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col md:flex-row gap-[16px] md:gap-[24px] items-start">
              <p className="font-jakarta font-medium text-[18px] text-black w-[150px] shrink-0">Background</p>
              <p className="font-sans text-[16px] leading-[28px] text-black flex-1">
                EHNOTE is a healthcare inventory management platform used by hospitals and clinics to manage medical supplies, stock levels, procurement, and compliance-critical inventory operations.
              </p>
            </div>
            <div className="w-full h-px bg-[#e4e4e4]" />
            <div className="flex flex-col md:flex-row gap-[16px] md:gap-[24px] items-start">
              <p className="font-jakarta font-medium text-[18px] text-black w-[150px] shrink-0">Problem</p>
              <p className="font-sans text-[16px] leading-[28px] text-black flex-1">
                Inventory workflows were fragmented across multiple modules. Staff struggled with stock visibility, manual tracking, delayed replenishment, and inefficient inventory audits, leading to operational overhead and inventory risks.
              </p>
            </div>
            <div className="w-full h-px bg-[#e4e4e4]" />
            <div className="flex flex-col md:flex-row gap-[16px] md:gap-[24px] items-start">
              <p className="font-jakarta font-medium text-[18px] text-black w-[150px] shrink-0">Approach</p>
              <p className="font-sans text-[16px] leading-[28px] text-black flex-1">
                Redesigned the end-to-end inventory management experience by simplifying workflows, introducing a unified inventory dashboard, standardizing stock management patterns, and improving visibility across procurement, storage, and consumption touchpoints.
              </p>
            </div>
            <div className="w-full h-px bg-[#e4e4e4]" />
            <div className="flex flex-col md:flex-row gap-[16px] md:gap-[24px] items-start">
              <p className="font-jakarta font-medium text-[18px] text-black w-[150px] shrink-0">Outcome</p>
              <p className="font-sans text-[16px] leading-[28px] text-black flex-1">
                Delivered a scalable inventory management system that reduced operational complexity, improved inventory discoverability, streamlined stock workflows, and established a reusable foundation for future healthcare operations modules.
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex flex-col md:flex-row gap-[40px] md:gap-[24px] justify-between">
            <div className="flex flex-col gap-[8px] flex-1">
              <p className="font-jakarta font-medium text-[32px] md:text-[40px] text-black">5 → 1</p>
              <p className="font-sans text-[16px] leading-[28px] text-black opacity-80">Inventory workflows unified</p>
            </div>
            <div className="flex flex-col gap-[8px] flex-1">
              <p className="font-jakarta font-medium text-[32px] md:text-[40px] text-black">10+</p>
              <p className="font-sans text-[16px] leading-[28px] text-black opacity-80">Inventory states & interactions standardized</p>
            </div>
            <div className="flex flex-col gap-[8px] flex-1">
              <p className="font-jakarta font-medium text-[28px] md:text-[32px] text-black">End-to-End</p>
              <p className="font-sans text-[16px] leading-[28px] text-black opacity-80">Procurement → Stocking → Consumption → Reorder</p>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* Main Content Area with Sticky Sidebar */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 min-[1400px]:px-[120px] mt-[120px] md:mt-[180px] flex flex-col lg:flex-row gap-[40px] lg:gap-[120px] relative">
        <StickySidebar sections={caseStudySections} />
        
        <div className="flex-1 flex flex-col gap-[120px] md:gap-[160px] max-w-[900px]">
          
          {/* Section: Overview */}
          <SectionReveal>
            <div id="overview" className="flex flex-col gap-[40px] scroll-mt-[150px]">
              <p className="font-mono text-[12px] tracking-wider text-black uppercase opacity-60">Overview</p>
              <h3 className="font-jakarta font-medium text-[32px] md:text-[40px] leading-tight text-black">
                Modernizing Healthcare Inventory Operations
              </h3>
              <div className="font-sans text-[16px] md:text-[18px] leading-[30px] md:leading-[32px] text-black opacity-90 flex flex-col gap-[24px]">
                <p>EHNOTE Inventory Management is an enterprise healthcare platform designed to help healthcare organizations efficiently manage medical inventory, procurement processes, stock movements, and compliance-sensitive inventory records.</p>
                <p>The project focused on creating a centralized system capable of supporting complex inventory operations while maintaining usability for administrators, inventory managers, and operational staff.</p>
                <div>
                  <p className="mb-2">The platform enables organizations to:</p>
                  <ul className="list-disc pl-[24px] flex flex-col gap-[8px]">
                    <li>Monitor inventory levels</li>
                    <li>Manage stock movement</li>
                    <li>Track inventory adjustments</li>
                    <li>Support procurement workflows</li>
                    <li>Maintain audit readiness</li>
                    <li>Improve operational efficiency</li>
                  </ul>
                </div>
                <p>As inventory operations scaled, the need for a unified, scalable, and transparent inventory management experience became increasingly critical.</p>
              </div>
            </div>
          </SectionReveal>

          {/* Section: Background */}
          <SectionReveal>
            <div id="background" className="flex flex-col gap-[40px] scroll-mt-[150px]">
              <p className="font-mono text-[12px] tracking-wider text-black uppercase opacity-60">Background</p>
              <h3 className="font-jakarta font-medium text-[32px] md:text-[40px] leading-tight text-black">
                Managing Critical Healthcare Inventory at Scale
              </h3>
              <div className="font-sans text-[16px] md:text-[18px] leading-[30px] md:leading-[32px] text-black opacity-90 flex flex-col gap-[24px]">
                <div>
                  <p className="mb-2">Healthcare inventory management extends beyond tracking stock quantities. It directly impacts:</p>
                  <ul className="list-disc pl-[24px] flex flex-col gap-[8px]">
                    <li>Patient care continuity</li>
                    <li>Operational efficiency</li>
                    <li>Financial accountability</li>
                    <li>Regulatory compliance</li>
                  </ul>
                </div>
                <p>Inventory teams often work across multiple systems and manual processes, creating visibility gaps and operational inefficiencies.</p>
                <p>
                  EHNOTE Inventory Management was envisioned as a <strong className="font-semibold text-black">single operational source of truth</strong> capable of supporting inventory workflows across multiple facilities, departments, and inventory categories.
                </p>
                <p>The goal was to provide healthcare organizations with a platform that simplifies inventory operations while supporting growing operational complexity.</p>
              </div>
            </div>
          </SectionReveal>

          {/* Section: Project Information */}
          <SectionReveal>
            <div id="project-info" className="flex flex-col gap-[40px] scroll-mt-[150px]">
              <p className="font-mono text-[12px] tracking-wider text-black uppercase opacity-60">Project Information</p>
              <div className="flex flex-col gap-[24px]">
                <div className="flex flex-col md:flex-row gap-[24px]">
                  <div className="bg-[#f9f9f9] rounded-[16px] p-[24px] flex-1 flex flex-col gap-[8px]">
                    <p className="font-jakarta font-medium text-[20px] md:text-[24px] text-black">Industry</p>
                    <p className="font-sans text-[16px] text-black opacity-80">Healthcare Technology</p>
                  </div>
                  <div className="bg-[#f9f9f9] rounded-[16px] p-[24px] flex-1 flex flex-col gap-[8px]">
                    <p className="font-jakarta font-medium text-[20px] md:text-[24px] text-black">Product Type</p>
                    <p className="font-sans text-[16px] text-black opacity-80">Enterprise SaaS Platform</p>
                  </div>
                  <div className="bg-[#f9f9f9] rounded-[16px] p-[24px] flex-1 flex flex-col gap-[8px]">
                    <p className="font-jakarta font-medium text-[20px] md:text-[24px] text-black">Platform</p>
                    <p className="font-sans text-[16px] text-black opacity-80">Responsive Web Application</p>
                  </div>
                </div>
                
                <div className="bg-[#f9f9f9] rounded-[16px] p-[32px] flex flex-col gap-[24px]">
                  <p className="font-jakarta font-medium text-[20px] md:text-[24px] text-black">Core Responsibilities</p>
                  <div className="flex flex-col md:flex-row gap-[24px] md:gap-[80px]">
                    <ul className="list-disc pl-[24px] flex flex-col gap-[12px] font-sans text-[16px] text-black opacity-80 flex-1">
                      <li>Product Strategy</li>
                      <li>Information Architecture</li>
                      <li>UX Design</li>
                      <li>Interaction Design</li>
                    </ul>
                    <ul className="list-disc pl-[24px] flex flex-col gap-[12px] font-sans text-[16px] text-black opacity-80 flex-1">
                      <li>Design System Contribution</li>
                      <li>Workflow Design</li>
                      <li>High-Fidelity UI Design</li>
                      <li>Developer Collaboration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Placeholders for future sections so sidebar works correctly */}
          <SectionReveal>
            <div id="business-challenge" className="flex flex-col gap-[40px] scroll-mt-[150px] min-h-[400px] border border-dashed border-[#e4e4e4] rounded-[24px] p-8 flex items-center justify-center">
              <p className="font-jakarta text-[#656565] text-lg text-center">
                [Business Challenge Content To Be Added]
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div id="problem-statement" className="flex flex-col gap-[40px] scroll-mt-[150px] min-h-[400px] border border-dashed border-[#e4e4e4] rounded-[24px] p-8 flex items-center justify-center">
              <p className="font-jakarta text-[#656565] text-lg text-center">
                [Problem Statement Content To Be Added]
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div id="solution" className="flex flex-col gap-[40px] scroll-mt-[150px] min-h-[400px] border border-dashed border-[#e4e4e4] rounded-[24px] p-8 flex items-center justify-center">
              <p className="font-jakarta text-[#656565] text-lg text-center">
                [Solution Content To Be Added]
              </p>
            </div>
          </SectionReveal>

        </div>
      </div>
    </main>
  );
}
