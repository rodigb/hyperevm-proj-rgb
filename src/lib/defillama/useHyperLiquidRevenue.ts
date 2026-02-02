"use client";

import useSWR from "swr";
import { LlamaSummary } from "./types";
import { llamaFetcher, defaultSWRConfig } from "./utils";

export type HyperliquidRevenueSummary = LlamaSummary & {
  dailyRevenue: number;
};

const HL_REVENUE_URL = "https://api.llama.fi/summary/fees/hyperliquid?dataType=dailyRevenue";

export function useHyperliquidRevenue() {
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<HyperliquidRevenueSummary>(HL_REVENUE_URL, llamaFetcher, defaultSWRConfig);

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
