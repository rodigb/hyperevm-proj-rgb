"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import HyperEVMStatusIcon from "@/app/protocols-page/components/HyperEVMStatusIcon";
import {
  Drawer,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import GridViewIcon from "@mui/icons-material/GridView";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import AppIcon from "./AppIcon";

export const drawerWidth = 260;

const navItems = [
  { href: "/", label: "Dashboard", icon: GridViewIcon },
  { href: "/protocols-page", label: "Protocols", icon: CheckBoxIcon },
  { href: "/yields", label: "Yields", icon: AutoGraphIcon },
  { href: "/compare", label: "Compare TVL", icon: InsertChartIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: `
        repeating-linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.03) 0px,
          rgba(255, 255, 255, 0.03) 1px,
          transparent 5px
        ),
        linear-gradient(180deg, #09121f 0%, #05080f 100%)
      `,
          borderRight: "1px solid rgba(255,255,255,0.08)",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box sx={{ px: 2.5, pt: 2.5, pb: 2 }}>
          <AppIcon />
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {/* Nav */}
        <Box sx={{ px: 1.25, py: 1.25 }}>
          <List sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {navItems.map((item) => {
              const selected =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              const Icon = item.icon;

              return (
                <ListItemButton
                  key={item.href}
                  component={Link}
                  href={item.href}
                  selected={selected}
                  sx={{
                    borderRadius: 2,
                    px: 1.5,
                    py: 1.05,
                    color: selected ? "#50d2c1" : "rgba(255,255,255,0.65)",
                    transition: "all 140ms ease",
                    "&:hover": {
                      bgcolor: "rgba(80,210,193,0.08)",
                    },
                    "&.Mui-selected": {
                      bgcolor: "rgba(80,210,193,0.10)",
                      color: "#ffffff",
                      "&:hover": { bgcolor: "rgba(80,210,193,0.18)" },
                      position: "relative",
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 8,
                        bottom: 8,
                        width: 3,
                        borderRadius: 2,
                        backgroundColor: "#50d2c1",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: "#50d2c1",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Icon fontSize="small" />
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: { fontWeight: selected ? 700 : 600, fontSize: 16 },
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {/* Status */}
        <Box sx={{ px: 2, py: 2 }}>
          <Box
            sx={{
              p: 1.25,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <HyperEVMStatusIcon />
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
