import { useState } from 'react';
import { DosageGuideSection } from './components/DosageGuideSection';
import { DeveloperInfoCard } from './components/DeveloperInfoCard';
import { getFormFromUrl, analyzeUrlStatus } from './utils/pharmaQrEncoder';
import { DEVELOPER_INFO } from './data/developerInfo';
import { VercelLoginGuideModal } from './components/VercelLoginGuideModal';
import { GraduationCap, ShieldAlert, X } from 'lucide-react';

export function App() {
  // If the page was opened by scanning a form QR (?form=...), skip the intro banner
  // and let the guide render that form's information immediately (after the splash).
  const scannedForm = getFormFromUrl();
  const [isVercelModalOpen, setIsVercelModalOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const status = analyzeUrlStatus();
  // Show prompt if user is in a preview environment, localhost, or hasn't dismissed it
  const showBanner = !scannedForm && !bannerDismissed && (status.isVercelPreview || status.isLocal || status.isAnyVercel);

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-green-600 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="PharmaQR"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-sm shrink-0"
              />
              <div>
                <span className="text-lg sm:text-xl font-black tracking-tight text-black leading-tight block">
                  Pharma<span className="text-green-600">QR</span> Student Guide
                </span>
                <p className="text-[11px] sm:text-xs text-gray-600 font-medium">
                  Pharmaceutical Dosage Forms — Scan &amp; Study
                </p>
              </div>
            </div>

            {/* Vercel Login Solution Help Button in Header */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsVercelModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                title="Click if scanners are prompted with 'Log in to Vercel'"
              >
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="hidden sm:inline">Fix "Log in to Vercel" on Scan</span>
                <span className="sm:hidden">Fix Vercel Login</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Vercel Authentication Alert Banner */}
      {showBanner && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-900">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Scanners asked to log in to Vercel?</strong> Turn OFF <em>Vercel Authentication</em> in your Vercel Project Settings so anyone can scan without logging in.
              </span>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={() => setIsVercelModalOpen(true)}
                className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
              >
                View 1-Min Solution
              </button>
              <button
                onClick={() => setBannerDismissed(true)}
                className="p-1 text-amber-700 hover:text-amber-900 rounded-md cursor-pointer"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {!scannedForm && (
          <div className="mb-6 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-600 flex items-center justify-center text-white shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-black tracking-tight">
                Pharmaceutical Dosage Form Study Guide — 12 Categories
              </h1>
              <p className="text-xs sm:text-sm text-gray-700 mt-1 max-w-3xl">
                Browse any dosage form, or scan its fixed QR code to jump straight to its information. Scanning the
                Tablets QR opens the full Tablets guide; scanning Injections opens Injections.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <DosageGuideSection />

          {/* Developer credit */}
          <DeveloperInfoCard />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white py-5 text-xs text-gray-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              <span className="font-black text-green-700">PharmaQR</span> · Pharmacy Student Dosage Form Guide
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsVercelModalOpen(true)}
                className="text-amber-700 hover:text-amber-800 font-bold underline cursor-pointer"
              >
                Vercel Login Fix Guide
              </button>
              <span>·</span>
              <span>12 Forms · Tablets, Capsules, Syrups, Injections &amp; more</span>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 pt-2 border-t border-gray-100">
            <span className="font-black text-gray-700">Developed by {DEVELOPER_INFO.name}</span>
            <span className="text-gray-400">·</span>
            <span>{DEVELOPER_INFO.footerCredit}</span>
          </div>
        </div>
      </footer>

      {/* Vercel Login Solution Modal */}
      <VercelLoginGuideModal
        isOpen={isVercelModalOpen}
        onClose={() => setIsVercelModalOpen(false)}
      />
    </div>
  );
}

export default App;
