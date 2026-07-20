import { FetchStatus } from "@/src/store/uiSlice";
import { useEffect, useRef, useState } from "react";

interface Props {
  isFetching: boolean;
  errorMsg?: { title?: string, desc?: string } | boolean;
  setState: (state: FetchStatus) => void;
  delay?: number;
}

export const useDelayedFetchState = ({
  isFetching,
  errorMsg,
  setState,
  delay = 500,
}: Props) => {

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (isFetching) {
      setState({ status: "loading" });
      return;
    }

    timer = setTimeout(() => {
      setState(
        typeof errorMsg === "object" ? { status: "error", titleMsg: errorMsg.title, descMsg: errorMsg.desc }
          : typeof errorMsg === "boolean" && errorMsg ? { status: "error" } : { status: "success" });
    }, delay);

    return () => {
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [isFetching, errorMsg, delay, setState]);

};

//---------------------------

interface FetchState {
  status: "idle" | "loading" | "success" | "error";
  titleErrMsg?: string;
  descErrMsg?: string;
}

interface PropsDelay {
  isFetching: boolean;
  errorMsg?: { title?: string; desc?: string } | boolean;
  delay?: number;
  minLoadingTime?: number;
}

export const useLoadingWithDelay = ({ isFetching, errorMsg, delay = 300, minLoadingTime = 400 }: PropsDelay) => {

  const [fetchState, setFetchState] = useState<FetchState>({ status: "idle" });
  const isLoadingActive = useRef(false);



  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout> | null = null;

    if (delayTimer) clearTimeout(delayTimer);

    const finishState = () => {
      const isError = typeof errorMsg === "object" ? true : typeof errorMsg === "boolean" && errorMsg;
      setFetchState({
        status: isError ? "error" : "success",
        titleErrMsg: typeof errorMsg === "object" && errorMsg.title ? errorMsg.title : undefined,
        descErrMsg: typeof errorMsg === "object" && errorMsg.desc ? errorMsg.desc : undefined,
      });
    }

    if (isFetching && !isLoadingActive.current) {
      delayTimer = setTimeout(() => {
        setFetchState({ status: "loading" });
        isLoadingActive.current = true;
      }, delay);

    } else if (!isFetching && !isLoadingActive.current) {
      finishState();
    }
    // ----------------
    if (!isFetching && isLoadingActive.current) {
      delayTimer = setTimeout(() => {
        finishState();
        isLoadingActive.current = false;
      }, minLoadingTime);
    }

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
    }
  }, [isFetching, delay, minLoadingTime, errorMsg]);

  return { ...fetchState };
}