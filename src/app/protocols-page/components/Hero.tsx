import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

export default function Hero() {
  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #09121f 0%, #05080f 100%)",
      }}
    >
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
            HyperLiquid L1 Protocols
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
