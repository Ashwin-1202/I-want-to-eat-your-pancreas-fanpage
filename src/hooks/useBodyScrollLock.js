import { useEffect } from "react";

let lockCount = 0;

export default function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;

    lockCount++;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      lockCount--;
      // Only restore when the LAST modal closes
      if (lockCount === 0) {
        document.body.style.overflow = previous || "";
      }
    };
  }, [locked]);
}