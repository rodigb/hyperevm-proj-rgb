"use client";

import LandingGridItem from "../LandingGriditem";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

export default function AiSentimentCard() {
  return (
    <LandingGridItem
      title="AI Sentiment"
      value="Coming Soon..."
      icon={<HourglassEmptyIcon />}
    />
  );
}
