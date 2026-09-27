import { useMemo } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

/**
 * A small, fixed field of drifting petals. Kept intentionally sparse —
 * this is atmosphere, not a particle showcase. Count is reduced
 * automatically for narrow viewports and disabled for users who
 * prefer reduced motion.
 */
export default function CherryBlossomParticles({ density = "normal", className = "" }) {
  const reducedMotion = useReducedMotion();

  const count = useMemo(() => {
    if (reducedMotion) return 0;
    const base = density === "light" ? 8 : 14;
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      return Math.round(base * 0.5);
    }
    return base;
  }, [reducedMotion, density]);

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        size: 6 + Math.random() * 8,
        duration: 10 + Math.random() * 9,
        delay: Math.random() * 10,
        driftX: Math.round((Math.random() - 0.5) * 160),
        opacity: 0.4 + Math.random() * 0.4,
      })),
    [count]
  );

  if (count === 0) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="absolute top-0 block rounded-[60%_40%_55%_45%] bg-pink animate-drift"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.78}px`,
            opacity: petal.opacity,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            "--drift-x": `${petal.driftX}px`,
          }}
        />
      ))}
    </div>
  );
}
