"use client";

import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";

type Quad = {
  title: string;
  subtitle?: string;
  href?: string;
  disabled?: boolean;
};

const quads: Quad[] = [
  {
    title: "HyperLiquid Protocols",
    subtitle: "See the list of HyperLiquid-powered protocols",
    href: "/protocols-page",
  },
  {
    title: "HyperLiquid Protocol",
    subtitle: "Protocol analytics and ecosystem",
    href: "/hyperliquid-protocol", // change to your route
  },
  {
    title: "HyperEVM",
    subtitle: "DeFiLlama-powered dashboard",
    href: "/", // your current dashboard entry
  },
  {
    title: "Coming soon",
    subtitle: "More modules are on the way",
    disabled: true,
  },
];

export default function LandingPage() {
  return (
    <Box
      sx={{
        bgcolor: "#070B12",
      }}
    >
      <Box
        sx={{
          height: "calc(90dvh - 48px)", // container padding compensation
          display: "grid",
          width: "100%",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gridTemplateRows: { xs: "repeat(4, 1fr)", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        {quads.map((q) => {
          const Card = (
            <Box
              sx={{
                height: "100%",
                borderRadius: 4,
                p: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                cursor: q.disabled ? "not-allowed" : "pointer",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Typography
                  sx={{
                    fontSize: { xs: 22, md: 28 },
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                    color: q.disabled ? "rgba(255,255,255,0.70)" : "#E8FFFB",
                  }}
                >
                  {q.title}
                </Typography>

                {q.subtitle && (
                  <Typography
                    sx={{
                      mt: 1,
                      maxWidth: 420,
                      fontSize: { xs: 13, md: 14 },
                      lineHeight: 1.6,
                      color: "rgba(255,255,255,0.70)",
                    }}
                  >
                    {q.subtitle}
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: q.disabled
                      ? "rgba(255,255,255,0.45)"
                      : "rgba(80,210,193,0.95)",
                  }}
                >
                  {q.disabled ? "Locked" : "Open →"}
                </Typography>
              </Box>
            </Box>
          );

          if (q.href && !q.disabled) {
            return (
              <Box
                key={q.title}
                component={Link}
                href={q.href}
                sx={{ textDecoration: "none" }}
              >
                {Card}
              </Box>
            );
          }

          return <Box key={q.title}>{Card}</Box>;
        })}
      </Box>
    </Box>
  );
}
