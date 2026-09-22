import { useCallback, useState } from 'react';
import { ArrowLeft, BookOpen, ShieldCheck, Thermometer, TriangleAlert } from 'lucide-react';
import { ScanIntroSplash } from './ScanIntroSplash';
import { DOSAGE_FORM_LIST } from '../data/dosageFormsData';

const manufacturerUrl = 'https://www.benchmarkscientific.com/product/h2200-h/';
const manualUrl = 'https://www.sigmaaldrich.com/deepweb/assets/sigmaaldrich/product/documents/352/399/z763314bul.pdf';
const microbiologyUrl = 'https://www.fda.gov/media/88801/download';

const specifications = [
  ['Example model', 'Benchmark Scientific myTemp™ Mini H2200-H'],
  ['Chamber capacity', '20 L (0.75 ft³)'],
  ['Temperature range', '5°C above room temperature to 60°C (heat-only model)'],
  ['Temperature accuracy', '0.5°C at 37°C (manufacturer specification)'],
  ['Temperature uniformity', '±1.5°C at 37°C'],
  ['Setting increments', '1°C'],
  ['Control & display', 'Digital temperature control with real-time LED chamber-temperature display'],
  ['Shelves & vessels', 'Two adjustable shelves; accommodates bottles and flasks up to 2 L'],
];

export function MiniIncubatorGuide() {
  const [showSplash, setShowSplash] = useState(true);
  const finishSplash = useCallback(() => setShowSplash(false), []);

  return (
    <>
      {showSplash && <ScanIntroSplash formName="Digital Mini Incubator" onContinue={finishSplash} />}
      <article hidden={showSplash} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <header className="border-b-2 border-green-600 p-5 sm:p-6">
          <div className="flex flex-wrap gap-2 mb-3 text-xs font-bold">
            <span className="px-3 py-1 rounded-lg bg-green-600 text-white">Pharmacy Microbiology</span>
            <span className="px-3 py-1 rounded-lg bg-green-50 text-green-800 border border-green-200">QR-linked equipment guide</span>
          </div>
          <div className="flex items-start gap-3">
            <Thermometer className="w-8 h-8 text-green-700 shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Digital Mini Incubator</h1>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                A compact, temperature-controlled laboratory chamber used to maintain samples at a selected
                temperature. In pharmacy microbiology, incubation supports the examination of microbial growth
                under the conditions specified by the test method. This is laboratory equipment, not a dosage form.{' '}
                <a href={microbiologyUrl} className="text-green-800 underline">[3]</a>
              </p>
            </div>
          </div>
        </header>

        <div className="p-5 sm:p-6 space-y-6 text-sm leading-relaxed text-gray-700">
          <section aria-labelledby="incubator-specifications">
            <h2 id="incubator-specifications" className="text-lg font-black text-black mb-3">Example instrument & specifications <a href={manufacturerUrl} className="text-green-800 underline text-sm">[1]</a></h2>
            <dl className="grid sm:grid-cols-2 gap-3">
              {specifications.map(([label, value]) => (
                <div key={label} className="bg-green-50/60 border border-green-100 rounded-xl p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-green-800">{label}</dt>
                  <dd className="mt-1 text-black font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs mt-3 text-gray-600">
              Specifications above follow the current manufacturer listing. Older manuals may list different
              ranges or uniformity values; check the manual supplied with your actual unit. The H2200-HC is a
              different, heating-and-cooling model. A heat-only unit cannot maintain temperatures below room
              temperature, and its minimum setpoint depends on the room temperature. <a href={manufacturerUrl} className="text-green-800 underline">[1]</a>{' '}
              <a href={manualUrl} className="text-green-800 underline">[2]</a>
            </p>
          </section>

          <section aria-labelledby="incubator-principle">
            <h2 id="incubator-principle" className="text-lg font-black text-black mb-2">Working principle <a href={manualUrl} className="text-green-800 underline text-sm">[2]</a></h2>
            <p>
              A temperature sensor and microprocessor controller monitor the chamber and control heating
              to approach the selected setpoint. The digital display shows chamber temperature.
              Allow the chamber to stabilize before use; the displayed temperature does not by itself prove
              that every sample position is within the required limits.
            </p>
          </section>

          <section aria-labelledby="incubator-uses">
            <h2 id="incubator-uses" className="flex items-center gap-2 text-lg font-black text-black mb-2"><BookOpen className="w-5 h-5 text-green-700" aria-hidden="true" /><span>Uses in pharmacy microbiology <a href={microbiologyUrl} className="text-green-800 underline text-sm">[3]</a></span></h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Teaching demonstrations of microbial growth using institution-approved organisms and supervised laboratory procedures.</li>
              <li>Incubation of media for microbial enumeration and growth-promotion testing, when the equipment meets the method’s requirements.</li>
              <li>Incubation of environmental-monitoring plates under an approved laboratory procedure.</li>
            </ul>
            <p className="mt-3 bg-green-50 border border-green-200 rounded-xl p-4">
              <strong className="text-green-900">Method matters:</strong> Pharmaceutical microbiology methods may
              specify different ranges, such as 30–35°C or 20–25°C, and different incubation periods. There is no
              universal temperature or time for all tests. A heat-only mini incubator may not achieve lower
              ranges in a warm room. Follow the applicable pharmacopoeial method and approved SOP; this example
              model is not an automatic endorsement for regulated QC or sterility testing.{' '}
              <a href={microbiologyUrl} className="text-green-800 underline">[3]</a>
            </p>
          </section>

          <section aria-labelledby="incubator-use">
            <h2 id="incubator-use" className="text-lg font-black text-black mb-2">General use checklist <a href={manualUrl} className="text-green-800 underline text-sm">[2]</a></h2>
            <p className="mb-2 text-xs">Study summary only — use the unit’s manual, your laboratory SOP and supervisor’s instructions.</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Place on a stable, level bench with the ventilation clearance specified by the manufacturer; check the power supply and chamber condition.</li>
              <li>Select the method-approved setpoint within the unit’s operating range and allow the chamber to stabilize.</li>
              <li>Verify temperature using the laboratory’s calibrated monitoring system. Record the equipment ID, temperature and relevant run details.</li>
              <li>Load labeled, appropriately closed sample containers without overcrowding; leave space for air circulation and close the door.</li>
              <li>Monitor and document incubation conditions according to the SOP. Minimize door opening and report temperature excursions.</li>
              <li>After use, remove samples using the required PPE and follow approved cleaning, decontamination and waste-disposal procedures.</li>
            </ol>
          </section>

          <aside className="rounded-xl border border-amber-200 bg-amber-50 p-4" aria-labelledby="incubator-safety">
            <h2 id="incubator-safety" className="flex items-center gap-2 font-black text-amber-950 mb-2"><TriangleAlert className="w-5 h-5 shrink-0" aria-hidden="true" />Precautions & limitations</h2>
            <ul className="list-disc pl-5 space-y-2 text-amber-950">
              <li>An incubator is not an autoclave or sterilizer. It does not make contaminated materials safe.</li>
              <li>It is not a biological safety cabinet and provides no operator containment. Handle cultures only in authorized laboratory conditions with appropriate biosafety controls.</li>
              <li>Do not assume CO₂, humidity control, data logging or alarms are provided. Verify the actual model and any required monitoring accessories.</li>
              <li>Do not place flammable or explosive materials inside. Disconnect power before cleaning; follow the manufacturer’s cleaning guidance. <a href={manualUrl} className="underline">[2]</a></li>
            </ul>
          </aside>

          <section aria-labelledby="incubator-quality">
            <h2 id="incubator-quality" className="flex items-center gap-2 text-lg font-black text-black mb-2"><ShieldCheck className="w-5 h-5 text-green-700" aria-hidden="true" />Quality checks to discuss in practicals</h2>
            <p>
              Check calibration status, temperature uniformity across sample positions, recovery after door opening,
              cleanliness, and run records. For regulated work, the laboratory must qualify the equipment for its
              intended use and define acceptance criteria, monitoring and excursion handling in its approved procedures.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-4" aria-labelledby="incubator-sources">
            <h2 id="incubator-sources" className="font-black text-black mb-2">Sources & further reading</h2>
            <ul className="space-y-2 text-xs break-words">
              <li><a href={manufacturerUrl} className="text-green-800 underline">[1] Benchmark Scientific — myTemp Mini H2200-H: current product specifications</a></li>
              <li><a href={manualUrl} className="text-green-800 underline">[2] MyTemp Digital Mini Incubators — H2200-H / H2200-HC instruction manual (PDF, hosted by Sigma-Aldrich)</a></li>
              <li><a href={microbiologyUrl} className="text-green-800 underline">[3] FDA — Pharmaceutical Microbiology Manual (PDF)</a></li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">Reviewed 20 September 2026. Educational overview, not a validated operating procedure.</p>
          </section>
          <a href={window.location.pathname} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2.5 rounded-xl print:hidden">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Browse All {DOSAGE_FORM_LIST.length} Dosage Forms
          </a>
        </div>
      </article>
    </>
  );
}
