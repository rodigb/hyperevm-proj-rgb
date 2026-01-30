"use client";

import useSWR from "swr";

export type DefiLlamaProtocol = {
  logo: string;
  name: string;
  slug: string;
  tvl?: number;
  chains?: string[];
  category?: string;
  symbol?: string;
  change_1h?: number;
  change_1d?: number;
  change_7d?: number;
};

const LLAMA_PROTOCOLS_URL = "https://api.llama.fi/protocols";
const HL_CHAIN = "Hyperliquid L1";

/* -----------------------------
   Fetcher Function (SWR)
------------------------------ */
const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch protocols: ${res.status}`);
  }

  return res.json();
};
 
export function useHyperliquidL1Protocols() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    DefiLlamaProtocol[]
  >(LLAMA_PROTOCOLS_URL, fetcher, {
    refreshInterval: 30_000,  
    revalidateOnFocus: true,
    dedupingInterval: 10_000,
  });

   const protocols =
    data
      ?.filter((p) => p.chains?.includes(HL_CHAIN))
      .filter((p) => p.slug && p.name)
      .sort((a, b) => (b.tvl ?? 0) - (a.tvl ?? 0))
      .slice(0) ?? [];

  return {
    protocols,
    error,
    isLoading,
    isValidating,
    refresh: mutate,
  };
}
