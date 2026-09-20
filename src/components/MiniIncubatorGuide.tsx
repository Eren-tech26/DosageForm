import { useCallback, useState } from 'react';
import { EquipmentCard } from './EquipmentCard';
import { EQUIPMENT_DOSSIERS } from '../data/equipmentData';
import { ScanIntroSplash } from './ScanIntroSplash';

// Legacy component kept for backward compatibility.
// Now uses the unified EquipmentDossier data and EquipmentCard with permanent QR like dosage forms.
export function MiniIncubatorGuide() {
  const [showSplash, setShowSplash] = useState(true);
  const finishSplash = useCallback(() => setShowSplash(false), []);
  const dossier = EQUIPMENT_DOSSIERS['digital-mini-incubator'];

  return (
    <>
      {showSplash && <ScanIntroSplash formName={dossier.shortName} onContinue={finishSplash} />}
      <div className={`${showSplash ? 'hidden' : 'block'}`}>
        <EquipmentCard dossier={dossier} highlightScanned showQr={false} />
        <div className="mt-4">
          <a href={window.location.pathname} className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-4 py-2.5 rounded-xl print:hidden">
            Browse All 6 Equipment
          </a>
        </div>
      </div>
    </>
  );
}
