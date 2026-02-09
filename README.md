# Hyper Board (HyperEVM Dashboard)

A **Next.js + TypeScript** dashboard for tracking key HyperEVM / Hyperliquid ecosystem metrics—token stats, protocol TVL, and (soon) derivatives + sentiment indicators.

Live demo: https://hyperevm-proj-rgb.vercel.app/  

---

## What it shows

From the **Dashboard** view, the app surfaces:

- **HYPE Token Price**
- **HYPE Market Cap**
- **24h Fees Generated**
- **24h Revenue**
- **Hyperliquid Perps Activity** (24h volume with 7d / 30d toggles)
- **Top 10 Hyperliquid L1 Protocols by TVL** (plus 24h/7d/1h changes and a 7-day sparkline-style view)
- **HYPE Sentiment Score (7d)** (aggregation in progress)
- “Coming soon” panels for **Funding Rate**, **Liquidations**, and **Long/Short Ratio** 
- This is the base for the application. More features will be added in future.

Navigation sections include: **Dashboard**, **Protocols**, **Yields**, and **Compare TVL**.  

---

## Tech stack

- **Next.js**
- **TypeScript**
- API-driven data fetching for market + on-chain metrics (see code for exact providers/endpoints)

---

## Getting started

### Prerequisites
- Node.js (LTS recommended)
- npm / yarn / pnpm

### Install
```bash
git clone <your-repo-url>
cd <your-repo-folder>
npm install
