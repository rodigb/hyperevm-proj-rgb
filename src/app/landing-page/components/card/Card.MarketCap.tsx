"use client";

import LandingGridItem from "../LandingGriditem";
import ToDollarsFunction from "../utility/ToDollarsFunction";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useHypeMarketCap } from "@/lib/api/defillama/useHypeMarketCap";

export default function MarketCapCard() {
  const { marketCap, isLoading } = useHypeMarketCap();

  return (
    <LandingGridItem
      title="HYPE Market Cap"
      value={marketCap ? ToDollarsFunction({ value: marketCap }) : ""}
      icon={<CurrencyExchangeIcon />}
    />
  );
}
