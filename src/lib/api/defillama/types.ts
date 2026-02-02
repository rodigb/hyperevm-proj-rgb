export type LlamaChartPoint = [number, number];

export type LlamaSummary = {
  id: string;
  name: string;
  total24h: number;
  total7d: number;
  total30d: number;
  totalAllTime: number;
  totalDataChart: LlamaChartPoint[];
};

export type ProtocolInfo = {
  name: string;
  mcap: number;
  symbol: string;
};

export type PriceResponse = {
  coins: {
    ["coingecko:hyperliquid"]: {
      price: number;
      timestamp: number;
    };
  };
};