import Reveal from "./Reveal";
import { themes } from "../data/memories";

export default function Themes() {
  return (
    <section id="meaning" className="scroll-mt-nav relative bg-bg px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16 max-w-xl">
          <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-blue">Afterward</span>
          <h2 className="font-serif-jp text-3xl text-cream sm:text-4xl">What the story leaves behind</h2>
        </Reveal>

        <div className="grid grid-cols-1 divide-y divide-warm-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {themes.map((theme, index) => (
            <Reveal
              key={theme.word}
              delay={index * 90}
              className="group relative overflow-hidden px-2 py-10 sm:px-10 sm:py-14"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose/0 via-transparent to-gold/0 opacity-0 transition-opacity duration-700 group-hover:opacity-10" />
              <h3 className="font-serif-jp text-3xl tracking-wide text-cream transition-colors duration-500 group-hover:text-gold sm:text-4xl">
                {theme.word}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-warm-white/65">{theme.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
