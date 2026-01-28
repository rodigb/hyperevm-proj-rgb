"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Sparkline from "./SparkLine";
import ProtocolInformation from "@/app/protocol-chart/ProtocolInformation";

type Source = string;

function formatUsd(n: number) {
  return n >= 1000
    ? `$${n.toLocaleString("en-GB", { maximumFractionDigits: 0 })}`
    : `$${n.toFixed(2)}`;
}

function sourceBadge(source: Source) {
  if (source === "hyperliquid") {
    return {
      label: "Hyperliquid",
      bg: "rgba(124,92,255,0.14)",
      border: "rgba(124,92,255,0.30)",
    };
  }
  return {
    label: "Binance",
    bg: "rgba(37,230,213,0.10)",
    border: "rgba(37,230,213,0.25)",
  };
}

export default function MiniMarketCard({
  source,
  title,
  lastValue,
  changePct,
  sparkline,
  timeframeLabel = "30d",
}: {
  source: string;
  title: string;
  lastValue: number | null;
  changePct: number | null;
  sparkline: number[];
  timeframeLabel?: string;
}) {
  const badge = sourceBadge(source);

  const changeChip =
    changePct == null ? null : (
      <Chip
        size="small"
        label={`${changePct >= 0 ? "+" : ""}${changePct.toFixed(2)}% (${timeframeLabel})`}
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

  return (
    <>
      <Card
        sx={{
          borderRadius: 4,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ p: 2.25 }}>
          <Stack spacing={1.25}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={1.5}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  size="small"
                  label={badge.label}
                  sx={{
                    borderRadius: 999,
                    bgcolor: badge.bg,
                    border: `1px solid ${badge.border}`,
                    color: "text.primary",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {title}
                </Typography>
              </Stack>

              {changeChip}
            </Stack>

            <Stack
              direction="row"
              alignItems="baseline"
              justifyContent="space-between"
              gap={2}
            >
              <Typography
                sx={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                {lastValue == null ? "—" : formatUsd(lastValue)}
              </Typography>

              {/* chart */}
              <Box
                sx={{
                  color:
                    changePct != null && changePct < 0
                      ? "error.main"
                      : "primary.main",
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Sparkline values={sparkline} width={180} height={50} />
                </Box>
              </Box>
            </Stack>
          </Stack>
        </CardContent>
        <Divider />
        <ProtocolInformation />
      </Card>
    </>
  );
}
