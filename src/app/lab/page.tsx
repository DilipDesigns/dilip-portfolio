"use client";
import clsx from "clsx";
import { TextReveal } from "@/components/TextReveal";

export default function LabPage() {
  const text =
    "How you design, align, and build matters. Create realistic prototypes that allow for quick iteration on flows and states. Test the full, interactive experience to get better feedback.";

  return (
    <main className="min-h-screen bg-[#f5f5f2] flex flex-col">
      <div className="pt-32 site-container">
        <h1 className="font-jakarta font-bold text-[48px] md:text-[64px] text-[#1d1d1d]">
          Lab
        </h1>
        <p className="font-jakarta text-[18px] md:text-[20px] text-[#656565] mt-4 max-w-[600px]">
          Experiments, explorations, and conceptual thinking in design and technology.
        </p>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="aspect-square bg-white rounded-[24px] flex flex-col items-center justify-center p-8 text-center border border-[#e4e4e4]">
              <span className="text-4xl mb-4">🧪</span>
              <h3 className="font-jakarta font-semibold text-[20px] text-[#1d1d1d]">Experiment {item}</h3>
              <p className="font-jakarta text-[14px] text-[#656565] mt-2">Coming soon...</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-32 min-h-screen w-full bg-[#111111] px-8 py-12 md:px-0 relative">
        <div className="pb-24 text-center text-sm text-white/30">Scroll down to see the Text Reveal</div>

        <TextReveal body={text} className="relative mx-auto h-[200vh] w-full max-w-2xl">
          {(tokens) => (
            <div className="sticky left-0 top-0 flex h-screen items-center text-3xl md:text-5xl font-medium leading-tight text-white font-jakarta">
              <div className="w-full text-center">
                {tokens.map((token, index) => (
                  <TextReveal.Token key={index} index={index}>
                    {(isActive) => (
                      <span
                        className={clsx(
                          {
                            "opacity-20": !isActive,
                          },
                          "transition-opacity duration-300",
                        )}>
                        {token}
                      </span>
                    )}
                  </TextReveal.Token>
                ))}
              </div>
            </div>
          )}
        </TextReveal>
      </div>
    </main>
  );
}
