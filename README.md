# PharmaQR — Pharmaceutical Dosage Forms & Lab Equipment Portal

A comprehensive digital study and laboratory reference system for pharmacy students and instructors, featuring **19 pharmaceutical dosage forms** and **7 core pharmacy laboratory instruments**, complete with permanent QR codes, standard operating procedures (SOPs), academic dossiers, and printable equipment stickers.

## Key Features

### 1. 19 Pharmaceutical Dosage Forms
- **Categories**: Tablets, Capsules, Syrups, Injections, Ointments & Creams, Eye/Ear Drops, Liquid Dosage Forms, Topical Preparations, Inhalation Products, Special Dosage Forms, Suppositories, Parenterals & Misc., Pastes, Solutions, Suspensions, Gargles, Mouthwash, Powders, Nasal Drops.
- **Academic Dossiers**: Definitions, sub-classifications, routes of administration, excipient formulation science, pharmacopoeial quality control (QC) tests (IP/BP/USP), advantages/disadvantages, clinical dispensing pearls, and authentic product examples.
- **Fixed QR per form**: Each dosage form has a permanent QR code linking directly to its academic guide (`?form=CATEGORY`). Scanning it plays the PharmaQR scan intro splash and then opens that form's dossier. Pre-generated PNG/SVG masters for all 19 forms live in `public/qr/forms/` (regenerate with `npm run qr:forms`).
- **Cross-Referenced Equipment**: Instant links to the laboratory machines used to evaluate or manufacture each formulation (e.g. Tablets ↔ Friability Apparatus; Injections ↔ Hot Air Oven & Incubator).

### 2. 6 Pharmacy Laboratory Equipment Guides & SOPs
- **Instruments**:
  1. **Digital Mini Incubator** (`digital-mini-incubator`) — Microbiology incubation, MLT, and media growth promotion.
  2. **Hot Air Oven (Dry Heat Sterilizer)** (`hot-air-oven`) — Glassware sterilization, depyrogenation, and moisture drying.
  3. **Tablet Friability Test Apparatus** (`tablet-friability-machine`) — Physical tablet abrasion, chipping, and mass loss evaluation (USP <1216>, IP 2.9.7).
  4. **FTIR Spectrophotometer** (`ir-spectrophotometer`) — Infrared molecular fingerprinting and API identification (USP <197>).
  5. **Cyclone Separator** (`cyclone-separator`) — Centrifugal gas-solid powder separation and collection.
  6. **Quartz Muffle Tray** (`quartz-muffle-tray`) — Ultra-pure fused quartz crucible boat for ash and residue-on-ignition tests.
  7. **Digital pH Meter** (`ph-meter`) — Precision electrochemical pH measurement for pharmaceutical formulations and purified water.
- **Each Equipment Dossier Includes**:
  - Authentic high-resolution pharmacy laboratory photos.
  - Working principle and physical mechanism.
  - Detailed technical specifications table.
  - Step-by-step Standard Operating Procedure (SOP).
  - Safety precautions and hazard warnings.
  - Routine QC & calibration checks.

### 3. Permanent Equipment QR Codes & Printable Lab Stickers
- **Permanent Destination**: Encoded to canonical URLs: `https://dosage-form.vercel.app/?equipment=ID`.
- **Center Logo QR Generation**: Level 'H' error-corrected QR codes featuring the PharmaQR emblem in the center.
- **Lab Sticker Generator**:
  - Single sticker preview formatted as an official lab machine label (with SVERI COBP header, asset tag, SOP brief, safety cautions, and QR code).
  - Multi-sticker sheet mode: prints all 7 laboratory stickers in an A4 grid, ready to cut and affix to laboratory machines.
  - Export to high-res PNG (1200x1200px) and vector SVG.

### 4. Unified, Organised Portal Architecture
- Tab navigation between **Dosage Forms (19)**, **Lab Equipment (7)**, and **QR Hub & Labels (26)**.
- Global search across all 26 formulations and machines.
- Deep linking support (`?form=...`, `?equipment=...`, `?tab=...`).
- Printable styles that hide UI elements when generating physical stickers or study sheets.

## Tech Stack

- **Framework**: React 19, TypeScript
- **Bundler & Server**: Vite 7 (`vite-plugin-singlefile`)
- **Styling**: Tailwind CSS 4
- **QR Engine**: `qrcode`, custom canvas compositor with center emblem
- **Icons**: `lucide-react`

## Getting Started

```bash
npm install
npm run dev               # Start local development server
npm run build             # Build production bundle into dist/
npm run preview           # Preview production build
npm run qr:equipment      # Regenerate all permanent equipment QR files in public/qr/
npm run qr:forms          # Regenerate all permanent dosage-form QR files in public/qr/forms/
```

## Developer & Academic Institution

| Field            | Details                                                   |
| ---------------- | --------------------------------------------------------- |
| **Developer**    | Rohan Avinash Ishwarkatti                                 |
| **Course**       | Second Year B. Pharmacy                                   |
| **Roll No.**     | 18                                                        |
| **Age**          | 20                                                        |
| **Role**         | Developer & Content Curator                               |
| **Institution**  | SVERI's College of Pharmacy, Pandharpur, Maharashtra, India |

The developer details live in [`src/data/developerInfo.ts`](src/data/developerInfo.ts) and are reflected across the app footer, developer card, and printable lab machine stickers.
