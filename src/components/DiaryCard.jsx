export default function DiaryCard({ entry, open, onToggle }) {
  return (
    <div
      className="relative"
      style={{ transform: `rotate(${entry.rotation}deg)`, perspective: "1200px" }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="diary-paper relative block w-full rounded-[2px] p-6 text-left transition-transform duration-500 hover:-translate-y-1 focus-visible:-translate-y-1 sm:p-7"
      >
        {/* tape */}
        <span className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-2 bg-warm-white/25 backdrop-blur-sm" />

        <span className="mb-4 block text-[10px] uppercase tracking-[0.24em] text-rose/70">
          Entry {String(entry.id).padStart(2, "0")}
        </span>

        <p className="font-serif-jp text-lg leading-snug text-[#3a332a] sm:text-xl">{entry.text}</p>

        <div
          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "grid-rows-[1fr] mt-4 opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 border-t border-[#3a332a]/15 pt-4">
            <p className="text-sm leading-relaxed text-[#4a4136]">{entry.body}</p>
          </div>
        </div>

        <span className="mt-5 block text-[10px] uppercase tracking-[0.2em] text-[#3a332a]/40">
          {open ? "Close entry" : "Open entry"}
        </span>
      </button>
    </div>
  );
}
