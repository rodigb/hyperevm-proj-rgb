"use client";

import HyperEVMStatusIcon from "@/pages/home/components/HyperEVMStatusIcon";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/protocols", label: "Protocols" },
  { href: "/yields", label: "Yields" },

  { href: "/protocol-chart", label: "Protocol Chart" },
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
      <Toolbar sx={{ width: "100%", mx: "auto" }}>
        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", gap: 1, ml: 3 }}>
          {navItems.map((item) => (
            <Button
              key={item.href}
              href={item.href}
              sx={{
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Status Icon */}
        <HyperEVMStatusIcon />
      </Toolbar>
    </AppBar>
  );
}
