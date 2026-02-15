"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <Box
      sx={{
        pointerEvents: "none",
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: `radial-gradient(
          600px circle at ${pos.x}px ${pos.y}px,
          rgba(0,255,156,0.12),
          transparent 40%
        )`,
        transition: "background 0.05s linear",
      }}
    />
  );
}
