import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getProtocolTvlSeries } from "@/lib/defillama/marketSeries";
import ProtocolChartClient from "./ProtocolChartClient";
import { getProtocols } from "@/lib/defillama/protocols";
import MiniMarketCard from "../home-page/charts/MiniMarketCard";

type ProtocolOption = { name: string; slug: string; tvl?: number };

export default async function ProtocolChartPage({
  searchParams,
}: {
  searchParams: Promise<{ protocol?: string }>;
}) {
  const { protocol: rawProtocol } = await searchParams;
  const protocol = (rawProtocol ?? "").trim();

  // 1) Load all protocols (then optionally trim/sort for UX)
  const protocols = await getProtocols();

  // Keep dropdown usable: sort by TVL desc and take top 1000
  const options: ProtocolOption[] = protocols
    .map((p: ProtocolOption) => ({ name: p.name, slug: p.slug, tvl: p.tvl }))
    .filter((p) => p.slug && p.name)
    .sort((a, b) => (b.tvl ?? 0) - (a.tvl ?? 0))
    .slice(0, 1000);

  console.log(protocols);
  const series =
    protocol.length > 0
      ? await getProtocolTvlSeries({ protocolSlug: protocol, points: 30 })
      : null;

  const hyperLiquidSeries = await getProtocolTvlSeries({
    protocolSlug: "hyperliquid",
    points: 30,
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Protocol TVL Chart
          </Typography>
          <Typography color="text.secondary">
            Pick a protocol from DeFiLlama and generate a TVL sparkline.
          </Typography>
        </Box>

        {/* Dropdown */}
        <ProtocolChartClient initialProtocol={protocol} options={options} />

        {/* Result */}
        <Box sx={{ position: "relative" }}>
          {/* Optional centered VS badge */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              px: 1.25,
              py: 0.5,
              borderRadius: 999,
              bgcolor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={700}
            >
              VS
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {/* Left card */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
              <MiniMarketCard
                source="hyperliquid"
                title="Hyperliquid TVL"
                lastValue={hyperLiquidSeries?.lastValue ?? null}
                changePct={hyperLiquidSeries?.changePct ?? null}
                sparkline={hyperLiquidSeries?.sparkline ?? []}
                timeframeLabel="30d"
                compareProperty={true}
              />
            </Grid>

            {/* Right card */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
              {protocol.length > 0 ? (
                <MiniMarketCard
                  source="hyperliquid"
                  title={`${protocol} TVL`}
                  lastValue={series?.lastValue ?? null}
                  changePct={series?.changePct ?? null}
                  sparkline={series?.sparkline ?? []}
                  timeframeLabel="30d"
                  compareProperty={true}
                />
              ) : (
                <Card sx={{ borderRadius: 4, width: "100%", height: "100%" }}>
                  <CardContent
                    sx={{
                      p: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Typography color="text.secondary" textAlign="center">
                      Select a protocol to generate the TVL chart.
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
