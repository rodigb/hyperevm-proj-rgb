import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function AppIcon() {
  return (
    <Box sx={{ px: 2.5, pt: 2.5, pb: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          unoptimized
          src="/robot.gif"
          alt="HyperEVM Logo"
          width={80}
          height={80}
        />
        <Typography
          sx={{
            mt: 1,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 0.2,
          }}
        >
          <span style={{ color: "#50d2c1" }}>Hyper</span>Board
        </Typography>
        <Typography
          sx={{ mt: 0.5, fontSize: 12, color: "rgba(255,255,255,0.55)" }}
        >
          Dashboard
        </Typography>
      </Box>
    </Box>
  );
}
