// lib/hyperliquid/funding.ts
export type HyperliquidFundingRow = {
  time: number;        // ms epoch
  fundingRate: number; // decimal, e.g. 0.00012
  // premium?: number; // sometimes included depending on endpoint variant
};

export type FundingPoint = { ts: number; fundingRate: number };

const MS_DAY = 24 * 60 * 60 * 1000;

export async function fetchHyperliquidFundingHistory(
  coin: string,
  days = 30,
): Promise<FundingPoint[]> {
  const endTime = Date.now();
  const startTime = endTime - days * MS_DAY;

  const res = await fetch("https://api.hyperliquid.xyz/info", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "fundingHistory",
      coin,
      startTime, // REQUIRED (ms)
      endTime,   // optional
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Hyperliquid fundingHistory failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as HyperliquidFundingRow[];

  return data.map((row) => ({
    ts: Math.floor(row.time / 1000),
    fundingRate: row.fundingRate,
  }));
}
