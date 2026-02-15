import React from "react";
import Topbar from "./Topbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Button } from "@mui/material";

function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Topbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          gap: 0,
        }}
      >
        <Image
          unoptimized
          src="/robot.gif"
          alt="HyperEVM Logo"
          width={120}
          height={120}
        />
        <Typography variant="h2" align="center" sx={{ fontWeight: 300 }}>
          Welcome to Hyper<span style={{ color: "#00FF9C" }}>Board</span>
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center">
          Real-time insights for HyperLiquid and HyperEVM
        </Typography>
        <Typography
          variant="h6"
          color="text.primary"
          align="center"
          sx={{ mt: 4 }}
        >
          A real-time analytics dashboard for the HyperLiquid ecosystem,
          providing clear insights into token performance, market activity,
          protocol TVL, and trading metrics.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 4, mt: 4 }}>
        <Button variant="contained" color="primary" sx={{ fontSize: "1.5rem" }}>
          Start Now
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ fontSize: "1.5rem" }}
        >
          View Docs
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
