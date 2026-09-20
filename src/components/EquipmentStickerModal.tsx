import React, { useEffect, useState } from 'react';
import { X, Printer, Download, QrCode, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';
import { EquipmentGuide, EQUIPMENT_LIST } from '../data/equipmentData';
import { generateEquipmentQrDataUrl, downloadQrImage, buildPermanentEquipmentUrl } from '../utils/equipmentQr';

interface EquipmentStickerModalProps {
  initialItem?: EquipmentGuide | null;
  onClose: () => void;
  printAllMode?: boolean;
}

export const EquipmentStickerModal: React.FC<EquipmentStickerModalProps> = ({
  initialItem,
  onClose,
  printAllMode = false
}) => {
  const [printAll, setPrintAll] = useState(printAllMode);
  const [selectedItem, setSelectedItem] = useState<EquipmentGuide>(initialItem || EQUIPMENT_LIST[0]);
  const [qrMap, setQrMap] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadAllQrs() {
      const map: Record<string, string> = {};
      for (const eq of EQUIPMENT_LIST) {
        const dataUrl = await generateEquipmentQrDataUrl(eq.id);
        map[eq.id] = dataUrl;
      }
      if (!cancelled) setQrMap(map);
    }
    loadAllQrs();
    return () => {
      cancelled = true;
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const copyUrl = (item: EquipmentGuide) => {
    const url = buildPermanentEquipmentUrl(item.id);
    navigator.clipboard.writeText(url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl print:max-h-none print:shadow-none print:w-full print:border-none">
        {/* Modal Controls Bar (hidden during print) */}
        <div className="border-b border-gray-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3 bg-gray-50 print:hidden">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-green-700" />
            <div>
              <h3 className="text-base font-black text-black leading-tight">
                Pharmacy Laboratory Equipment Stickers
              </h3>
              <p className="text-xs text-gray-500">
                Official permanent QR tags formatted for equipment labels &amp; SOP cards
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-gray-200 p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPrintAll(false)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  !printAll ? 'bg-white text-green-800 shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                Single Sticker
              </button>
              <button
                type="button"
                onClick={() => setPrintAll(true)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  printAll ? 'bg-white text-green-800 shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                All 6 Stickers (Sheet)
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Stickers</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 print:p-0 print:overflow-visible">
          {!printAll ? (
            /* Single sticker layout */
            <div className="flex flex-col items-center">
              <div className="w-full max-w-xl mb-4 print:hidden">
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Select Equipment to Preview:
                </label>
                <select
                  value={selectedItem.id}
                  onChange={(e) => {
                    const found = EQUIPMENT_LIST.find((x) => x.id === e.target.value);
                    if (found) setSelectedItem(found);
                  }}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-black focus:ring-2 focus:ring-green-500 focus:outline-hidden"
                >
                  {EQUIPMENT_LIST.map((eq) => (
                    <option key={eq.id} value={eq.id}>
                      {eq.name} ({eq.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* The Actual Lab Sticker */}
              <div className="border-4 border-green-800 rounded-2xl p-6 bg-white w-full max-w-xl shadow-md print:shadow-none print:border-2 print:border-black print:max-w-none print:w-full">
                {/* Sticker Header */}
                <div className="flex items-center justify-between border-b-2 border-green-800 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/sveri-cobp.png"
                      alt="SVERI COBP"
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h4 className="text-xs font-black tracking-wider uppercase text-green-900">
                        SVERI College of Pharmacy
                      </h4>
                      <p className="text-[11px] font-bold text-gray-700">
                        {selectedItem.department}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-900 font-mono text-[11px] font-bold rounded border border-green-300">
                      {selectedItem.assetTag}
                    </span>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">PERMANENT QR</p>
                  </div>
                </div>

                {/* Sticker Center Info + QR */}
                <div className="flex flex-col sm:flex-row items-center gap-5 my-2">
                  <div className="bg-white p-2 border-2 border-green-700 rounded-xl shadow-xs shrink-0 text-center">
                    {qrMap[selectedItem.id] ? (
                      <img
                        src={qrMap[selectedItem.id]}
                        alt={`QR for ${selectedItem.name}`}
                        className="w-36 h-36 object-contain"
                      />
                    ) : (
                      <div className="w-36 h-36 flex items-center justify-center text-xs text-gray-400">
                        Generating QR…
                      </div>
                    )}
                    <span className="block text-[9px] font-black uppercase text-green-800 tracking-wider mt-1">
                      SCAN FOR SOP
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-2 text-left">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-green-700">
                        {selectedItem.category}
                      </span>
                      <h3 className="text-xl font-black text-black leading-tight">
                        {selectedItem.name}
                      </h3>
                      <p className="text-xs text-gray-600 font-medium">
                        Model: {selectedItem.modelExample}
                      </p>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 text-[11px] text-green-950">
                      <p className="font-bold mb-0.5 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-green-700 shrink-0" />
                        Quick SOP:
                      </p>
                      <p className="leading-snug">{selectedItem.sopBrief}</p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-[10px] text-amber-950 flex items-start gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>{selectedItem.safetyCaution}</span>
                    </div>
                  </div>
                </div>

                {/* Sticker Footer */}
                <div className="border-t border-gray-200 pt-2.5 mt-4 flex items-center justify-between text-[10px] text-gray-500 font-medium">
                  <span>Target: {buildPermanentEquipmentUrl(selectedItem.id)}</span>
                  <span>PharmaQR · Rohan A. Ishwarkatti (Roll 18)</span>
                </div>
              </div>

              {/* Action Buttons below sticker (screen only) */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 print:hidden">
                <button
                  type="button"
                  onClick={() => copyUrl(selectedItem)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-black rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  {copiedId === selectedItem.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Copy Permanent Link</span>
                    </>
                  )}
                </button>

                {qrMap[selectedItem.id] && (
                  <button
                    type="button"
                    onClick={() =>
                      downloadQrImage(
                        qrMap[selectedItem.id],
                        `pharmaqr-equipment-${selectedItem.id}.png`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </button>
                )}

                <a
                  href={`/qr/${selectedItem.id}.svg`}
                  download={`${selectedItem.id}.svg`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download SVG</span>
                </a>
              </div>
            </div>
          ) : (
            /* Multi-sticker Sheet Layout (All 6 in A4 grid) */
            <div className="space-y-4">
              <div className="text-center print:hidden mb-2">
                <p className="text-xs text-gray-600">
                  Ready to print: All 7 laboratory equipment labels organized in a 2-column grid.
                  Cut along outer borders and affix to lab apparatus.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3">
                {EQUIPMENT_LIST.map((item) => (
                  <div
                    key={item.id}
                    className="border-2 border-green-800 rounded-xl p-4 bg-white shadow-xs print:shadow-none print:border-black print:break-inside-avoid"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-green-700 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src="/images/sveri-cobp.png"
                          alt="SVERI COBP"
                          className="w-8 h-8 object-contain"
                        />
                        <div>
                          <p className="text-[10px] font-black uppercase text-green-900 leading-tight">
                            SVERI College of Pharmacy
                          </p>
                          <p className="text-[9px] text-gray-600 leading-tight">
                            {item.department}
                          </p>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 bg-green-100 text-green-900 font-mono text-[9px] font-bold rounded border border-green-300">
                        {item.assetTag}
                      </span>
                    </div>

                    {/* Middle */}
                    <div className="flex items-start gap-3">
                      <div className="bg-white p-1 border border-green-700 rounded-lg shrink-0 text-center">
                        {qrMap[item.id] ? (
                          <img
                            src={qrMap[item.id]}
                            alt={item.name}
                            className="w-24 h-24 object-contain"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gray-50 flex items-center justify-center text-[10px] text-gray-400">
                            Loading…
                          </div>
                        )}
                        <span className="block text-[8px] font-black text-green-800">
                          SCAN FOR SOP
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1 text-left">
                        <h4 className="text-sm font-black text-black leading-tight">{item.name}</h4>
                        <p className="text-[10px] text-gray-600 font-medium">{item.modelExample}</p>
                        <div className="bg-green-50 border border-green-100 rounded p-1.5 text-[10px] text-green-950 leading-tight">
                          <strong className="font-bold">SOP:</strong> {item.sopBrief}
                        </div>
                        <p className="text-[9px] text-amber-900 bg-amber-50 rounded p-1 border border-amber-200 leading-tight">
                          ⚠ {item.safetyCaution}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 pt-1.5 mt-2 flex items-center justify-between text-[8px] text-gray-500 font-mono">
                      <span>{item.permanentUrl}</span>
                      <span>PharmaQR · Rohan A. I.</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
