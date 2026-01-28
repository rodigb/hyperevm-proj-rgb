import { defillama } from "./client";

export async function getProtocols() {
  const protocols = await defillama.tvl.getProtocols();
  return protocols;
}
