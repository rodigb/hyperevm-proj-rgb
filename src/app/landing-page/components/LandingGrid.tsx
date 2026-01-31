import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import LandingGridItem from "./LandingGriditem";

function LandingGrid() {
  const TradingVolume = 92392839289;
  const TradingVolumToDollar = TradingVolume.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  return (
    <Grid sx={{ height: "100%", bgcolor: "red" }} container spacing={2}>
      <Grid sx={{ bgcolor: "blue" }} size={3}>
        <LandingGridItem
          title="24h Trading Volume"
          value={TradingVolumToDollar}
        />
      </Grid>
      <Grid sx={{ bgcolor: "blue" }} size={3}>
        <LandingGridItem
          title="24h Trading Volume"
          value={TradingVolumToDollar}
        />
      </Grid>
      <Grid sx={{ bgcolor: "blue" }} size={3}>
        <LandingGridItem
          title="24h Trading Volume"
          value={TradingVolumToDollar}
        />
      </Grid>
      <Grid sx={{ bgcolor: "blue" }} size={3}>
        <LandingGridItem
          title="24h Trading Volume"
          value={TradingVolumToDollar}
        />
      </Grid>
      <Grid size={4}>
        <Grid>size=4</Grid>
      </Grid>
      <Grid size={4}>
        <Grid>size=4</Grid>
      </Grid>
      <Grid size={8}>
        <Grid>size=8</Grid>
      </Grid>
    </Grid>
  );
}

export default LandingGrid;
