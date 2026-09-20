import { EquipmentId, EQUIPMENT_BY_ID } from '../data/equipmentData';

export function getEquipmentFromUrl(search = typeof window === 'undefined' ? '' : window.location.search): EquipmentId | null {
  const id = new URLSearchParams(search).get('equipment') as EquipmentId | null;
  return id && EQUIPMENT_BY_ID[id] ? id : null;
}

export function buildEquipmentUrl(id: EquipmentId): string {
  const url = new URL(window.location.href);
  url.search = `?equipment=${encodeURIComponent(id)}`;
  url.hash = '';
  return url.href;
}
