"use client";

import useSWR from "swr";

export type LlamaChartPoint = [number, number]; 

export type HyperliquidRevenueSummary = {
  id: string;
  name: string;

  total24h: number;
  total7d: number;
  total30d: number;
  totalAllTime: number;
  dailyRevenue:number;
  totalDataChart: LlamaChartPoint[];
};

const HL_REVENUE_URL = "https://api.llama.fi/summary/fees/hyperliquid?dataType=dailyRevenue";

const fetcher = async (url: string): Promise<HyperliquidRevenueSummary> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch revenue: ${res.status}`);
  return res.json() as Promise<HyperliquidRevenueSummary>;
};

export function useHyperliquidRevenue() {
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<HyperliquidRevenueSummary>(HL_REVENUE_URL, fetcher, {
      refreshInterval: 30_000,
      revalidateOnFocus: true,
      dedupingInterval: 10_000,
    });

    console.log("Fetched revenue data:", data?.dailyRevenue);

  return {
    revenueChart: data?.totalDataChart ?? [],
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
