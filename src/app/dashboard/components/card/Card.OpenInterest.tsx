"use client";

import { useHyperliquidFees } from "@/lib/api/defillama/useHyperLiquidFees";
import LandingGridItem from "../DashboardGridItem";
import ToDollarsFunction from "../utility/ToDollarsFunction";
import PaidIcon from "@mui/icons-material/CurrencyExchange";
import { useHyperliquidOpenInterest } from "@/lib/api/defillama/useHyperLiquidOpenInterest";

export default function OpenInterestCard() {
  const { totals, isLoading } = useHyperliquidOpenInterest();

  return (
    <LandingGridItem
      title="Total Open Interest"
      value={ToDollarsFunction({ value: totals?.total24h ?? 0 })}
      icon={<PaidIcon />}
    />
  );
}
