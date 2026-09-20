import React, { useState, useEffect } from 'react';
import { EquipmentDossier } from '../types/pharmacy';
import {
  BookOpen,
  CheckCircle2,
  AlertOctagon,
  TestTube,
  Lightbulb,
  QrCode,
  Settings,
  ShieldAlert,
  Thermometer,
  Cog,
  FlaskConical,
} from 'lucide-react';
import { buildEquipmentUrl } from '../utils/equipmentQr';
import { generateQrDataUrl } from '../utils/pharmaQrEncoder';

interface EquipmentCardProps {
  dossier: EquipmentDossier;
  highlightScanned?: boolean;
  showQr?: boolean;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({
  dossier,
  highlightScanned = false,
  showQr = true,
}) => {
  const [qrUrl, setQrUrl] = useState<string>('');
  const equipmentUrl = buildEquipmentUrl(dossier.id);

  useEffect(() => {
    if (!showQr) return;
    let cancelled = false;
    generateQrDataUrl(equipmentUrl, '#0e7490').then((url) => {
      if (!cancelled) setQrUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [equipmentUrl, showQr]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="border-b-2 border-cyan-600 px-6 py-5 bg-white">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-1 bg-cyan-600 text-white rounded-lg text-xs font-bold uppercase tracking-wide">
            Pharmacy Equipment Guide
          </span>
          <span className="px-2.5 py-1 bg-cyan-50 text-cyan-800 border border-cyan-200 rounded-lg text-xs font-semibold">
            {dossier.categoryTag}
          </span>
          {highlightScanned && (
            <span className="px-2.5 py-1 bg-cyan-600 text-white rounded-lg text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Opened from QR Scan
            </span>
          )}
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-black tracking-tight">
          {dossier.fullName}
        </h3>
        <p className="text-sm text-gray-700 mt-2 leading-relaxed max-w-4xl">
          {dossier.definition}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Image + QR */}
        {showQr ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <img
                  src={dossier.image}
                  alt={dossier.shortName}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                <span className="font-bold text-black">Visual: </span>
                {dossier.imageCaption}
              </p>
            </div>

            <div className="lg:col-span-7 bg-cyan-50/50 border border-cyan-200 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-5">
              <div className="bg-white p-3 rounded-xl border border-cyan-200 shadow-sm shrink-0">
                {qrUrl ? (
                  <img src={qrUrl} alt={`Scan to open ${dossier.shortName} guide`} className="w-40 h-40 object-contain" />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center text-gray-400 text-xs">Loading…</div>
                )}
              </div>
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <QrCode className="w-4 h-4 text-cyan-700" />
                  <h4 className="text-sm font-black text-black uppercase tracking-wide">
                    Fixed QR — Scan to Open This Guide
                  </h4>
                </div>
                <p className="text-xs text-gray-700 mt-1.5 leading-relaxed">
                  Permanent QR for <span className="font-bold text-cyan-800">{dossier.shortName}</span>. Scanning redirects straight to this equipment's full Student Guide.
                </p>
                <p className="text-[11px] text-gray-500 mt-2 font-mono break-all">{equipmentUrl}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <img src={dossier.image} alt={dossier.shortName} className="w-full h-56 sm:h-72 object-cover" />
            </div>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              <span className="font-bold text-black">Visual: </span>
              {dossier.imageCaption}
            </p>
          </div>
        )}

        {/* Principle */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5 mb-3">
            <Cog className="w-4 h-4 text-cyan-700" />
            Working Principle
          </h4>
          <p className="text-xs text-gray-800 leading-relaxed">{dossier.workingPrinciple}</p>
        </div>

        {/* Construction + Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Settings className="w-4 h-4 text-cyan-700" />
              Construction / Parts
            </h4>
            <ul className="space-y-2 text-xs text-gray-800">
              {dossier.construction.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-1.5 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Thermometer className="w-4 h-4 text-cyan-700" />
              Technical Specifications
            </h4>
            <div className="space-y-2">
              {dossier.specifications.map(([label, value], i) => (
                <div key={i} className="bg-cyan-50/60 border border-cyan-100 rounded-lg p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-cyan-800">{label}</div>
                  <div className="text-xs font-medium text-black mt-1">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Applications */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5 mb-3">
            <FlaskConical className="w-4 h-4 text-cyan-700" />
            Pharmacy Applications (As per Syllabus)
          </h4>
          <ul className="space-y-2 text-xs text-gray-800">
            {dossier.pharmacyApplications.map((app, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-1.5 shrink-0" />
                <span>{app}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Advantages + Limitations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-cyan-200 bg-cyan-50/40 rounded-xl p-5">
            <h4 className="text-xs font-black text-cyan-900 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <CheckCircle2 className="w-4 h-4 text-cyan-700" />
              Advantages
            </h4>
            <ul className="space-y-1.5 text-xs text-cyan-950">
              {dossier.advantages.map((a, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-700 font-bold">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-300 bg-gray-50 rounded-xl p-5">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <AlertOctagon className="w-4 h-4 text-gray-700" />
              Limitations
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-800">
              {dossier.limitations.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Operating Procedure */}
        <div className="border-2 border-cyan-600 rounded-xl p-5 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-cyan-700" />
            <h4 className="text-xs font-black uppercase tracking-wider text-black">
              Standard Operating Procedure (SOP) — Steps
            </h4>
          </div>
          <ol className="space-y-2 text-xs text-gray-800">
            {dossier.operatingProcedure.map((step, i) => (
              <li key={i} className="flex items-start gap-2 bg-cyan-50/60 border border-cyan-100 p-2.5 rounded-lg">
                <span className="font-black text-cyan-700 font-mono text-xs shrink-0">#{i + 1}</span>
                <span className="leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* QC + Safety */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <TestTube className="w-4 h-4 text-cyan-700" />
              Quality Control & Calibration
            </h4>
            <ul className="space-y-2 text-xs text-gray-800">
              {dossier.qualityTests.map((qc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-1.5 shrink-0" />
                  <span>{qc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-amber-200 bg-amber-50 rounded-xl p-5">
            <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              Safety Precautions
            </h4>
            <ul className="space-y-2 text-xs text-amber-950">
              {dossier.safetyPrecautions.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Example Models */}
        <div>
          <h4 className="text-xs font-black text-black uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-cyan-700" />
            Example Models Used in Pharmacy Colleges
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dossier.exampleModels.map((m, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-white">
                <h5 className="text-xs font-black text-black leading-tight">{m.model}</h5>
                <p className="text-[11px] font-bold text-cyan-700 mt-1">{m.manufacturer}</p>
                <p className="text-xs text-gray-700 mt-2 leading-snug">{m.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sources */}
        {dossier.sources && dossier.sources.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-xs font-black text-black uppercase tracking-wider mb-2">Sources & References</h4>
            <ul className="space-y-1 text-xs">
              {dossier.sources.map((s, i) => (
                <li key={i}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-cyan-800 underline break-all">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
