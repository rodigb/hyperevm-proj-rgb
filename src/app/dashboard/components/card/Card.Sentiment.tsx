"use client";

import LandingGridItem from "../DashboardGridItem";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { useSentiment } from "@/lib/sentiment/useSentiment";
import { Box } from "@mui/material";

export default function SentimentCard() {
  const { data, isLoading } = useSentiment();

  const label = data?.label ?? "Neutral";
  const score = data?.score ?? 0;

  const labelColor =
    label === "Bullish"
      ? "#4ade80"
      : label === "Bearish"
        ? "#f87171"
        : "#94a3b8";

  const value = (
    <Box component="span">
      <Box component="span" sx={{ color: labelColor }}>
        {label}
      </Box>{" "}
      {score}/100
    </Box>
  );

  const subtitle = data?.explanation
    ? data.explanation.split(/([+-]\d+(?:\.\d+)?%)/g).map((part, index) => {
        if (part.startsWith("+") && part.endsWith("%")) {
          return (
            <Box component="span" key={index} sx={{ color: "#4ade80" }}>
              {part}
            </Box>
          );
        }
        if (part.startsWith("-") && part.endsWith("%")) {
          return (
            <Box component="span" key={index} sx={{ color: "#f87171" }}>
              {part}
            </Box>
          );
        }
        return (
          <Box component="span" key={index}>
            {part}
          </Box>
        );
      })
    : "Aggregating on-chain signals...";

  return (
    <LandingGridItem
      title="HYPE Sentiment Score (7d)"
      value={value}
      subtitle={subtitle}
      icon={<PsychologyAltIcon />}
      isLoading={isLoading}
    />
  );
}
