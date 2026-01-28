"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/protocols", label: "Protocols" },
  { href: "/yields", label: "Yields" },
];

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar sx={{ maxWidth: 1100, width: "100%", mx: "auto" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, flexGrow: 1, textDecoration: "none" }}
          component="a"
          href="/"
          color="text.primary"
        >
          HyperEVM Dashboard
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.href}
              href={item.href}
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
