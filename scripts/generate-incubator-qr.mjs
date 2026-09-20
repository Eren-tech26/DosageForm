import QRCode from 'qrcode';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Pass a different deployed site URL to reprint the label for another host.
const url = new URL(process.argv[2] || 'https://dosage-form.vercel.app/');
if (!['https:', 'http:'].includes(url.protocol)) {
  throw new Error('The site URL must use https or http.');
}
url.search = '';
url.hash = '';
url.searchParams.set('equipment', 'digital-mini-incubator');
const output = resolve('public/qr');
await mkdir(output, { recursive: true });
const options = { errorCorrectionLevel: 'H', margin: 4, width: 1200, color: { dark: '#000000', light: '#ffffff' } };
await QRCode.toFile(resolve(output, 'digital-mini-incubator.png'), url.href, options);
await QRCode.toFile(resolve(output, 'digital-mini-incubator.svg'), url.href, { ...options, type: 'svg' });
await writeFile(resolve(output, 'digital-mini-incubator-url.txt'), `${url.href}\n`);
console.log(`Incubator QR (PNG + SVG) saved to public/qr\nDestination: ${url.href}`);
