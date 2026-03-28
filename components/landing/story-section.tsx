"use client";

import { Reveal } from "@/components/ui/reveal";
import { ParallaxPanel } from "@/components/ui/parallax-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { storyBlocks } from "@/lib/data";

export function StorySection() {
  return (
    <section id="story" className="px-4 py-18 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Storytelling"
            title="A writing flow built like a premium product workflow"
            description="From first draft to final polish, every interaction is tuned for clarity, momentum, and confidence."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {storyBlocks.map((block, index) => (
            <ParallaxPanel key={block.title} distance={24 + index * 8}>
              <Reveal delay={index * 0.08}>
                <article className="glass-panel h-full rounded-2xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                    {block.eyebrow}
                  </p>
                  <h3 className="mt-4 font-display text-xl leading-tight tracking-tight text-foreground">
                    {block.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-foreground/66">
                    {block.description}
                  </p>
                </article>
              </Reveal>
            </ParallaxPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

