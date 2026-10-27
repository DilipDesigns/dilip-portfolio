import Hero from "@/components/Hero";
import About from "@/components/About";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import ConnectedEcosystemStory from "@/components/ConnectedEcosystemStory";
import Skills from "@/components/Skills";
import BringToTable from "@/components/BringToTable";
import Philosophy from "@/components/Philosophy";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <Hero />
      <Philosophy />
      <SelectedWork />
      <About />
      <Process />
      <ConnectedEcosystemStory />
      <Skills />
      <BringToTable />
    </main>
  );
}

