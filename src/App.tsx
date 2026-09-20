import { useState, useMemo, useEffect, useRef } from 'react';
import { DosageGuideSection } from './components/DosageGuideSection';
import { EquipmentSection } from './components/EquipmentSection';
import { QrHubSection } from './components/QrHubSection';
import { DeveloperInfoCard } from './components/DeveloperInfoCard';
import { EquipmentStickerModal } from './components/EquipmentStickerModal';
import { getFormFromUrl } from './utils/pharmaQrEncoder';
import { getEquipmentFromUrl } from './utils/equipmentQr';
import { DEVELOPER_INFO } from './data/developerInfo';
import { DosageFormCategory } from './types/pharmacy';
import { EquipmentId, EQUIPMENT_LIST } from './data/equipmentData';
import { DOSAGE_FORM_LIST } from './data/dosageFormsData';
import { scrollInfoIntoView } from './utils/scrollToInfo';
import { Pill, Wrench, QrCode, Printer, Search } from 'lucide-react';

export function App() {
  const urlEquipment = getEquipmentFromUrl();
  const urlForm = getFormFromUrl();

  // Determine initial tab from URL parameters
  const initialTab = useMemo<'dosage' | 'equipment' | 'qr-hub'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam === 'equipment' || tabParam === 'instruments') return 'equipment';
      if (tabParam === 'qr-hub' || tabParam === 'qr') return 'qr-hub';
      if (tabParam === 'dosage' || tabParam === 'forms') return 'dosage';
    }
    if (urlEquipment) return 'equipment';
    return 'dosage';
  }, [urlEquipment]);

  // Capture the QR payload that opened this browser session ONCE, on first load.
  // Everything else the student taps afterwards only changes the *selection*, so
  // the "you just scanned a QR" experience (splash + scan banner) never replays.
  const [initialScan] = useState<{ form: DosageFormCategory | null; equipment: EquipmentId | null }>(
    () => ({ form: urlForm, equipment: urlEquipment })
  );

  const [activeTab, setActiveTab] = useState<'dosage' | 'equipment' | 'qr-hub'>(initialTab);
  const [selectedForm, setSelectedForm] = useState<DosageFormCategory | undefined>(
    initialScan.form || undefined
  );
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentId | null>(
    initialScan.equipment
  );
  const [scanIntroPlayed, setScanIntroPlayed] = useState(false);
  const [navTick, setNavTick] = useState(0);
  // Set when the user opens an item from somewhere else in the app (QR hub, search,
  // cross-links) so the target info panel can be scrolled into view after rendering.
  const pendingScrollRef = useRef<'dosage' | 'equipment' | null>(null);
  const [globalSearch, setGlobalSearch] = useState('');
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const [stickerSheetModalOpen, setStickerSheetModalOpen] = useState(false);

  // Jump to the info panel of a just-opened item once its tab has rendered.
  useEffect(() => {
    const target = pendingScrollRef.current;
    if (!target) return;
    pendingScrollRef.current = null;
    const timer = window.setTimeout(() => {
      scrollInfoIntoView(
        document.getElementById(target === 'dosage' ? 'dosage-dossier' : 'equipment-dossier')
      );
    }, 80);
    return () => window.clearTimeout(timer);
  }, [navTick, activeTab, selectedForm, selectedEquipment]);

  // Sync tab with browser URL history
  const switchTab = (tab: 'dosage' | 'equipment' | 'qr-hub') => {
    pendingScrollRef.current = null;
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      if (tab === 'dosage') {
        url.searchParams.delete('equipment');
        if (selectedForm) url.searchParams.set('form', selectedForm);
      } else if (tab === 'equipment') {
        url.searchParams.delete('form');
        if (selectedEquipment) url.searchParams.set('equipment', selectedEquipment);
      } else {
        url.searchParams.delete('form');
        url.searchParams.delete('equipment');
      }
      window.history.replaceState(null, '', url.href);
    }
  };

  const navigateToDosageForm = (form: DosageFormCategory) => {
    setSelectedForm(form);
    setActiveTab('dosage');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('equipment');
      url.searchParams.set('tab', 'dosage');
      url.searchParams.set('form', form);
      window.history.replaceState(null, '', url.href);
    }
    pendingScrollRef.current = 'dosage';
    setNavTick((t) => t + 1);
  };

  const navigateToEquipment = (id: EquipmentId) => {
    setSelectedEquipment(id);
    setActiveTab('equipment');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('form');
      url.searchParams.set('tab', 'equipment');
      url.searchParams.set('equipment', id);
      window.history.replaceState(null, '', url.href);
    }
    pendingScrollRef.current = 'equipment';
    setNavTick((t) => t + 1);
  };

  // Global search matching both forms and equipment
  const searchResults = useMemo(() => {
    const q = globalSearch.toLowerCase().trim();
    if (!q) return { forms: [], equipment: [] };

    const matchingForms = DOSAGE_FORM_LIST.filter((f) => f.toLowerCase().includes(q));
    const matchingEq = EQUIPMENT_LIST.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q)
    );

    return { forms: matchingForms, equipment: matchingEq };
  }, [globalSearch]);

  const hasSearchResults =
    searchResults.forms.length > 0 || searchResults.equipment.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-green-700 shadow-2xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            {/* Brand Logo & Title */}
            <div
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={() => switchTab('dosage')}
            >
              <img
                src="/logo.svg"
                alt="PharmaQR"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-xs shrink-0"
              />
              <div>
                <span className="text-lg sm:text-xl font-black tracking-tight text-black leading-tight block">
                  Pharma<span className="text-green-700">QR</span> Portal
                </span>
                <p className="text-[11px] sm:text-xs text-gray-600 font-medium">
                  Dosage Forms &amp; Equipment SOP System · SVERI COBP
                </p>
              </div>
            </div>

            {/* Desktop Navigation Mode Tabs */}
            <nav className="hidden md:flex items-center bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
              <button
                type="button"
                onClick={() => switchTab('dosage')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'dosage'
                    ? 'bg-green-700 text-white shadow-xs'
                    : 'text-gray-700 hover:text-black hover:bg-gray-200/60'
                }`}
              >
                <Pill className="w-4 h-4" />
                <span>Dosage Forms (12)</span>
              </button>

              <button
                type="button"
                onClick={() => switchTab('equipment')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'equipment'
                    ? 'bg-green-700 text-white shadow-xs'
                    : 'text-gray-700 hover:text-black hover:bg-gray-200/60'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>Lab Equipment (7)</span>
              </button>

              <button
                type="button"
                onClick={() => switchTab('qr-hub')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'qr-hub'
                    ? 'bg-green-700 text-white shadow-xs'
                    : 'text-gray-700 hover:text-black hover:bg-gray-200/60'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>QR Hub &amp; Labels</span>
              </button>
            </nav>

            {/* Quick Actions (Print Stickers / Mobile Menu) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStickerSheetModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-900 border border-green-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                title="Print Lab Machine Stickers"
              >
                <Printer className="w-4 h-4 text-green-700" />
                <span>Lab Stickers</span>
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setGlobalSearchOpen(!globalSearchOpen)}
                  className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-xl transition-colors cursor-pointer border border-gray-200"
                  title="Search across all resources"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* Quick Search Dropdown Modal */}
                {globalSearchOpen && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-gray-300 rounded-2xl shadow-xl p-3 z-50">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search forms & equipment..."
                        value={globalSearch}
                        onChange={(e) => setGlobalSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-hidden"
                      />
                    </div>

                    {globalSearch && (
                      <div className="mt-3 max-h-60 overflow-y-auto space-y-2 text-xs">
                        {searchResults.forms.length > 0 && (
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400 px-2">
                              Dosage Forms
                            </span>
                            {searchResults.forms.map((f) => (
                              <button
                                key={f}
                                onClick={() => {
                                  navigateToDosageForm(f);
                                  setGlobalSearchOpen(false);
                                  setGlobalSearch('');
                                }}
                                className="w-full text-left p-2 rounded-lg hover:bg-green-50 text-black flex items-center justify-between cursor-pointer"
                              >
                                <span className="font-bold truncate">{f}</span>
                                <Pill className="w-3.5 h-3.5 text-green-700 shrink-0" />
                              </button>
                            ))}
                          </div>
                        )}

                        {searchResults.equipment.length > 0 && (
                          <div className="border-t border-gray-100 pt-2">
                            <span className="text-[10px] uppercase font-bold text-gray-400 px-2">
                              Laboratory Equipment
                            </span>
                            {searchResults.equipment.map((eq) => (
                              <button
                                key={eq.id}
                                onClick={() => {
                                  navigateToEquipment(eq.id);
                                  setGlobalSearchOpen(false);
                                  setGlobalSearch('');
                                }}
                                className="w-full text-left p-2 rounded-lg hover:bg-green-50 text-black flex items-center justify-between cursor-pointer"
                              >
                                <span className="font-bold truncate">{eq.name}</span>
                                <Wrench className="w-3.5 h-3.5 text-green-700 shrink-0" />
                              </button>
                            ))}
                          </div>
                        )}

                        {!hasSearchResults && (
                          <p className="text-center py-3 text-gray-500 text-xs">
                            No match found for &quot;{globalSearch}&quot;
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Bar */}
          <div className="flex md:hidden items-center justify-around border-t border-gray-100 py-2">
            <button
              onClick={() => switchTab('dosage')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dosage'
                  ? 'bg-green-700 text-white shadow-2xs'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>Dosage Forms</span>
            </button>
            <button
              onClick={() => switchTab('equipment')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'equipment'
                  ? 'bg-green-700 text-white shadow-2xs'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Equipment</span>
            </button>
            <button
              onClick={() => switchTab('qr-hub')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'qr-hub'
                  ? 'bg-green-700 text-white shadow-2xs'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Hub</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Context Hero Card */}
        <div className="mb-6 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-700 flex items-center justify-center text-white shrink-0 shadow-xs">
              {activeTab === 'dosage' && <Pill className="w-6 h-6" />}
              {activeTab === 'equipment' && <Wrench className="w-6 h-6" />}
              {activeTab === 'qr-hub' && <QrCode className="w-6 h-6" />}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-100 text-green-900 border border-green-200 uppercase tracking-wider">
                  {activeTab === 'dosage'
                    ? '12 Dosage Forms'
                    : activeTab === 'equipment'
                    ? '7 Lab Instruments'
                    : '19 Permanent QR Codes'}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  B. Pharm Syllabi Study Guide
                </span>
              </div>

              <h1 className="text-lg sm:text-2xl font-black text-black tracking-tight mt-1">
                {activeTab === 'dosage' && 'Pharmaceutical Dosage Form Study Guide'}
                {activeTab === 'equipment' && 'Pharmacy Laboratory Equipment & SOPs'}
                {activeTab === 'qr-hub' && 'Permanent QR Codes & Lab Sticker Center'}
              </h1>

              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
                {activeTab === 'dosage' &&
                  'Comprehensive academic dossiers covering formulations, excipients, pharmacopeial QC tests, dispensing tips, and fixed QR codes for each dosage form.'}
                {activeTab === 'equipment' &&
                  'Operating procedures, principles, technical specifications, safety precautions, and permanent lab machine QR stickers for B. Pharm practicals.'}
                {activeTab === 'qr-hub' &&
                  'Permanent QR codes for all 12 dosage forms and 7 laboratory instruments. Ready to download in high-res PNG/SVG or print as adhesive lab machine stickers.'}
              </p>
            </div>
          </div>

          {/* Quick Switch Pills */}
          <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
            <button
              onClick={() => switchTab('dosage')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'dosage'
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-black'
              }`}
            >
              💊 Dosage Forms
            </button>
            <button
              onClick={() => switchTab('equipment')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'equipment'
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-black'
              }`}
            >
              🔬 Lab Equipment
            </button>
            <button
              onClick={() => switchTab('qr-hub')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'qr-hub'
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-black'
              }`}
            >
              🏷️ QR Hub
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="space-y-6">
          {activeTab === 'dosage' && (
            <DosageGuideSection
              scannedCategory={initialScan.form}
              showScanIntro={Boolean(initialScan.form) && !scanIntroPlayed}
              onScanIntroDone={() => setScanIntroPlayed(true)}
              selectedCategory={selectedForm}
              onSelectCategory={(form) => setSelectedForm(form)}
              onNavigateToEquipment={navigateToEquipment}
            />
          )}

          {activeTab === 'equipment' && (
            <EquipmentSection
              scannedId={initialScan.equipment}
              selectedId={selectedEquipment}
              onSelectEquipment={(id) => setSelectedEquipment(id)}
              onNavigateToDosageForm={navigateToDosageForm}
              onOpenStickerModal={() => setStickerSheetModalOpen(true)}
            />
          )}

          {activeTab === 'qr-hub' && (
            <QrHubSection
              onSelectEquipment={navigateToEquipment}
              onSelectDosageForm={navigateToDosageForm}
            />
          )}

          {/* Developer Credit & College Information */}
          <div className="print:hidden">
            <DeveloperInfoCard />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white py-6 text-xs text-gray-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-black text-green-800 text-sm">PharmaQR</span>
              <span className="text-gray-400">·</span>
              <span>Pharmaceutical Dosage Forms &amp; Equipment SOP Guide</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-gray-600 font-medium">
              <button
                onClick={() => switchTab('dosage')}
                className="hover:text-green-800 cursor-pointer"
              >
                12 Dosage Forms
              </button>
              <span>·</span>
              <button
                onClick={() => switchTab('equipment')}
                className="hover:text-green-800 cursor-pointer"
              >
                7 Lab Instruments
              </button>
              <span>·</span>
              <button
                onClick={() => switchTab('qr-hub')}
                className="hover:text-green-800 cursor-pointer"
              >
                Permanent QR Codes
              </button>
              <span>·</span>
              <button
                onClick={() => setStickerSheetModalOpen(true)}
                className="hover:text-green-800 cursor-pointer text-green-700 font-bold"
              >
                Print Lab Stickers
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-gray-100 text-gray-500">
            <div className="flex items-center gap-2">
              <img
                src="/images/sveri-cobp.png"
                alt="SVERI COBP"
                className="w-5 h-5 object-contain"
              />
              <span className="font-bold text-gray-700">
                SVERI College of Pharmacy, Pandharpur
              </span>
              <span className="text-gray-300">|</span>
              <span>Developed by {DEVELOPER_INFO.name} ({DEVELOPER_INFO.footerCredit})</span>
            </div>
            <span className="text-[11px] text-gray-400">
              Permanent Deployment: dosage-form.vercel.app
            </span>
          </div>
        </div>
      </footer>

      {/* Global Printable Sticker Sheet Modal */}
      {stickerSheetModalOpen && (
        <EquipmentStickerModal
          onClose={() => setStickerSheetModalOpen(false)}
          printAllMode={true}
        />
      )}
    </div>
  );
}

export default App;
