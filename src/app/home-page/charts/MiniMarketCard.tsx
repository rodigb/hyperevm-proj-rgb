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
import ProtocolInformation from "@/app/compare/ProtocolInformation";

function formatUsd(n: number) {
  return n >= 1000
    ? `$${n.toLocaleString("en-GB", { maximumFractionDigits: 0 })}`
    : `$${n.toFixed(2)}`;
}

export default function MiniMarketCard({
  source,
  title,
  lastValue,
  changePct,
  sparkline,
  timeframeLabel = "30d",
  compareProperty = false,
}: {
  source: string;
  title: string;
  lastValue: number | null;
  changePct: number | null;
  sparkline: number[];
  timeframeLabel?: string;
  compareProperty: boolean;
}) {
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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1} alignItems="center">
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
        {compareProperty && <ProtocolInformation />}
      </Card>
    </>
  );
}
