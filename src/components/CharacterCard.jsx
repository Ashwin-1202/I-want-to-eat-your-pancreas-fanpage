import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function CharacterCard({ character, onSelect, featured = false }) {
  const [failed, setFailed] = useState(false);

  return (
    <article
      className={`group relative overflow-hidden rounded-sm border border-warm-white/10 bg-bg-soft transition-all duration-700 hover:border-warm-white/20 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect?.(character)}
        aria-label={`Explore ${character.name}`}
        className="block w-full text-left focus-visible:ring-1 focus-visible:ring-gold"
      >
        <div className={`relative overflow-hidden ${featured ? "aspect-[16/9] md:aspect-[2/1]" : "aspect-[4/5]"}`}>
          {!failed ? (
            <img
              src={character.image}
              alt=""
              loading={featured ? "eager" : "lazy"}
              onError={() => setFailed(true)}
              className="h-full w-full object-cover grayscale-[10%] transition-[transform,filter] duration-[1200ms] ease-out group-hover:scale-[1.045] group-hover:brightness-105"
            />
          ) : (
            <div
              className="h-full w-full"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, rgba(232,169,184,.18), transparent 45%), linear-gradient(160deg,#202229,#101114)",
              }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/15 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
            <p className="text-[10px] uppercase tracking-[0.3em] text-blue">
              {character.role}
            </p>

            <h3 className={`${featured ? "text-3xl sm:text-4xl" : "text-2xl"} mt-2 font-serif-jp text-cream`}>
              {character.name}
            </h3>

            <p className="mt-1 font-serif-jp text-sm tracking-[0.15em] text-warm-white/45">
              {character.japaneseName}
            </p>

            <p className="mt-4 max-w-xl text-xs leading-6 text-warm-white/55 transition-transform duration-700 group-hover:translate-x-1 sm:text-sm">
              {character.introduction}
            </p>
          </div>

          <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-warm-white/20 bg-bg/40 backdrop-blur-sm transition-all duration-500 group-hover:border-gold/60 group-hover:bg-bg/65">
            <ArrowUpRight
              className="h-4 w-4 text-warm-white/60 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
              strokeWidth={1.3}
            />
          </div>
        </div>
      </button>
    </article>
  );
}
