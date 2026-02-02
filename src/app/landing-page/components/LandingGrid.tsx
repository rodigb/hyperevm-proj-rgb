import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import LandingGridItem from "./LandingGriditem";
import GroupIcon from "@mui/icons-material/Group";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Graph from "./graph/Graph";
import ProtocolTable from "@/app/protocols-page/components/ProtocolTable";
import { useHyperliquidL1Protocols } from "@/lib/defillama/useHyperliquidL1Protocols";
import { useProtocolSparklines } from "@/lib/defillama/useProtocolSparklines";
import FeesGeneratedCard from "./card/Card.FeesGenerated";
import OpenInterestCard from "./card/Card.OpenInterest";
import RevenueGeneratedCard from "./card/Card.RevenueGenerated";

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
          size={2}
        >
          <FeesGeneratedCard />
        </Grid>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
          }}
          size={2}
        >
          <RevenueGeneratedCard />
        </Grid>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
          }}
          size={2}
        ></Grid>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
          }}
          size={2}
        ></Grid>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
          }}
          size={2}
        ></Grid>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
          }}
          size={2}
        >
          <OpenInterestCard />
        </Grid>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
          }}
          size={6}
        >
          <Graph />
        </Grid>
        <Grid
          sx={{
            border: "3px solid #0f1c26",
            background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
            maxHeight: 390,
          }}
          size={6}
        >
          <Box sx={{ overflowY: "auto", maxHeight: "100%" }}>
            <ProtocolTable
              protocols={rows}
              loading={loading}
              skeletonRows={5}
              limit={20}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default LandingGrid;
