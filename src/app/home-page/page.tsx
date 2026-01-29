import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Hero from "./components/Hero";
import { getProtocolTvlSeries } from "@/lib/defillama/marketSeries";
import { getProtocols } from "@/lib/defillama/protocols";
import MiniMarketCard from "./charts/MiniMarketCard";

type ProtocolRow = {
  name: string;
  slug: string;
  tvl?: number;
};

type Source = "hyperliquid" | "binance" | "other";

export default async function HomePage() {
  const protocols = (await getProtocols()) as ProtocolRow[];

  // Top 10 by TVL
  const top10 = protocols
    .filter((p) => p?.slug && p?.name && typeof p.tvl === "number" && p.tvl > 0)
    .sort((a, b) => (b.tvl ?? 0) - (a.tvl ?? 0))
    .slice(0, 10);

  // Fetch series for each protocol in parallel
  const seriesList = await Promise.all(
    top10.map((p) =>
      getProtocolTvlSeries({ protocolSlug: p.slug, points: 30 }),
    ),
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Hero />

      <Grid container spacing={2}>
        {top10.map((p, i) => {
          const series = seriesList[i];

          const source =
            p.slug === "hyperliquid"
              ? "hyperliquid"
              : p.slug === "binance-cex"
                ? "binance"
                : "hyperliquid";

          return (
            <Grid key={p.slug} size={{ xs: 12 }}>
              <MiniMarketCard
                source={source as Source}
                title={`${p.name} TVL`}
                lastValue={series.lastValue}
                changePct={series.changePct}
                sparkline={series.sparkline}
                timeframeLabel="30d"
                compareProperty={false}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
