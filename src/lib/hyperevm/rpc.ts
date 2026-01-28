export const HYPEREVM_RPC_URL = "https://rpc.hyperliquid.xyz/evm";

export type RpcPingResult =
  | { ok: true; blockNumber: number }
  | { ok: false; error?: string };

 
export async function pingHyperEvmRpc(opts?: {
  timeoutMs?: number;
  rpcUrl?: string;
}): Promise<RpcPingResult> {
  const timeoutMs = opts?.timeoutMs ?? 2500;
  const rpcUrl = opts?.rpcUrl ?? HYPEREVM_RPC_URL;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(rpcUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_blockNumber",
        params: [],
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };

    const data = (await res.json()) as { result?: string };
    if (!data?.result) return { ok: false, error: "Missing result" };

    const blockNumber = parseInt(data.result, 16);
    if (!Number.isFinite(blockNumber)) return { ok: false, error: "Bad hex block number" };

    return { ok: true, blockNumber };
  } catch (e) {
    // AbortError, network errors, etc.
    return { ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  } finally {
    clearTimeout(timeout);
  }
}
