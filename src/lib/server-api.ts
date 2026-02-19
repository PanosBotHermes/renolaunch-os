import { headers } from "next/headers";

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

export async function getApiBaseUrl(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_APP_URL;
  if (configured) return normalizeBaseUrl(configured);

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  if (!host) return "http://localhost:3000";

  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}`;
}

export async function fetchFromApi<T>(path: string): Promise<T | null> {
  try {
    const baseUrl = await getApiBaseUrl();
    const response = await fetch(`${baseUrl}${path}`, { cache: "no-store" });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}
