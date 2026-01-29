export type DefiLlamaProtocol = {
  name: string;
  slug: string;
  tvl?: number;
  chains?: string[];
  category?: string;
  symbol?: string;
  change_1d?: number;
  change_7d?: number;
  change_1m?: number;
};

const LLAMA_PROTOCOLS_URL = "https://api.llama.fi/protocols";
const HL_CHAIN = "Hyperliquid L1"; // matches the chain page table

export async function getHyperliquidL1Protocols() {
  const res = await fetch(LLAMA_PROTOCOLS_URL, {
    next: { revalidate: 300 }, // cache 5 min
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch protocols: ${res.status}`);
  }

  const protocols = (await res.json()) as DefiLlamaProtocol[];

  return protocols
    .filter((p) => p.chains?.includes(HL_CHAIN))
    .filter((p) => p.slug && p.name)
    .sort((a, b) => (b.tvl ?? 0) - (a.tvl ?? 0));
}
