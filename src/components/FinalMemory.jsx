import { useState } from "react";
import Reveal from "./Reveal";
import CherryBlossomParticles from "./CherryBlossomParticles";
import { images } from "../data/memories";

export default function FinalMemory() {
  const [imageFailed, setImageFailed] = useState(false);

  const replay = () => {
    document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[90svh] items-center justify-center overflow-hidden bg-bg px-6 py-28">
      <div className="absolute inset-0">
        {!imageFailed ? (
          <img
            src={images.sunset}
            alt=""
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover opacity-40"
          />
        ) : (
          <div
            className="h-full w-full opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(232,169,184,0.14), transparent 65%), linear-gradient(180deg, #101114 0%, #14151a 60%, #181a1f 100%)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/60 to-bg" />
      </div>

      <CherryBlossomParticles density="light" />

      <div className="relative z-10 mx-auto max-w-xl text-center">
        <Reveal className="space-y-1.5">
          <p className="font-serif-jp text-xl text-cream sm:text-2xl">Some stories end.</p>
          <p className="font-serif-jp text-xl text-cream sm:text-2xl">Some memories don't.</p>
        </Reveal>

        <Reveal delay={300} className="mt-10 text-sm uppercase tracking-[0.28em] text-warm-white/50">
          Thank you for the summer.
        </Reveal>

        <Reveal delay={600} className="mt-10">
          <p className="font-serif-jp text-2xl tracking-[0.1em] text-warm-white/40">君の膵臓をたべたい</p>
        </Reveal>

        <Reveal delay={850} className="mt-14">
          <button
            type="button"
            onClick={replay}
            className="rounded-full border border-warm-white/20 px-7 py-3 text-xs uppercase tracking-[0.24em] text-warm-white/70 transition-colors duration-300 hover:border-gold/50 hover:text-gold"
          >
            Replay the memories
          </button>
        </Reveal>
      </div>
    </section>
  );
}
