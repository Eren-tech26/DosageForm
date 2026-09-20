import { EquipmentId, EQUIPMENT_BY_ID } from '../data/equipmentData';
import { generateQrDataUrl } from './pharmaQrEncoder';

export const PRODUCTION_EQUIPMENT_BASE = 'https://dosage-form.vercel.app/';

export function getEquipmentFromUrl(
  search = typeof window === 'undefined' ? '' : window.location.search
): EquipmentId | null {
  const params = new URLSearchParams(search);
  const raw = params.get('equipment') || params.get('eq');
  if (!raw) return null;
  const decoded = decodeURIComponent(raw).toLowerCase().trim() as EquipmentId;
  return decoded && EQUIPMENT_BY_ID[decoded] ? decoded : null;
}

/**
 * Returns the permanent canonical production URL for an equipment guide.
 */
export function buildPermanentEquipmentUrl(id: EquipmentId): string {
  const url = new URL(PRODUCTION_EQUIPMENT_BASE);
  url.search = `?equipment=${encodeURIComponent(id)}`;
  url.hash = '';
  return url.href;
}

/**
 * Returns the URL relative to current runtime environment (useful for testing preview).
 */
export function buildCurrentEquipmentUrl(id: EquipmentId): string {
  if (typeof window === 'undefined') {
    return buildPermanentEquipmentUrl(id);
  }
  const url = new URL(window.location.href);
  url.search = `?equipment=${encodeURIComponent(id)}`;
  url.hash = '';
  return url.href;
}

// Default export buildEquipmentUrl uses the permanent canonical URL
export const buildEquipmentUrl = buildPermanentEquipmentUrl;

/**
 * Generates an equipment QR code data URL with brand green color and center logo.
 */
export async function generateEquipmentQrDataUrl(
  id: EquipmentId,
  useCurrentOrigin = false
): Promise<string> {
  const url = useCurrentOrigin ? buildCurrentEquipmentUrl(id) : buildPermanentEquipmentUrl(id);
  return await generateQrDataUrl(url, '#15803d'); // emerald-700
}

/**
 * Triggers a browser download for a QR image.
 */
export function downloadQrImage(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
