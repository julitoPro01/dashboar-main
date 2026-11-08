"use client";

import { useState } from "react";
import { sleep } from "../utils";

export const useIsFetching = (timeSleep = 500) => {
  const [isFetching, setIsFetching] = useState(false);

  const runAction  = async <T,>(call: () => Promise<T>): Promise<T> => {
    setIsFetching(true);

    try {
      const result = await call();
      await sleep(timeSleep);
      return result;
    } finally {
      setIsFetching(false);
    }
  };

  return { isFetching, runAction  };
};