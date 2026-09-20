import React, { useState, useEffect, useRef } from 'react';
import { DosageFormCategory } from '../types/pharmacy';
import { DOSAGE_FORM_LIST, PHARMACY_DOSSIERS } from '../data/dosageFormsData';
import { DossierCard } from './DossierCard';
import { ScanIntroSplash } from './ScanIntroSplash';
import { EquipmentId } from '../data/equipmentData';
import { scrollInfoIntoView } from '../utils/scrollToInfo';
import {
  Search,
  Pill,
  Syringe,
  Eye,
  Wind,
  Layers,
  Droplet,
  ChevronRight,
  LayoutGrid
} from 'lucide-react';

interface DosageGuideSectionProps {
  /**
   * The dosage form captured at page load when the browser was opened by
   * scanning a physical PharmaQR code. `null` when the page was opened normally.
   */
  scannedCategory?: DosageFormCategory | null;
  /**
   * Plays the full-screen "QR scanned" intro. Only ever true for a real QR scan —
   * it is false when a student merely taps a dosage form inside the app.
   */
  showScanIntro?: boolean;
  /** Called once the scanned intro has been shown so it never replays. */
  onScanIntroDone?: () => void;
  selectedCategory?: DosageFormCategory;
  onSelectCategory?: (category: DosageFormCategory) => void;
  onNavigateToEquipment?: (id: EquipmentId) => void;
}

const getIcon = (category: DosageFormCategory) => {
  switch (category) {
    case 'TABLETS':
    case 'CAPSULES':
      return <Pill className="w-4 h-4" />;
    case 'INJECTIONS':
    case 'PARENTERALS & MISC.':
      return <Syringe className="w-4 h-4" />;
    case 'EYE/EAR DROPS':
      return <Eye className="w-4 h-4" />;
    case 'INHALATION PRODUCTS':
      return <Wind className="w-4 h-4" />;
    case 'SYRUPS':
    case 'LIQUID DOSAGE FORMS':
      return <Droplet className="w-4 h-4" />;
    default:
      return <Layers className="w-4 h-4" />;
  }
};

export const DosageGuideSection: React.FC<DosageGuideSectionProps> = ({
  scannedCategory,
  showScanIntro = false,
  onScanIntroDone,
  selectedCategory,
  onSelectCategory,
  onNavigateToEquipment
}) => {
  const [internalCategory, setInternalCategory] = useState<DosageFormCategory>(
    scannedCategory || selectedCategory || 'TABLETS'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [splashVisible, setSplashVisible] = useState(Boolean(showScanIntro));

  const dossierRef = useRef<HTMLDivElement | null>(null);
  const lastScrolledRef = useRef<DosageFormCategory | null>(null);
  // The dosage form shown on the very first render. Nothing scrolls while this
  // one is still selected (a normal visit starts at the top of the page).
  const initialCategoryRef = useRef<DosageFormCategory | null>(null);

  // Sync when the parent changes the selected form (search, QR hub, cross-links)
  useEffect(() => {
    if (selectedCategory) {
      setInternalCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const activeCategory = selectedCategory || internalCategory;
  const currentDossier = PHARMACY_DOSSIERS[activeCategory] || PHARMACY_DOSSIERS['TABLETS'];

  /**
   * True only while showing the exact dosage form this browser was opened with
   * by scanning its QR code. In that mode the QR block is hidden: there is no
   * point showing the code to the person who just scanned it.
   */
  const openedFromScan = Boolean(scannedCategory && scannedCategory === activeCategory);

  if (initialCategoryRef.current === null) {
    initialCategoryRef.current = activeCategory;
  }

  /**
   * Bring the tapped dosage form's info panel into view, so students never have
   * to scroll down to it (the index list sits above the dossier on phones).
   *
   * Scrolls only when a form was really chosen: the page was opened by scanning
   * a QR code, or the selection changed from the one shown on first render.
   */
  useEffect(() => {
    // The intro splash covers the screen; scroll once it has been dismissed.
    if (splashVisible) return;

    const selectionChanged = activeCategory !== initialCategoryRef.current;
    if (!openedFromScan && !selectionChanged) return;

    // Nothing to do if this panel is already the one in view.
    if (lastScrolledRef.current === activeCategory) return;

    // The guard is set when the scroll actually happens: React may re-run this
    // effect for the same item (StrictMode / quick re-renders) and cancel the
    // pending timer, which would otherwise swallow the very first scroll.
    const timer = window.setTimeout(() => {
      lastScrolledRef.current = activeCategory;
      scrollInfoIntoView(dossierRef.current);
    }, 60);
    return () => window.clearTimeout(timer);
  }, [activeCategory, openedFromScan, splashVisible]);

  const filtered = DOSAGE_FORM_LIST.filter((cat) => {
    const q = searchQuery.toLowerCase().trim();
    const d = PHARMACY_DOSSIERS[cat];
    return (
      !q ||
      cat.toLowerCase().includes(q) ||
      d.categoryTag.toLowerCase().includes(q) ||
      d.definition.toLowerCase().includes(q) ||
      d.commonExcipients.some((e) => e.toLowerCase().includes(q))
    );
  });

  const selectForm = (cat: DosageFormCategory) => {
    setInternalCategory(cat);
    onSelectCategory?.(cat);
    // Tapping a form is NOT a scan: never replay the intro splash.
    setSplashVisible(false);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('equipment');
      url.searchParams.set('form', cat);
      url.searchParams.set('tab', 'dosage');
      window.history.replaceState(null, '', url.href);
    }

    // Jump straight to the info panel of the tapped form.
    window.setTimeout(() => scrollInfoIntoView(dossierRef.current), 60);
  };

  const dismissSplash = () => {
    setSplashVisible(false);
    onScanIntroDone?.();
    // The scroll effect runs on the next render once the splash is gone.
  };

  // Full-screen "you just scanned a QR" intro — real scans only.
  if (splashVisible) {
    return (
      <ScanIntroSplash
        formName={currentDossier.shortName}
        itemType="dosage"
        onContinue={dismissSplash}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Banner if opened from QR */}
      {openedFromScan && (
        <div className="bg-green-50 border-2 border-green-600 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-green-900">
            You opened <span className="font-black text-black">{activeCategory}</span> by scanning its
            permanent PharmaQR code — showing the{' '}
            <span className="font-bold">study information only</span>.
          </p>
          <button
            onClick={() => selectForm('TABLETS')}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Browse All 12 Dosage Forms
          </button>
        </div>
      )}

      {/* Search Toolbar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-700 text-white text-xs font-bold uppercase tracking-wider">
            All 12 Dosage Forms
          </span>
          <p className="text-xs text-gray-600 mt-1.5">
            Select a dosage form from the index, or scan its fixed QR code to open its academic dossier.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search dosage forms, excipients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white focus:outline-hidden text-black transition-all"
          />
        </div>
      </div>

      {/* Browser layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Index List */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-xs lg:sticky lg:top-28">
          <div className="px-2 py-1 text-xs font-black uppercase tracking-wider text-gray-700 flex items-center justify-between border-b border-gray-100 pb-2">
            <span>Dosage Form Index</span>
            <span className="font-mono text-gray-500">{filtered.length}/12</span>
          </div>

          <div className="space-y-1.5 mt-3 max-h-[75vh] overflow-y-auto pr-1 lg:max-h-[65vh]">
            {filtered.map((cat) => {
              const active = activeCategory === cat;
              const d = PHARMACY_DOSSIERS[cat];
              return (
                <button
                  key={cat}
                  onClick={() => selectForm(cat)}
                  className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between group transition-all cursor-pointer border ${
                    active
                      ? 'bg-green-700 text-white border-green-700 shadow-xs'
                      : 'bg-white hover:bg-green-50/70 border-gray-200 text-black'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        active ? 'bg-white/20 text-white' : 'bg-green-50 text-green-700'
                      }`}
                    >
                      {getIcon(cat)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black truncate">{cat}</h4>
                      <p
                        className={`text-[11px] truncate mt-0.5 ${
                          active ? 'text-green-100' : 'text-gray-500'
                        }`}
                      >
                        {d.shortName}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      active
                        ? 'text-white translate-x-0.5'
                        : 'text-gray-400 group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        <div id="dosage-dossier" ref={dossierRef} className="lg:col-span-8 scroll-mt-28">
          <DossierCard
            dossier={currentDossier}
            highlightScanned={openedFromScan}
            showQr={!openedFromScan}
            onNavigateToEquipment={onNavigateToEquipment}
          />
        </div>
      </div>
    </div>
  );
};
