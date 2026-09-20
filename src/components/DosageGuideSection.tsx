import React, { useState, useEffect } from 'react';
import { DosageFormCategory } from '../types/pharmacy';
import { DOSAGE_FORM_LIST, PHARMACY_DOSSIERS } from '../data/dosageFormsData';
import { DossierCard } from './DossierCard';
import { ScanIntroSplash } from './ScanIntroSplash';
import { getFormFromUrl } from '../utils/pharmaQrEncoder';
import { EquipmentId } from '../data/equipmentData';
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
  scannedCategory?: DosageFormCategory | null;
  onNavigateToEquipment?: (id: EquipmentId) => void;
  selectedCategory?: DosageFormCategory;
  onSelectCategory?: (category: DosageFormCategory) => void;
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
  onNavigateToEquipment,
  selectedCategory,
  onSelectCategory
}) => {
  const [internalCategory, setInternalCategory] = useState<DosageFormCategory>(
    scannedCategory || selectedCategory || 'TABLETS'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [openedFromScan, setOpenedFromScan] = useState(Boolean(scannedCategory));
  const [showSplash, setShowSplash] = useState(Boolean(scannedCategory));

  // Sync when prop changes
  useEffect(() => {
    if (selectedCategory) {
      setInternalCategory(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (scannedCategory) {
      setInternalCategory(scannedCategory);
      setOpenedFromScan(true);
      setShowSplash(true);
    }
  }, [scannedCategory]);

  const activeCategory = selectedCategory || internalCategory;
  const currentDossier = PHARMACY_DOSSIERS[activeCategory] || PHARMACY_DOSSIERS['TABLETS'];

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
    setOpenedFromScan(false);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('equipment');
      url.searchParams.set('form', cat);
      url.searchParams.set('tab', 'dosage');
      window.history.replaceState(null, '', url.href);
    }
  };

  // Scanned view splash
  if (openedFromScan && showSplash) {
    return (
      <ScanIntroSplash
        formName={currentDossier.shortName}
        itemType="dosage"
        onContinue={() => setShowSplash(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Banner if opened from QR */}
      {openedFromScan && (
        <div className="bg-green-50 border-2 border-green-600 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-green-900">
            You opened <span className="font-black text-black">{activeCategory}</span> by scanning its permanent PharmaQR code.
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
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
          <div className="px-2 py-1 text-xs font-black uppercase tracking-wider text-gray-700 flex items-center justify-between border-b border-gray-100 pb-2">
            <span>Dosage Form Index</span>
            <span className="font-mono text-gray-500">{filtered.length}/12</span>
          </div>

          <div className="space-y-1.5 mt-3 max-h-[75vh] overflow-y-auto pr-1">
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
        <div className="lg:col-span-8">
          <DossierCard
            dossier={currentDossier}
            highlightScanned={openedFromScan}
            onNavigateToEquipment={onNavigateToEquipment}
          />
        </div>
      </div>
    </div>
  );
};
