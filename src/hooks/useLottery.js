import { useState, useCallback, useRef } from "react";

export function useLottery(items) {
  const [current, setCurrent] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const timeoutRef = useRef(null);

  const spin = useCallback(
    (onResult) => {
      if (!items.length) return;
      setIsSpinning(true);
      setIsDone(false);

      const finalIndex = Math.floor(Math.random() * items.length);
      let elapsed = 0;
      const duration = 2000;
      let speed = 30;

      const tick = () => {
        const idx = Math.floor(Math.random() * items.length);
        setCurrent(items[idx]);
        elapsed += speed;

        if (elapsed >= duration) {
          setCurrent(items[finalIndex]);
          setIsSpinning(false);
          setIsDone(true);
          onResult?.(items[finalIndex]);
          return;
        }

        timeoutRef.current = setTimeout(tick, speed);
      };

      timeoutRef.current = setTimeout(tick, speed);
    },
    [items]
  );

  return { current, isSpinning, isDone, spin };
}
