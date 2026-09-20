import React, { useState, useEffect } from 'react';
import { PharmacyDossier } from '../types/pharmacy';
import {
  BookOpen,
  CheckCircle2,
  AlertOctagon,
  TestTube,
  Lightbulb,
  QrCode,
  Route,
  Download,
  Copy,
  Check,
  Wrench,
  ExternalLink
} from 'lucide-react';
import { buildFormUrl, generateQrDataUrl } from '../utils/pharmaQrEncoder';
import { downloadQrImage } from '../utils/equipmentQr';
import { EquipmentId } from '../data/equipmentData';

interface DossierCardProps {
  dossier: PharmacyDossier;
  highlightScanned?: boolean;
  showQr?: boolean;
  onNavigateToEquipment?: (id: EquipmentId) => void;
}

// Map dosage forms to related equipment instruments
const RELATED_EQUIPMENT_MAP: Partial<Record<string, { id: EquipmentId; name: string; reason: string }[]>> = {
  TABLETS: [
    {
      id: 'tablet-friability-machine',
      name: 'Tablet Friability Test Apparatus',
      reason: 'Physical durability, chipping & mass-loss evaluation (USP <1216>, IP 2.9.7)'
    },
    {
      id: 'cyclone-separator',
      name: 'Cyclone Separator',
      reason: 'Powder classification & active ingredient recovery during dry granulation'
    }
  ],
  CAPSULES: [
    {
      id: 'ir-spectrophotometer',
      name: 'FTIR Spectrophotometer',
      reason: 'Gelatin shell API compatibility & raw excipient identification'
    },
    {
      id: 'cyclone-separator',
      name: 'Cyclone Separator',
      reason: 'Particle recovery & size distribution during capsule powder filling'
    }
  ],
  INJECTIONS: [
    {
      id: 'hot-air-oven',
      name: 'Hot Air Oven (Dry Heat Sterilizer)',
      reason: 'Depyrogenation of glass vials/ampoules (250°C) & dry heat sterilization'
    },
    {
      id: 'digital-mini-incubator',
      name: 'Digital Mini Incubator',
      reason: 'Sterility testing (USP <71>) & microbial enumeration of parenterals'
    }
  ],
  'PARENTERALS & MISC.': [
    {
      id: 'hot-air-oven',
      name: 'Hot Air Oven (Dry Heat Sterilizer)',
      reason: 'Sterilization of surgical glassware and heat-stable non-aqueous vehicles'
    },
    {
      id: 'digital-mini-incubator',
      name: 'Digital Mini Incubator',
      reason: 'Biological indicator incubation & bacterial endotoxin testing'
    }
  ],
  'EYE/EAR DROPS': [
    {
      id: 'digital-mini-incubator',
      name: 'Digital Mini Incubator',
      reason: 'Ophthalmic sterility testing & preservative effectiveness incubation'
    },
    {
      id: 'hot-air-oven',
      name: 'Hot Air Oven',
      reason: 'Sterilization of dropper glass components & metal caps'
    }
  ],
  'INHALATION PRODUCTS': [
    {
      id: 'cyclone-separator',
      name: 'Cyclone Separator',
      reason: 'Aerosol powder collection, classification & cyclone particle separation'
    }
  ],
  'SPECIAL DOSAGE FORMS': [
    {
      id: 'tablet-friability-machine',
      name: 'Tablet Friability Machine',
      reason: 'Mechanical testing of sublingual & buccal compressed matrix units'
    },
    {
      id: 'ir-spectrophotometer',
      name: 'FTIR Spectrophotometer',
      reason: 'Transdermal polymeric patch matrix interaction & FTIR characterization'
    }
  ]
};

export const DossierCard: React.FC<DossierCardProps> = ({
  dossier,
  highlightScanned = false,
  showQr = true,
  onNavigateToEquipment
}) => {
  const [qrUrl, setQrUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const formUrl = buildFormUrl(dossier.category);

  useEffect(() => {
    if (!showQr) return;
    let cancelled = false;
    generateQrDataUrl(formUrl, '#166534').then((url) => {
      if (!cancelled) setQrUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [formUrl, showQr]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(formUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedEquipment = RELATED_EQUIPMENT_MAP[dossier.category] || [];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="border-b-2 border-green-600 px-6 py-5 bg-white">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-1 bg-green-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider">
            Dosage Form Dossier
          </span>
          <span className="px-2.5 py-1 bg-green-50 text-green-900 border border-green-200 rounded-lg text-xs font-semibold">
            {dossier.categoryTag}
          </span>
          {highlightScanned && (
            <span className="px-2.5 py-1 bg-green-700 text-white rounded-lg text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Opened from QR Scan
            </span>
          )}
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-black tracking-tight leading-tight">
          {dossier.category}
        </h3>
        <p className="text-xs sm:text-sm text-gray-700 mt-2 leading-relaxed max-w-4xl">
          {dossier.definition}
        </p>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Media Block: Image (+ permanent QR when browsing) */}
        {showQr ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Visual Photo */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-2xs bg-gray-100 flex-1 min-h-[200px]">
                {!imgError ? (
                  <img
                    src={dossier.image}
                    alt={dossier.category}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover max-h-60"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-56 bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-4 text-center">
                    <TestTube className="w-10 h-10 text-green-700 mb-2 opacity-60" />
                    <span className="text-sm font-black text-green-950">{dossier.category}</span>
                    <span className="text-xs text-green-800 mt-1">Pharmaceutical Formulation</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                <span className="font-bold text-black">Visual: </span>
                {dossier.imageCaption}
              </p>
            </div>

            {/* Fixed QR code box */}
            <div className="lg:col-span-7 bg-green-50/60 border border-green-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="bg-white p-2.5 rounded-xl border-2 border-green-700 shadow-2xs shrink-0 text-center">
                  {qrUrl ? (
                    <img
                      src={qrUrl}
                      alt={`Scan to open ${dossier.category} guide`}
                      className="w-32 h-32 sm:w-36 sm:h-36 object-contain"
                    />
                  ) : (
                    <div className="w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center text-gray-400 text-xs">
                      Loading…
                    </div>
                  )}
                  <span className="block text-[8px] font-black uppercase text-green-900 tracking-wider mt-1">
                    PERMANENT QR
                  </span>
                </div>

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                    <QrCode className="w-4 h-4 text-green-700 shrink-0" />
                    <h4 className="text-xs font-black text-black uppercase tracking-wider">
                      Permanent Dosage Form QR
                    </h4>
                  </div>
                  <p className="text-xs text-gray-700 mt-1.5 leading-snug">
                    Permanent QR code for <strong className="text-green-900">{dossier.category}</strong>.
                    Scanning opens this dossier directly on any mobile device.
                  </p>

                  <div className="mt-2.5 p-1.5 bg-white border border-green-200 rounded-lg flex items-center justify-between gap-1 text-[11px] font-mono text-gray-700">
                    <span className="truncate">{formUrl}</span>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="p-1 text-gray-500 hover:text-green-700 transition-colors cursor-pointer shrink-0"
                      title="Copy URL"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-3.5 pt-3 border-t border-green-200 flex items-center gap-2">
                {qrUrl && (
                  <button
                    type="button"
                    onClick={() =>
                      downloadQrImage(qrUrl, `pharmaqr-${dossier.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`)
                    }
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download QR</span>
                  </button>
                )}
                <span className="text-[11px] text-gray-500 ml-auto font-medium">
                  Scan &amp; study anywhere
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Scanned view: no QR code repeated, only the study material */
          <div>
            <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-2xs">
              {!imgError ? (
                <img
                  src={dossier.image}
                  alt={dossier.category}
                  onError={() => setImgError(true)}
                  className="w-full h-56 sm:h-72 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-56 sm:h-72 bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-4 text-center">
                  <TestTube className="w-10 h-10 text-green-700 mb-2 opacity-60" />
                  <span className="text-sm font-black text-green-950">{dossier.category}</span>
                  <span className="text-xs text-green-800 mt-1">Pharmaceutical Formulation</span>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              <span className="font-bold text-black">Visual: </span>
              {dossier.imageCaption}
            </p>
            <p className="text-[11px] text-green-900 bg-green-50 border border-green-200 rounded-lg px-3 py-2 mt-2.5 leading-snug">
              This page was opened by scanning the permanent PharmaQR code, so the code is not shown
              again — only the study information is displayed. Need the QR image? Open the{' '}
              <span className="font-bold">QR Hub</span> tab.
            </p>
          </div>
        )}

        {/* Classification + Routes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <BookOpen className="w-4 h-4 text-green-700" />
              Sub-Classifications
            </h4>
            <div className="flex flex-wrap gap-2">
              {dossier.classification.map((item, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-green-50 text-green-900 border border-green-200 rounded-md text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Route className="w-4 h-4 text-green-700" />
              Routes of Administration
            </h4>
            <div className="flex flex-wrap gap-2">
              {dossier.routesOfAdministration.map((r, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-gray-100 text-black rounded-md text-xs font-mono"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Excipients + QC */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <TestTube className="w-4 h-4 text-green-700" />
              Common Excipients &amp; Formulation
            </h4>
            <ul className="space-y-2 text-xs text-gray-800">
              {dossier.commonExcipients.map((ex, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 shrink-0" />
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <BookOpen className="w-4 h-4 text-green-700" />
              Pharmacopeial Quality Control Tests
            </h4>
            <ul className="space-y-2 text-xs text-gray-800">
              {dossier.pharmaceuticalQualityTests.map((qc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 shrink-0" />
                  <span>{qc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Advantages + Limitations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-green-200 bg-green-50/40 rounded-xl p-5">
            <h4 className="text-xs font-black text-green-900 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <CheckCircle2 className="w-4 h-4 text-green-700" />
              Advantages
            </h4>
            <ul className="space-y-1.5 text-xs text-green-950">
              {dossier.keyAdvantages.map((a, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-700 font-bold">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-300 bg-gray-50 rounded-xl p-5">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <AlertOctagon className="w-4 h-4 text-gray-700" />
              Disadvantages &amp; Precautions
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-800">
              {dossier.disadvantagesOrLimitations.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cross-link to Related Equipment (if any) */}
        {relatedEquipment.length > 0 && (
          <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="w-4 h-4 text-emerald-800" />
              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950">
                Related Pharmacy Laboratory Equipment
              </h4>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              This dosage form is tested or manufactured using the following laboratory instruments in practicals:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {relatedEquipment.map((eq) => (
                <div
                  key={eq.id}
                  className="bg-white border border-emerald-200 rounded-lg p-3 flex flex-col justify-between"
                >
                  <div>
                    <h5 className="text-xs font-black text-black">{eq.name}</h5>
                    <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">{eq.reason}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateToEquipment?.(eq.id)}
                    className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-green-700 hover:text-green-900 cursor-pointer self-start"
                  >
                    <span>View Equipment SOP &amp; QR</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dispensing tips */}
        <div className="border-2 border-green-600 rounded-xl p-5 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-green-700" />
            <h4 className="text-xs font-black uppercase tracking-wider text-black">
              Clinical Dispensing Tips for Students
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-gray-800">
            {dossier.studentDispensingTips.map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-2 bg-green-50/60 border border-green-100 p-2.5 rounded-lg"
              >
                <span className="font-black text-green-700 font-mono text-xs shrink-0">#{i + 1}</span>
                <span className="leading-snug">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Example products */}
        <div>
          <h4 className="text-xs font-black text-black uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <TestTube className="w-4 h-4 text-green-700" />
            Real Product Examples
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dossier.exampleProducts.map((p, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-white">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h5 className="text-sm font-black text-black leading-tight">{p.productName}</h5>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-green-700 text-white rounded shrink-0">
                    {p.rxType}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-800">
                  <p>
                    <span className="font-bold text-black">Strength:</span> {p.strength}
                  </p>
                  <p>
                    <span className="font-bold text-black">Route:</span> {p.route}
                  </p>
                  <p>
                    <span className="font-bold text-black">Usage:</span> {p.instructions}
                  </p>
                  <p>
                    <span className="font-bold text-black">Side Effects:</span> {p.sideEffects}
                  </p>
                  <p>
                    <span className="font-bold text-black">Storage:</span> {p.storage}
                  </p>
                  <p className="text-green-900 font-semibold pt-1 border-t border-gray-100">
                    ⚠ {p.warnings}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
