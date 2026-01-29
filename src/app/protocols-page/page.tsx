import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Hero from "./components/Hero";
import { getProtocolTvlSeries } from "@/lib/defillama/marketSeries";
import MiniMarketCard from "./charts/MiniMarketCard";
import { getHyperliquidL1Protocols } from "@/lib/defillama/hyperliquid";

export const revalidate = 300;

type Source = "hyperliquid" | "binance" | "other";

export default async function HomePage() {
  const protocols = await getHyperliquidL1Protocols();

  const top10 = protocols
    .filter((p) => typeof p.tvl === "number" && p.tvl > 0)
    .slice(0, 10);

  const seriesList = await Promise.all(
    top10.map((p) =>
      getProtocolTvlSeries({ protocolSlug: p.slug, points: 30 }),
    ),
  );

  console.log(seriesList, top10);

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
                imageURL={series.imageURL}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
