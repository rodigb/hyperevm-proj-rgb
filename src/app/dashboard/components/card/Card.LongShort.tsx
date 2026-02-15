"use client";

import LandingGridItem from "../DashboardGridItem";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

export default function LongShortCard() {
  return (
    <LandingGridItem
      title="Long/Short Ratio"
      value="Coming Soon..."
      icon={<HourglassEmptyIcon />}
    />
  );
}
