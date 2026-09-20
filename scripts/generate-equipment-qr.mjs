import QRCode from 'qrcode';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Equipment IDs - must match src/data/equipmentData.ts
const EQUIPMENT_IDS = [
  'digital-mini-incubator',
  'hot-air-oven',
  'tablet-friability-machine',
  'ir-spectrophotometer',
  'cyclone-separator',
  'quartz-muffle-tray',
];

// Base URL - can be overridden via CLI arg
const baseArg = process.argv[2] || 'https://dosage-form.vercel.app/';
const baseUrl = new URL(baseArg);
if (!['https:', 'http:'].includes(baseUrl.protocol)) {
  throw new Error('The site URL must use https or http.');
}
baseUrl.search = '';
baseUrl.hash = '';

const output = resolve('public/qr');
await mkdir(output, { recursive: true });

const options = {
  errorCorrectionLevel: 'H',
  margin: 4,
  width: 1200,
  color: { dark: '#000000', light: '#ffffff' },
};

console.log(`Generating QR codes for ${EQUIPMENT_IDS.length} equipment -> ${baseUrl.href}`);
console.log(`Output folder: ${output}\n`);

for (const id of EQUIPMENT_IDS) {
  const url = new URL(baseUrl.href);
  url.searchParams.set('equipment', id);
  const dest = url.href;

  const pngPath = resolve(output, `${id}.png`);
  const svgPath = resolve(output, `${id}.svg`);
  const txtPath = resolve(output, `${id}-url.txt`);

  await QRCode.toFile(pngPath, dest, options);
  await QRCode.toFile(svgPath, dest, { ...options, type: 'svg' });
  await writeFile(txtPath, `${dest}\n`);

  console.log(`✔ ${id}`);
  console.log(`  URL: ${dest}`);
  console.log(`  PNG: public/qr/${id}.png`);
  console.log(`  SVG: public/qr/${id}.svg\n`);
}

console.log(`All ${EQUIPMENT_IDS.length} equipment QR codes generated in public/qr/`);
console.log(`\nTo use a different host, run: npm run qr:equipment -- https://your-site.example/`);
