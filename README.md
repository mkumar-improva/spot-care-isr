Healthcare Provider Directory (Next.js + ISR)
============================================

Base project scaffold for a healthcare provider data directory using Next.js (App Router) with Incremental Static Regeneration (ISR). It assumes your provider data API already exists and is reachable via an environment variable.

Quick Start
-----------

1) Set environment variables

- Copy `.env.example` to `.env.local` and set:
  - `API_BASE_URL` to your existing API base (e.g., `https://spot-care-api-c9dmhwdrc5gbepgu.centralus-01.azurewebsites.net/api`).
  - `REVALIDATE_SECRET` to a strong random string for on-demand revalidation.
  - Optional homepage defaults (used when no query params are provided):
    - `DEFAULT_LAT`, `DEFAULT_LON`, `DEFAULT_RADIUS`, `DEFAULT_CARE_TYPE`

2) Install and run

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build` and `npm start`

Project Structure
-----------------

- `app/` App Router pages
- `app/page.tsx` Providers listing (ISR via `revalidate` and tags)
- `app/providers/[id]/page.tsx` Provider detail page (fetches by provider code)
  - `app/api/revalidate/route.ts` On-demand revalidation endpoint (tag-based)
- `lib/api.ts` Data fetching helpers configured for ISR with `revalidate` and `tags`
- `next.config.mjs` Next config
- `tsconfig.json` TypeScript config and path aliases (`@/lib`, `@/components`)
- `.env.example` Example environment variables

Endpoints & Data Contracts
--------------------------

This scaffold is wired to your listing and detail endpoints:

- `GET /provider/findNearest?radius=&lat=&lon=&careType=&page=&pageSize=` -> `{ data: Provider[] }`
- `GET /provider/{code}` -> `{ data: ProviderDetail }`

The normalized `Provider` type (see `lib/api.ts`) includes:

- `id: number`, `code: string`, `name: string`
- Optional contact/location fields flattened from the first location: `phone`, `email`, `address`, `city`, `state`, `postalCode`, `latitude`, `longitude`
- `services?: string[]`

ISR Behavior
------------

- Listing (`/`): default revalidate 15 minutes, tags include `providers` and a unique tag per search (lat/lon/radius/careType/page/pageSize).
- Detail (`/providers/[code]`): revalidate 60 minutes, tag `provider:{code}`.

On-Demand Revalidation
----------------------

Use the route `POST /api/revalidate` with the `REVALIDATE_SECRET` and comma-separated `tags` to invalidate cache ahead of the scheduled window.

Example:

```
curl -X POST "http://localhost:3000/api/revalidate?secret=YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"tags": ["providers", "provider:123"]}'
```

Or via query string:

```
curl -X POST "http://localhost:3000/api/revalidate?secret=YOUR_SECRET&tags=providers,provider:123"
```

Usage Tips
----------

- Ensure `API_BASE_URL` is reachable from the Next.js server.
- Override defaults by passing query params:
  - `/?lat=33.9253024&lon=-84.38574419999999&radius=5&careType=Adult%20Day%20Care&page=1&pageSize=1000`
- On-demand revalidate a particular search by sending tags that match the page tag shape or broadly revalidate `providers` for all listings.
- Revalidate a single provider profile by sending `provider:{code}`.
