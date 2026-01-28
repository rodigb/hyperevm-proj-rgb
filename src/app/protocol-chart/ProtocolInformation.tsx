import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

function ProtocolInformation() {
  return (
    <Box
      sx={{
        p: 2.5,
        textAlign: "center",
        minHeight: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography color="text.secondary" textAlign="center">
        Here some information will be added about the selected protocol.
      </Typography>
    </Box>
  );
}

export default ProtocolInformation;
