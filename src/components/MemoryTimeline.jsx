import { useState } from "react";
import Reveal from "./Reveal";
import MemoryCard from "./MemoryCard";
import { timeline } from "../data/memories";

export default function MemoryTimeline() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <section id="timeline" className="scroll-mt-nav relative bg-bg-soft/40 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal className="mb-14 max-w-xl">
          <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-blue">Memory Timeline</span>
          <h2 className="font-serif-jp text-3xl text-cream sm:text-4xl">Fragments of a Summer</h2>
          <p className="mt-4 text-sm leading-relaxed text-warm-white/60">
            Not every memory needs to be whole to matter. Tap a fragment to read a little more of
            it.
          </p>
        </Reveal>
      </div>

      {/* Desktop / tablet: horizontal scroll-snap row */}
      <Reveal delay={100} className="hidden pl-6 sm:block sm:pl-10">
        <div className="scrollbar-none flex snap-x gap-5 overflow-x-auto pb-6 pr-6 sm:pr-10">
          {timeline.map((memory) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              expanded={openId === memory.id}
              onToggle={() => toggle(memory.id)}
            />
          ))}
        </div>
      </Reveal>

      {/* Mobile: vertical timeline */}
      <div className="flex flex-col gap-5 px-6 sm:hidden">
        {timeline.map((memory, index) => (
          <Reveal key={memory.id} delay={index * 60}>
            <MemoryCard memory={memory} expanded={openId === memory.id} onToggle={() => toggle(memory.id)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
