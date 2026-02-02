"use client";

import useSWR from "swr";
import { llamaFetcher, defaultSWRConfig } from "./utils";

type PriceHistoryResponse = {
  coins: {
    [key: string]: {
      prices: { timestamp: number; price: number }[];
    };
  };
};

const HYPE_PRICE_CHART_URL = "https://coins.llama.fi/chart/coingecko:hyperliquid";

export function useHypePriceChange(days = 7) {

 
  const now = Math.floor(Date.now() / 1000);
  const start = now - days * 24 * 60 * 60;
  const url = `${HYPE_PRICE_CHART_URL}?start=${start}&span=${days}&period=1d`;

  const { data, error, isLoading, isValidating, mutate } = useSWR<PriceHistoryResponse>(
    url,
    llamaFetcher,
    defaultSWRConfig
  );

  const prices = data?.coins?.["coingecko:hyperliquid"]?.prices ?? [];
  const first = prices.length >= 2 ? prices[0].price : null;
  const last = prices.length ? prices[prices.length - 1].price : null;
  const changePct =
    first != null && last != null && first !== 0 ? ((last - first) / first) * 100 : null;

  return {
    changePct,
    error,
    isLoading,
    isValidating,
    refresh: mutate,
  };
}
