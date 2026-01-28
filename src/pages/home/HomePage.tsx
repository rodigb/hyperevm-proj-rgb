import { Box, Grid } from "@mui/material";
import Hero from "./components/Hero";
import MiniMarketCard from "./components/charts/MiniMarketCard";
import { getProtocolTvlSeries } from "@/lib/defillama/marketSeries";

export default async function HomePage() {
  const [hyperliquid, binanceCex] = await Promise.all([
    getProtocolTvlSeries({ protocolSlug: "hyperliquid", points: 30 }),
    getProtocolTvlSeries({ protocolSlug: "binance-cex", points: 30 }),
  ]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Hero />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <MiniMarketCard
            source="hyperliquid"
            title="Hyperliquid TVL"
            lastValue={hyperliquid.lastValue}
            changePct={hyperliquid.changePct}
            sparkline={hyperliquid.sparkline}
            timeframeLabel="30d"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MiniMarketCard
            source="binance"
            title="Binance CEX Assets"
            lastValue={binanceCex.lastValue}
            changePct={binanceCex.changePct}
            sparkline={binanceCex.sparkline}
            timeframeLabel="30d"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
