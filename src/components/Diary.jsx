import { useState } from "react";
import Reveal from "./Reveal";
import DiaryCard from "./DiaryCard";
import { diaryEntries } from "../data/memories";

export default function Diary() {
  const [openId, setOpenId] = useState(null);

  return (
    <section id="diary" className="scroll-mt-nav relative bg-bg px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16 max-w-xl">
          <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-blue">Her Words</span>
          <h2 className="font-serif-jp text-3xl text-cream sm:text-4xl">Sakura's Diary</h2>
          <p className="mt-4 text-sm leading-relaxed text-warm-white/60">
            Original tribute writing, inspired by the quiet, ordinary honesty of the story — not
            a single line of it borrowed.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {diaryEntries.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 90}>
              <DiaryCard
                entry={entry}
                open={openId === entry.id}
                onToggle={() => setOpenId((cur) => (cur === entry.id ? null : entry.id))}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
