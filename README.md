# PharmaQR — Pharmaceutical Dosage Form QR Study Guide

A study tool for pharmacy students: browse **12 dosage form categories** with full
academic dossiers, and use a fixed QR code per dosage form that opens that form's
guide directly on any device.

---

## 🛠️ Fix: "Log in to Vercel" When Scanning QR Codes

If classmates, teachers, or users scan a QR code and see a **"Log in to Vercel"** / **"Authentication Required"** screen:

### Why this happens
1. **Vercel Deployment Protection (Vercel Authentication)** is enabled by default on Vercel projects/previews. It restricts access to team members only.
2. If the QR code was generated while viewing a **preview deployment** (e.g., `*-git-*.vercel.app`) or `localhost`, the QR code encodes that private address.

### Step-by-Step Fix (Takes 30 seconds)
1. Open [vercel.com](https://vercel.com) and go to your **`DosageForm`** project.
2. Click the **Settings** tab at the top.
3. In the left navigation sidebar, click **Deployment Protection**.
4. Under **Vercel Authentication**, toggle it to **OFF / Disabled**.
5. (If Password Protection is enabled, turn that **OFF** as well).
6. Click **Save**.
7. In the app, make sure your QR codes use your official public **Production Domain** (e.g. `https://dosage-form.vercel.app`), not a preview branch URL. You can configure this directly inside the app using the **"Target Domain Settings"** button or by setting the `VITE_PUBLIC_URL` environment variable.

Now anyone scanning the QR code with their mobile phone can view the guide instantly without being prompted to log in!

---

## Features

- **12 dosage form dossiers** — Tablets, Capsules, Syrups, Injections, Ointments &
  Creams, Eye/Ear Drops, Liquid Dosage Forms, Topical Preparations, Inhalation
  Products, Special Dosage Forms, Suppositories, Parenterals & Misc.
- Each dossier covers: definition, sub-classifications, routes of administration,
  common excipients, pharmacopeial QC tests, advantages, limitations, dispensing
  tips and real product examples.
- **Fixed QR per dosage form** — the QR encodes `<site>/?form=CATEGORY`; scanning it
  shows the PharmaQR intro splash and lands straight on that form's dossier.
- **High-Res QR Download** — Download clean 600x600 PNG images for lab chart printing,
  stickers, and revision cards.
- **Configurable Target Domain** — Set your public production domain so printed QR codes
  always point to your official public website.
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

## Vercel Deployment

This project includes a pre-configured `vercel.json` for seamless Single Page Application (SPA) routing:
```bash
npm run build
```
Push your changes to GitHub or run `vercel deploy --prod`.

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
