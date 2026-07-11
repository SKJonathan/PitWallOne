# PitWallOne

A full-stack Formula 1 dashboard, built from scratch as a learning project.

## Structure

- `frontend/` — React + Vite + TypeScript user interface
- `backend/` — Node API server + database (to be built)

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## APIs used

Data comes from the **Jolpica F1 API**, a community-maintained, Ergast-compatible F1 data source:

- Jolpica F1 API — https://api.jolpi.ca/ergast/f1/
- Docs / project repo — https://github.com/jolpica/jolpica-f1
- Ergast (original API it replaces) — https://ergast.com/mrd/

Endpoints currently used:

- Driver standings — https://api.jolpi.ca/ergast/f1/current/driverStandings.json
- Next race / qualifying — https://api.jolpi.ca/ergast/f1/current/next.json

### Planned

- **OpenF1 API** — https://openf1.org/ — real-time/live session data (car telemetry, positions, lap times, weather). Not yet wired up in the code; planned to complement the historical/season data from Jolpica.

## Webstie
https://pitwallone-po7q.onrender.com/