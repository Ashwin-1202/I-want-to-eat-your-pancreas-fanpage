import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import CharacterCard from "../components/CharacterCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { characters } from "../data/characters";

// 👇 Add your hero image path here (e.g. /images/characters-hero.jpg)
const HERO_IMAGE = "/images/characters-hero.jpg";

function CharacterDetail({ character, onClose }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[75] overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="character-detail-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mx-auto my-6 max-w-5xl overflow-hidden border border-warm-white/10 bg-bg shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:my-12">
        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[360px] bg-bg-soft md:min-h-[620px]">
            {!failed ? (
              <img
                src={character.image}
                alt=""
                loading="eager"
                onError={() => setFailed(true)}
                className="h-full min-h-[360px] w-full object-cover md:min-h-[620px]"
              />
            ) : (
              <div
                className="h-full min-h-[360px] w-full md:min-h-[620px]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 25%, rgba(232,169,184,.20), transparent 42%), linear-gradient(160deg,#22242b,#0d0e11)",
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-bg/30" />
          </div>

          <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close character details"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-warm-white/15 bg-bg/60 text-cream backdrop-blur-md transition-colors hover:border-gold/60 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold"
            >
              <X className="h-5 w-5" strokeWidth={1.2} />
            </button>

            <p className="text-[10px] uppercase tracking-[0.35em] text-blue">
              {character.role}
            </p>

            <h2 id="character-detail-title" className="mt-4 font-serif-jp text-4xl leading-tight text-cream sm:text-5xl">
              {character.name}
            </h2>

            <p className="mt-2 font-serif-jp text-base tracking-[0.18em] text-warm-white/40">
              {character.japaneseName}
            </p>

            <div className="my-7 h-px w-20 bg-gold/50" />

            <p className="text-sm leading-7 text-warm-white/70 sm:text-base sm:leading-8">
              {character.introduction}
            </p>

            <div className="mt-9 grid gap-7 sm:grid-cols-2">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-blue">
                  Character
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {character.personality.map((trait) => (
                    <span key={trait} className="border border-warm-white/10 px-3 py-2 text-xs text-warm-white/65">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-blue">
                  Themes
                </p>
                <div className="mt-3 space-y-2">
                  {character.themes.map((theme) => (
                    <p key={theme} className="text-xs leading-5 text-warm-white/55">
                      {theme}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-10 inline-flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-warm-white/55 transition-colors hover:text-gold focus-visible:ring-1 focus-visible:ring-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.2} />
              Back to Characters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  // 👇 Track image load failure so the hero never breaks the layout
  const [heroFailed, setHeroFailed] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-warm-white">
      <Navbar />

      <main>
        {/* ---------- HERO BANNER ---------- */}
       <section className="relative flex min-h-[68svh] items-center justify-center overflow-hidden px-6 py-32">

  {/* 1. Fallback gradient (bottom layer) */}
  <div
    aria-hidden="true"
    className="absolute inset-0 z-0"
    style={{
      background:
        "radial-gradient(ellipse 55% 50% at 50% 35%, rgba(232,169,184,.12), transparent 70%), radial-gradient(ellipse 40% 35% at 20% 70%, rgba(113,133,156,.08), transparent 70%), linear-gradient(180deg,#17181d,#101114)",
    }}
  />

  {/* 2. Hero image (above fallback) */}
  {!heroFailed && (
    <img
      src={HERO_IMAGE}
      alt=""
      aria-hidden="true"
      loading="eager"
      fetchPriority="high"
      onError={() => setHeroFailed(true)}
      className="absolute inset-0 z-[1] h-full w-full object-cover object-center"
      style={{ animation: "heroZoom 18s ease-out forwards" }}
    />
  )}

  {/* 3. Cinematic overlay (above image) */}
  <div
    aria-hidden="true"
    className="absolute inset-0 z-[2]"
    style={{
      background:
        "linear-gradient(180deg, rgba(16,17,20,.45) 0%, rgba(16,17,20,.15) 40%, rgba(16,17,20,.80) 100%), radial-gradient(ellipse 75% 65% at 50% 50%, transparent 45%, rgba(0,0,0,.45) 100%)",
    }}
  />

  {/* 4. Grain dots (above overlay) */}
  <div
    aria-hidden="true"
    className="absolute inset-0 z-[3] opacity-30 [background-image:radial-gradient(circle_at_20%_20%,rgba(244,235,221,.12)_0_1px,transparent_1px)] [background-size:90px_90px]"
  />

  {/* 5. Content (top) */}
  <div className="relative z-10 max-w-3xl text-center">
    <Reveal>
      <span className="text-[10px] uppercase tracking-[0.4em] text-blue">
        The People
      </span>
    </Reveal>

    <Reveal delay={120}>
      <p className="mt-5 font-serif-jp text-sm tracking-[0.25em] text-warm-white/35">
        登場人物
      </p>
    </Reveal>

    <Reveal delay={180}>
      <h1 className="mt-3 font-serif-jp text-5xl text-cream sm:text-7xl">
        Characters
      </h1>
    </Reveal>

    <Reveal delay={300}>
      <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-warm-white/60 sm:text-base sm:leading-8">
        A quiet archive of the people whose presence gives the story its
        shape — and whose memories continue after a moment has passed.
      </p>
    </Reveal>
  </div>

  <div
    aria-hidden="true"
    className="absolute bottom-0 left-1/2 z-10 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-warm-white/10"
  />
</section>

        {/* ---------- CHARACTERS GRID ---------- */}
        <section className="relative px-6 py-24 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="mb-12 flex items-end justify-between gap-6 border-b border-warm-white/10 pb-5">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.32em] text-blue">
                    A preserved cast
                  </p>
                  <h2 className="mt-3 font-serif-jp text-3xl text-cream sm:text-4xl">
                    The people we remember
                  </h2>
                </div>
                <span className="hidden text-[10px] uppercase tracking-[0.25em] text-warm-white/25 sm:block">
                  {characters.length.toString().padStart(2, "0")} portraits
                </span>
              </div>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2">
              {characters.map((character, index) => (
                <Reveal
                  key={character.id}
                  delay={index * 70}
                  className={index === 0 ? "md:col-span-2" : ""}
                >
                  <CharacterCard
                    character={character}
                    featured={index === 0}
                    onSelect={setSelectedCharacter}
                  />
                </Reveal>
              ))}
            </div>

            <Reveal delay={180}>
              <div className="mt-20 border-t border-warm-white/10 pt-8">
                <Link
                  to="/"
                  className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-warm-white/45 transition-colors hover:text-gold"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" strokeWidth={1.2} />
                  Return to the tribute
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.2} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />

      {selectedCharacter && (
        <CharacterDetail
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}

      {/* Keyframe for the slow cinematic hero zoom */}
      <style>{`
        @keyframes heroZoom {
          0%   { transform: scale(1.06); }
          100% { transform: scale(1);    }
        }
        @media (prefers-reduced-motion: reduce) {
          section img[style*="heroZoom"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}