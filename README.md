# PharmaQR — Pharmaceutical Dosage Form & Equipment QR Study Guide

A study tool for pharmacy students: browse **12 dosage form categories** + **6 pharmacy equipment** with full academic dossiers, and use a fixed QR code per item that opens that guide directly on any device.

## Features

### Dosage Forms (12)
- Tablets, Capsules, Syrups, Injections, Ointments & Creams, Eye/Ear Drops, Liquid Dosage Forms, Topical Preparations, Inhalation Products, Special Dosage Forms, Suppositories, Parenterals & Misc.
- Each dossier covers: definition, sub-classifications, routes, excipients, pharmacopeial QC tests, advantages, limitations, dispensing tips and real product examples.
- Fixed QR per dosage form — QR encodes `<site>/?form=CATEGORY`; scanning shows PharmaQR intro splash and lands straight on that form's dossier.

### Equipment (6) — NEW Permanent Section
- **Digital Mini Incubator** — now permanently visible (was hidden before) with fixed QR like dosage forms
- **Hot Air Oven** — dry heat sterilizer, depyrogenation, 50-250°C, as per IP sterilization
- **Tablet Friability Machine (Roche Friabilator)** — QC test NMT 1% loss, 25 rpm, 100 revolutions, IP <1216>
- **IR Spectrophotometer / FTIR** — identification, compatibility studies, polymorph detection, KBr pellet & ATR
- **Cyclone Separator** — centrifugal solid-gas separation, FBD & spray dryer product collection, dust extraction
- **Quartz Muffle Tray + Muffle Furnace** — ash values (total ash, acid-insoluble ash) as per IP Pharmacognosy

Each equipment dossier includes: definition, working principle, construction, technical specs, pharmacy applications as per syllabus, advantages, limitations, SOP steps, QC/calibration, safety precautions, example models used in colleges, and references.

- **Fixed QR per equipment** — QR encodes `<site>/?equipment=ID`; scanning shows intro splash and lands on that equipment's full guide.
- Search + index navigation, shareable/bookmarkable URLs, print-friendly layout, tab switcher between Dosage Forms and Equipment.

## Tech stack

React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · `qrcode` for QR generation · `lucide-react` icons · bundled to a single HTML file via `vite-plugin-singlefile`.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Equipment QR Codes — Permanent Codes Like Dosage Forms

All equipment now have permanent QR codes generated in `public/qr/`:

| Equipment | QR PNG | QR SVG | URL file |
|-----------|--------|--------|----------|
| Digital Mini Incubator | `digital-mini-incubator.png` | `digital-mini-incubator.svg` | `digital-mini-incubator-url.txt` |
| Hot Air Oven | `hot-air-oven.png` | `hot-air-oven.svg` | `hot-air-oven-url.txt` |
| Tablet Friability Machine | `tablet-friability-machine.png` | `tablet-friability-machine.svg` | `tablet-friability-machine-url.txt` |
| IR Spectrophotometer | `ir-spectrophotometer.png` | `ir-spectrophotometer.svg` | `ir-spectrophotometer-url.txt` |
| Cyclone Separator | `cyclone-separator.png` | `cyclone-separator.svg` | `cyclone-separator-url.txt` |
| Quartz Muffle Tray | `quartz-muffle-tray.png` | `quartz-muffle-tray.svg` | `quartz-muffle-tray-url.txt` |

Direct scan destinations (production):
- `https://dosage-form.vercel.app/?equipment=digital-mini-incubator`
- `https://dosage-form.vercel.app/?equipment=hot-air-oven`
- `https://dosage-form.vercel.app/?equipment=tablet-friability-machine`
- `https://dosage-form.vercel.app/?equipment=ir-spectrophotometer`
- `https://dosage-form.vercel.app/?equipment=cyclone-separator`
- `https://dosage-form.vercel.app/?equipment=quartz-muffle-tray`

- Equipment guides are **permanently visible** via Equipment tab in header — no longer hidden.
- QR files are static in `public/qr/` and copied to `dist/qr/` on build. Deploy entire `dist/` folder including `qr/` and assets, not just `index.html`.
- Aliases supported: `?equipment=ir`, `?equipment=ftir`, `?equipment=friability`, `?equipment=muffle`, etc.

Regenerate all QR codes after changing deployment URL:

```bash
npm run qr:equipment                                      # uses https://dosage-form.vercel.app/
npm run qr:equipment -- https://your-deployed-site.example/ # custom host
npm run qr:all                                            # regenerates equipment + legacy incubator
```

Generator preserves pathname for subpath hosting, removes old query/hash, adds equipment ID. For local preview, append `?equipment=hot-air-oven` etc. to preview URL; production QR should point to deployed host.

## Developer

| Field      | Details                    |
| ---------- | -------------------------- |
| **Name**   | Rohan Avinash Ishwarkatti  |
| **Course** | Second Year B. Pharmacy    |
| **Roll No.** | 18                       |
| **Age**    | 20                         |
| **Role**   | Developer & Content Curator |

Built as a pharmacy student project so classmates can revise any dosage form or equipment with a single QR scan instead of hunting through notes. The credit is displayed in the app footer and in the **Developer Information** card at the bottom of the guide.

The developer details live in one place — [`src/data/developerInfo.ts`](src/data/developerInfo.ts) — and are consumed by the footer and [`src/components/DeveloperInfoCard.tsx`](src/components/DeveloperInfoCard.tsx).
