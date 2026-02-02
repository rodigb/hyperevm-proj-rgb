"use client";

import useSWR from "swr";
import { defaultSWRConfig, llamaFetcher } from "@/lib/api/defillama/utils";
import type { SentimentResponse } from "@/lib/sentiment/types";

const SENTIMENT_URL = "/api/sentiment";

export function useSentiment() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<SentimentResponse>(
    SENTIMENT_URL,
    llamaFetcher,
    defaultSWRConfig
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    refresh: mutate,
  };
}
