"use client";

import useSWR from "swr";
import { ProtocolInfo } from "./types";
import { llamaFetcher, defaultSWRConfig } from "./utils";

const URL = "https://api.llama.fi/protocol/hyperliquid";

export function useHypeMarketCap() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<ProtocolInfo>(
    URL,
    llamaFetcher,
    defaultSWRConfig
  );

  return {
    marketCap: data?.mcap ?? null,
    symbol: data?.symbol ?? null,
    error,
    isLoading,
    isValidating,
    refresh: mutate,
  };
}
