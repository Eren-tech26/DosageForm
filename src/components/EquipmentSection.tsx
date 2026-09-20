import React, { useState, useEffect, useRef } from 'react';
import {
  Wrench,
  QrCode,
  Search,
  ChevronRight,
  Printer,
  Download,
  Copy,
  CheckCircle2,
  FileText,
  TestTube,
  ShieldAlert,
  Layers,
  ExternalLink,
  ZoomIn,
  X,
  Gauge,
  Sliders,
  Check
} from 'lucide-react';
import { EQUIPMENT_LIST, EquipmentGuide, EquipmentId, EQUIPMENT_BY_ID } from '../data/equipmentData';
import { generateEquipmentQrDataUrl, downloadQrImage, buildPermanentEquipmentUrl } from '../utils/equipmentQr';
import { EquipmentStickerModal } from './EquipmentStickerModal';
import { DosageFormCategory } from '../types/pharmacy';
import { scrollInfoIntoView } from '../utils/scrollToInfo';

interface EquipmentSectionProps {
  /**
   * The instrument captured at page load when the browser was opened by
   * scanning a machine QR sticker. `null` when the page was opened normally.
   */
  scannedId?: EquipmentId | null;
  /** Instrument requested from elsewhere in the app (QR hub, search, cross-links). */
  selectedId?: EquipmentId | null;
  onSelectEquipment?: (id: EquipmentId) => void;
  onNavigateToDosageForm?: (form: DosageFormCategory) => void;
  onOpenStickerModal?: () => void;
}

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({
  scannedId,
  selectedId,
  onSelectEquipment,
  onNavigateToDosageForm
}) => {
  const [activeId, setActiveId] = useState<EquipmentId>(
    selectedId || scannedId || 'digital-mini-incubator'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [stickerModalOpen, setStickerModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const dossierRef = useRef<HTMLDivElement | null>(null);
  const lastScrolledRef = useRef<EquipmentId | null>(null);
  // Instrument shown on the very first render; nothing scrolls while it is selected.
  const initialIdRef = useRef<EquipmentId | null>(null);

  // Update active item if the parent asks for a different instrument
  useEffect(() => {
    if (selectedId && EQUIPMENT_BY_ID[selectedId]) {
      setActiveId(selectedId);
    }
  }, [selectedId]);

  // Update active item if opened by scanning a machine QR code
  useEffect(() => {
    if (scannedId && EQUIPMENT_BY_ID[scannedId]) {
      setActiveId(scannedId);
    }
  }, [scannedId]);

  const currentItem: EquipmentGuide = EQUIPMENT_BY_ID[activeId] || EQUIPMENT_LIST[0];

  /**
   * True only while showing the exact instrument this browser was opened with
   * by scanning its QR sticker. In that mode the QR block is hidden — the person
   * reading the page is the one who just scanned it.
   */
  const openedFromScan = Boolean(scannedId && scannedId === activeId);

  if (initialIdRef.current === null) {
    initialIdRef.current = activeId;
  }

  /**
   * Bring the selected instrument's SOP into view instead of making the student
   * scroll down to it (the index list sits above the dossier on phones).
   *
   * Scrolls only when an instrument was really chosen: the page was opened by
   * scanning a machine QR code, or the selection changed from the initial one.
   */
  useEffect(() => {
    const selectionChanged = activeId !== initialIdRef.current;
    if (!openedFromScan && !selectionChanged) return;

    // Nothing to do if this panel is already the one in view.
    if (lastScrolledRef.current === activeId) return;

    // The guard is set when the scroll actually happens: React may re-run this
    // effect for the same item (StrictMode / quick re-renders) and cancel the
    // pending timer, which would otherwise swallow the very first scroll.
    const timer = window.setTimeout(() => {
      lastScrolledRef.current = activeId;
      scrollInfoIntoView(dossierRef.current);
    }, 60);
    return () => window.clearTimeout(timer);
  }, [activeId, openedFromScan]);

  // Generate QR code data URL whenever activeId changes (not needed after a scan)
  useEffect(() => {
    if (openedFromScan) return;
    let cancelled = false;
    generateEquipmentQrDataUrl(currentItem.id).then((url) => {
      if (!cancelled) setQrDataUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [currentItem.id, openedFromScan]);

  // Categories for filter
  const categories = ['ALL', ...Array.from(new Set(EQUIPMENT_LIST.map((e) => e.category)))];

  // Filtered equipment list
  const filteredList = EQUIPMENT_LIST.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.department.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q) ||
      item.principle.toLowerCase().includes(q) ||
      item.uses.some((u) => u.toLowerCase().includes(q));

    const matchesCategory =
      categoryFilter === 'ALL' || item.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleSelectEquipment = (id: EquipmentId) => {
    setActiveId(id);
    onSelectEquipment?.(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('form');
      url.searchParams.set('equipment', id);
      url.searchParams.set('tab', 'equipment');
      window.history.replaceState(null, '', url.href);
    }
    // Jump straight to the SOP of the tapped instrument.
    window.setTimeout(() => scrollInfoIntoView(dossierRef.current), 60);
  };

  const handleCopyLink = () => {
    const url = buildPermanentEquipmentUrl(currentItem.id);
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Search and Category Filter Toolbar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-700 text-white text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              6 Lab Instruments
            </span>
            <span className="text-xs text-gray-500 font-semibold">
              Permanent QR SOP System
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1.5 max-w-xl">
            Select an instrument from the left, search specifications, or scan its permanent QR code in the lab to open its operating guide.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search equipment, SOP, specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white focus:outline-hidden text-black transition-all"
            />
          </div>

          <button
            onClick={() => setStickerModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
            title="Print equipment labels for laboratory machines"
          >
            <Printer className="w-4 h-4 text-green-700" />
            <span>Print Lab Stickers</span>
          </button>
        </div>
      </div>

      {/* Scanned Badge Banner if opened from QR */}
      {scannedId && (
        <div className="bg-green-50 border-2 border-green-600 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-green-800">
                Opened via Permanent Equipment QR Code · Info only
              </p>
              <h4 className="text-sm sm:text-base font-black text-black">
                {currentItem.name} · Standard Operating Procedure
              </h4>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 bg-white border border-green-200 text-green-900 rounded-lg">
            Asset: {currentItem.assetTag}
          </span>
        </div>
      )}

      {/* Main Grid: Left Navigation + Right Detail Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Equipment Index & Filter */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-3 lg:sticky lg:top-28">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-green-700" />
              Instruments Index
            </span>
            <span className="text-xs font-mono font-bold text-gray-500">
              {filteredList.length}/6
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pb-2 border-b border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-green-700 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === 'ALL' ? 'All' : cat.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* List of Equipment Cards */}
          <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-1">
            {filteredList.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-500">
                No equipment matching &quot;{searchQuery}&quot;
              </div>
            ) : (
              filteredList.map((item) => {
                const isSelected = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectEquipment(item.id)}
                    className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-green-700 text-white border-green-700 shadow-sm'
                        : 'bg-white hover:bg-green-50/60 border-gray-200 text-black'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Meta */}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-black truncate leading-snug">
                        {item.name}
                      </h4>
                      <p
                        className={`text-[11px] truncate mt-0.5 ${
                          isSelected ? 'text-green-100 font-medium' : 'text-gray-500'
                        }`}
                      >
                        {item.category}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-green-50 text-green-800 border border-green-200'
                          }`}
                        >
                          QR Active
                        </span>
                        <span
                          className={`text-[9px] font-mono truncate ${
                            isSelected ? 'text-green-200' : 'text-gray-400'
                          }`}
                        >
                          {item.assetTag}
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-white translate-x-0.5' : 'text-gray-400'
                      }`}
                    />
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Full Academic Dossier & QR Card */}
        <div id="equipment-dossier" ref={dossierRef} className="lg:col-span-8 scroll-mt-28">
          <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
            {/* Equipment Header Strip */}
            <header className="border-b-2 border-green-600 p-5 sm:p-6 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 bg-green-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider">
                    {currentItem.category}
                  </span>
                  <span className="px-2.5 py-1 bg-green-50 text-green-900 border border-green-200 rounded-lg text-xs font-semibold">
                    {currentItem.department}
                  </span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 font-mono rounded-lg text-xs font-bold border border-gray-200">
                    {currentItem.assetTag}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setStickerModalOpen(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Label</span>
                  </button>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight leading-tight">
                {currentItem.name}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-green-800 mt-1">
                Laboratory Model: {currentItem.modelExample}
              </p>
              <p className="text-xs sm:text-sm text-gray-700 mt-2.5 leading-relaxed">
                {currentItem.definition}
              </p>
            </header>

            <div className="p-5 sm:p-6 space-y-6 text-sm text-gray-800">
              {/* Media Block: Photo (+ permanent QR only when browsing, never after a scan) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                {/* Equipment Photo */}
                <div
                  className={`flex flex-col ${openedFromScan ? 'md:col-span-12' : 'md:col-span-6'}`}
                >
                  <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex-1 min-h-[220px]">
                    <img
                      src={currentItem.image}
                      alt={currentItem.name}
                      className="w-full h-full object-cover max-h-64 cursor-pointer group-hover:scale-102 transition-transform duration-300"
                      onClick={() => setPhotoModalOpen(true)}
                    />
                    <button
                      onClick={() => setPhotoModalOpen(true)}
                      className="absolute bottom-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg opacity-90 transition-opacity cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                      title="Enlarge photo"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Zoom</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 leading-snug">
                    <strong className="text-black">Laboratory Visual:</strong> {currentItem.imageCaption}
                  </p>
                </div>

                {/* Permanent QR Code Box — hidden when this page was opened by
                    scanning the machine's own QR code (info/SOP only). */}
                {!openedFromScan && (
                  <div className="md:col-span-6 bg-gradient-to-br from-green-50 to-emerald-50/70 border border-green-200 rounded-xl p-4 flex flex-col justify-between">
                    <div className="flex items-start gap-4">
                      {/* The QR Code Image */}
                      <div className="bg-white p-2 border-2 border-green-700 rounded-xl shadow-xs shrink-0 text-center">
                        {qrDataUrl ? (
                          <img
                            src={qrDataUrl}
                            alt={`Permanent QR for ${currentItem.name}`}
                            className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
                          />
                        ) : (
                          <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center text-xs text-gray-400">
                            Generating…
                          </div>
                        )}
                        <span className="block text-[8px] font-black uppercase text-green-900 tracking-wider mt-1">
                          PERMANENT QR
                        </span>
                      </div>

                      {/* QR Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <QrCode className="w-4 h-4 text-green-700 shrink-0" />
                          <h4 className="text-xs font-black uppercase tracking-wider text-green-900">
                            Permanent QR Link
                          </h4>
                        </div>
                        <p className="text-xs text-gray-700 mt-1 leading-snug">
                          Affix this QR code to the laboratory instrument. Scanning opens this operating guide instantly on any smartphone.
                        </p>

                        <div className="mt-2.5 p-1.5 bg-white border border-green-200 rounded-lg flex items-center justify-between gap-1 text-[11px] font-mono text-gray-700">
                          <span className="truncate">{buildPermanentEquipmentUrl(currentItem.id)}</span>
                          <button
                            type="button"
                            onClick={handleCopyLink}
                            className="p-1 text-gray-500 hover:text-green-700 transition-colors cursor-pointer shrink-0"
                            title="Copy permanent URL"
                          >
                            {copiedLink ? (
                              <Check className="w-3.5 h-3.5 text-green-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* QR Download & Sticker Actions */}
                    <div className="mt-3.5 pt-3 border-t border-green-200 flex flex-wrap items-center gap-2">
                      {qrDataUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            downloadQrImage(qrDataUrl, `pharmaqr-${currentItem.id}.png`)
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PNG</span>
                        </button>
                      )}

                      <a
                        href={`/qr/${currentItem.id}.svg`}
                        download={`${currentItem.id}.svg`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>SVG</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setStickerModalOpen(true)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-gray-100 text-green-900 border border-green-300 rounded-lg text-xs font-bold transition-colors cursor-pointer ml-auto"
                      >
                        <Printer className="w-3.5 h-3.5 text-green-700" />
                        <span>Sticker Preview</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 1: Working Principle */}
              <section className="border border-gray-200 rounded-xl p-5 bg-white">
                <h3 className="text-sm font-black uppercase tracking-wider text-black flex items-center gap-2 mb-2">
                  <Gauge className="w-4 h-4 text-green-700" />
                  Working Principle &amp; Mechanism
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {currentItem.principle}
                </p>
              </section>

              {/* Section 2: Technical Specifications Grid */}
              <section className="border border-gray-200 rounded-xl p-5 bg-white">
                <h3 className="text-sm font-black uppercase tracking-wider text-black flex items-center gap-2 mb-3">
                  <Sliders className="w-4 h-4 text-green-700" />
                  Key Technical Specifications &amp; Parameters
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentItem.specifications.map(([specName, specVal]) => (
                    <div
                      key={specName}
                      className="bg-green-50/60 border border-green-100 rounded-xl p-3"
                    >
                      <dt className="text-[11px] uppercase font-bold text-green-900">
                        {specName}
                      </dt>
                      <dd className="mt-1 text-xs font-semibold text-black leading-snug">
                        {specVal}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* Section 3: Practical Uses in Pharmacy */}
              <section className="border border-gray-200 rounded-xl p-5 bg-white">
                <h3 className="text-sm font-black uppercase tracking-wider text-black flex items-center gap-2 mb-3">
                  <TestTube className="w-4 h-4 text-green-700" />
                  Pharmacopoeial &amp; Laboratory Applications
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-800">
                  {currentItem.uses.map((useText, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-green-600 mt-1.5 shrink-0" />
                      <span className="leading-snug">{useText}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 4: Standard Operating Procedure (SOP) */}
              <section className="border-2 border-green-700 rounded-xl p-5 bg-white shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-3 border-b border-green-100 pb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-700" />
                    <h3 className="text-sm font-black uppercase tracking-wider text-black">
                      Standard Operating Procedure (SOP) — Step-by-Step
                    </h3>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-green-100 text-green-900 rounded">
                    B. Pharm Lab SOP
                  </span>
                </div>
                <ol className="space-y-2.5 text-xs sm:text-sm text-gray-800">
                  {currentItem.operation.map((step, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 bg-green-50/50 border border-green-100 rounded-lg p-2.5"
                    >
                      <span className="w-5 h-5 rounded-md bg-green-700 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5 font-mono">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Section 5: Safety Precautions & Hazard Warnings */}
              <aside className="rounded-xl border-2 border-amber-300 bg-amber-50/80 p-5 shadow-xs">
                <div className="flex items-center gap-2 text-amber-950 font-black mb-2 text-sm uppercase tracking-wide">
                  <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
                  <h4>Laboratory Precautions &amp; Safety Warnings</h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-amber-950">
                  {currentItem.precautions.map((warn, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-700 font-bold text-sm leading-none mt-0.5">•</span>
                      <span className="leading-snug">{warn}</span>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Section 6: Quality Control & Calibration */}
              <section className="border border-gray-200 rounded-xl p-5 bg-white">
                <h3 className="text-sm font-black uppercase tracking-wider text-black flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-700" />
                  Routine Quality Control &amp; Calibration Checks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-800">
                  {currentItem.qcChecks.map((qc, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
                      <span className="leading-snug">{qc}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 7: Related Dosage Forms Cross-Reference */}
              {currentItem.relatedDosageForms && currentItem.relatedDosageForms.length > 0 && (
                <section className="border border-green-200 bg-green-50/40 rounded-xl p-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-green-950 flex items-center gap-1.5 mb-2">
                    <Layers className="w-4 h-4 text-green-700" />
                    Related Dosage Forms in Syllabus
                  </h4>
                  <p className="text-xs text-gray-600 mb-3">
                    This equipment is directly utilized in formulating or testing these pharmaceutical dosage forms. Click to view dosage dossier:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentItem.relatedDosageForms.map((df) => (
                      <button
                        key={df}
                        onClick={() => onNavigateToDosageForm?.(df)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-green-700 hover:text-white text-green-900 border border-green-300 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs group"
                      >
                        <span>{df}</span>
                        <ExternalLink className="w-3 h-3 text-green-600 group-hover:text-white" />
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </article>
        </div>
      </div>

      {/* Equipment Sticker Modal */}
      {stickerModalOpen && (
        <EquipmentStickerModal
          initialItem={currentItem}
          onClose={() => setStickerModalOpen(false)}
        />
      )}

      {/* Enlarge Photo Modal */}
      {photoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPhotoModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h4 className="text-sm font-black text-black">{currentItem.name}</h4>
              <button
                onClick={() => setPhotoModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-3 max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl bg-gray-50">
              <img
                src={currentItem.image}
                alt={currentItem.name}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <p className="text-xs text-gray-600 mt-3">{currentItem.imageCaption}</p>
          </div>
        </div>
      )}
    </div>
  );
};
