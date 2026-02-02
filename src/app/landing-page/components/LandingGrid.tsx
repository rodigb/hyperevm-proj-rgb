import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Graph from "./graph/Graph";
import ProtocolTable from "@/app/landing-page/components/table/ProtocolTable";
import { useHyperliquidL1Protocols } from "@/lib/api/defillama/useHyperliquidL1Protocols";
import { useProtocolSparklines } from "@/lib/api/defillama/useProtocolSparklines";
import FeesGeneratedCard from "./card/Card.FeesGenerated";
import RevenueGeneratedCard from "./card/Card.RevenueGenerated";
import HypeTokenPriceCard from "./card/Card.HypeTokenPrice";
import MarketCapCard from "./card/Card.MarketCap";
import FundingCard from "./card/Card.Funding";
import SentimentCard from "./card/Card.Sentiment";
import LongShortCard from "./card/Card.LongShort";
import LiquidationsCard from "./card/Card.Liquidations";

function LandingGrid() {
  const {
    protocols,
    isLoading: protocolsLoading,
    error,
  } = useHyperliquidL1Protocols();

  const slugs = protocols.map((p) => p.slug);
  const { sparklinesBySlug, isLoading: sparklinesLoading } =
    useProtocolSparklines(slugs, 30);

  const loading = protocolsLoading || sparklinesLoading;

  const rows = protocols.map((p) => ({
    ...p,
    sparkline: sparklinesBySlug[p.slug] ?? [],
  }));

  return (
    <>
      <Box sx={{ mb: 2, ml: 1 }}>
        <Typography fontSize={32}>Dashboard</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
          }}
          size={3}
        >
          <HypeTokenPriceCard />
        </Grid>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
          }}
          size={3}
        >
          <MarketCapCard />
        </Grid>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
          }}
          size={3}
        >
          <FeesGeneratedCard />
        </Grid>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
          }}
          size={3}
        >
          <RevenueGeneratedCard />
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
            height: 390,
          }}
          size={6}
        >
          <ProtocolTable
            protocols={rows}
            loading={loading}
            skeletonRows={10}
            limit={10}
          />
        </Grid>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
          }}
          size={2}
        >
          <SentimentCard />
        </Grid>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
          }}
          size={5}
        >
          <FundingCard />
        </Grid>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
          }}
          size={5}
        >
          <LiquidationsCard />
        </Grid>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
          }}
          size={2}
        >
          <LongShortCard />
        </Grid>
      </Grid>
    </>
  );
}

export default LandingGrid;
