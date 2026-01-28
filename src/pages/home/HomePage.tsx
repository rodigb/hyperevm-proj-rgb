import { Box, Grid } from "@mui/material";
import Hero from "./components/Hero";

export default function HomePage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Hero />

      <Grid container spacing={2}></Grid>
    </Box>
  );
}
