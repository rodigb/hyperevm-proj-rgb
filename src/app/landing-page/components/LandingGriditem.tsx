import { Box, Typography, Skeleton } from "@mui/material";

function LandingGridItem({
  title,
  value,
  icon,
  isLoading,
  subtitle,
}: {
  title: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
  subtitle?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
        background: `
        repeating-linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.03) 0px,
          rgba(255, 255, 255, 0.03) 1px,
          transparent 5px
        ),
        linear-gradient(180deg, #09121f 0%, #05080f 100%)
      `,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {icon && <Box sx={{ mt: 1, color: "#50d2c1" }}>{icon}</Box>}
        <Typography sx={{ color: "#50d2c1" }} variant="body1">
          {title}
        </Typography>
      </Box>
      {isLoading ? (
        <Skeleton variant="text" sx={{ fontSize: "1.5rem", mt: 1 }} />
      ) : (
        <Typography sx={{ fontSize: "1.5rem" }}>{value}</Typography>
      )}
      {subtitle ? (
        <Typography
          sx={{ fontSize: "0.85rem", mt: 0.5, color: "rgba(244,246,255,0.7)" }}
        >
          {subtitle}
        </Typography>
      ) : null}
    </Box>
  );
}

export default LandingGridItem;
