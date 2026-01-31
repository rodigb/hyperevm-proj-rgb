"use client";

import * as React from "react";
import { Typography, Box, Skeleton, Button } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useHyperliquidL1Derivatives } from "@/lib/defillama/useHyperLiquidL1Derivatives";

type ChartDatum = { t: string; v: number };

//TIDY UP THIS FILE LATER

function formatUSD(num: number) {
  const abs = Math.abs(num);
  if (abs >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `$${(num / 1e9).toFixed(2)}b`;
  if (abs >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(0)}`;
}

function toMMDD(tsSeconds: number) {
  const d = new Date(tsSeconds * 1000);
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${mm}-${dd}`;
}

export default function Graph() {
  const { derivatives, totals, isLoading, error } =
    useHyperliquidL1Derivatives();

  const [timeframe, setTimeframe] = React.useState<"7d" | "30d" | "all">("30d");

  const chartData: ChartDatum[] = React.useMemo(() => {
    const last = derivatives.slice(
      timeframe === "7d" ? -7 : timeframe === "30d" ? -30 : undefined,
    );
    return last.map(([ts, val]) => ({ t: toMMDD(ts), v: val }));
  }, [derivatives, timeframe]);

  return (
    <Box
      sx={{
        background: `
          repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.03) 0px,
            rgba(255, 255, 255, 0.03) 1px,
            transparent 5px
          ),
          linear-gradient(180deg, #09121f 0%, #05080f 100%)
        `,
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Volume</Typography>

        <Typography variant="body2" sx={{ opacity: 0.75 }}>
          {error
            ? "Failed to load"
            : totals
              ? `24h: ${formatUSD(totals.total24h)}`
              : "Loading…"}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
        <Button
          size="small"
          variant={timeframe === "7d" ? "contained" : "text"}
          onClick={() => setTimeframe("7d")}
          sx={{
            bgcolor:
              timeframe === "7d" ? "rgba(80,210,193,0.18)" : "transparent",
          }}
        >
          7d
        </Button>

        <Button
          size="small"
          variant={timeframe === "30d" ? "contained" : "text"}
          onClick={() => setTimeframe("30d")}
          sx={{
            bgcolor:
              timeframe === "30d" ? "rgba(80,210,193,0.18)" : "transparent",
          }}
        >
          30d
        </Button>
      </Box>
      <Box sx={{ width: "100%", height: 260 }}>
        {isLoading ? (
          <Skeleton variant="rounded" height={260} />
        ) : (
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis
                dataKey="t"
                stroke="rgba(255,255,255,0.55)"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.55)"
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => formatUSD(v).replace("$", "")}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(10,10,14,0.9)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 12,
                  width: 200,
                  height: 100,
                }}
                itemStyle={{
                  color: "white",
                }}
                labelStyle={{ color: "rgba(255, 255, 255, 0.8)" }}
                labelFormatter={(label) => `Date: ${label}`}
                formatter={(value) => formatUSD(Number(value))}
              />
              <Line
                type="monotone"
                dataKey="v"
                stroke="#50d2c1"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  );
}
