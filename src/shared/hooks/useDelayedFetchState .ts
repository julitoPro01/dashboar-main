import { FetchStatus } from "@/src/store/uiSlice";
import { useEffect } from "react";

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

