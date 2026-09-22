import QRCode from 'qrcode';
import { DosageFormCategory } from '../types/pharmacy';
import { DOSAGE_FORM_LIST } from '../data/dosageFormsData';

// Build the FIXED URL that opens a specific dosage form's Student Guide tab.
// Scanning this QR (e.g. ?form=TABLETS) redirects the browser to that form's guide.
export function buildFormUrl(form: DosageFormCategory): string {
  const base =
    typeof window !== 'undefined'
      ? window.location.origin + window.location.pathname
      : 'https://pharma-guide.app/';
  return `${base}?form=${encodeURIComponent(form)}`;
}

/**
 * URL-safe slug for a dosage form, used for the pre-generated static QR files
 * stored under public/qr/forms/ (e.g. 'OINTMENTS & CREAMS' -> 'ointments-creams').
 * Keep in sync with scripts/generate-dosageform-qr.mjs.
 */
export function formSlug(form: DosageFormCategory): string {
  return form
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Static pre-generated QR assets for a dosage form (downloaded from the QR Hub). */
export function formQrSvgPath(form: DosageFormCategory): string {
  return `/qr/forms/${formSlug(form)}.svg`;
}

/**
 * Loads the PharmaQR logo as an HTMLImageElement so it can be composited
 * onto generated QR codes. The logo is cached after first load.
 */
let logoCache: HTMLImageElement | null = null;
let logoPromise: Promise<HTMLImageElement> | null = null;
function getLogoImage(): Promise<HTMLImageElement> {
  if (logoCache) return Promise.resolve(logoCache);
  if (logoPromise) return logoPromise;
  logoPromise = new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      logoCache = img;
      resolve(img);
    };
    img.onerror = () => {
      logoPromise = null;
      reject(new Error('Failed to load PharmaQR logo'));
    };
    img.src = '/logo.svg';
  });
  return logoPromise;
}

/**
 * Draws a rounded rectangle onto a 2D canvas context.
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Generates a QR code with the PharmaQR logo overlaid in the center.
 * Uses error correction level H so the logo obscures some modules while
 * remaining scannable.
 */
export async function generateQrDataUrl(data: string, colorDark = '#166534'): Promise<string> {
  // Render QR at 600x600
  const size = 600;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    // Fallback: plain QR without logo
    return await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: size,
      color: { dark: colorDark, light: '#ffffff' }
    });
  }

  // 1. Draw QR onto canvas via a temporary image
  const rawDataUrl = await QRCode.toDataURL(data, {
    errorCorrectionLevel: 'H',
    margin: 2,
    width: size,
    color: { dark: colorDark, light: '#ffffff' }
  });

  await new Promise<void>((resolve, reject) => {
    const qrImg = new Image();
    qrImg.onload = () => {
      ctx.drawImage(qrImg, 0, 0, size, size);
      resolve();
    };
    qrImg.onerror = () => reject(new Error('Failed to draw QR'));
    qrImg.src = rawDataUrl;
  });

  // 2. Composite the PharmaQR logo in the center (if available)
  try {
    const logo = await getLogoImage();
    // Logo box covers ~24% of the QR canvas (level H tolerates ~30% loss)
    const box = Math.round(size * 0.26);
    const x = (size - box) / 2;
    const y = (size - box) / 2;
    const pad = Math.round(box * 0.08);
    const radius = Math.round(box * 0.22);

    // White rounded square background behind logo for contrast
    ctx.save();
    roundRect(ctx, x - pad, y - pad, box + pad * 2, box + pad * 2, radius);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    // Thin green border
    ctx.lineWidth = Math.max(2, Math.round(size * 0.005));
    ctx.strokeStyle = colorDark;
    ctx.stroke();
    ctx.restore();

    // Draw logo inside the box
    ctx.drawImage(logo, x, y, box, box);
  } catch {
    // If logo fails to load, return the plain QR already drawn
  }

  return canvas.toDataURL('image/png');
}

// Read the dosage form from the current URL (?form=TABLETS) when a QR opens the page.
export function getFormFromUrl(): DosageFormCategory | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('form');
  if (!raw) return null;
  const decoded = decodeURIComponent(raw).toUpperCase().trim();
  const direct = DOSAGE_FORM_LIST.find((f) => f === decoded);
  if (direct) return direct;
  const partial = DOSAGE_FORM_LIST.find((f) => decoded.includes(f) || f.includes(decoded));
  return partial || null;
}
