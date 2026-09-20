import React from 'react';
import { BadgeCheck, Cake, Code, GraduationCap, Hash, Building2 } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/developerInfo';

const DETAIL_ITEMS = [
  {
    icon: GraduationCap,
    label: 'Course',
    value: `${DEVELOPER_INFO.year} ${DEVELOPER_INFO.program}`
  },
  { icon: Hash, label: 'Roll No.', value: DEVELOPER_INFO.rollNo },
  { icon: Cake, label: 'Age', value: `${DEVELOPER_INFO.age} years` },
  { icon: Code, label: 'Role', value: DEVELOPER_INFO.projectRole }
];

export const DeveloperInfoCard: React.FC = () => {
  return (
    <section
      id="developer"
      aria-label="Developer information"
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs"
    >
      {/* Header strip */}
      <div className="border-b-2 border-green-700 px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-2">
          <BadgeCheck className="w-4 h-4 text-green-700" />
          <h3 className="text-xs font-black uppercase tracking-wider text-black">
            Developer &amp; Academic Institution
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-green-100 text-green-900 border border-green-300 rounded-lg text-[11px] font-bold uppercase tracking-wide">
            SVERI COBP Pandharpur
          </span>
          <span className="px-2.5 py-1 bg-green-700 text-white rounded-lg text-[11px] font-bold uppercase tracking-wide">
            B. Pharm Student Project
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center gap-6">
        {/* College Emblem & Developer Name block */}
        <div className="flex items-center gap-4 lg:w-96 shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0 shadow-2xs">
            <img
              src="/images/sveri-cobp.png"
              alt="SVERI College of Pharmacy"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-green-700">
              Developed by
            </p>
            <h4 className="text-lg font-black text-black tracking-tight leading-tight break-words">
              {DEVELOPER_INFO.name}
            </h4>
            <p className="text-[11px] text-gray-600 mt-0.5 font-medium">
              {DEVELOPER_INFO.footerCredit}
            </p>
            <p className="text-[11px] text-gray-500 font-medium mt-0.5 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-green-700 shrink-0" />
              <span>SVERI&apos;s College of Pharmacy, Pandharpur</span>
            </p>
          </div>
        </div>

        {/* Details grid */}
        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DETAIL_ITEMS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 border border-gray-200 rounded-xl px-3.5 py-3 bg-gray-50/50"
            >
              <div className="p-2 rounded-lg bg-green-50 text-green-700 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {label}
                </p>
                <p className="text-xs font-black text-black truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <p className="text-xs text-gray-700 leading-relaxed border-l-2 border-green-700 pl-3 bg-green-50/30 py-2 rounded-r-lg">
          {DEVELOPER_INFO.note}
        </p>
      </div>
    </section>
  );
};

export default DeveloperInfoCard;
