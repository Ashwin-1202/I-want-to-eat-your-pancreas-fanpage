import { useState } from "react";
import Reveal from "./Reveal";
import { places } from "../data/memories";

function PlaceCard({ place }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-bg-soft">
      {!failed ? (
        <img
          src={place.image}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover opacity-70 grayscale-[15%] transition-transform duration-[1400ms] ease-out group-hover:scale-110"
        />
      ) : (
        <div
          className="h-full w-full opacity-90 transition-transform duration-[1400ms] ease-out group-hover:scale-110"
          style={{
            background:
              "linear-gradient(160deg, #1c1e24 0%, #101114 55%, #181a1f 100%), radial-gradient(circle at 70% 20%, rgba(215,181,109,0.12), transparent 60%)",
          }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay grain-overlay" />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="font-serif-jp text-lg text-cream sm:text-xl">{place.title}</h3>
        <p className="mt-1.5 max-w-[26ch] text-xs leading-relaxed text-warm-white/60">
          {place.description}
        </p>
      </div>
    </div>
  );
}

export default function Places() {
  return (
    <section className="relative bg-bg-soft/40 px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-xl">
          <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-blue">Where It Happened</span>
          <h2 className="font-serif-jp text-3xl text-cream sm:text-4xl">The Places We Remember</h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {places.map((place, index) => (
            <Reveal key={place.id} delay={index * 70} className={index === 0 ? "col-span-2 lg:col-span-1" : ""}>
              <PlaceCard place={place} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
