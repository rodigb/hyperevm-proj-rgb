export const defaultSWRConfig = {
  refreshInterval: 30_000,
  revalidateOnFocus: true,
  dedupingInterval: 10_000,
};

export async function llamaFetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  return res.json();
}