"use client";

import { Box, Chip } from "@mui/material";
import Sparkline from "./charts/SparkLine";

function formatUsd(n: number) {
  return n >= 1000
    ? `$${n.toLocaleString("en-GB", { maximumFractionDigits: 0 })}`
    : `$${n.toFixed(2)}`;
}

export default function MarketPulseCard({
  symbolLabel,
  lastPrice,
  changePct,
  sparkline,
}: {
  symbolLabel: string; // e.g. "BTCUSDT"
  lastPrice: number | null; // parsed
  changePct: number | null; // parsed
  sparkline: number[]; // close prices
}) {
  const rightSlot =
    changePct == null ? null : (
      <Chip
        size="small"
        label={`${changePct >= 0 ? "+" : ""}${changePct.toFixed(2)}% (24h)`}
        sx={{
          borderRadius: 999,
          bgcolor:
            changePct >= 0 ? "rgba(37,230,213,0.12)" : "rgba(255,82,82,0.12)",
          border: `1px solid ${
            changePct >= 0 ? "rgba(37,230,213,0.25)" : "rgba(255,82,82,0.25)"
          }`,
          color: "text.primary",
        }}
      />
    );

  return <Sparkline values={sparkline} />;
}
