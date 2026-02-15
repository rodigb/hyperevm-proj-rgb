"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Drawer,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

import GridViewIcon from "@mui/icons-material/GridView";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import AppIcon from "./AppIcon";

export const drawerWidth = 260;

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: GridViewIcon,
    implemented: true,
  },
  {
    href: "/protocols-page",
    label: "Protocols",
    icon: CheckBoxIcon,
    implemented: false,
  },
  { href: "/yields", label: "Yields", icon: AutoGraphIcon, implemented: false },
  {
    href: "/compare",
    label: "Compare TVL",
    icon: InsertChartIcon,
    implemented: false,
  },
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
              const disabled = !item.implemented;

              const button = (
                <ListItemButton
                  key={item.href}
                  component={disabled ? "div" : Link}
                  href={disabled ? undefined : item.href}
                  selected={!disabled && selected}
                  sx={{
                    borderRadius: 2,
                    px: 1.5,
                    py: 1.05,

                    color: disabled
                      ? "rgba(255,255,255,0.25)"
                      : selected
                        ? "#50d2c1"
                        : "rgba(255,255,255,0.65)",

                    cursor: disabled ? "not-allowed" : "pointer",
                    pointerEvents: disabled ? "none" : "auto",
                    opacity: disabled ? 0.45 : 1,

                    transition: "all 140ms ease",

                    "&:hover": {
                      bgcolor: disabled
                        ? "transparent"
                        : "rgba(80,210,193,0.08)",
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
                      color: disabled ? "rgba(255,255,255,0.25)" : "#50d2c1",
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

              return disabled ? (
                <Tooltip
                  key={item.href}
                  title="Coming Soon..."
                  placement="left"
                >
                  <Box>{button}</Box>
                </Tooltip>
              ) : (
                button
              );
            })}
          </List>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
      </Box>
    </Drawer>
  );
}
