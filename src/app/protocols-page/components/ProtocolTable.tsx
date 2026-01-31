"use client";

import Image from "next/image";
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Sparkline from "../charts/SparkLine";

type ProtocolRow = {
  name: string;
  slug: string;
  tvl?: number;
  logo?: string;
  change_1d?: number;
  change_7d?: number;
  change_1h?: number;
  sparkline?: number[];
  category?: string;
};

export default function ProtocolTable({
  protocols,
  loading = false,
  skeletonRows = 100,
}: {
  protocols: ProtocolRow[];
  loading?: boolean;
  skeletonRows?: number;
}) {
  console.log("Rendering ProtocolTable with protocols:", protocols);
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        bgcolor: "rgba(255,255,255,0.02)",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "rgba(255,255,255,0.03)" }}>
            <TableCell sx={{ color: "rgba(255,255,255,0.6)", width: 40 }}>
              #
            </TableCell>
            <TableCell sx={{ color: "rgba(255,255,255,0.6)" }}>
              Protocol
            </TableCell>
            <TableCell sx={{ color: "rgba(255,255,255,0.6)" }}>
              Category
            </TableCell>
            <TableCell align="right" sx={{ color: "rgba(255,255,255,0.6)" }}>
              TVL
            </TableCell>
            <TableCell align="right" sx={{ color: "rgba(255,255,255,0.6)" }}>
              24h %
            </TableCell>
            <TableCell align="right" sx={{ color: "rgba(255,255,255,0.6)" }}>
              7d %
            </TableCell>
            <TableCell align="right" sx={{ color: "rgba(255,255,255,0.6)" }}>
              1h %
            </TableCell>
            <TableCell align="right" sx={{ color: "rgba(255,255,255,0.6)" }}>
              Last 7 Days
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading
            ? Array.from({ length: skeletonRows }).map((_, i) => (
                <TableRow
                  key={`sk-${i}`}
                  sx={{ "& td": { borderColor: "rgba(255,255,255,0.06)" } }}
                >
                  <TableCell sx={{ color: "rgba(255,255,255,0.4)" }}>
                    {i + 1}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Skeleton variant="circular" width={26} height={26} />
                      <Skeleton variant="text" width={160} />
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width={90} sx={{ ml: "auto" }} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width={55} sx={{ ml: "auto" }} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width={55} sx={{ ml: "auto" }} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width={55} sx={{ ml: "auto" }} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width={55} sx={{ ml: "auto" }} />
                  </TableCell>
                  <TableCell align="right" sx={{ width: 140 }}>
                    <Skeleton
                      variant="rectangular"
                      width={100}
                      height={26}
                      sx={{ ml: "auto", borderRadius: 1 }}
                    />
                  </TableCell>
                </TableRow>
              ))
            : protocols.map((p, i) => (
                <TableRow
                  key={p.slug}
                  sx={{
                    "&:hover": { bgcolor: "rgba(80,210,193,0.06)" },
                    "& td": { borderColor: "rgba(255,255,255,0.06)" },
                  }}
                >
                  <TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>
                    {i + 1}
                  </TableCell>

                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Image
                        src={p.logo ?? "/placeholder-logo.png"}
                        alt={p.name}
                        width={26}
                        height={26}
                        style={{ borderRadius: "50%" }}
                      />
                      <Typography sx={{ fontWeight: 700, color: "#fff" }}>
                        {p.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Typography sx={{ fontWeight: 700, color: "#fff" }}>
                        {p.category}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{ fontWeight: 600, color: "#fff" }}
                  >
                    {"$" + Math.round(p.tvl ?? 0).toLocaleString()}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color: (p.change_1d ?? 0) > 0 ? "#4ade80" : "#f87171",
                    }}
                  >
                    {(p.change_1d ?? 0).toFixed(2)}%
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color: (p.change_7d ?? 0) > 0 ? "#4ade80" : "#f87171",
                    }}
                  >
                    {(p.change_7d ?? 0).toFixed(2)}%
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color: (p.change_1h ?? 0) > 0 ? "#4ade80" : "#f87171",
                    }}
                  >
                    {(p.change_1h ?? 0).toFixed(2)}%
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      color: (p.change_7d ?? 0) > 0 ? "#4ade80" : "#f87171",
                    }}
                  >
                    <Box
                      sx={{
                        width: 100,
                        height: 26,
                        ml: "auto",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {p.sparkline?.length ? (
                        <Sparkline
                          values={p.sparkline}
                          width={100}
                          height={26}
                        />
                      ) : (
                        <Box sx={{ width: 100, height: 26 }} />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </Box>
  );
}
