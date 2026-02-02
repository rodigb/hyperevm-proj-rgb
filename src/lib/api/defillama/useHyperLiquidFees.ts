"use client";

import useSWR from "swr";
import { LlamaSummary } from "./types";
import { llamaFetcher, defaultSWRConfig } from "./utils";

export type HyperliquidFeesSummary = LlamaSummary;

const HL_FEES_URL = "https://api.llama.fi/summary/fees/hyperliquid";

export function useHyperliquidFees() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<HyperliquidFeesSummary>(
    HL_FEES_URL,
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
