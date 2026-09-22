import QRCode from 'qrcode';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Generates permanent QR codes (PNG + SVG + URL manifest) for every dosage form.
// Scanning them opens the shared portal at ?form=<CATEGORY>, which plays the
// PharmaQR scan intro and then opens that form's academic dossier.
//
// Usage:  node scripts/generate-dosageform-qr.mjs [baseUrl]
// Output: public/qr/forms/<slug>.png  /qr/forms/<slug>.svg  /qr/forms/<slug>-url.txt

const base = new URL(process.argv[2] || 'https://dosage-form.vercel.app/');
base.search = '';
base.hash = '';

// Keep in sync with DOSAGE_FORM_LIST in src/data/dosageFormsData.ts
const forms = [
  'TABLETS',
  'CAPSULES',
  'SYRUPS',
  'INJECTIONS',
  'OINTMENTS & CREAMS',
  'EYE/EAR DROPS',
  'LIQUID DOSAGE FORMS',
  'TOPICAL PREPARATIONS',
  'INHALATION PRODUCTS',
  'SPECIAL DOSAGE FORMS',
  'SUPPOSITORIES',
  'PARENTERALS & MISC.',
  'PASTES',
  'SOLUTIONS',
  'SUSPENSIONS',
  'GARGLES',
  'MOUTHWASH',
  'POWDERS',
  'NASAL DROPS'
];

// Same slug rules as formSlug() in src/utils/pharmaQrEncoder.ts
const slug = (form) =>
  form
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const output = resolve('public/qr/forms');
await mkdir(output, { recursive: true });

const options = {
  errorCorrectionLevel: 'H',
  margin: 4,
  width: 1200,
  color: { dark: '#000000', light: '#ffffff' }
};

for (const form of forms) {
  const url = new URL(base);
  url.searchParams.set('form', form);
  const name = slug(form);
  await QRCode.toFile(resolve(output, `${name}.png`), url.href, options);
  await QRCode.toFile(resolve(output, `${name}.svg`), url.href, { ...options, type: 'svg' });
  await writeFile(resolve(output, `${name}-url.txt`), url.href + '\n');
}

console.log(`Generated ${forms.length} permanent dosage form QR codes in public/qr/forms`);
