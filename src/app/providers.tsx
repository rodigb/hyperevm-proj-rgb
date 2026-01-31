"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LinkBehavior from "../components/LinkBehaviour";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Pixelify_Sans } from "next/font/google";
import image from "next/image";

const sixtyFour = Pixelify_Sans({ subsets: ["latin"], weight: "400" });

const terminalBackground = `
        repeating-linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.03) 0px,
          rgba(255, 255, 255, 0.03) 1px,
          transparent 5px
        ),
        linear-gradient(180deg, #09121f 0%, #05080f 100%)
      `;

const theme = createTheme({
  palette: {
    mode: "dark",

    background: {
      default: "#070A12",
      paper: "#0D1220",
    },

    primary: {
      main: "#25E6D5",
    },

    secondary: {
      main: "#7C5CFF",
    },

    text: {
      primary: "#F4F6FF",
      secondary: "rgba(244,246,255,0.65)",
    },

    divider: "rgba(255,255,255,0.08)",
  },

  shape: {},

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
