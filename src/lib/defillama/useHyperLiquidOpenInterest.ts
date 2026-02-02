"use client";

import useSWR from "swr";

export type LlamaChartPoint = [number, number];  

export type HyperliquidFeesSummary = {
  id: string;
  name: string;

  total24h: number;
  total7d: number;
  total30d: number;
  totalAllTime: number;

  totalDataChart: LlamaChartPoint[];
};

const HL_FEES_URL = "https://api.llama.fi/summary/open-interest/hyperliquid";

const fetcher = async (url: string): Promise<HyperliquidFeesSummary> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch fees: ${res.status}`);
  return res.json() as Promise<HyperliquidFeesSummary>;
};

export function useHyperliquidOpenInterest() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<HyperliquidFeesSummary>(
    HL_FEES_URL,
    fetcher,
    {
      refreshInterval: 30_000,
      revalidateOnFocus: true,
      dedupingInterval: 10_000,
    }
  );

  return {
    feesChart: data?.totalDataChart ?? [],
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
