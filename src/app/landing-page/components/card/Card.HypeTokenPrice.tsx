"use client";

import { useHyperliquidFees } from "@/lib/defillama/useHyperLiquidFees";
import LandingGridItem from "../LandingGriditem";
import ToDollarsFunction from "../utility/ToDollarsFunction";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useHypePrice } from "@/lib/defillama/useHyperLiquidTokenPrice";

export default function HypeTokenPriceCard() {
  const { price, isLoading } = useHypePrice();

  return (
    <LandingGridItem
      title="HYPE Token Price"
      value={price ? ToDollarsFunction({ value: price }) : ""}
      icon={<CurrencyExchangeIcon />}
    />
  );
}
