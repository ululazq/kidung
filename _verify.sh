#!/usr/bin/env bash
# Verifikasi bab hasil konversi gaya lantern. Pakai: bash _verify.sh 26 27 28
cd "C:/Users/MyBook Hype AMD/.openclaw/workspace/kidung" || exit 1
D="novels/the-unremembered-king"
for N in "$@"; do
  F="$D/chapter-$N.md"
  [ -f "$F" ] || { echo "ch$N: FILE TIDAK ADA"; continue; }
  node -e "
const fs=require('fs');
const t=fs.readFileSync('$F','utf8').replace(/\r\n/g,'\n');
const b=t.split('---').slice(2).join('---');
const kata=(b.match(/[^\s]+/g)||[]).length;
const m=[...b.matchAll(/[^.!?*]{25,}[.!?]/g)].map(x=>x[0].trim());
const dup=m.filter((v,i)=>m.indexOf(v)!==i);
const h1=b.split('\n').filter(l=>l.startsWith('#')).length;
const nb=(b.match(/\b(nggak|kayak|gitu|gini|udah|banget|cuma|bikin|pake|fihak|gak|biar)\b/g)||[]);
const sl=(b.match(/(bulan|tahun|hari) silang/g)||[]);
const bumi=(b.match(/\b(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu|gereja|nabi|iblis|maghrib|salat)\b/g)||[]);
const dlg=(b.match(/^\"/gm)||[]).length + (b.match(/\"[^\"]{3,}\"/g)||[]).length;
const band = kata>=1500 && kata<=2500;
const ok = band && dup.length===0 && h1===0 && nb.length===0 && sl.length===0 && bumi.length===0;
console.log('ch$N: '+kata+' kata | dup:'+dup.length+' | H1:'+h1+' | nonbaku:'+nb.length+(nb.length?'('+[...new Set(nb)].join(',')+')':'')+' | silang:'+sl.length+' | bumi:'+bumi.length+(bumi.length?'('+[...new Set(bumi)].join(',')+')':'')+' | dialog:'+dlg+' => '+(ok?'LULUS':'PERIKSA'));
if(dup.length) console.log('   DUP: '+dup.slice(0,3).join(' || '));
"
done
