// Equipment guides are deliberately separate from the public dosage-form index.
export const MINI_INCUBATOR_ID = 'digital-mini-incubator';

export function getEquipmentFromUrl(
  search = typeof window === 'undefined' ? '' : window.location.search,
): typeof MINI_INCUBATOR_ID | null {
  return new URLSearchParams(search).get('equipment') === MINI_INCUBATOR_ID
    ? MINI_INCUBATOR_ID
    : null;
}
