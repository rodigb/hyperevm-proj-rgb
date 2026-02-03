import { NextResponse } from "next/server";
import { buildSentiment } from "@/lib/sentiment/engine";

export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  const response = await buildSentiment();

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=120",
    },
  });
}
