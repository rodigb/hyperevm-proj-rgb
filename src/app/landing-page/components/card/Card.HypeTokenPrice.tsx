"use client";

import LandingGridItem from "../LandingGriditem";
import ToDollarsFunction from "../utility/ToDollarsFunction";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useHypePrice } from "@/lib/api/defillama/useHyperLiquidTokenPrice";
import { useHypePriceChange } from "@/lib/api/defillama/useHypePriceChange";
import { Box } from "@mui/material";

export default function HypeTokenPriceCard() {
  const { price, isLoading } = useHypePrice();
  const { changePct } = useHypePriceChange(7);

  const changeColor =
    changePct == null ? "inherit" : changePct >= 0 ? "#4ade80" : "#f87171";
  const changeText =
    changePct == null
      ? ""
      : ` (${changePct >= 0 ? "+" : ""}${changePct.toFixed(1)}%)`;

  const value = price ? (
    <Box component="span">
      {ToDollarsFunction({ value: price })}
      <Box
        component="span"
        sx={{ color: changeColor, ml: 0.5, fontSize: "0.95rem" }}
      >
        {changeText}
      </Box>
    </Box>
  ) : (
    ""
  );

  return (
    <LandingGridItem
      title="HYPE Token Price"
      value={value}
      icon={<CurrencyExchangeIcon />}
      isLoading={isLoading}
    />
  );
}
