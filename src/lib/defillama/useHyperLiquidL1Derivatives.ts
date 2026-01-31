"use client";

import useSWR from "swr";

/* -----------------------------
   Types
------------------------------ */

export type LlamaChartPoint = [number, number]; // [timestampSeconds, value]

export type HyperliquidDerivativesSummary = {
  id: string;
  name: string;
  total24h: number;
  total7d: number;
  total30d: number;
  totalAllTime: number;
  totalDataChart: LlamaChartPoint[];
};

const HL_DERIVATIVES_URL = "https://api.llama.fi/summary/derivatives/hyperliquid";

/* -----------------------------
   Fetcher
------------------------------ */
const fetcher = async (url: string): Promise<HyperliquidDerivativesSummary> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch derivatives: ${res.status}`);
  return res.json() as Promise<HyperliquidDerivativesSummary>;
};

/* -----------------------------
   Hook
------------------------------ */
export function useHyperliquidL1Derivatives() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    HyperliquidDerivativesSummary
  >(HL_DERIVATIVES_URL, fetcher, {
    refreshInterval: 30_000,
    revalidateOnFocus: true,
    dedupingInterval: 10_000,
  });

  const derivatives = data?.totalDataChart ?? [];

  return {
    derivatives, // <-- [timestamp, value]
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
