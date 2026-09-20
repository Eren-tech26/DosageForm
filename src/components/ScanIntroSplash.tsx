import React, { useEffect, useState } from 'react';
import { QrCode, Pill, Wrench, ArrowRight } from 'lucide-react';

interface ScanIntroSplashProps {
  formName: string;
  itemType?: 'dosage' | 'equipment';
  onContinue: () => void;
  /** Auto-advance duration in ms. Default 2200. */
  autoAdvanceMs?: number;
}

/**
 * Full-screen white intro shown immediately after a QR code is scanned.
 * Displays the SVERI COBP emblem and PharmaQR branding on a clean white background,
 * then transitions smoothly into the selected guide.
 */
export const ScanIntroSplash: React.FC<ScanIntroSplashProps> = ({
  formName,
  itemType = 'dosage',
  onContinue,
  autoAdvanceMs = 2200
}) => {
  const [fadingOut, setFadingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Entrance animation frame
    const t = window.setTimeout(() => setMounted(true), 20);
    // Auto-advance
    const fadeTimer = window.setTimeout(() => setFadingOut(true), autoAdvanceMs);
    const doneTimer = window.setTimeout(() => onContinue(), autoAdvanceMs + 450);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [autoAdvanceMs, onContinue]);

  return (
    <div
      role="dialog"
      aria-live="polite"
      onClick={() => {
        setFadingOut(true);
        window.setTimeout(() => onContinue(), 300);
      }}
      className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-6 cursor-pointer transition-opacity duration-500 ${
        fadingOut ? 'opacity-0' : mounted ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Logo block */}
      <div
        className={`flex flex-col items-center transition-all duration-700 ease-out ${
          mounted ? 'scale-100 translate-y-0' : 'scale-90 translate-y-3'
        }`}
      >
        <div className="relative">
          {/* Subtle green glow behind logo */}
          <div
            className="absolute inset-0 rounded-[32px] blur-2xl opacity-30"
            style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)' }}
          />
          <img
            src="/images/sveri-cobp.png"
            alt="SVERI COBP"
            className="relative w-48 h-48 sm:w-56 sm:h-56 object-contain drop-shadow-xl"
          />
        </div>

        <h1 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight text-black text-center">
          Pharma<span className="text-green-600">QR</span>
        </h1>
        <p className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-green-700">
          {itemType === 'equipment' ? 'Laboratory Equipment SOP Guide' : 'Pharmaceutical Dosage Guide'}
        </p>

        {/* Loading/scanned indicator */}
        <div className="mt-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-full px-5 py-2.5">
          <QrCode className="w-4 h-4 text-green-700" />
          {itemType === 'equipment' ? (
            <Wrench className="w-4 h-4 text-green-700" />
          ) : (
            <Pill className="w-4 h-4 text-green-700" />
          )}
          <span className="text-xs sm:text-sm font-bold text-green-900">
            Opening <span className="text-black font-black">{formName}</span>…
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-5 w-56 sm:w-64 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-700 rounded-full origin-left"
            style={{
              animation: `pharmaqr-progress ${autoAdvanceMs}ms linear forwards`
            }}
          />
        </div>
      </div>

      {/* Footer hint */}
      <div
        className={`absolute bottom-8 flex items-center gap-2 text-xs text-gray-500 font-medium transition-opacity duration-500 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span>Tap anywhere to continue</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>

      <style>{`
        @keyframes pharmaqr-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};
