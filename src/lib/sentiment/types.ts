export type SentimentSignals = {
  priceChangePct: number | null;
  priceScore: number | null;
  fundingRate: number | null;
  fundingScore: number | null;
  openInterestChangePct: number | null;
  openInterestScore: number | null;
  feesMomentumPct: number | null;
  revenueMomentumPct: number | null;
  tvlChangePct: number | null;
};

export type SentimentResponse = {
  score: number;
  label: "Bullish" | "Neutral" | "Bearish";
  confidence: number;
  explanation: string;
  updatedAt: number;
  source: "rules";
  signals: SentimentSignals;
};
