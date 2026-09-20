import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { DosageFormCategory } from '../types/pharmacy';
import { DOSAGE_FORM_LIST } from '../data/dosageFormsData';

export const QR_BASE_STORAGE_KEY = 'pharmaqr_custom_base_url';
export const QR_BASE_CHANGE_EVENT = 'pharmaqr-base-url-change';

/**
 * Get user-configured custom base URL from localStorage if set.
 */
export function getCustomBaseUrl(): string {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem(QR_BASE_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

/**
 * Save custom base URL to localStorage and notify all listeners across the app.
 */
export function setCustomBaseUrl(url: string): void {
  if (typeof window === 'undefined') return;
  const trimmed = url.trim();
  try {
    if (trimmed) {
      localStorage.setItem(QR_BASE_STORAGE_KEY, trimmed);
    } else {
      localStorage.removeItem(QR_BASE_STORAGE_KEY);
    }
  } catch {
    // Ignore storage quota or access errors
  }
  window.dispatchEvent(new CustomEvent(QR_BASE_CHANGE_EVENT, { detail: trimmed }));
}

/**
 * Resolves the effective base URL used to generate QR codes.
 * Priority:
 * 1. User-customized base URL in localStorage (configured in app)
 * 2. Vite environment variable: VITE_PUBLIC_URL or VITE_SITE_URL
 * 3. Browser window origin + pathname
 */
export function getEffectiveBaseUrl(): string {
  // 1. User custom base URL
  const custom = getCustomBaseUrl();
  if (custom) {
    return custom.endsWith('/') ? custom : `${custom}/`;
  }

  // 2. Vite env var
  const envUrl = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_PUBLIC_URL ||
                 (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_SITE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
    const e = envUrl.trim();
    return e.endsWith('/') ? e : `${e}/`;
  }

  // 3. Fallback to current browser location
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    let path = window.location.pathname;
    if (!path.endsWith('/')) {
      // Retain folder path if not ending in slash
      path = path.substring(0, path.lastIndexOf('/') + 1) || '/';
    }
    return `${origin}${path}`;
  }

  return 'https://pharma-guide.app/';
}

/**
 * React hook that returns the current QR base URL and a setter to update it.
 * Re-renders automatically when the base URL changes anywhere in the app.
 */
export function useQrBaseUrl(): [string, (url: string) => void] {
  const [baseUrl, setBaseUrlState] = useState<string>(() => getEffectiveBaseUrl());

  useEffect(() => {
    const handleUpdate = () => {
      setBaseUrlState(getEffectiveBaseUrl());
    };
    window.addEventListener(QR_BASE_CHANGE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(QR_BASE_CHANGE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const setBase = (newUrl: string) => {
    setCustomBaseUrl(newUrl);
    setBaseUrlState(getEffectiveBaseUrl());
  };

  return [baseUrl, setBase];
}

export interface UrlStatusAnalysis {
  isLocal: boolean;
  isVercelPreview: boolean;
  isVercelProduction: boolean;
  isAnyVercel: boolean;
  hasCustomUrl: boolean;
  warningMessage: string | null;
}

/**
 * Inspects a base URL to detect if it is a local address or Vercel preview URL,
 * which commonly triggers the "Log in to Vercel" prompt for phone scanners.
 */
export function analyzeUrlStatus(targetUrl?: string): UrlStatusAnalysis {
  const urlToAnalyze = targetUrl || getEffectiveBaseUrl();
  let hostname = '';
  try {
    hostname = new URL(urlToAnalyze).hostname;
  } catch {
    hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  }

  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local') || hostname.includes('e2b.app');
  const isAnyVercel = hostname.endsWith('.vercel.app');
  // Vercel preview URLs usually contain "-git-" or multiple dashes/hashes
  const isVercelPreview = isAnyVercel && (
    hostname.includes('-git-') ||
    hostname.split('.vercel.app')[0].split('-').length > 3
  );
  const isVercelProduction = isAnyVercel && !isVercelPreview;
  const hasCustomUrl = Boolean(getCustomBaseUrl());

  let warningMessage: string | null = null;
  if (isLocal) {
    warningMessage = 'Target is a local/sandbox URL. Mobile cameras scanning this QR code cannot access localhost.';
  } else if (isVercelPreview) {
    warningMessage = 'Target is a Vercel preview deployment URL. Vercel automatically requires a team login for preview URLs. Use your public production domain.';
  }

  return {
    isLocal,
    isVercelPreview,
    isVercelProduction,
    isAnyVercel,
    hasCustomUrl,
    warningMessage
  };
}

/**
 * Triggers a download of the QR code as a PNG file.
 */
export function downloadQrImage(dataUrl: string, filename: string): void {
  if (typeof window === 'undefined') return;
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Build the FIXED URL that opens a specific dosage form's Student Guide tab.
// Scanning this QR (e.g. ?form=TABLETS) redirects the browser to that form's guide.
export function buildFormUrl(form: DosageFormCategory, customBase?: string): string {
  const base = customBase || getEffectiveBaseUrl();
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}?form=${encodeURIComponent(form)}`;
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
