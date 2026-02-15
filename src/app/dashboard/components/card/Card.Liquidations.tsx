"use client";

import LandingGridItem from "../DashboardGridItem";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

export default function LiquidationsCard() {
  return (
    <LandingGridItem
      title="Liquidations"
      value="Coming Soon..."
      icon={<HourglassEmptyIcon />}
    />
  );
}
