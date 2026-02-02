"use client";

import useSWR from "swr";

type Protocol = {
  name: string;
  mcap: number;
  symbol: string;
};

const URL = "https://api.llama.fi/protocol/hyperliquid";

const fetcher = async (url: string): Promise<Protocol> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed");
  return res.json() as Promise<Protocol>;
};

export function useHypeMarketCap() {
  const { data, error, isLoading } = useSWR(URL, fetcher);

  return {
    marketCap: data?.mcap ?? null,
    symbol: data?.symbol ?? null,
    isLoading,
    error,
  };
}
