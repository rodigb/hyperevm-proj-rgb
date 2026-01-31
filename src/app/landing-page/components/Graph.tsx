"use client";

import * as React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { t: "00:00", v: 12.2 },
  { t: "03:00", v: 18.4 },
  { t: "06:00", v: 15.1 },
  { t: "09:00", v: 22.7 },
  { t: "12:00", v: 28.9 },
  { t: "15:00", v: 25.3 },
  { t: "18:00", v: 31.8 },
  { t: "21:00", v: 29.4 },
];

function formatK(num: number) {
  // interpret as millions for demo; tweak as needed
  return `$${num.toFixed(1)}M`;
}

export default function Graph() {
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
          Last 24h (example)
        </Typography>
      </Box>

      <Box sx={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
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
              tickFormatter={(v) => `${v}M`}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(10,10,14,0.9)",
              }}
              labelStyle={{ color: "rgba(255,255,255,0.8)" }}
              formatter={(value) => formatK(Number(value))}
            />
            <Line
              type="monotone"
              dataKey="v"
              stroke="rgba(120, 80, 255, 0.95)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
