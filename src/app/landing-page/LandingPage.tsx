"use client";

import Link from "next/link";
import { Box, Button, Container, Typography, Card } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 5,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(800px 400px at 30% 20%, rgba(37,230,213,0.18), transparent 60%), radial-gradient(700px 380px at 80% 30%, rgba(124,92,255,0.14), transparent 55%)",
              pointerEvents: "none",
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                letterSpacing: "-0.05em",
                mb: 1.5,
              }}
            >
              HyperEVM Dashboard
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 520, mx: "auto", mb: 4 }}
            >
              Explore protocol TVL, ecosystem growth, and on-chain health across
              the HyperEVM ecosystem.
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.4,
                borderRadius: 3,
                fontWeight: 700,
                boxShadow: "0 0 18px rgba(37,230,213,0.25)",
              }}
              onClick={() => router.push("/home-page")}
            >
              Enter Dashboard →
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
