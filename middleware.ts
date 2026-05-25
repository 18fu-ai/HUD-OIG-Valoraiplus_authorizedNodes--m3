import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const STATIC_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".ico",
  ".css",
  ".js",
  ".map",
  ".txt",
  ".xml",
  ".woff",
  ".woff2",
  ".ttf",
];

const SKIP_PREFIXES = [
  "/_next",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/api/valoraiplus/access-log",
];

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  if (shouldSkip(pathname)) {
    return NextResponse.next();
  }

  event.waitUntil(recordAccessEvent(request).catch(() => undefined));

  return NextResponse.next();
}

function shouldSkip(pathname: string): boolean {
  if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
  const lower = pathname.toLowerCase();
  return STATIC_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

async function recordAccessEvent(request: NextRequest): Promise<void> {
  const secret = process.env.AUDIT_HASH_SECRET;
  const ingestKey = process.env.VALORAIPLUS_INGEST_KEY;

  if (!secret || !ingestKey) return;

  const rawIp = getForwardedIp(request);
  const rawUserAgent = request.headers.get("user-agent") || "unknown";

  const visitorHash = await hmacSha256(rawIp, secret);
  const userAgentHash = await hmacSha256(rawUserAgent, secret);
  const sessionHash = await hmacSha256(`${visitorHash}:${userAgentHash}`, secret);

  const pathname = request.nextUrl.pathname;
  const requestCategory = classifyRequestCategory(pathname);
  const userAgentFamily = classifyUserAgentFamily(rawUserAgent);
  const referrerOrigin = toOriginOnly(request.headers.get("referer") || "");

  const anomalyFlags = buildAnomalyFlags({
    pathname,
    requestCategory,
    userAgentFamily,
  });

  const payload = {
    occurred_at: new Date().toISOString(),
    visitor_hash: visitorHash,
    user_agent_hash: userAgentHash,
    session_hash: sessionHash,
    request_method: request.method,
    request_path: pathname,
    request_category: requestCategory,
    referrer_origin: referrerOrigin,
    country_code: getDecodedHeader(request, "x-vercel-ip-country"),
    region_code: getDecodedHeader(request, "x-vercel-ip-country-region"),
    city_name: getDecodedHeader(request, "x-vercel-ip-city"),
    continent_code: getDecodedHeader(request, "x-vercel-ip-continent"),
    vercel_id: request.headers.get("x-vercel-id"),
    deployment_url: request.headers.get("x-vercel-deployment-url"),
    user_agent_family: userAgentFamily,
    is_anomaly: anomalyFlags.length > 0,
    anomaly_type: anomalyFlags[0] ?? null,
    anomaly_flags: anomalyFlags,
    anomaly_score: scoreAnomalies(anomalyFlags),
    source: "vercel_edge_middleware_no_migrations_package",
  };

  await fetch(new URL("/api/valoraiplus/access-log", request.url), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-valoraiplus-ingest-key": ingestKey,
    },
    body: JSON.stringify(payload),
    keepalive: true,
  });
}

function getForwardedIp(request: NextRequest): string {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  return forwarded.split(",")[0]?.trim() || "unknown";
}

function getDecodedHeader(request: NextRequest, name: string): string | null {
  const value = request.headers.get(name);
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function toOriginOnly(referrer: string): string | null {
  if (!referrer) return null;
  try {
    return new URL(referrer).origin;
  } catch {
    return null;
  }
}

type RequestCategory = "page" | "pdf" | "api" | "asset" | "document" | "search" | "unknown";
type UserAgentFamily = "bot" | "mobile_browser" | "desktop_browser" | "unknown";

function classifyRequestCategory(pathname: string): RequestCategory {
  const lower = pathname.toLowerCase();
  if (lower.startsWith("/api/")) return "api";
  if (lower.endsWith(".pdf")) return "pdf";
  if (lower.endsWith(".doc") || lower.endsWith(".docx")) return "document";
  if (lower.includes("search") || lower.includes("query")) return "search";
  if (lower === "/" || !lower.includes(".")) return "page";
  return "unknown";
}

function classifyUserAgentFamily(userAgent: string): UserAgentFamily {
  const ua = userAgent.toLowerCase();
  if (!ua || ua === "unknown") return "unknown";
  if (/(bot|spider|crawler|scrape|curl|wget|python|headless|httpclient|go-http-client|node-fetch|axios)/i.test(ua)) {
    return "bot";
  }
  if (/(mobile|android|iphone|ipad)/i.test(ua)) return "mobile_browser";
  if (/(chrome|safari|firefox|edge|edg|opera|brave)/i.test(ua)) return "desktop_browser";
  return "unknown";
}

function buildAnomalyFlags(input: {
  pathname: string;
  requestCategory: RequestCategory;
  userAgentFamily: UserAgentFamily;
}): string[] {
  const flags: string[] = [];

  if (input.userAgentFamily === "bot") flags.push("bot_like_user_agent");
  if (input.requestCategory === "pdf") flags.push("pdf_access_event");
  if (input.pathname.length > 250) flags.push("long_path");
  if (input.pathname.includes("..")) flags.push("path_traversal_pattern");

  return flags;
}

function scoreAnomalies(flags: string[]): number {
  let score = 0;
  for (const flag of flags) {
    if (flag === "bot_like_user_agent") score += 40;
    else if (flag === "path_traversal_pattern") score += 60;
    else if (flag === "long_path") score += 20;
    else if (flag === "pdf_access_event") score += 10;
    else score += 10;
  }
  return Math.max(0, Math.min(100, score));
}

async function hmacSha256(value: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return [...new Uint8Array(signature)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
