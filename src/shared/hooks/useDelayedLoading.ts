import { useEffect, useRef, useState } from "react";

interface Props {
  isFetching: boolean;
  delay?: number;
  minLoadingTime?: number;
}

export function useDelayedLoading({
  isFetching,
  delay = 250,
  minLoadingTime = 500,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const delayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadingStartedAt = useRef<number | null>(null);

  useEffect(() => {
    if (isFetching) {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }

      if (!isLoading && !delayTimer.current) {
        delayTimer.current = setTimeout(() => {
          loadingStartedAt.current = Date.now();
          setIsLoading(true);
          delayTimer.current = null;
        }, delay);
      }

      return;
    }

    // Terminó antes de mostrar el loading
    if (delayTimer.current) {
      clearTimeout(delayTimer.current);
      delayTimer.current = null;
      return;
    }

    // Nunca estuvo visible
    if (!isLoading) return;

    const elapsed = Date.now() - (loadingStartedAt.current ?? Date.now());
    const remaining = Math.max(0, minLoadingTime - elapsed);

    hideTimer.current = setTimeout(() => {
      setIsLoading(false);
      loadingStartedAt.current = null;
      hideTimer.current = null;
    }, remaining);

    return () => {
      if (delayTimer.current) clearTimeout(delayTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [isFetching, isLoading, delay, minLoadingTime]);

  return isLoading;
}