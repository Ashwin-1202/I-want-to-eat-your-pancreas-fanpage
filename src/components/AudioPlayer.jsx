import { useEffect, useRef, useState } from "react";
import { Music, Music2 } from "lucide-react";

/**
 * A quiet, opt-in ambient audio control. Never autoplays with sound —
 * the visitor has to choose it. If /audio/ambient.mp3 isn't present,
 * the button still works, it just has nothing to play.
 */
export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/ambient.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audio.addEventListener("error", () => setUnavailable(true));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setUnavailable(true));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause ambient music" : "Play ambient music"}
      aria-pressed={playing}
      title={unavailable ? "Ambient track unavailable" : undefined}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-warm-white/15 bg-bg-soft/80 text-cream backdrop-blur-md shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-gold/50 hover:text-gold focus-visible:outline-2 focus-visible:outline-gold"
    >
      {playing ? <Music2 className="h-4 w-4" strokeWidth={1.5} /> : <Music className="h-4 w-4" strokeWidth={1.5} />}
      <span
        className={`absolute inset-0 rounded-full border border-gold/40 transition-opacity duration-700 ${
          playing ? "animate-ping opacity-40" : "opacity-0"
        }`}
      />
    </button>
  );
}
