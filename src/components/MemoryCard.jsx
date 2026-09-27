import { useId } from "react";
import { Plus } from "lucide-react";

export default function MemoryCard({ memory, expanded, onToggle }) {
  const detailId = useId();

  return (
    <div
      className={`group relative shrink-0 snap-start rounded-sm border transition-colors duration-500 ${
        expanded ? "border-gold/40 bg-bg-soft" : "border-warm-white/10 bg-bg-soft/60 hover:border-warm-white/25"
      } w-[78vw] max-w-xs sm:w-72`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={detailId}
        className="w-full px-6 pb-6 pt-7 text-left"
      >
        <div className="mb-6 flex items-start justify-between">
          <span className="font-serif-jp text-4xl text-warm-white/15">{memory.number}</span>
          <Plus
            strokeWidth={1.3}
            className={`h-4 w-4 text-gold transition-transform duration-500 ${expanded ? "rotate-45" : ""}`}
          />
        </div>

        <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-blue">{memory.date}</span>
        <h3 className="mb-3 font-serif-jp text-xl text-cream">{memory.title}</h3>
        <p className="text-sm leading-relaxed text-warm-white/60">{memory.description}</p>
      </button>

      <div
        id={detailId}
        className={`grid overflow-hidden px-6 transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          expanded ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 border-t border-warm-white/10 pt-4">
          <p className="text-sm leading-relaxed text-warm-white/70">{memory.detail}</p>
        </div>
      </div>
    </div>
  );
}
