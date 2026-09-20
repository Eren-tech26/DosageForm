import { useEffect, useState } from 'react';
import { QrCode, Wrench, ChevronRight } from 'lucide-react';
import QRCode from 'qrcode';
import { EQUIPMENT_LIST, EquipmentGuide } from '../data/equipmentData';
import { buildEquipmentUrl } from '../utils/equipmentQr';

function EquipmentDetail({ item }: { item: EquipmentGuide }) {
  const [qr, setQr] = useState('');
  useEffect(() => { QRCode.toDataURL(buildEquipmentUrl(item.id), { errorCorrectionLevel: 'H', margin: 2, width: 180 }).then(setQr); }, [item.id]);
  return <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
    <header className="border-b-2 border-green-600 p-5"><div className="flex items-start justify-between gap-4"><div><span className="text-xs font-bold px-3 py-1 rounded-lg bg-green-600 text-white">{item.category}</span><h2 className="text-2xl font-black mt-3">{item.name}</h2><p className="mt-2 text-sm text-gray-700 leading-relaxed">{item.definition}</p></div>{qr && <div className="hidden sm:block text-center shrink-0"><img src={qr} alt={`Permanent QR code for ${item.name}`} className="w-28 h-28"/><span className="text-[10px] font-bold text-gray-500">PERMANENT QR</span></div>}</div></header>
    <div className="p-5 space-y-5 text-sm text-gray-700"><section><h3 className="font-black text-black text-lg">Working principle</h3><p className="mt-1">{item.principle}</p></section><section><h3 className="font-black text-black text-lg mb-2">Key information</h3><dl className="grid sm:grid-cols-2 gap-3">{item.specifications.map(([a,b])=><div className="bg-green-50 border border-green-100 rounded-xl p-3" key={a}><dt className="text-xs uppercase font-bold text-green-800">{a}</dt><dd className="mt-1 text-black font-medium">{b}</dd></div>)}</dl></section><section><h3 className="font-black text-black text-lg mb-2">Uses in pharmacy</h3><ul className="list-disc pl-5 space-y-1">{item.uses.map(x=><li key={x}>{x}</li>)}</ul></section><section><h3 className="font-black text-black text-lg mb-2">Study operation</h3><ol className="list-decimal pl-5 space-y-1">{item.operation.map(x=><li key={x}>{x}</li>)}</ol></section><aside className="rounded-xl border border-amber-200 bg-amber-50 p-4"><h3 className="font-black text-amber-950 mb-1">Precautions</h3><ul className="list-disc pl-5 space-y-1 text-amber-950">{item.precautions.map(x=><li key={x}>{x}</li>)}</ul></aside></div>
  </article>;
}

export function EquipmentSection({ scannedId }: { scannedId?: string | null }) {
 const [active, setActive] = useState(scannedId || EQUIPMENT_LIST[0].id);
 const current = EQUIPMENT_LIST.find(x=>x.id===active) || EQUIPMENT_LIST[0];
 return <section className="space-y-4"><div className="bg-white border border-gray-200 rounded-2xl p-5"><h1 className="text-xl font-black flex items-center gap-2"><Wrench className="text-green-700"/> Pharmacy Equipment</h1><p className="text-sm text-gray-600 mt-1">Six instruments with permanent QR links and practical study information. Scan any QR to open that instrument directly.</p></div><div className="grid lg:grid-cols-12 gap-5"><nav className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-3 h-fit">{EQUIPMENT_LIST.map(x=><button key={x.id} onClick={()=>setActive(x.id)} className={`w-full text-left p-3 rounded-xl flex items-center justify-between mb-1 border ${active===x.id?'bg-green-600 text-white border-green-600':'border-gray-200 hover:bg-green-50 text-black'}`}><span><b className="block text-sm">{x.name}</b><small className={active===x.id?'text-green-50':'text-gray-500'}>{x.category}</small></span><ChevronRight className="w-4"/></button>)}</nav><div className="lg:col-span-8"><EquipmentDetail item={current}/></div></div></section>;
}
