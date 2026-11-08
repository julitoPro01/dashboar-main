"use client";

import { useState } from "react";
import { sleep } from "../utils";

export const useIsPending = (timeSleep = 500) => {
  const [isPending, setIsPending] = useState(false);

  const runAction  = async <T,>(call: () => Promise<T>): Promise<T> => {
    setIsPending(true);

    try {
      const result = await call();
      await sleep(timeSleep);
      return result;
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, runAction  };
};