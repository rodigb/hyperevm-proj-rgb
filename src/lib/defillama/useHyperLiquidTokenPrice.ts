"use client";

import useSWR from "swr";

type PriceResponse = {
  coins: {
    ["coingecko:hyperliquid"]: {
      price: number;
      timestamp: number;
    };
  };
};

const URL =
  "https://coins.llama.fi/prices/current/coingecko:hyperliquid";

const fetcher = async (url: string): Promise<PriceResponse> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch price");
  return res.json() as Promise<PriceResponse>;
};

export function useHypePrice() {
  const { data, error, isLoading } = useSWR(URL, fetcher, {
    refreshInterval: 30_000,
  });

  return {
    price: data?.coins["coingecko:hyperliquid"]?.price ?? null,
    timestamp: data?.coins["coingecko:hyperliquid"]?.timestamp ?? null,
    error,
    isLoading,
  };
}
