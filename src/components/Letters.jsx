import { useState } from "react";
import Reveal from "./Reveal";
import LetterCard from "./LetterCard";
import { letters } from "../data/memories";

export default function Letters() {
  const [openId, setOpenId] = useState(null);

  return (
    <section id="letters" className="scroll-mt-nav relative bg-bg-soft/40 px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16 max-w-xl text-center sm:mx-auto sm:text-center">
          <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-blue">Unsent</span>
          <h2 className="font-serif-jp text-3xl text-cream sm:text-4xl">Letters Never Sent</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {letters.map((letter, index) => (
            <Reveal key={letter.id} delay={index * 100} className="flex justify-center">
              <LetterCard
                letter={letter}
                open={openId === letter.id}
                onToggle={() => setOpenId((cur) => (cur === letter.id ? null : letter.id))}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
