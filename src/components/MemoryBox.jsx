import { useState } from "react";
import { Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import { memoryBoxFragments } from "../data/memories";

export default function MemoryBox() {
  const [opened, setOpened] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);

  const handleOpen = () => setOpened(true);

  const handleReveal = () => {
    setRevealedCount((count) => Math.min(count + 1, memoryBoxFragments.length));
  };

  return (
    <section className="relative bg-bg px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-blue">A Small Ritual</span>
          <h2 className="font-serif-jp text-3xl text-cream sm:text-4xl">Open the Memory Box</h2>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          {!opened ? (
            <button
              type="button"
              onClick={handleOpen}
              className="group relative mx-auto flex h-40 w-48 flex-col items-center justify-center gap-3 rounded-sm border border-gold/30 bg-bg-soft transition-all duration-500 hover:border-gold/60"
              aria-label="Open the memory box"
            >
              <span className="absolute inset-x-6 top-0 h-px bg-gold/40" />
              <Sparkles className="h-5 w-5 text-gold transition-transform duration-500 group-hover:scale-110" strokeWidth={1.3} />
              <span className="text-xs uppercase tracking-[0.24em] text-warm-white/60">Tap to open</span>
            </button>
          ) : (
            <div className="animate-fade-in">
              <p className="font-serif-jp text-xl text-cream sm:text-2xl">
                Some memories are not meant to be forgotten.
              </p>

              <div className="mt-10 flex min-h-24 flex-wrap items-center justify-center gap-3">
                {memoryBoxFragments.slice(0, revealedCount).map((fragment, index) => (
                  <span
                    key={fragment}
                    className="animate-fade-in rounded-full border border-warm-white/15 bg-bg-soft px-4 py-2 text-xs text-warm-white/75"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    {fragment}
                  </span>
                ))}
              </div>

              {revealedCount < memoryBoxFragments.length ? (
                <button
                  type="button"
                  onClick={handleReveal}
                  className="mt-10 rounded-full border border-warm-white/20 px-6 py-2.5 text-xs uppercase tracking-[0.22em] text-warm-white/70 transition-colors duration-300 hover:border-gold/50 hover:text-gold"
                >
                  Reveal another memory
                </button>
              ) : (
                <p className="mt-10 text-xs uppercase tracking-[0.22em] text-warm-white/40">
                  That's all of them, for now.
                </p>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
