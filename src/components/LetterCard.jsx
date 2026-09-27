import { Mail, MailOpen } from "lucide-react";

export default function LetterCard({ letter, open, onToggle }) {
  return (
    <div className="flex flex-col items-center text-center">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full max-w-xs flex-col items-center gap-4 rounded-sm border border-warm-white/12 bg-bg-soft px-6 py-8 transition-colors duration-500 hover:border-gold/40"
      >
        {open ? (
          <MailOpen className="h-6 w-6 text-gold" strokeWidth={1.2} />
        ) : (
          <Mail className="h-6 w-6 text-warm-white/50 transition-colors duration-500 group-hover:text-gold" strokeWidth={1.2} />
        )}
        <p className="font-serif-jp text-base leading-snug text-cream">{letter.to}</p>
        <span className="text-[10px] uppercase tracking-[0.22em] text-warm-white/40">
          {open ? "Close letter" : "Open letter"}
        </span>
      </button>

      <div
        className={`grid w-full max-w-xs overflow-hidden transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 rounded-sm border border-warm-white/10 bg-bg-soft/60 px-6 py-6 text-left">
          <p className="text-sm leading-relaxed text-warm-white/75">{letter.body}</p>
        </div>
      </div>
    </div>
  );
}
