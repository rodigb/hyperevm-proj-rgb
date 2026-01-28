"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { pingHyperEvmRpc } from "@/lib/hyperevm/rpc";

type RpcStatus = "checking" | "online" | "offline";

function formatBlock(n: number) {
  return n.toLocaleString("en-GB");
}

const CACHE_KEY = "hyperevm_rpc_health_v1";

type CachedHealth = {
  status: RpcStatus; // "online" | "offline"
  blockNumber: number | null;
  checkedAt: number; // epoch ms
};

function readCache(): CachedHealth | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedHealth;
    if (!parsed || typeof parsed.checkedAt !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(value: CachedHealth) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(value));
  } catch {
    // ignore (private mode, quota, etc.)
  }
}

export default function HyperEVMStatusIcon({
  pollMs = 1 * 60 * 1000,
  timeoutMs = 2_500,
  showBlockNumber = true,
}: {
  pollMs?: number;
  timeoutMs?: number;
  showBlockNumber?: boolean;
}) {
  const [status, setStatus] = React.useState<RpcStatus>("checking");
  const [blockNumber, setBlockNumber] = React.useState<number | null>(null);

  React.useEffect(() => {
    let mounted = true;
    const apply = (
      nextStatus: RpcStatus,
      nextBlock: number | null,
      checkedAt: number,
    ) => {
      if (!mounted) return;
      setStatus(nextStatus);
      setBlockNumber(nextBlock);
      if (nextStatus !== "checking") {
        writeCache({ status: nextStatus, blockNumber: nextBlock, checkedAt });
      }
    };

    const check = async () => {
      // Optional: don’t poll in background tabs
      if (document.hidden) return;

      const checkedAt = Date.now();
      const result = await pingHyperEvmRpc({ timeoutMs });

      if (!mounted) return;

      if (result.ok) apply("online", result.blockNumber, checkedAt);
      else apply("offline", null, checkedAt);
    };

    // 1) Try cache first — prevents pinging on refresh
    const cached = readCache();
    const now = Date.now();

    if (cached && now - cached.checkedAt < pollMs) {
      // Cache is still fresh: use it and skip initial ping
      setStatus(cached.status);
      setBlockNumber(cached.blockNumber);
    } else {
      // No fresh cache: do one check
      check();
    }

    // 2) Poll on an interval (optional, but now it’s infrequent)
    const id = window.setInterval(check, pollMs);

    return () => {
      mounted = false;
      window.clearInterval(id);
    };
  }, [pollMs, timeoutMs]);

  const styles =
    status === "online"
      ? {
          bg: "rgba(37,230,213,0.10)",
          border: "rgba(37,230,213,0.25)",
          dot: "#25E6D5",
          glow: "rgba(37,230,213,0.65)",
          label: "HyperEVM Online",
        }
      : status === "offline"
        ? {
            bg: "rgba(255,82,82,0.10)",
            border: "rgba(255,82,82,0.30)",
            dot: "#FF5252",
            glow: "rgba(255,82,82,0.55)",
            label: "RPC Offline",
          }
        : {
            bg: "rgba(255,193,7,0.10)",
            border: "rgba(255,193,7,0.25)",
            dot: "#FFC107",
            glow: "rgba(255,193,7,0.45)",
            label: "Checking RPC…",
          };

  return (
    <Box
      sx={{
        width: "fit-content",
        display: "flex",
        alignItems: "center",
        gap: { xs: 0, sm: 1 },
        backdropFilter: "blur(8px)",
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          bgcolor: styles.dot,
          boxShadow: `0 0 10px ${styles.glow}`,
          mr: { xs: 0, sm: 1 },
        }}
      />

      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          lineHeight: 1.1,
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontWeight: 700, color: "text.primary" }}
        >
          {styles.label}
        </Typography>

        {showBlockNumber && status === "online" && blockNumber != null && (
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Block {formatBlock(blockNumber)}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
