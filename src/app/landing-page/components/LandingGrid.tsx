import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import LandingGridItem from "./LandingGriditem";
import GroupIcon from "@mui/icons-material/Group";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import PaidIcon from "@mui/icons-material/Paid";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Graph from "./Graph";
import { useHyperliquidL1Derivatives } from "@/lib/defillama/useHyperLiquidL1Derivatives";
import ToDollarsFunction from "./ToDollarsFunction";

function LandingGrid() {
  const TradingVolume = 92392839289;

  const TotalOpenInterest = 92392839289;
  const TotalOpenInterestToDollar = TotalOpenInterest.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const TotalActiveTraders = 19000;

  const TotalFees = 2359324;
  const TotalFeesToDollar = TotalFees.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { totals } = useHyperliquidL1Derivatives();

  console.log("totals", totals?.total24h);

  return (
    <Grid container spacing={2}>
      <Grid
        sx={{
          border: "3px solid #0f1c26",
          background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
        }}
        size={3}
      >
        <LandingGridItem
          title="24h Trading Volume"
          value={ToDollarsFunction({
            value: totals?.total24h ? totals.total24h : 0,
          })}
          icon={<QueryBuilderIcon />}
        />
      </Grid>
      <Grid
        sx={{
          border: "3px solid #0f1c26",
          background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
        }}
        size={3}
      >
        <LandingGridItem
          title="Total Open Interest"
          value={TotalOpenInterestToDollar}
          icon={<PaidIcon />}
        />
      </Grid>
      <Grid
        sx={{
          border: "3px solid #0f1c26",
          background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
        }}
        size={3}
      >
        <LandingGridItem
          title="Total Active Traders"
          value={TotalActiveTraders.toLocaleString()}
          icon={<GroupIcon />}
        />
      </Grid>
      <Grid
        sx={{
          border: "3px solid #0f1c26",
          background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
        }}
        size={3}
      >
        <LandingGridItem
          title="Total Fees Generated"
          value={TotalActiveTraders.toLocaleString()}
          icon={<CurrencyExchangeIcon />}
        />
      </Grid>
      <Grid
        sx={{
          border: "3px solid #0f1c26",
          background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
        }}
        size={4}
      >
        <Graph />
      </Grid>
      <Grid
        sx={{
          border: "3px solid #0f1c26",
          background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
        }}
        size={4}
      >
        <LandingGridItem
          title="Total Fees Generated"
          value={TotalActiveTraders.toLocaleString()}
          icon={<CurrencyExchangeIcon />}
        />
      </Grid>{" "}
      <Grid
        sx={{
          border: "3px solid #0f1c26",
          background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
        }}
        size={4}
      >
        <LandingGridItem
          title="Total Fees Generated"
          value={TotalActiveTraders.toLocaleString()}
          icon={<CurrencyExchangeIcon />}
        />
      </Grid>
    </Grid>
  );
}

export default LandingGrid;
