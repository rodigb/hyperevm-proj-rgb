"use client";

import useSWR from "swr";
import { LlamaSummary } from "./types";
import { llamaFetcher, defaultSWRConfig } from "./utils";

export type HyperliquidOpenInterestSummary = LlamaSummary;

const HL_OPEN_INTEREST_URL = "https://api.llama.fi/summary/open-interest/hyperliquid";

export function useHyperliquidOpenInterest() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<HyperliquidOpenInterestSummary>(
    HL_OPEN_INTEREST_URL,
    llamaFetcher,
    defaultSWRConfig
  );

  return {
    chart: data?.totalDataChart ?? [],
    totals: data
      ? {
          total24h: data.total24h,
          total7d: data.total7d,
          total30d: data.total30d,
          totalAllTime: data.totalAllTime,
        }
      : null,
    error,
    isLoading,
    isValidating,
    refresh: mutate,
  };
}
