"use client";

import useSWR from "swr";
import { PriceResponse } from "./types";
import { llamaFetcher, defaultSWRConfig } from "./utils";

const URL = "https://coins.llama.fi/prices/current/coingecko:hyperliquid";

export function useHypePrice() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<PriceResponse>(
    URL,
    llamaFetcher,
    defaultSWRConfig
  );

  return {
    price: data?.coins["coingecko:hyperliquid"]?.price ?? null,
    timestamp: data?.coins["coingecko:hyperliquid"]?.timestamp ?? null,
    error,
    isLoading,
    isValidating,
    refresh: mutate,
  };
}
