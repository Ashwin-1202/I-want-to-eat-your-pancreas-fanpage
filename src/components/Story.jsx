import Reveal from "./Reveal";

export default function Story() {
  return (
    <section id="story" className="scroll-mt-nav relative bg-bg px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-[0.6fr_1fr] md:gap-16">
        <Reveal className="md:pt-2">
          <span className="block font-serif-jp text-7xl leading-none text-warm-white/10 sm:text-8xl md:text-9xl">
            01
          </span>
          <span className="mt-3 block text-xs uppercase tracking-[0.3em] text-blue">The Story</span>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={80}>
            <p className="font-serif-jp text-balance text-2xl leading-snug text-cream sm:text-3xl">
              Sometimes the people who change our lives are the ones we never expected to meet.
            </p>
          </Reveal>

          <Reveal delay={160} className="space-y-5 text-warm-white/70">
            <p className="leading-relaxed">
              She keeps a secret that isn't really a secret at all — everyone around her already
              knows, or will soon. He is the one person she never chose to tell, and the one
              person who ends up staying closest to her because of it.
            </p>
            <p className="leading-relaxed">
              What follows isn't a story about illness. It's a story about two people, thrown
              together by circumstance, who slowly teach each other how to be honest — about
              fear, about boredom, about the ordinary hours neither of them thought to value
              until time made itself impossible to ignore.
            </p>
            <p className="leading-relaxed">
              It ends the way these stories tend to. What it leaves behind is the part that
              matters: a way of paying attention to a life while you're still inside it.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="flex items-center gap-4 pt-2 text-warm-white/30">
              <span className="h-px flex-1 bg-gradient-to-r from-warm-white/20 to-transparent" />
              <span className="font-serif-jp text-xs tracking-[0.3em]">記憶</span>
              <span className="h-px flex-1 bg-gradient-to-l from-warm-white/20 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
