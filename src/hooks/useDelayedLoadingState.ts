import { useEffect } from "react";

type LoadingState = "loading" | "loaded" | "error";

interface Props {
  isFetching: boolean;
  isError: boolean;
  setState: (state: LoadingState) => void;
  delay?: number;
}

export const useDelayedLoadingState = ({
  isFetching,
  isError,
  setState,
  delay = 500,
}: Props) => {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (isFetching) {
      setState("loading");
      return;
    }

    timer = setTimeout(() => {
      setState(isError ? "error" : "loaded");
    }, delay);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isFetching, isError, delay, setState]);
};
