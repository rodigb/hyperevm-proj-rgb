"use client";

import { Box } from "@mui/material";
import Hero from "./components/Hero";
import ProtocolTable from "./components/ProtocolTable";
import { useHyperliquidL1Protocols } from "@/lib/defillama/useHyperliquidL1Protocols";
import { useProtocolSparklines } from "@/lib/defillama/useProtocolSparklines";

export default function HomePage() {
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Hero />

      {error ? (
        <div>Failed to load protocols.</div>
      ) : (
        <ProtocolTable protocols={rows} loading={loading} skeletonRows={100} />
      )}
    </Box>
  );
}
