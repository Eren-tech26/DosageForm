// Equipment QR utilities — permanent URLs for each equipment guide
import { EquipmentId } from '../types/pharmacy';

export const EQUIPMENT_IDS: EquipmentId[] = [
  'digital-mini-incubator',
  'hot-air-oven',
  'tablet-friability-machine',
  'ir-spectrophotometer',
  'cyclone-separator',
  'quartz-muffle-tray',
];

// Keep old constant for backward compatibility
export const MINI_INCUBATOR_ID = 'digital-mini-incubator' as const;

// Aliases for user convenience: ?equipment=ir -> ir-spectrophotometer etc.
const ALIASES: Record<string, EquipmentId> = {
  'ir': 'ir-spectrophotometer',
  'ftir': 'ir-spectrophotometer',
  'ir-spectrometer': 'ir-spectrophotometer',
  'friability': 'tablet-friability-machine',
  'friabilator': 'tablet-friability-machine',
  'roche-friabilator': 'tablet-friability-machine',
  'muffle-tray': 'quartz-muffle-tray',
  'muffle': 'quartz-muffle-tray',
  'quartz-tray': 'quartz-muffle-tray',
  'hot-oven': 'hot-air-oven',
  'mini-incubator': 'digital-mini-incubator',
  'incubator': 'digital-mini-incubator',
  'cyclone': 'cyclone-separator',
};

export function buildEquipmentUrl(id: EquipmentId): string {
  const base =
    typeof window !== 'undefined'
      ? window.location.origin + window.location.pathname
      : 'https://dosage-form.vercel.app/';
  return `${base}?equipment=${encodeURIComponent(id)}`;
}

export function getEquipmentFromUrl(
  search = typeof window === 'undefined' ? '' : window.location.search,
): EquipmentId | null {
  const raw = new URLSearchParams(search).get('equipment');
  if (!raw) return null;
  const normalized = raw.toLowerCase().trim();
  // direct match
  if ((EQUIPMENT_IDS as string[]).includes(normalized)) {
    return normalized as EquipmentId;
  }
  // alias match
  if (ALIASES[normalized]) return ALIASES[normalized];
  // partial match fallback
  const partial = EQUIPMENT_IDS.find(
    (id) => normalized.includes(id) || id.includes(normalized)
  );
  return partial || null;
}

export function getAllEquipmentUrls(baseUrl = 'https://dosage-form.vercel.app/'): Record<EquipmentId, string> {
  const url = new URL(baseUrl);
  url.search = '';
  url.hash = '';
  const map = {} as Record<EquipmentId, string>;
  for (const id of EQUIPMENT_IDS) {
    const u = new URL(url.href);
    u.searchParams.set('equipment', id);
    map[id] = u.href;
  }
  return map;
}
