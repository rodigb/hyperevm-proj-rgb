"use client";

import useSWR from "swr";
import { getProtocolTvlSeries } from "@/lib/api/defillama/marketSeries";

type SparklineMap = Record<string, number[]>;

export function useProtocolSparklines(slugs: string[], points = 30) {
  // stable key
  const key = slugs.length ? ["protocol-sparklines", points, slugs.join(",")] : null;

  const { data, error, isLoading, isValidating, mutate } = useSWR<SparklineMap>(
    key,
    async () => {
      const results = await Promise.all(
        slugs.map(async (slug) => {
          const series = await getProtocolTvlSeries({ protocolSlug: slug, points });
          return [slug, series?.sparkline ?? []] as const;
        }),
      );

      return Object.fromEntries(results);
    },
    {
       refreshInterval: 5 * 60_000,  
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
    },
  );

  return { sparklinesBySlug: data ?? {}, error, isLoading, isValidating, refresh: mutate };
}
