"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LinkBehavior from "../components/LinkBehaviour";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { VT323 } from "next/font/google";

const sixtyFour = VT323({ subsets: ["latin"], weight: "400" });

const theme = createTheme({
  palette: {
    mode: "dark",

    background: {
      default: "#061417",
      paper: "#0B1F23",
    },

    primary: {
      main: "#25E6D5",
    },

    text: {
      primary: "#E6FFF6",
      secondary: "#00FF9C",
      disabled: "#7FA3A0",
    },

    divider: "#12343A",
  },

  typography: {
    fontFamily: [
      sixtyFour.style.fontFamily,
      "Inter",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),

    h1: {
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "rgb(0, 0, 0)",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.1) 0px, rgb(0, 0, 0) 1px, transparent 5px, transparent 5px)",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          minWidth: 44,
          borderRadius: 0,
        },

        outlined: {
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#F4F6FF",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.06)",
            borderColor: "rgba(255,255,255,0.2)",
          },
        },

        containedPrimary: {
          backgroundColor: "#00FF9C",
          color: "#041012",
          fontWeight: 300,
          "&:hover": {
            backgroundColor: "#00E187",
          },
        },
        containedSecondary: {
          backgroundColor: "#E6FFF6",
          color: "#041012",
          fontWeight: 300,
          "&:hover": {
            backgroundColor: "#d7efe6",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(255,255,255,0.08)",
          backgroundImage: "none",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(13,18,32,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
