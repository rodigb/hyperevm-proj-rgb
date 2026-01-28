import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

export default function Hero() {
  return (
    <Card sx={{ position: "relative", overflow: "hidden" }}>
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          pointerEvents: "none",
        }}
      />
      <CardContent sx={{ position: "relative", p: { xs: 2.5, md: 3.5 } }}>
        <Stack spacing={1.25}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            HyperEVM Ecosystem Dashboard
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
