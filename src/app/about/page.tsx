import About from "@/components/About";
import Skills from "@/components/Skills";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f2] pt-32">
      <div className="px-6 md:px-[80px] max-w-[1500px] mx-auto mb-16">
        <h1 className="font-jakarta font-bold text-[48px] md:text-[64px] text-[#1d1d1d]">
          About
        </h1>
      </div>
      <About />
      <Skills />
    </main>
  );
}
