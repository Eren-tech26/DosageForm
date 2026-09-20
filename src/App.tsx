import { useState, useEffect } from 'react';
import { DosageGuideSection } from './components/DosageGuideSection';
import { EquipmentGuideSection } from './components/EquipmentGuideSection';
import { DeveloperInfoCard } from './components/DeveloperInfoCard';
import { getFormFromUrl } from './utils/pharmaQrEncoder';
import { DEVELOPER_INFO } from './data/developerInfo';
import { getEquipmentFromUrl } from './utils/equipmentQr';
import { GraduationCap, Pill, Wrench } from 'lucide-react';

type TabType = 'dosage' | 'equipment';

export function App() {
  const scannedEquipment = getEquipmentFromUrl();
  const scannedForm = scannedEquipment ? null : getFormFromUrl();

  const [activeTab, setActiveTab] = useState<TabType>(() => {
    if (scannedEquipment) return 'equipment';
    return 'dosage';
  });

  // Ensure tab reflects scanned URL on first load
  useEffect(() => {
    if (scannedEquipment) setActiveTab('equipment');
    else if (scannedForm) setActiveTab('dosage');
  }, [scannedEquipment, scannedForm]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Clear query params when switching tabs via UI (so URL doesn't stay stuck on scanned)
    if (typeof window !== 'undefined') {
      const hasQuery = window.location.search.length > 0;
      if (hasQuery && !scannedEquipment && !scannedForm) {
        // keep current selection? no need
      }
      // If user manually switches tab, remove equipment/form param to show browser view
      if ((tab === 'dosage' && scannedEquipment) || (tab === 'equipment' && scannedForm)) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  };

  const showIntroBanner = !scannedForm && !scannedEquipment;

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="PharmaQR"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-sm shrink-0"
              />
              <div>
                <span className="text-lg sm:text-xl font-black tracking-tight text-black leading-tight block">
                  Pharma<span className="text-green-600">QR</span> Student Guide
                </span>
                <p className="text-[11px] sm:text-xs text-gray-600 font-medium">
                  Dosage Forms + Equipment — Scan & Study
                </p>
              </div>
            </div>

            {/* Tab Switcher - always visible */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => handleTabChange('dosage')}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs font-black transition-colors cursor-pointer ${
                  activeTab === 'dosage'
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-white'
                }`}
              >
                <Pill className="w-4 h-4" />
                <span className="hidden sm:inline">Dosage Forms</span>
                <span className="sm:hidden">Forms</span>
              </button>
              <button
                onClick={() => handleTabChange('equipment')}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs font-black transition-colors cursor-pointer ${
                  activeTab === 'equipment'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-white'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span className="hidden sm:inline">Equipment</span>
                <span className="sm:hidden">Equip</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {showIntroBanner && (
          <div className="mb-6 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 ${activeTab === 'equipment' ? 'bg-cyan-600' : 'bg-green-600'}`}>
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              {activeTab === 'dosage' ? (
                <>
                  <h1 className="text-base sm:text-lg font-black text-black tracking-tight">
                    Pharmaceutical Dosage Form Study Guide — 12 Categories
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-700 mt-1 max-w-3xl">
                    Browse any dosage form, or scan its fixed QR code to jump straight to its information. Scanning the
                    Tablets QR opens the full Tablets guide; scanning Injections opens Injections.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-base sm:text-lg font-black text-black tracking-tight">
                    Pharmaceutical Equipment Guide — 6 Instruments (As per Pharmacy Syllabus)
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-700 mt-1 max-w-3xl">
                    Now includes <span className="font-bold">Digital Mini Incubator</span> permanently visible with fixed QR, plus Hot Air Oven, Tablet Friability Machine, IR Spectrophotometer, Cyclone Separator, Quartz Muffle Tray. Each has permanent QR like dosage forms.
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Render based on scan or active tab */}
          {scannedEquipment ? (
            <EquipmentGuideSection />
          ) : scannedForm ? (
            <DosageGuideSection />
          ) : activeTab === 'equipment' ? (
            <EquipmentGuideSection />
          ) : (
            <DosageGuideSection />
          )}

          {/* Developer credit */}
          <DeveloperInfoCard />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white py-5 text-xs text-gray-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              <span className="font-black text-green-700">PharmaQR</span> · Pharmacy Student Guide — Dosage + Equipment
            </span>
            <span>12 Forms · 6 Equipment · Tablets, Injections, Hot Air Oven, IR, Friability & more</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 pt-2 border-t border-gray-100">
            <span className="font-black text-gray-700">Developed by {DEVELOPER_INFO.name}</span>
            <span className="text-gray-400">·</span>
            <span>{DEVELOPER_INFO.footerCredit}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
