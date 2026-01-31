"use client";

import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";
import LandingGrid from "./components/LandingGrid";

type Quad = {
  title: string;
  subtitle?: string;
  href?: string;
  disabled?: boolean;
};

const quads: Quad[] = [
  {
    title: "HyperLiquid Protocols",
    subtitle: "See the list of HyperLiquid-powered protocols",
    href: "/protocols-page",
  },
  {
    title: "HyperLiquid Protocol",
    subtitle: "Protocol analytics and ecosystem",
    href: "/hyperliquid-protocol", // change to your route
  },
  {
    title: "HyperEVM",
    subtitle: "DeFiLlama-powered dashboard",
    href: "/", // your current dashboard entry
  },
  {
    title: "Coming soon",
    subtitle: "More modules are on the way",
    disabled: true,
  },
];

export default function LandingPage() {
  return <LandingGrid />;
}
