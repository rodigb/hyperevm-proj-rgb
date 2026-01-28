"use client";

import * as React from "react";
import { Box } from "@mui/material";

export default function Sparkline({
  values,
  height = 46,
  width = 170,
}: {
  values: number[];
  height?: number;
  width?: number;
}) {
  const path = React.useMemo(() => {
    if (!values || values.length < 2) return "";

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const stepX = width / (values.length - 1);

    const points = values.map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * height;
      return [x, y] as const;
    });

    return points
      .map(
        ([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`,
      )
      .join(" ");
  }, [values, height, width]);

  if (!path) return null;

  return (
    <Box
      sx={{
        width,
        height,
        opacity: 0.95,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden
      >
        <path d={path} fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </Box>
  );
}
