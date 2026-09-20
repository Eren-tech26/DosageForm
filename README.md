# PharmaQR — Pharmaceutical Dosage Form QR Study Guide

A study tool for pharmacy students: browse **12 dosage form categories** with full
academic dossiers, and use a fixed QR code per dosage form that opens that form's
guide directly on any device.

## Features

- **12 dosage form dossiers** — Tablets, Capsules, Syrups, Injections, Ointments &
  Creams, Eye/Ear Drops, Liquid Dosage Forms, Topical Preparations, Inhalation
  Products, Special Dosage Forms, Suppositories, Parenterals & Misc.
- Each dossier covers: definition, sub-classifications, routes of administration,
  common excipients, pharmacopeial QC tests, advantages, limitations, dispensing
  tips and real product examples.
- **Fixed QR per dosage form** — the QR encodes `<site>/?form=CATEGORY`; scanning it
  shows the PharmaQR intro splash and lands straight on that form's dossier.
- Search + index navigation, shareable/bookmarkable URLs, print-friendly layout.

## Tech stack

React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · `qrcode` for QR generation ·
`lucide-react` icons · bundled to a single HTML file via `vite-plugin-singlefile`.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Developer

| Field      | Details                    |
| ---------- | -------------------------- |
| **Name**   | Rohan Avinash Ishwarkatti  |
| **Course** | Second Year B. Pharmacy    |
| **Roll No.** | 18                       |
| **Age**    | 20                         |
| **Role**   | Developer & Content Curator |

Built as a pharmacy student project so classmates can revise any dosage form with a
single QR scan instead of hunting through notes. The credit is displayed in the app
footer and in the **Developer Information** card at the bottom of the guide.

The developer details live in one place — [`src/data/developerInfo.ts`](src/data/developerInfo.ts) —
and are consumed by the footer and [`src/components/DeveloperInfoCard.tsx`](src/components/DeveloperInfoCard.tsx).

## QR-only equipment guide: Digital Mini Incubator

An additional equipment study guide uses the **Benchmark Scientific myTemp Mini
H2200-H** as a real example, with manufacturer specifications, pharmacy
microbiology applications, precautions and linked references.

- Direct scan destination: `https://dosage-form.vercel.app/?equipment=digital-mini-incubator`
- It is intentionally **not listed** in the homepage, dosage-form index, search,
  or visible QR cards. The existing 12 dosage forms remain unchanged.
- This is an **unlisted link**, not access control: anyone with the URL can open
  it, and browsers cannot distinguish a QR scan from opening the same link.
- Printable QR files: [`public/qr/digital-mini-incubator.png`](public/qr/digital-mini-incubator.png)
  and [`public/qr/digital-mini-incubator.svg`](public/qr/digital-mini-incubator.svg).
  They are available as static files but are not linked from the website UI.
- The QR targets the production site, so deploy these changes before distributing
  the label. Deploy the entire `dist/` folder, including `qr/` and existing assets,
  rather than only the bundled `index.html`.

Regenerate the PNG/SVG after changing the deployment URL:

```bash
npm run qr:incubator                                      # production URL above
npm run qr:incubator -- https://your-deployed-site.example/ # another deployment
```

The generator preserves the supplied pathname (for subpath hosting), removes old
query parameters and hashes, and adds the equipment identifier. For a local
preview, append `?equipment=digital-mini-incubator` to the preview URL; the
production QR is intentionally not tied to an ephemeral preview host.
