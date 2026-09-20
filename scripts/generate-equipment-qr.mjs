import QRCode from 'qrcode';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const base = new URL(process.argv[2] || 'https://dosage-form.vercel.app/'); base.search=''; base.hash='';
const ids = ['digital-mini-incubator','hot-air-oven','tablet-friability-machine','ir-spectrophotometer','cyclone-separator','quartz-muffle-tray','ph-meter'];
const output = resolve('public/qr'); await mkdir(output,{recursive:true});
const options={errorCorrectionLevel:'H',margin:4,width:1200,color:{dark:'#000000',light:'#ffffff'}};
for (const id of ids) { const url=new URL(base); url.searchParams.set('equipment',id); await QRCode.toFile(resolve(output,`${id}.png`),url.href,options); await QRCode.toFile(resolve(output,`${id}.svg`),url.href,{...options,type:'svg'}); await writeFile(resolve(output,`${id}-url.txt`),url.href+'\n'); }
console.log(`Generated ${ids.length} permanent equipment QR codes in public/qr`);
