# Spaceflight Library

A React dashboard displaying live spaceflight statistics including orbital launches, astronauts in space, and mission data.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🛰️ Data Architecture

The dashboard displays data from `src/api-snapshot.json`. **No API calls are made in the browser.** Instead, data is refreshed **server-side** by a backend process.

### How It Works

1. **Backend process** fetches data from The Space Devs API every 12 hours
2. Fresh data is written to `src/api-snapshot.json`
3. The frontend reads and displays this baked-in data
4. Users get instant page loads with consistent data

---

## ⚙️ Automatic Data Updates

### Option 1: GitHub Actions (Recommended for Static Hosting)

If you're deploying to **Vercel, Netlify, or GitHub Pages**, use the included GitHub Action:

**Setup:**
1. Push this repo to GitHub
2. The workflow at `.github/workflows/update-stats.yml` runs automatically every 12 hours
3. When data changes, it commits to your repo
4. Your hosting platform auto-redeploys with fresh data

**Manual trigger:**
- Go to Actions → "Update Space Stats" → "Run workflow"

**How it works:**
```
GitHub Actions (cron: every 12h)
        │
        ▼
┌───────────────────┐
│ update_stats.cjs  │ ──▶ Fetches from Space Devs API
└───────────────────┘
        │
        ▼
   Commits changes to repo
        │
        ▼
   Vercel/Netlify auto-deploys
```

---

### Option 2: Self-Hosted Server (VPS, Dedicated Server)

If you're running on a server with Node.js, use the scheduler script:

**Run in background:**
```bash
# Linux/Mac
nohup node scheduler.cjs > scheduler.log 2>&1 &

# Or use PM2 (recommended)
npm install -g pm2
pm2 start scheduler.cjs --name "spaceflight-scheduler"
pm2 save
pm2 startup  # Auto-start on reboot
```

**The scheduler:**
- Runs continuously in the background
- Updates every 12 hours automatically
- Auto-retries if API is rate-limited
- Logs all activity with timestamps

---

### Option 3: Manual One-Time Update

```bash
node update_stats.cjs
```

---

## 📊 Scheduler Features

- **12-Hour Update Interval**: Fetches fresh data twice daily
- **Auto-Retry**: If API is rate-limited, automatically retries up to 3 times
- **Resilient**: Keeps running even if individual updates fail
- **Logging**: Timestamped console output for monitoring

## 🔧 API Notes

This app uses [The Space Devs API](https://ll.thespacedevs.com/), which has rate limits:
- Free tier is throttled
- Both scheduler and GitHub Action are designed to handle rate limits gracefully

## 📁 Project Structure

```
├── .github/workflows/
│   └── update-stats.yml     # GitHub Action (runs every 12h)
├── src/
│   ├── api-snapshot.json    # Baked-in data (updated by backend)
│   ├── data.js              # Transforms snapshot into React format
│   └── components/
│       └── Dashboard.jsx    # Reads from data.js (no API calls)
├── scheduler.cjs            # Self-hosted backend scheduler
├── update_stats.cjs         # One-time manual update script
└── README.md
```

## 🌐 Deployment

| Platform | Data Update Method |
|----------|-------------------|
| Vercel | GitHub Actions |
| Netlify | GitHub Actions |
| GitHub Pages | GitHub Actions |
| VPS / Dedicated | scheduler.cjs with PM2 |
| Railway / Render | scheduler.cjs as worker |
