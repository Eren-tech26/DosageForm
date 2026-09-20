import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  Globe,
  X,
  Lock,
  Unlock,
  Sparkles,
  Smartphone
} from 'lucide-react';
import {
  getCustomBaseUrl,
  setCustomBaseUrl,
  getEffectiveBaseUrl,
  analyzeUrlStatus
} from '../utils/pharmaQrEncoder';

interface VercelLoginGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelLoginGuideModal: React.FC<VercelLoginGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedSteps, setCopiedSteps] = useState(false);
  const [urlInput, setUrlInput] = useState(() => getCustomBaseUrl() || (typeof window !== 'undefined' ? window.location.origin : ''));
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const currentEffective = getEffectiveBaseUrl();
  const analysis = analyzeUrlStatus(currentEffective);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    let cleaned = urlInput.trim();
    if (cleaned && !cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
      cleaned = `https://${cleaned}`;
      setUrlInput(cleaned);
    }
    setCustomBaseUrl(cleaned);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleUseCurrent = () => {
    if (typeof window === 'undefined') return;
    const current = window.location.origin;
    setUrlInput(current);
    setCustomBaseUrl(current);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetDefault = () => {
    setCustomBaseUrl('');
    setUrlInput(typeof window !== 'undefined' ? window.location.origin : '');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const copyInstructions = () => {
    const text = `HOW TO FIX "LOG IN TO VERCEL" WHEN SCANNING PHARMAQR CODES:

1. Open Vercel Dashboard (https://vercel.com/dashboard) and click your "DosageForm" project.
2. Click the "Settings" tab at the top.
3. In the left navigation, click "Deployment Protection".
4. Under "Vercel Authentication", switch it to OFF (Disabled).
5. If Password Protection is on, switch that OFF as well.
6. Click "Save".
7. Make sure your QR codes use your official Production Domain (e.g., https://your-project.vercel.app), not a preview URL (-git-) or localhost.

Now anyone scanning the QR code can view the guide instantly without being prompted to log in!`;
    navigator.clipboard.writeText(text);
    setCopiedSteps(true);
    setTimeout(() => setCopiedSteps(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white border border-gray-200 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-amber-500 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 id="modal-title" className="text-lg sm:text-xl font-black tracking-tight leading-tight">
                Fix "Log In to Vercel" When Scanning
              </h2>
              <p className="text-xs text-amber-100 font-medium mt-0.5">
                Make your PharmaQR guide publicly scannable by anyone without login
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Quick Explanation */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1 leading-relaxed">
              <p className="font-bold">Why are people asked to log into Vercel?</p>
              <p className="text-gray-700">
                Vercel has an automatic security feature called <span className="font-semibold text-black">Deployment Protection (Vercel Authentication)</span>.
                When active, Vercel blocks anyone who isn't a logged-in member of your Vercel account.
                When classmates or teachers scan your QR code with their mobile phone, Vercel redirects them to a login page.
              </p>
            </div>
          </div>

          {/* Fix 1: Step-by-Step Vercel Dashboard */}
          <div className="border border-gray-200 rounded-2xl p-5 bg-white space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h3 className="text-sm font-black text-black uppercase tracking-wider">
                  Disable Vercel Authentication in Vercel Dashboard
                </h3>
              </div>
              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 hover:text-green-800 underline"
              >
                Open Vercel Dashboard <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <ol className="space-y-2.5 text-xs sm:text-sm text-gray-800 ml-2">
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-green-700 font-mono">1.1</span>
                <span>
                  Log into <strong>vercel.com</strong> and open your <strong>DosageForm</strong> project.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-green-700 font-mono">1.2</span>
                <span>
                  Click on the <strong>Settings</strong> tab at the top of the project.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-green-700 font-mono">1.3</span>
                <span>
                  In the left sidebar, click <strong>Deployment Protection</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-green-700 font-mono">1.4</span>
                <div>
                  Find <strong>Vercel Authentication</strong> and toggle it <strong>OFF / Disabled</strong>.
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    (If Password Protection is turned on, ensure it is set to OFF as well).
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-green-700 font-mono">1.5</span>
                <span>
                  Click the <strong>Save</strong> button at the bottom of the section.
                </span>
              </li>
            </ol>

            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-900 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
              <span>Result: The site is now completely public. Any phone scanning your QR code opens the guide directly without any login!</span>
            </div>
          </div>

          {/* Fix 2: Set Production QR Domain */}
          <div className="border border-gray-200 rounded-2xl p-5 bg-white space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs font-black flex items-center justify-center">
                2
              </span>
              <h3 className="text-sm font-black text-black uppercase tracking-wider">
                Ensure QR Encodes Your Public Production Domain
              </h3>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed">
              If you generated or printed the QR code while looking at a <strong>preview URL</strong> (e.g. <code className="bg-gray-100 px-1 py-0.5 rounded text-black font-mono text-[11px]">...-git-main...vercel.app</code>) or <code className="bg-gray-100 px-1 py-0.5 rounded text-black font-mono text-[11px]">localhost</code>, the QR code encodes that private address.
              Enter your public production domain below to ensure all QR codes use your permanent public address.
            </p>

            <form onSubmit={handleSaveUrl} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>QR Target Base URL</span>
                  {analysis.hasCustomUrl && (
                    <span className="text-[11px] text-green-700 font-semibold">Custom URL Active</span>
                  )}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://dosageform.vercel.app"
                      className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-hidden text-black"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" /> Save Domain
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleUseCurrent}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Use Current Domain
                </button>
                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Reset to Auto-Detect
                </button>
                {savedSuccess && (
                  <span className="text-xs font-bold text-green-700 flex items-center gap-1 animate-pulse">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Updated all 12 QR codes!
                  </span>
                )}
              </div>
            </form>

            {/* Target URL Preview & Analysis */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700">Currently Encoded QR URL Example:</span>
                {analysis.isVercelPreview ? (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded text-[10px] font-bold">
                    ⚠️ Preview Domain
                  </span>
                ) : analysis.isLocal ? (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded text-[10px] font-bold">
                    ⚠️ Localhost
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 border border-green-300 rounded text-[10px] font-bold flex items-center gap-1">
                    <Unlock className="w-3 h-3" /> Public Ready
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-green-800 bg-white border border-gray-200 rounded-lg p-2 break-all select-all">
                {currentEffective}?form=TABLETS
              </p>
              {analysis.warningMessage && (
                <p className="text-xs text-amber-700 font-medium">
                  {analysis.warningMessage}
                </p>
              )}
            </div>
          </div>

          {/* Verification checklist */}
          <div className="border border-gray-200 rounded-2xl p-5 bg-white space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-green-700" />
              <h4 className="text-xs font-black text-black uppercase tracking-wider">
                How to Verify It Works on Any Phone
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-green-700">✓</span>
                <span>Open an <strong>Incognito / Private</strong> browser window on your smartphone.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-green-700">✓</span>
                <span>Point your phone camera at the QR code on screen or printed label.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-green-700">✓</span>
                <span>The PharmaQR dosage form guide will open immediately with no login screen!</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={copyInstructions}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            {copiedSteps ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gray-600" />
                <span>Copy Instructions</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Got It / Close
          </button>
        </div>
      </div>
    </div>
  );
};
