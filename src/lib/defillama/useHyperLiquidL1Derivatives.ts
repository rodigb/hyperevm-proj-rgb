"use client";

import useSWR from "swr";
import { LlamaSummary } from "./types";
import { llamaFetcher, defaultSWRConfig } from "./utils";

export type HyperliquidDerivativesSummary = LlamaSummary;

const HL_DERIVATIVES_URL = "https://api.llama.fi/summary/derivatives/hyperliquid";

export function useHyperliquidL1Derivatives() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    HyperliquidDerivativesSummary
  >(HL_DERIVATIVES_URL, llamaFetcher, defaultSWRConfig);

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
