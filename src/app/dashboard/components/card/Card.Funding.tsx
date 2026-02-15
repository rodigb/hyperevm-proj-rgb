"use client";

import LandingGridItem from "../DashboardGridItem";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

export default function FundingCard() {
  return (
    <LandingGridItem
      title="Funding Rate"
      value="Coming Soon..."
      icon={<HourglassEmptyIcon />}
    />
  );
}
