export type MarketSeries = {
  lastValue: number | null;
  changePct: number | null;
  sparkline: number[];
};

type ProtocolTvlPoint = { date: number; totalLiquidityUSD: number };

type ProtocolResponse = {
  name?: string;
  tvl?: ProtocolTvlPoint[];
};

const BASE = "https://api.llama.fi";

function pctChange(from: number, to: number) {
  if (!Number.isFinite(from) || from === 0) return null;
  return ((to - from) / from) * 100;
}

export async function getProtocolTvlSeries(opts: {
  protocolSlug: string; // e.g. "hyperliquid", "binance-cex"
  points?: number;      // number of points used in sparkline
}): Promise<MarketSeries> {
  const points = opts.points ?? 30;
  const url = `${BASE}/protocol/${encodeURIComponent(opts.protocolSlug)}`;

  const res = await fetch(url, {
    // next: { revalidate: 300 }, // cache 5 minutes server-side
    cache: "no-store",
    headers: {
      // helps avoid odd non-json responses sometimes
      "accept": "application/json",
    },
  });

  if (!res.ok) {
    return { lastValue: null, changePct: null, sparkline: [] };
  }

  const data = (await res.json()) as ProtocolResponse;

  const tvl = Array.isArray(data.tvl) ? data.tvl : [];
  if (tvl.length < 2) return { lastValue: null, changePct: null, sparkline: [] };

  const sliced = tvl.slice(-points);
  const sparkline = sliced
    .map((p) => Number(p.totalLiquidityUSD))
    .filter((n) => Number.isFinite(n));

  const lastValue = sparkline.length ? sparkline[sparkline.length - 1] : null;
  const changePct =
    sparkline.length >= 2 && lastValue != null ? pctChange(sparkline[0], lastValue) : null;

  return { lastValue, changePct, sparkline };
}
