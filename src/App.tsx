import { DosageGuideSection } from './components/DosageGuideSection';
import { DeveloperInfoCard } from './components/DeveloperInfoCard';
import { getFormFromUrl } from './utils/pharmaQrEncoder';
import { DEVELOPER_INFO } from './data/developerInfo';
import { GraduationCap } from 'lucide-react';

export function App() {
  // If the page was opened by scanning a form QR (?form=...), skip the intro banner
  // and let the guide render that form's information immediately (after the splash).
  const scannedForm = getFormFromUrl();

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 h-16 sm:h-20">
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
        </div>
      </header>

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
            <span>12 Forms · Tablets, Capsules, Syrups, Injections, Ointments, Drops &amp; more</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 pt-2 border-t border-gray-100">
            <span className="font-black text-gray-700">Developed by {DEVELOPER_INFO.name}</span>
            <span className="text-gray-400">·</span>
            <span>{DEVELOPER_INFO.footerCredit}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
