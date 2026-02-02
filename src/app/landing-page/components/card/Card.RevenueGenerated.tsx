"use client";

import LandingGridItem from "../LandingGriditem";
import ToDollarsFunction from "../utility/ToDollarsFunction";
import QueryBuilderIcon from "@mui/icons-material/CurrencyExchange";
import { useHyperliquidRevenue } from "@/lib/api/defillama/useHyperLiquidRevenue";

export default function RevenueGeneratedCard() {
  const { totals, isLoading } = useHyperliquidRevenue();

  return (
    <LandingGridItem
      title="24h Revenue"
      value={ToDollarsFunction({
        value: totals?.total24h ? totals.total24h : 0,
      })}
      isLoading={isLoading}
      icon={<QueryBuilderIcon />}
    />
  );
}
