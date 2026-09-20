import React, { useState, useEffect } from 'react';
import {
  QrCode,
  Search,
  Wrench,
  Pill,
  Printer,
  Download,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { EQUIPMENT_LIST, EquipmentId } from '../data/equipmentData';
import { DOSAGE_FORM_LIST, PHARMACY_DOSSIERS } from '../data/dosageFormsData';
import { DosageFormCategory } from '../types/pharmacy';
import { generateEquipmentQrDataUrl, downloadQrImage, buildPermanentEquipmentUrl } from '../utils/equipmentQr';
import { buildFormUrl, generateQrDataUrl } from '../utils/pharmaQrEncoder';
import { EquipmentStickerModal } from './EquipmentStickerModal';

interface QrHubSectionProps {
  onSelectEquipment: (id: EquipmentId) => void;
  onSelectDosageForm: (category: DosageFormCategory) => void;
}

interface QrItem {
  type: 'equipment' | 'dosage';
  id: string;
  title: string;
  category: string;
  url: string;
  tag: string;
  svgPath?: string;
}

export const QrHubSection: React.FC<QrHubSectionProps> = ({
  onSelectEquipment,
  onSelectDosageForm
}) => {
  const [filterType, setFilterType] = useState<'ALL' | 'EQUIPMENT' | 'DOSAGE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [qrCache, setQrCache] = useState<Record<string, string>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [stickerModalOpen, setStickerModalOpen] = useState(false);

  // Combine both lists into a unified QR directory
  const allItems: QrItem[] = [
    // 7 Equipment
    ...EQUIPMENT_LIST.map((eq) => ({
      type: 'equipment' as const,
      id: eq.id,
      title: eq.name,
      category: eq.category,
      url: buildPermanentEquipmentUrl(eq.id),
      tag: eq.assetTag,
      svgPath: `/qr/${eq.id}.svg`
    })),
    // 12 Dosage Forms
    ...DOSAGE_FORM_LIST.map((form) => {
      const d = PHARMACY_DOSSIERS[form];
      return {
        type: 'dosage' as const,
        id: form,
        title: form,
        category: d.categoryTag,
        url: buildFormUrl(form),
        tag: 'DOSAGE FORM'
      };
    })
  ];

  // Pre-generate QR codes for all items
  useEffect(() => {
    let cancelled = false;
    async function generateAll() {
      const cache: Record<string, string> = {};
      // 1. Equipment QRs
      for (const eq of EQUIPMENT_LIST) {
        cache[`equipment-${eq.id}`] = await generateEquipmentQrDataUrl(eq.id);
      }
      // 2. Dosage Form QRs
      for (const form of DOSAGE_FORM_LIST) {
        cache[`dosage-${form}`] = await generateQrDataUrl(buildFormUrl(form), '#166534');
      }
      if (!cancelled) setQrCache(cache);
    }
    generateAll();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = allItems.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q);

    const matchesType =
      filterType === 'ALL' ||
      (filterType === 'EQUIPMENT' && item.type === 'equipment') ||
      (filterType === 'DOSAGE' && item.type === 'dosage');

    return matchesSearch && matchesType;
  });

  const handleCopy = (item: QrItem) => {
    navigator.clipboard.writeText(item.url);
    const key = `${item.type}-${item.id}`;
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleOpenItem = (item: QrItem) => {
    if (item.type === 'equipment') {
      onSelectEquipment(item.id as EquipmentId);
    } else {
      onSelectDosageForm(item.id as DosageFormCategory);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-700 text-white text-xs font-bold uppercase tracking-wider">
              <QrCode className="w-3.5 h-3.5" />
              Permanent QR Hub
            </span>
            <span className="text-xs text-gray-500 font-semibold">
              19 Verifiable Fixed Codes
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-black mt-2">
            Print &amp; Download Permanent QR Codes
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl">
            Download high-resolution codes with the PharmaQR emblem or print official laboratory machine stickers to stick in college labs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setStickerModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print All Lab Stickers (Sheet)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Type Tabs */}
        <div className="flex rounded-xl bg-gray-100 p-1 text-xs font-bold">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterType === 'ALL'
                ? 'bg-white text-green-900 shadow-xs'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            All Codes (19)
          </button>
          <button
            onClick={() => setFilterType('EQUIPMENT')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              filterType === 'EQUIPMENT'
                ? 'bg-white text-green-900 shadow-xs'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-green-700" />
            Equipment (7)
          </button>
          <button
            onClick={() => setFilterType('DOSAGE')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              filterType === 'DOSAGE'
                ? 'bg-white text-green-900 shadow-xs'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Pill className="w-3.5 h-3.5 text-green-700" />
            Dosage Forms (12)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search QR codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white focus:outline-hidden text-black transition-all"
          />
        </div>
      </div>

      {/* Grid of Permanent QR Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => {
          const cacheKey = `${item.type}-${item.id}`;
          const qrSrc = qrCache[cacheKey];
          const isCopied = copiedKey === cacheKey;

          return (
            <div
              key={cacheKey}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-green-600 transition-colors group"
            >
              <div>
                {/* Header Strip */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${
                      item.type === 'equipment'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-green-100 text-green-900 border border-green-300'
                    }`}
                  >
                    {item.type === 'equipment' ? 'Lab Equipment' : 'Dosage Form'}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">{item.tag}</span>
                </div>

                <h3 className="text-base font-black text-black leading-tight line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">{item.category}</p>

                {/* QR Code Container */}
                <div className="my-4 p-3 bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center justify-center">
                  <div className="bg-white p-2 rounded-xl border border-green-200 shadow-2xs">
                    {qrSrc ? (
                      <img
                        src={qrSrc}
                        alt={`QR code for ${item.title}`}
                        className="w-36 h-36 object-contain"
                      />
                    ) : (
                      <div className="w-36 h-36 flex items-center justify-center text-xs text-gray-400">
                        Generating…
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-black uppercase text-green-800 tracking-wider mt-1.5">
                    PERMANENT DESTINATION
                  </span>
                </div>

                {/* URL Chip */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-1.5 flex items-center justify-between gap-1 text-[11px] font-mono text-gray-700">
                  <span className="truncate">{item.url}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(item)}
                    className="p-1 text-gray-500 hover:text-green-700 transition-colors cursor-pointer shrink-0"
                    title="Copy permanent URL"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                {qrSrc && (
                  <button
                    type="button"
                    onClick={() =>
                      downloadQrImage(qrSrc, `pharmaqr-${item.type}-${item.id}.png`)
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PNG</span>
                  </button>
                )}

                {item.svgPath && (
                  <a
                    href={item.svgPath}
                    download={`${item.id}.svg`}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>SVG</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => handleOpenItem(item)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer ml-auto"
                >
                  <span>Open Guide</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Equipment Sticker Modal */}
      {stickerModalOpen && (
        <EquipmentStickerModal
          onClose={() => setStickerModalOpen(false)}
          printAllMode={true}
        />
      )}
    </div>
  );
};
