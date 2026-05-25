# Web Traffic Intelligence System — Setup Guide

## Overview

The Web Traffic Intelligence System is a real-time visitor analytics platform that captures all HTTP requests, analyzes visitor behavior, and provides actionable intelligence via the dashboard at `/web-traffic-intelligence`.

---

## Architecture

### Components

1. **Middleware** (`middleware.ts`) — Intercepts all requests and logs traffic data
2. **Traffic Logger** (`lib/traffic-logger.ts`) — Supabase client for storing traffic events
3. **Supabase Schema** (`supabase/migrations/20260525_create_traffic_tables.sql`) — Database tables for analytics
4. **Dashboard** (`app/web-traffic-intelligence/page.tsx`) — Real-time traffic visualization

---

## Setup Instructions

### Step 1: Create Supabase Tables

Run the migration to create the traffic tracking schema:

```bash
supabase migration up 20260525_create_traffic_tables
```

Or manually execute the SQL from `supabase/migrations/20260525_create_traffic_tables.sql` in your Supabase dashboard.

**Tables created:**
- `page_views` — Every HTTP request (IP, user agent, path, status, response time)
- `sessions` — User session data (entry/exit times, pages visited)
- `daily_visitors` — Aggregated daily statistics
- `top_pages` — Most-visited pages
- `visitor_locations` — Geolocation breakdown

### Step 2: Verify Environment Variables

Ensure your `.env.local` has Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 3: Deploy

The middleware and traffic logger are automatically active. On next deployment, traffic capture begins.

```bash
vercel deploy
```

---

## Data Collected

### Per-Request Data

| Field | Type | Purpose |
|-------|------|---------|
| `ip_address` | INET | Visitor identification + geo-location lookup |
| `user_agent` | TEXT | Browser/OS/device detection |
| `path` | TEXT | Page URL for analytics |
| `method` | TEXT | HTTP verb (GET, POST, etc.) |
| `referer` | TEXT | Traffic source attribution |
| `device_type` | ENUM | Desktop/mobile/tablet breakdown |
| `browser` | VARCHAR | Chrome/Safari/Firefox/Edge detection |
| `os` | VARCHAR | Windows/macOS/Linux/iOS/Android |
| `timestamp` | TIMESTAMP | Precise request time (UTC) |
| `response_time_ms` | INT | Performance metrics |
| `status_code` | SMALLINT | HTTP status (200/404/500/etc) |

---

## Dashboard Features

### Real-Time Metrics (24-Hour Window)
- **Unique Visitors** — Count of distinct IP addresses
- **Page Views** — Total requests to the site
- **Avg Pages/Visitor** — Engagement metric

### Breakdown Visualizations
- **Device Type** — Desktop vs Mobile vs Tablet distribution
- **Top Pages** — Most-visited routes (top 10)
- **Browsers** — User agent breakdown
- **Locations** — Geographic distribution by country

### 7-Day Trend Summary
- Total page views across the week
- Unique visitor count for the week

---

## Privacy & Security

### Row Level Security (RLS)

All traffic tables have RLS policies:
- **Authenticated users can READ** — For dashboard access
- **Authenticated + service role can INSERT** — For middleware logging
- **No DELETE/UPDATE** — Immutable audit trail

### Data Retention

No automatic deletion. Traffic data is retained indefinitely for forensic analysis. You can manually delete old data via:

```sql
DELETE FROM page_views WHERE timestamp < NOW() - INTERVAL '90 days';
```

### IP Anonymization (Optional)

To anonymize IPs for GDPR compliance, hash them in the traffic logger:

```javascript
// In trafficLogger.logPageView()
const hashedIP = sha256(ip + process.env.ANONYMIZATION_SALT);
```

---

## Querying Traffic Data

### Get Today's Visitor Count

```sql
SELECT COUNT(DISTINCT ip_address) as unique_visitors
FROM page_views
WHERE DATE(timestamp) = TODAY();
```

### Get Top 10 Pages

```sql
SELECT path, COUNT(*) as view_count
FROM page_views
WHERE timestamp > NOW() - INTERVAL '24 hours'
GROUP BY path
ORDER BY view_count DESC
LIMIT 10;
```

### Get Device Distribution (Last 7 Days)

```sql
SELECT device_type, COUNT(*) as count
FROM page_views
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY device_type;
```

### Get Visitor Locations

```sql
SELECT country, COUNT(DISTINCT ip_address) as visitors
FROM page_views
WHERE timestamp > NOW() - INTERVAL '24 hours'
GROUP BY country
ORDER BY visitors DESC;
```

---

## Performance Considerations

### Middleware Impact
- Traffic logging is **non-blocking** — logged asynchronously after response
- Typical logging latency: 10-50ms
- No impact on page load times

### Database Indexes
All frequently-queried columns have indexes:
- `page_views.timestamp` (DESC for latest-first queries)
- `page_views.ip_address` (unique visitor queries)
- `page_views.path` (top pages)
- `page_views.device_type` (device breakdown)

### Data Volume Estimates

| Scenario | Daily Inserts | Monthly Size |
|----------|---------------|--------------|
| 100 visitors/day | 500 rows | ~15 MB |
| 1,000 visitors/day | 5,000 rows | ~150 MB |
| 10,000 visitors/day | 50,000 rows | ~1.5 GB |

Supabase free tier supports ~1 GB, sufficient for ~6,500 daily visitors.

---

## Troubleshooting

### Dashboard Shows No Data

1. Check that traffic tables were created:
   ```sql
   SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
   ```

2. Verify middleware is running (check server logs):
   ```
   [Middleware] Traffic logging error: ...
   ```

3. Confirm Supabase credentials in `.env.local`

### Middleware Errors

If you see `[Middleware] Traffic logging error: error_name`:

- **`relation "page_views" does not exist`** — Run the migration
- **`permission denied`** — Check RLS policies and user permissions
- **`connection refused`** — Verify Supabase URL and network access

### High Database Usage

If `page_views` is growing faster than expected:

1. Check for crawlers/bots (high request count from suspicious IPs)
2. Archive old data to a separate table
3. Implement request filtering in middleware to exclude certain paths

---

## Extensions & Ideas

### Geo-IP Lookup

Add MaxMind GeoLite2 integration to populate `country` and `city` fields automatically:

```javascript
import geoip from 'geoip-lite';

const geo = geoip.lookup(ip);
event.country = geo.country;
event.city = geo.city;
```

### Real-Time Alerts

Trigger alerts on unusual patterns:

```javascript
if (uniqueVisitors > 1000 / 24) { // 1000 visitors in 24h
  // Send Slack/email alert
}
```

### Session Reconstruction

Link `page_views` by IP address to reconstruct user journeys:

```sql
WITH session_events AS (
  SELECT ip_address, path, timestamp,
    LAG(timestamp) OVER (PARTITION BY ip_address ORDER BY timestamp) as prev_ts
  FROM page_views
)
SELECT ip_address, 
  STRING_AGG(path, ' → ') as journey
FROM session_events
WHERE timestamp - prev_ts < INTERVAL '30 minutes'
GROUP BY ip_address;
```

### Export Reports

Generate downloadable CSV reports of traffic data:

```javascript
const csv = convertToCSV(trafficData);
res.setHeader('Content-Disposition', 'attachment; filename=traffic.csv');
res.send(csv);
```

---

## API Reference

### `trafficLogger.logPageView(data)`

Logs a single page view to Supabase.

**Parameters:**
```typescript
{
  ip: string;           // Visitor IP address
  userAgent: string;    // Browser user agent string
  path: string;         // Request path (e.g., /mission-control)
  method: string;       // HTTP method (GET, POST, etc.)
  referer?: string;     // HTTP referer
  statusCode: number;   // HTTP response status
  responseTime: number; // Response time in milliseconds
}
```

**Returns:** `Promise<void>`

### `trafficLogger.getTrafficSummary(hours)`

Fetches aggregated traffic statistics for the specified hour window.

**Parameters:**
- `hours` (number) — Look back period (e.g., 24 for last 24 hours)

**Returns:** 
```typescript
{
  total_page_views: number;
  unique_visitors: number;
  page_views: TrafficEvent[];
  by_path: Record<string, number>;
  by_device: Record<string, number>;
  by_browser: Record<string, number>;
  by_country: Record<string, number>;
  period_hours: number;
}
```

---

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review Supabase logs: Settings → Logs → Edge Functions
3. Check middleware output: `vercel logs --no-follow`

---

**Last Updated:** May 25, 2026  
**Status:** Production Ready
