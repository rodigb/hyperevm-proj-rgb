"use client";

import { useHyperliquidFees } from "@/lib/api/defillama/useHyperLiquidFees";
import LandingGridItem from "../LandingGriditem";
import ToDollarsFunction from "../utility/ToDollarsFunction";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

export default function FeesGeneratedCard() {
  const { totals, isLoading } = useHyperliquidFees();

  return (
    <LandingGridItem
      title="24h Fees Generated "
      value={totals ? ToDollarsFunction({ value: totals.total24h }) : ""}
      icon={<CurrencyExchangeIcon />}
    />
  );
}
