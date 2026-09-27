import Reveal from "./Reveal";

export default function LiveSection() {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center bg-bg px-6 py-24">
      <div className="text-center">
        <Reveal>
          <h2 className="font-serif-jp text-6xl tracking-[0.06em] text-cream sm:text-8xl">LIVE.</h2>
        </Reveal>

        <Reveal delay={500} className="mt-8 space-y-1.5 text-warm-white/55">
          <p className="text-sm sm:text-base">Not someday.</p>
          <p className="text-sm sm:text-base">Not when everything is perfect.</p>
          <p className="font-serif-jp text-lg text-gold sm:text-xl">Now.</p>
        </Reveal>
      </div>
    </section>
  );
}
