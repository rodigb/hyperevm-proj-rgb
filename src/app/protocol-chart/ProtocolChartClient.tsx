"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Autocomplete, Box, Button, TextField } from "@mui/material";

type ProtocolOption = { name: string; slug: string; tvl?: number };

export default function ProtocolChartClient({
  initialProtocol,
  options,
}: {
  initialProtocol: string;
  options: ProtocolOption[];
}) {
  const router = useRouter();

  // preselect if the URL already has ?protocol=...
  const initialSelected =
    options.find((o) => o.slug === initialProtocol) ?? null;

  const [selected, setSelected] = React.useState<ProtocolOption | null>(
    initialSelected,
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected?.slug) return;
    router.push(
      `/protocol-chart?protocol=${encodeURIComponent(selected.slug)}`,
    );
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}
    >
      <Autocomplete
        options={options}
        value={selected}
        onChange={(_, v) => setSelected(v)}
        getOptionLabel={(o) => `${o.name} (${o.slug})`}
        isOptionEqualToValue={(a, b) => a.slug === b.slug}
        sx={{ minWidth: 340, flex: "1 1 340px" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select protocol"
            placeholder="Search DeFiLlama protocols…"
            size="small"
          />
        )}
      />

      <Button type="submit" variant="contained" disabled={!selected}>
        Generate chart
      </Button>
    </Box>
  );
}
