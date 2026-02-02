import { getProtocolTvlSeries } from "@/lib/api/defillama/marketSeries";
import { fetchHyperliquidFundingHistory } from "@/lib/api/hyperliquid/fundingHistory";
import type { SentimentResponse } from "@/lib/sentiment/types";

type LlamaSummary = {
  total24h: number;
  total7d: number;
  total30d: number;
  totalAllTime: number;
  totalDataChart: [number, number][];
};

type PriceHistory = {
  prices: { timestamp: number; price: number }[];
};

const HL_FEES_URL = "https://api.llama.fi/summary/fees/hyperliquid";
const HL_REVENUE_URL =
  "https://api.llama.fi/summary/fees/hyperliquid?dataType=dailyRevenue";
const HL_OPEN_INTEREST_URL =
  "https://api.llama.fi/summary/open-interest/hyperliquid";
const HYPE_PRICE_CHART_URL = "https://coins.llama.fi/chart/coingecko:hyperliquid";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const pctChange = (from: number, to: number) =>
  Number.isFinite(from) && from !== 0 ? ((to - from) / from) * 100 : null;

const avg = (values: number[]) =>
  values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;

async function fetchSummary(url: string): Promise<LlamaSummary | null> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  return (await res.json()) as LlamaSummary;
}

function scoreLabel(score: number): "Bullish" | "Neutral" | "Bearish" {
  if (score >= 60) return "Bullish";
  if (score <= 40) return "Bearish";
  return "Neutral";
}

function formatPct(value: number | null) {
  if (value == null || !Number.isFinite(value)) return "n/a";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

function ruleBasedExplanation(params: {
  label: string;
  priceChangePct: number | null;
  fundingRate: number | null;
  openInterestChangePct: number | null;
  feesMomentumPct: number | null;
  revenueMomentumPct: number | null;
  tvlChangePct: number | null;
}) {
  const parts: string[] = [];

  parts.push(`Price ${formatPct(params.priceChangePct)}`);
  if (params.fundingRate != null && Number.isFinite(params.fundingRate)) {
    parts.push(`Funding ${params.fundingRate.toFixed(5)}`);
  }
  parts.push(`OI ${formatPct(params.openInterestChangePct)}`);
  parts.push(`Fees ${formatPct(params.feesMomentumPct)}`);
  parts.push(`Revenue ${formatPct(params.revenueMomentumPct)}`);
  parts.push(`TVL ${formatPct(params.tvlChangePct)}`);

  return `${params.label} bias. ${parts.join(" • ")}.`;
}

async function fetchPriceHistory(): Promise<PriceHistory | null> {
  const now = Math.floor(Date.now() / 1000);
  const start = now - 7 * 24 * 60 * 60;
  const url = `${HYPE_PRICE_CHART_URL}?start=${start}&span=7&period=1d`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.coins?.["coingecko:hyperliquid"] ?? null;
}

export async function buildSentiment(): Promise<SentimentResponse> {
  const [fees, revenue, openInterest, priceHistory] = await Promise.all([
    fetchSummary(HL_FEES_URL),
    fetchSummary(HL_REVENUE_URL),
    fetchSummary(HL_OPEN_INTEREST_URL),
    fetchPriceHistory(),
  ]);

  const fundingPoints = await fetchHyperliquidFundingHistory("HYPE", 7).catch(
    () => []
  );

  const tvl = await getProtocolTvlSeries({
    protocolSlug: "hyperliquid",
    points: 30,
  }).catch(() => ({ lastValue: null, changePct: null, sparkline: [] }));

  const prices = priceHistory?.prices ?? [];
  const priceLatest = prices.length ? prices[prices.length - 1].price : null;
  const priceStart = prices.length >= 2 ? prices[0].price : null;
  const priceChangePct =
    priceLatest != null && priceStart != null ? pctChange(priceStart, priceLatest) : null;
  const priceScore =
    priceChangePct == null ? null : clamp(priceChangePct / 30, -1, 1);

  const now = Date.now();
  const since24h = Math.floor((now - 24 * 60 * 60 * 1000) / 1000);
  const fundingRecent = fundingPoints
    .filter((p) => p.ts >= since24h)
    .map((p) => p.fundingRate);

  const fundingRate = avg(fundingRecent) ?? avg(fundingPoints.map((p) => p.fundingRate));
  const fundingScore =
    fundingRate == null || !Number.isFinite(fundingRate)
      ? null
      : clamp(fundingRate * 4000, -1, 1);

  const oiChart = openInterest?.totalDataChart ?? [];
  const oiLatest = oiChart.length ? oiChart[oiChart.length - 1][1] : null;
  const oiPast = oiChart.length >= 8 ? oiChart[oiChart.length - 8][1] : null;
  const openInterestChangePct =
    oiLatest != null && oiPast != null ? pctChange(oiPast, oiLatest) : null;
  const openInterestScore =
    openInterestChangePct == null
      ? null
      : clamp(openInterestChangePct / 20, -1, 1);

  const feesMomentumPct =
    fees && fees.total7d > 0
      ? ((fees.total24h - fees.total7d / 7) / (fees.total7d / 7)) * 100
      : null;
  const revenueMomentumPct =
    revenue && revenue.total7d > 0
      ? ((revenue.total24h - revenue.total7d / 7) / (revenue.total7d / 7)) * 100
      : null;

  const feesScore =
    feesMomentumPct == null ? null : clamp(feesMomentumPct / 30, -1, 1);
  const revenueScore =
    revenueMomentumPct == null ? null : clamp(revenueMomentumPct / 30, -1, 1);

  const tvlChangePct = tvl?.changePct ?? null;
  const tvlScore =
    tvlChangePct == null ? null : clamp(tvlChangePct / 20, -1, 1);

  const weights = {
    price: 0.35,
    funding: 0.2,
    openInterest: 0.2,
    fees: 0.1,
    revenue: 0.1,
    tvl: 0.05,
  };

  const weightedSum =
    (priceScore ?? 0) * weights.price +
    (fundingScore ?? 0) * weights.funding +
    (openInterestScore ?? 0) * weights.openInterest +
    (feesScore ?? 0) * weights.fees +
    (revenueScore ?? 0) * weights.revenue +
    (tvlScore ?? 0) * weights.tvl;

  const score = Math.round((clamp(weightedSum, -1, 1) + 1) * 50);
  const label = scoreLabel(score);

  const signalsAvailable = [
    priceScore,
    fundingScore,
    openInterestScore,
    feesScore,
    revenueScore,
    tvlScore,
  ].filter((v) => v != null).length;

  const confidence = clamp(signalsAvailable / 6, 0.35, 0.95);

  const explanation = ruleBasedExplanation({
    label,
    priceChangePct,
    fundingRate,
    openInterestChangePct,
    feesMomentumPct,
    revenueMomentumPct,
    tvlChangePct,
  });

  return {
    score,
    label,
    confidence,
    explanation,
    updatedAt: Date.now(),
    source: "rules",
    signals: {
      priceChangePct,
      priceScore,
      fundingRate,
      fundingScore,
      openInterestChangePct,
      openInterestScore,
      feesMomentumPct,
      revenueMomentumPct,
      tvlChangePct,
    },
  };
}
