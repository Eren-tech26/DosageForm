import React, { useState, useEffect } from 'react';
import { DosageFormCategory } from '../types/pharmacy';
import { DOSAGE_FORM_LIST, PHARMACY_DOSSIERS } from '../data/dosageFormsData';
import { DossierCard } from './DossierCard';
import { ScanIntroSplash } from './ScanIntroSplash';
import { getFormFromUrl } from '../utils/pharmaQrEncoder';
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

export const DosageGuideSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DosageFormCategory>('TABLETS');
  const [searchQuery, setSearchQuery] = useState('');
  const [openedFromScan, setOpenedFromScan] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  // When a QR is scanned it opens this page with ?form=TABLETS — auto-navigate to it.
  useEffect(() => {
    const fromUrl = getFormFromUrl();
    if (fromUrl) {
      setActiveCategory(fromUrl);
      setOpenedFromScan(true);
      setShowSplash(true);
    }
  }, []);

  const currentDossier = PHARMACY_DOSSIERS[activeCategory];

  const filtered = DOSAGE_FORM_LIST.filter((cat) => {
    const q = searchQuery.toLowerCase();
    const d = PHARMACY_DOSSIERS[cat];
    return (
      cat.toLowerCase().includes(q) ||
      d.categoryTag.toLowerCase().includes(q) ||
      d.definition.toLowerCase().includes(q)
    );
  });

  const selectForm = (cat: DosageFormCategory) => {
    setActiveCategory(cat);
    setOpenedFromScan(false);
    // Reflect selection in URL so the page can be bookmarked / shared / matches the QR
    if (typeof window !== 'undefined') {
      const newUrl = `${window.location.pathname}?form=${encodeURIComponent(cat)}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  // SCANNED VIEW — QR opened this page: show white-background PharmaQR intro first,
  // then the form's full information.
  if (openedFromScan) {
    return (
      <>
        {showSplash && (
          <ScanIntroSplash
            formName={currentDossier.shortName}
            onContinue={() => setShowSplash(false)}
          />
        )}
        <div className={`space-y-4 transition-opacity duration-500 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
          <DossierCard dossier={currentDossier} highlightScanned showQr={false} />

          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-gray-600">
              You opened <span className="font-bold text-black">{activeCategory}</span> by scanning its PharmaQR code.
            </p>
            <button
              onClick={() => selectForm('TABLETS')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4" />
              Browse All 12 Dosage Forms
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-bold uppercase tracking-wider">
            All 12 Dosage Forms
          </span>
          <p className="text-xs text-gray-600 mt-1.5">
            Pick a form on the left, or scan its fixed QR code to open it directly.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search dosage forms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-hidden text-black"
          />
        </div>
      </div>

      {/* Browser layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Index */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="px-2 py-1 text-xs font-black uppercase tracking-wider text-gray-500 flex items-center justify-between">
            <span>Dosage Form Index</span>
            <span>{filtered.length}/12</span>
          </div>
          <div className="space-y-1.5 mt-2 max-h-[70vh] overflow-y-auto pr-1">
            {filtered.map((cat) => {
              const active = activeCategory === cat;
              const d = PHARMACY_DOSSIERS[cat];
              return (
                <button
                  key={cat}
                  onClick={() => selectForm(cat)}
                  className={`w-full p-3 rounded-xl text-left flex items-center justify-between group transition-colors cursor-pointer border ${
                    active
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white hover:bg-green-50 border-gray-200 text-black'
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
                      <p className={`text-[11px] truncate mt-0.5 ${active ? 'text-green-50' : 'text-gray-500'}`}>
                        {d.shortName}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-gray-400 group-hover:translate-x-0.5 transition-transform'}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-8">
          <DossierCard dossier={currentDossier} highlightScanned={openedFromScan} />
        </div>
      </div>
    </div>
  );
};
