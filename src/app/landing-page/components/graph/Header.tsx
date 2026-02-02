import { Box, Typography } from "@mui/material";
import React from "react";
import ToDollarsFunction from "../utility/ToDollarsFunction";

function Header({
  error,
  totals,
}: {
  error: boolean;
  totals: { total24h: number } | null;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left Side */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
          }}
        >
          Volume
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
          }}
        >
          Hyperliquid Perps Activity
        </Typography>
      </Box>

      <Box
        sx={{
          minWidth: 150,
          textAlign: "right",
        }}
      >
        <Typography
          sx={{
            textTransform: "uppercase",
          }}
        >
          24h VOLUME
        </Typography>

        <Typography
          sx={{
            color: error ? "#f87171" : "#50d2c1",
          }}
        >
          {error
            ? "—"
            : totals
              ? ToDollarsFunction({ value: totals.total24h })
              : "Loading…"}
        </Typography>
      </Box>
    </Box>
  );
}

export default Header;
