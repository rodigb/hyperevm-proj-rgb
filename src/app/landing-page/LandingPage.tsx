"use client";

import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";

type Quad = {
  title: string;
  subtitle?: string;
  href?: string;
  disabled?: boolean;
};

const drawerWidth = 260;

const quads: Quad[] = [
  {
    title: "HyperLiquid Chain",
    subtitle: "Chain overview, metrics, and health",
    href: "/hyperliquid-chain", // change to your route
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
        ml: `${drawerWidth}px`,
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
                background: q.disabled
                  ? "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.02) 100%)"
                  : "linear-gradient(180deg, rgba(80,210,193,0.10) 0%, rgba(255,255,255,0.02) 55%, rgba(0,0,0,0.10) 100%)",
                transition:
                  "transform 160ms ease, border-color 160ms ease, background 160ms ease",
                "&:hover": q.disabled
                  ? {}
                  : {
                      transform: "translateY(-2px)",
                      borderColor: "rgba(80,210,193,0.35)",
                      background:
                        "linear-gradient(180deg, rgba(80,210,193,0.14) 0%, rgba(255,255,255,0.03) 55%, rgba(0,0,0,0.12) 100%)",
                    },

                // subtle glow blob
                "&:before": {
                  content: '""',
                  position: "absolute",
                  width: 360,
                  height: 360,
                  right: -140,
                  top: -140,
                  borderRadius: "50%",
                  background: q.disabled
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(80,210,193,0.20)",
                  filter: "blur(24px)",
                  opacity: q.disabled ? 0.35 : 0.55,
                },
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
