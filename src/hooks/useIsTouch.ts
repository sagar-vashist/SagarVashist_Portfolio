"use client";

import { useEffect, useState } from "react";

export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouch(hasTouch);
    };

    checkTouch();
  }, []);

  return isTouch;
}
