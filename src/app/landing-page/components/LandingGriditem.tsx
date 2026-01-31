import { Box, Typography } from "@mui/material";

function LandingGridItem({ title, value }: { title: string; value: string }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        pl: 5,
        pt: 5,
      }}
    >
      <Typography variant="body1">{title}</Typography>
      <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        {value}
      </Typography>
    </Box>
  );
}

export default LandingGridItem;
