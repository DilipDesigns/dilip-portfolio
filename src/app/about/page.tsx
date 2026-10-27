import About from "@/components/About";
import Skills from "@/components/Skills";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f2] pt-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 min-[1400px]:px-[120px] mb-16">
        <h1 className="font-jakarta font-bold text-[48px] md:text-[64px] text-[#1d1d1d]">
          About
        </h1>
      </div>
      <About />
      <Skills />
    </main>
  );
}
