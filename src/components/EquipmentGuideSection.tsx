import React, { useState, useEffect } from 'react';
import { EquipmentId } from '../types/pharmacy';
import { EQUIPMENT_LIST, EQUIPMENT_DOSSIERS } from '../data/equipmentData';
import { EquipmentCard } from './EquipmentCard';
import { ScanIntroSplash } from './ScanIntroSplash';
import { getEquipmentFromUrl } from '../utils/equipmentQr';
import {
  Search,
  Thermometer,
  FlaskConical,
  Settings,
  Layers,
  ChevronRight,
  LayoutGrid,
  ScanLine,
  Wrench,
} from 'lucide-react';

const getIcon = (id: EquipmentId) => {
  switch (id) {
    case 'digital-mini-incubator':
      return <Thermometer className="w-4 h-4" />;
    case 'hot-air-oven':
      return <FlaskConical className="w-4 h-4" />;
    case 'tablet-friability-machine':
      return <Settings className="w-4 h-4" />;
    case 'ir-spectrophotometer':
      return <ScanLine className="w-4 h-4" />;
    case 'cyclone-separator':
      return <Wrench className="w-4 h-4" />;
    case 'quartz-muffle-tray':
      return <Layers className="w-4 h-4" />;
    default:
      return <Settings className="w-4 h-4" />;
  }
};

export const EquipmentGuideSection: React.FC = () => {
  const [activeEquipment, setActiveEquipment] = useState<EquipmentId>('digital-mini-incubator');
  const [searchQuery, setSearchQuery] = useState('');
  const [openedFromScan, setOpenedFromScan] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const fromUrl = getEquipmentFromUrl();
    if (fromUrl) {
      setActiveEquipment(fromUrl);
      setOpenedFromScan(true);
      setShowSplash(true);
    }
  }, []);

  const currentDossier = EQUIPMENT_DOSSIERS[activeEquipment];

  const filtered = EQUIPMENT_LIST.filter((id) => {
    const q = searchQuery.toLowerCase();
    const d = EQUIPMENT_DOSSIERS[id];
    return (
      id.toLowerCase().includes(q) ||
      d.shortName.toLowerCase().includes(q) ||
      d.fullName.toLowerCase().includes(q) ||
      d.categoryTag.toLowerCase().includes(q) ||
      d.definition.toLowerCase().includes(q)
    );
  });

  const selectEquipment = (id: EquipmentId) => {
    setActiveEquipment(id);
    setOpenedFromScan(false);
    if (typeof window !== 'undefined') {
      const newUrl = `${window.location.pathname}?equipment=${encodeURIComponent(id)}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  if (openedFromScan) {
    return (
      <>
        {showSplash && (
          <ScanIntroSplash formName={currentDossier.shortName} onContinue={() => setShowSplash(false)} />
        )}
        <div className={`space-y-4 transition-opacity duration-500 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
          <EquipmentCard dossier={currentDossier} highlightScanned showQr={false} />
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-gray-600">
              You opened <span className="font-bold text-black">{currentDossier.shortName}</span> by scanning its PharmaQR equipment code.
            </p>
            <button
              onClick={() => selectEquipment('digital-mini-incubator')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4" />
              Browse All 6 Equipment
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-600 text-white text-xs font-bold uppercase tracking-wider">
            All 6 Pharmacy Equipment
          </span>
          <p className="text-xs text-gray-600 mt-1.5">
            Pick equipment on the left, or scan its fixed QR code to open its full guide directly. Now includes Digital Mini Incubator permanently.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-hidden text-black"
          />
        </div>
      </div>

      {/* Browser Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Index */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="px-2 py-1 text-xs font-black uppercase tracking-wider text-gray-500 flex items-center justify-between">
            <span>Equipment Index</span>
            <span>{filtered.length}/6</span>
          </div>
          <div className="space-y-1.5 mt-2 max-h-[70vh] overflow-y-auto pr-1">
            {filtered.map((id) => {
              const active = activeEquipment === id;
              const d = EQUIPMENT_DOSSIERS[id];
              return (
                <button
                  key={id}
                  onClick={() => selectEquipment(id)}
                  className={`w-full p-3 rounded-xl text-left flex items-center justify-between group transition-colors cursor-pointer border ${
                    active
                      ? 'bg-cyan-600 text-white border-cyan-600'
                      : 'bg-white hover:bg-cyan-50 border-gray-200 text-black'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        active ? 'bg-white/20 text-white' : 'bg-cyan-50 text-cyan-700'
                      }`}
                    >
                      {getIcon(id)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black truncate">{d.shortName}</h4>
                      <p className={`text-[11px] truncate mt-0.5 ${active ? 'text-cyan-50' : 'text-gray-500'}`}>
                        {d.categoryTag}
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
          <div className="mt-4 p-3 bg-cyan-50 border border-cyan-100 rounded-xl">
            <p className="text-[11px] text-cyan-900 font-medium leading-snug">
              <span className="font-black">Note:</span> Each equipment has a permanent QR code like dosage forms. Print from <code className="bg-white px-1 rounded">/public/qr/</code> folder — PNG + SVG + URL txt for each.
            </p>
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-8">
          <EquipmentCard dossier={currentDossier} highlightScanned={openedFromScan} />
        </div>
      </div>
    </div>
  );
};
