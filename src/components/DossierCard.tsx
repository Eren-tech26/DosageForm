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
  ShieldAlert,
  Globe
} from 'lucide-react';
import {
  buildFormUrl,
  generateQrDataUrl,
  downloadQrImage,
  useQrBaseUrl,
  analyzeUrlStatus
} from '../utils/pharmaQrEncoder';
import { VercelLoginGuideModal } from './VercelLoginGuideModal';

interface DossierCardProps {
  dossier: PharmacyDossier;
  highlightScanned?: boolean;
  showQr?: boolean;
}

export const DossierCard: React.FC<DossierCardProps> = ({
  dossier,
  highlightScanned = false,
  showQr = true
}) => {
  const [qrUrl, setQrUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isVercelModalOpen, setIsVercelModalOpen] = useState(false);
  const [baseUrl] = useQrBaseUrl();

  const formUrl = buildFormUrl(dossier.category, baseUrl);
  const urlStatus = analyzeUrlStatus(formUrl);

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

  const handleDownloadQr = () => {
    if (!qrUrl) return;
    const safeName = dossier.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    downloadQrImage(qrUrl, `pharmaqr-${safeName}.png`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="border-b-2 border-green-600 px-6 py-5 bg-white">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-1 bg-green-600 text-white rounded-lg text-xs font-bold uppercase tracking-wide">
            Pharmacy Student Guide
          </span>
          <span className="px-2.5 py-1 bg-green-50 text-green-800 border border-green-200 rounded-lg text-xs font-semibold">
            {dossier.categoryTag}
          </span>
          {highlightScanned && (
            <span className="px-2.5 py-1 bg-green-600 text-white rounded-lg text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Opened from QR Scan
            </span>
          )}
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-black tracking-tight">
          {dossier.category}
        </h3>
        <p className="text-sm text-gray-700 mt-2 leading-relaxed max-w-4xl">
          {dossier.definition}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Image (+ fixed QR only when browsing, never on a scanned view) */}
        {showQr ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Standard pharmacy image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <img
                  src={dossier.image}
                  alt={dossier.category}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                <span className="font-bold text-black">Visual: </span>
                {dossier.imageCaption}
              </p>
            </div>

            {/* Fixed QR code that opens this exact form's guide */}
            <div className="lg:col-span-7 bg-green-50/50 border border-green-200 rounded-xl p-5 flex flex-col justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="bg-white p-3 rounded-xl border border-green-200 shadow-sm shrink-0 flex flex-col items-center">
                  {qrUrl ? (
                    <img
                      src={qrUrl}
                      alt={`Scan to open ${dossier.category} guide`}
                      className="w-36 h-36 sm:w-40 sm:h-40 object-contain"
                    />
                  ) : (
                    <div className="w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center text-gray-400 text-xs">
                      Loading…
                    </div>
                  )}
                  {/* Download QR button under the image */}
                  <button
                    onClick={handleDownloadQr}
                    disabled={!qrUrl}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer w-full justify-center"
                    title="Download 600x600 high-res PNG for print/chart"
                  >
                    <Download className="w-3 h-3" />
                    Download PNG
                  </button>
                </div>

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <QrCode className="w-4 h-4 text-green-700" />
                    <h4 className="text-sm font-black text-black uppercase tracking-wide">
                      Fixed QR — Scan to Open This Guide
                    </h4>
                  </div>
                  <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                    This is the permanent QR code for <span className="font-bold text-green-800">{dossier.category}</span>.
                    Scanning it redirects straight to this dosage form's Student Guide.
                  </p>

                  <div className="mt-2.5 p-2 bg-white rounded-lg border border-gray-200 flex items-center justify-between gap-2">
                    <p className="text-[11px] text-gray-600 font-mono truncate select-all">
                      {formUrl}
                    </p>
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
                      title="Copy URL"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-green-600" />
                          <span className="text-green-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Warning / Status banner regarding Vercel login */}
                  {urlStatus.isVercelPreview || urlStatus.isLocal ? (
                    <div className="mt-3 bg-amber-50 border border-amber-300 rounded-xl p-2.5 text-left text-xs">
                      <div className="flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="font-bold text-amber-900 leading-snug">
                            Vercel Login Warning
                          </p>
                          <p className="text-[11px] text-amber-800 mt-0.5 leading-tight">
                            Scanners may be asked to log in to Vercel on preview or local URLs.
                          </p>
                          <button
                            onClick={() => setIsVercelModalOpen(true)}
                            className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 underline hover:text-black cursor-pointer"
                          >
                            🛠️ Fix Vercel Login / Set Production Domain
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-green-200/60">
                      <span className="text-[11px] text-green-800 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        Publicly Scannable QR
                      </span>
                      <button
                        onClick={() => setIsVercelModalOpen(true)}
                        className="inline-flex items-center gap-1 text-[11px] text-gray-600 hover:text-black font-semibold underline cursor-pointer"
                      >
                        <Globe className="w-3 h-3 text-gray-500" />
                        Target Domain Settings
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Scanned view: image only, no QR */
          <div>
            <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <img
                src={dossier.image}
                alt={dossier.category}
                className="w-full h-56 sm:h-72 object-cover"
              />
            </div>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              <span className="font-bold text-black">Visual: </span>
              {dossier.imageCaption}
            </p>
          </div>
        )}

        {/* Classification + Routes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-xl p-5">
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

          <div className="border border-gray-200 rounded-xl p-5">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <TestTube className="w-4 h-4 text-green-700" />
              Common Excipients & Formulation
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

          <div className="border border-gray-200 rounded-xl p-5">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              Disadvantages & Precautions
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
              <div key={i} className="flex items-start gap-2 bg-green-50/60 border border-green-100 p-2.5 rounded-lg">
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
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-green-600 text-white rounded shrink-0">
                    {p.rxType}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-800">
                  <p><span className="font-bold text-black">Strength:</span> {p.strength}</p>
                  <p><span className="font-bold text-black">Route:</span> {p.route}</p>
                  <p><span className="font-bold text-black">Usage:</span> {p.instructions}</p>
                  <p><span className="font-bold text-black">Side Effects:</span> {p.sideEffects}</p>
                  <p><span className="font-bold text-black">Storage:</span> {p.storage}</p>
                  <p className="text-green-800 font-semibold pt-1 border-t border-gray-100">⚠ {p.warnings}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vercel Login Guide Modal */}
      <VercelLoginGuideModal
        isOpen={isVercelModalOpen}
        onClose={() => setIsVercelModalOpen(false)}
      />
    </div>
  );
};
