#!/usr/bin/env node
/**
 * Audit kontinuitas per arc (mode serial panjang) + gate pre-commit.
 *
 * Membandingkan bab satu arc dengan world-state.md dan menghasilkan daftar
 * DRIFT POTENSIAL — kandidat inkonsistensi yang butuh konfirmasi manusia,
 * bukan vonis otomatis. Tidak mengubah bab/world-state satu baris pun.
 *
 *   npm run novel:audit -- <slug> [--arc N] [--report] [--summary]
 *   npm run novel:audit -- <slug> --accept <ID> [--reason "..."]
 *   npm run novel:audit -- <slug> --accept-all [--arc N] [--reason "..."]
 *   npm run novel:audit -- --gate
 *
 *   --arc N      audit arc N (default: arc yang menaungi bab terakhir di disk)
 *   --report     tulis temuan ke novels/<slug>/drift-report.md (tetap dicetak)
 *   --summary    cetak RINGKASAN saja: hitungan per kategori + temuan
 *                level/entitas yang belum ditinjau (yang memblokir commit).
 *                Ringkas, untuk cek cepat di tengah sesi menulis.
 *   --accept ID  tandai temuan itu "sudah ditinjau": tambahkan baris ke
 *                novels/<slug>/audit-review.md (wajib ID temuan yang nyata)
 *   --accept-all tandai SEMUA temuan level/entitas arc ini "sudah ditinjau"
 *                dengan satu alasan. Hanya untuk keputusan sadar menyeluruh
 *                (mis. seluruh arc sengaja ditulis sebagai twist) — untuk
 *                alasan yang berbeda-beda, pakai --accept <ID> satu per satu.
 *                Temuan yang sudah ditinjau dilewati (tidak diduplikasi).
 *   --reason     alasan keputusan untuk baris review (opsional)
 *   --gate       mode gate: audit novel serial, gagal (exit 1) bila ada
 *                temuan level/entitas yang belum ditinjau di audit-review.md.
 *                Dengan <slug> = gate satu novel (dipakai novel:publish);
 *                tanpa slug = semua novel serial (pre-commit / CI). Hanya
 *                dua kategori itu yang menggagalkan — sisanya (tokoh hilang,
 *                item, chekhov) tetap pertanyaan.
 *
 * Cek yang dijalankan per arc (semua = kandidat, bukan error):
 *   1. Tokoh di world-state yang tidak muncul di arc (entri basi / dilupakan)
 *   2. Tokoh berstatus mati/tewas/gugur yang muncul lagi (kontradiksi)
 *   3. Level LitRPG yang disebut di bab ≠ level di world-state
 *   4. Entitas bernama yang muncul berulang di arc tapi tidak tercatat di
 *      world-state — kandidat tambahan tabel Tokoh (yang hanya di bible
 *      ditandai berbeda: "ada di kanon tapi belum di memori kerja")
 *   5. Item & aset di world-state yang tidak muncul di arc
 *   6. Chekhov yang dijadwalkan tembak di arc ini tapi tidak muncul,
 *      atau yang jadwal tembaknya sudah lewat tanpa pernah muncul
 *   7. Konteks: header world-state basi, status arc di arcs.md, bab yang
 *      belum ditulis di dalam rentang arc
 *
 * Exit code 0 untuk laporan biasa; 1 pada kesalahan pemakaian atau (mode
 * --gate) bila ada temuan level/entitas yang belum ditinjau.
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const NOVELS_DIR = "novels";

// --- Argumen CLI ---
const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : null;
};
// Slug = argumen posisi 2 bila bukan flag (--accept-all, --gate, dsb. di
// posisi 2 berarti pemakaian tanpa slug — mode gate / pesan pemakaian).
const slug = process.argv[2] && !process.argv[2].startsWith("-") ? process.argv[2] : undefined;
const arcArg = arg("--arc") ? parseInt(arg("--arc"), 10) : null;
const REPORT = process.argv.includes("--report");
const SUMMARY = process.argv.includes("--summary");
const GATE = process.argv.includes("--gate");
const ACCEPT = arg("--accept");
const ACCEPT_ALL = process.argv.includes("--accept-all");
const REASON = arg("--reason") || "";

// ---------------------------------------------------------------- helpers

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Isi bab tanpa frontmatter. */
function stripFrontmatter(text) {
  const m = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return m ? text.slice(m[0].length) : text;
}

function chapterNumber(file) {
  const m = file.match(/^chapter-(\d+)\.md$/);
  return m ? parseInt(m[1], 10) : Infinity;
}

/** Bab di disk, urut naik. */
function chaptersOnDisk(base) {
  return readdirSync(base)
    .filter((f) => /^chapter-\d+\.md$/.test(f))
    .map(chapterNumber)
    .sort((a, b) => a - b);
}

/**
 * Rentang bab per arc dari arcs.md — baris tabel kanonik:
 *   | 1 | 1–250 | Judul Arc | Tujuan | Keadaan akhir dunia | Planned |
 * Sama dengan check-novels.mjs. Mengembalikan [{num, start, end, status}].
 * Catatan: `((?:...){3})` — capturing group dengan quantifier langsung
 * (`(...){3}`) hanya menyimpan repetisi TERAKHIR.
 */
function parseArcs(text) {
  const arcs = [];
  for (const m of text.matchAll(/^\|\s*(\d+)\s*\|\s*(\d+)\s*[-–—]\s*(\d+)\s*\|((?:[^|\n]*\|){3})\s*([^|\n]+?)\s*\|$/gm)) {
    arcs.push({
      num: parseInt(m[1], 10),
      start: parseInt(m[2], 10),
      end: parseInt(m[3], 10),
      status: m[5].trim(),
    });
  }
  return arcs;
}

/** Belah konten per heading "## ". */
function sections(text) {
  const out = new Map();
  const re = /^##\s+(.+?)\s*$/gm;
  let last = null;
  let lastIdx = 0;
  for (const m of text.matchAll(re)) {
    if (last !== null) out.set(last, text.slice(lastIdx, m.index));
    last = m[1].trim();
    lastIdx = m.index + m[0].length;
  }
  if (last !== null) out.set(last, text.slice(lastIdx));
  return out;
}

/** Baris tabel markdown (baris pertama header dibuang). */
function parseTable(block) {
  const rows = [];
  for (const line of block.split("\n")) {
    const t = line.trim();
    if (!t.startsWith("|") || !t.endsWith("|")) continue;
    if (/^\|[\s:|-]+\|$/.test(t)) continue; // baris pemisah
    const cells = t.slice(1, -1).split("|").map((c) => c.trim());
    if (cells.every((c) => !c)) continue;
    rows.push(cells);
  }
  return rows.slice(1); // buang header
}

/** Kunci pencarian nama: nama penuh + kata terakhir (nama panggilan). */
function nameKeys(name) {
  const keys = [name.toLowerCase()];
  const words = name.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length > 1) keys.push(words[words.length - 1]);
  return keys;
}

/** true bila frasa/nama muncul di teks (multi-kata: pencarian literal; satu kata: batas kata). */
function phraseInText(phrase, text) {
  const p = phrase.toLowerCase().replace(/\s+/g, " ").trim();
  if (!p) return false;
  if (p.includes(" ")) return text.toLowerCase().includes(p);
  return new RegExp(`\\b${esc(p)}\\b`).test(text.toLowerCase());
}

/** Paragraf semua bab dalam rentang, dengan nomor bab. */
function arcParagraphs(base, start, end) {
  const paras = [];
  for (let n = start; n <= end; n++) {
    const p = join(base, `chapter-${n}.md`);
    if (!existsSync(p)) continue;
    const text = stripFrontmatter(readFileSync(p, "utf8"));
    for (const b of text.split(/\n\s*\n/)) {
      const t = b.replace(/\s+/g, " ").trim();
      if (t) paras.push({ ch: n, text: t });
    }
  }
  return paras;
}

/** Nomor level dari sel "Kekuatan/level" — null bila tidak ada. */
function extractLevel(cell) {
  if (!cell) return null;
  const m = cell.match(/level\s*[:=]?\s*(\d+)/i);
  if (m) return parseInt(m[1], 10);
  if (/^\d[\d\s.,]*$/.test(cell)) return parseInt(cell.replace(/[^\d]/g, ""), 10) || null;
  return null;
}

/** true bila sel status menandakan tokoh mati. */
function isDead(status) {
  return /(^|\W)(mati|meninggal|tewas|gugur|wafat|terbunuh|dead|deceased|killed)(\W|$)/i.test(status || "");
}

/** Apakah bab N sudah ditulis di disk? */
function isWritten(base, n) {
  return existsSync(join(base, `chapter-${n}.md`));
}

// Kata berawalan kapital yang bukan nama proper (tanggal, gelar, bahasa umum)
// — disaring dari kandidat entitas baru untuk mengurangi derau.
const STOPWORDS = new Set([
  "level", "lv", "tuan", "nona", "nyonya", "bapak", "ibu", "kapten", "master",
  "dokter", "profesor", "guru", "empu", "raja", "ratu", "pangeran", "putri",
  "nenek", "kakek", "pak", "bu", "mas", "mbak", "bang", "dek",
  "senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu",
  "januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus",
  "september", "oktober", "november", "desember",
  "indonesia", "nusantara",
]);

// ------------------------------------------------------- ID temuan (stabil)

// ID = huruf kategori + 6 digit hex hash FNV-1a dari (kategori|pesan). Stabil
// selama bab/world-state tidak berubah — itulah kunci penanda "ditinjau" di
// audit-review.md: ID yang sama = temuan yang sama di run berikutnya.
const CAT_LETTER = { konteks: "K", tokoh: "T", level: "L", entitas: "E", item: "I", chekhov: "C" };
function findingId(cat, msg) {
  let h = 0x811c9dc5;
  const s = `${cat}|${msg}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `${CAT_LETTER[cat]}-${h.toString(16).padStart(8, "0").slice(0, 6)}`;
}

// ------------------------------------------------------- konteks per novel

function loadNovel(slug) {
  const base = join(NOVELS_DIR, slug);
  if (!existsSync(base)) return { error: `novels/${slug}/ tidak ditemukan.` };
  const readmePath = join(base, "README.md");
  const serial = existsSync(readmePath) && /^serial:\s*true\s*$/m.test(readFileSync(readmePath, "utf8"));
  if (!serial) return { error: `"${slug}" bukan novel serial (README tidak memuat \`serial: true\`).` };
  const arcsPath = join(base, "arcs.md");
  const wsPath = join(base, "world-state.md");
  if (!existsSync(arcsPath) || !existsSync(wsPath)) {
    return { error: `novels/${slug}/ wajib punya arcs.md + world-state.md.` };
  }
  const wsText = readFileSync(wsPath, "utf8");
  const arcs = parseArcs(readFileSync(arcsPath, "utf8"));
  if (arcs.length === 0) {
    return { error: `arcs.md tidak memuat baris arc — format kontrak: | 1 | 1–250 | Judul | Tujuan | Keadaan akhir | Planned |` };
  }
  const onDisk = chaptersOnDisk(base);
  const biblePath = join(base, "bible.md");
  return {
    base,
    slug,
    arcs,
    onDisk,
    lastOnDisk: onDisk.length ? onDisk[onDisk.length - 1] : 0,
    wsText,
    wsSections: sections(wsText),
    wsLower: wsText.toLowerCase(),
    bibleLower: existsSync(biblePath) ? readFileSync(biblePath, "utf8").toLowerCase() : "",
  };
}

// ------------------------------------------------------- koleksi temuan

function collectFindings(arc, ctx) {
  const { base, wsText, wsSections, wsLower, bibleLower, onDisk, lastOnDisk } = ctx;
  const { num: arcNum, start: aStart, end: aEnd, status: arcStatus } = arc;
  const findings = [];
  const ok = (cat, msg) => findings.push({ level: "ok", cat, msg });
  const q = (cat, msg) => findings.push({ level: "?", cat, msg });
  const bang = (cat, msg) => findings.push({ level: "!", cat, msg });

  const paras = arcParagraphs(base, aStart, aEnd);
  const arcComplete = aEnd <= lastOnDisk && onDisk.filter((n) => n >= aStart && n <= aEnd).length === aEnd - aStart + 1;
  const missingInArc = [];
  for (let n = aStart; n <= aEnd; n++) if (!isWritten(base, n)) missingInArc.push(n);

  // --- 7. Konteks ---
  const wsHeader = wsText.match(/Terakhir diperbarui:\s*bab\s*(\d+)/i);
  const wsBab = wsHeader ? parseInt(wsHeader[1], 10) : null;
  if (wsBab !== null && wsBab >= aEnd) {
    ok("konteks", `world-state 'Terakhir diperbarui: bab ${wsBab}' sinkron dengan akhir arc ${arcNum} (bab ${aEnd})`);
  } else {
    q("konteks", `world-state 'Terakhir diperbarui: bab ${wsBab ?? "?"}' lebih awal dari akhir arc ${arcNum} (bab ${aEnd}) — temuan di bawah relatif terhadap state basi`);
  }
  const arcAktif = wsText.match(/^Arc aktif:\s*(.*)$/m)?.[1]?.trim() || "";
  if (arcAktif && !/^[-—–]?$/.test(arcAktif)) {
    ok("konteks", `world-state 'Arc aktif: ${arcAktif}'`);
  }
  if (arcComplete) {
    if (/^complete$/i.test(arcStatus)) {
      ok("konteks", `arc ${arcNum} (bab ${aStart}–${aEnd}) selesai di disk dan bertanda Complete di arcs.md`);
    } else {
      q("konteks", `arc ${arcNum} (bab ${aStart}–${aEnd}) selesai di disk tapi arcs.md masih '${arcStatus || "?"}' — tandai Complete?`);
    }
  } else if (missingInArc.length) {
    q("konteks", `arc ${arcNum} belum lengkap — bab ${missingInArc.join(", ")} belum ditulis`);
  } else {
    ok("konteks", `arc ${arcNum} (bab ${aStart}–${aEnd}) sedang berjalan (status arcs.md: ${arcStatus || "?"})`);
  }

  // --- 1–3. Tabel Tokoh ---
  const tokohRows = parseTable(wsSections.get("Tokoh") || "");

  for (const row of tokohRows) {
    const [name, status, , power] = row;
    const keys = nameKeys(name);
    const hits = paras.filter((p) => keys.some((k) => phraseInText(k, p.text)));
    const chs = [...new Set(hits.map((p) => p.ch))].sort((a, b) => a - b);

    if (hits.length === 0) {
      q("tokoh", `"${name}" tidak muncul sekali pun di arc ${arcNum} (bab ${aStart}–${aEnd}) — entri basi atau tokoh dilupakan?`);
      continue;
    }

    if (isDead(status) && hits.length >= 2) {
      bang("tokoh", `"${name}" berstatus "${status}" tapi muncul di ${hits.length} paragraf (bab ${chs.join(", ")}) — kontradiksi?`);
    }

    const wsLevel = extractLevel(power);
    if (wsLevel !== null) {
      const seen = new Map(); // level -> Set(bab)
      for (const p of hits) {
        // Level hanya dihitung bila nama tokoh ADA di kalimat yang sama —
        // kalau hanya segaris dalam paragraf bisa level milik tokoh lain.
        for (const sent of p.text.split(/(?<=[.!?])\s+/)) {
          if (!keys.some((k) => phraseInText(k, sent))) continue;
          for (const m of sent.matchAll(/\blevel\s*[:=]?\s*(\d+)\s*/gi)) {
            const lv = parseInt(m[1], 10);
            if (!seen.has(lv)) seen.set(lv, new Set());
            seen.get(lv).add(p.ch);
          }
        }
      }
      for (const [lv, lchs] of seen) {
        if (lv !== wsLevel) {
          q("level", `"${name}" disebut Level ${lv} di bab ${[...lchs].sort((a, b) => a - b).join(", ")} — world-state mencatat ${power} (${wsLevel})`);
        }
      }
    }
  }

  // --- 4. Entitas baru (kandidat belum tercatat) ---
  // Kata kapital di tengah kalimat = kandidat nama proper (di bahasa Indonesia
  // kata umum di tengah kalimat tidak kapital). Rangkaian kata kapital (mis.
  // "Menara Kelam") ditangkap sebagai SATU kandidat agar tidak terpecah.
  const tokenCount = new Map(); // token -> {count, chs:Set}
  for (const p of paras) {
    const re = /\b([A-Z][a-zà-öø-ÿ]+(?:['’-][A-Za-z]+)?(?:\s+[A-Z][a-zà-öø-ÿ]+){0,2})\b/g;
    let m;
    while ((m = re.exec(p.text))) {
      // Sentence-start? Karakter bukan-spasi sebelumnya termasuk tanda akhir kalimat.
      let i = m.index - 1;
      while (i >= 0 && /\s/.test(p.text[i])) i--;
      if (i < 0 || /[.!?:"“”„;—–]/.test(p.text[i])) continue;
      const tok = m[1].toLowerCase().replace(/\s+/g, " ");
      const first = tok.split(" ")[0];
      if (STOPWORDS.has(first)) continue; // gelar "Master Alistair" → lewati
      if (!tokenCount.has(tok)) tokenCount.set(tok, { count: 0, chs: new Set() });
      const rec = tokenCount.get(tok);
      rec.count++;
      rec.chs.add(p.ch);
    }
  }

  const newEntities = [];
  for (const [tok, rec] of tokenCount) {
    if (rec.count < 2) continue;
    if (new RegExp(`\\b${esc(tok)}\\b`).test(wsLower)) continue; // sudah tercatat
    newEntities.push({ tok, count: rec.count, chs: [...rec.chs].sort((a, b) => a - b), inBible: new RegExp(`\\b${esc(tok)}\\b`).test(bibleLower) });
  }
  newEntities.sort((a, b) => b.count - a.count || a.tok.localeCompare(b.tok));
  for (const e of newEntities.slice(0, 15)) {
    const pretty = e.tok.split(" ").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
    if (e.inBible) {
      q("entitas", `"${pretty}" (${e.count}×, bab ${e.chs.join(", ")}) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh?`);
    } else {
      q("entitas", `"${pretty}" (${e.count}×, bab ${e.chs.join(", ")}) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track?`);
    }
  }
  if (newEntities.length > 15) {
    q("entitas", `… dan ${newEntities.length - 15} kandidat lain — periksa dulu yang di atas sebelum melanjutkan`);
  }

  // --- 5. Item & aset ---
  for (const row of parseTable(wsSections.get("Item & aset") || "")) {
    const [item, holder, status, muncul] = row;
    const inArc = paras.some((p) => phraseInText(item, p.text));
    if (!inArc) {
      q("item", `Item "${item}" (pemegang ${holder || "?"}, status ${status || "?"}) tidak muncul di arc ${arcNum} — masih dipegang siapa? Hapus barisnya bila sudah keluar cerita.`);
    }
  }

  // --- 6. Chekhov ---
  const chekhovRows = parseTable(wsSections.get("Chekhov belum ditembak") || "");
  for (const row of chekhovRows) {
    const [plantedRaw, what, whenRaw] = row;
    const planted = parseInt(plantedRaw, 10);
    const when = parseInt(whenRaw, 10);
    if (!what) continue;
    const inArc = paras.some((p) => phraseInText(what, p.text));
    if (Number.isInteger(when) && when === arcNum && arcComplete && !inArc) {
      q("chekhov", `Chekhov "${what}" (ditanam bab ${planted}) dijadwalkan tembak arc ${arcNum} tapi tidak muncul di arc ini — gantung selamanya?`);
    } else if (Number.isInteger(when) && when < arcNum && !inArc) {
      q("chekhov", `Chekhov "${what}" (ditanam bab ${planted}) lewat jadwal tembaknya (arc ${when} < arc ${arcNum}) dan tidak pernah muncul — masih relevan atau hapus barisnya?`);
    }
  }

  for (const f of findings) f.id = findingId(f.cat, f.msg);
  return findings;
}

// ------------------------------------------------------- file review

function reviewPath(slug) {
  return join(NOVELS_DIR, slug, "audit-review.md");
}

/** Set ID temuan yang sudah ditinjau dari audit-review.md. */
function readReviewedIds(slug) {
  const p = reviewPath(slug);
  if (!existsSync(p)) return new Set();
  const ids = new Set();
  for (const m of readFileSync(p, "utf8").matchAll(/^\|\s*([A-Z]-[0-9a-f]{6})\s*\|/gm)) {
    ids.add(m[1]);
  }
  return ids;
}

/** Tambah baris review (buat file bila belum ada). */
function addReviewRow(slug, id, cat, msg, reason) {
  const p = reviewPath(slug);
  const catName = { K: "konteks", T: "tokoh", L: "level", E: "entitas", I: "item", C: "chekhov" }[id[0]] || cat;
  const row = `| ${id} | ${catName} | ${msg.replace(/\|/g, "\\|")} | ${(reason || "diterima — ditinjau manual").replace(/\|/g, "\\|")} |`;
  if (!existsSync(p)) {
    writeFileSync(
      p,
      `# Audit Review: ${slug}\n\nTemuan audit drift (\`npm run novel:audit\`) yang sudah ditinjau penulis. Baris di\nsini mengizinkan commit meski audit masih menemukan drift — gunakan untuk\nkeputusan sadar (\"twist sengaja\", \"akan diperbaiki arc berikutnya\"). Hapus\nbarisnya setelah temuan benar-benar diperbaiki (catatan basi = peringatan).\n\n| ID | Kategori | Temuan | Keputusan |\n|---|---|---|---|\n${row}\n`,
    );
  } else {
    const text = readFileSync(p, "utf8");
    // Sisipkan sebelum baris tabel terakhir agar tetap di dalam tabel.
    const lines = text.split("\n");
    let idx = lines.length;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (/^\|\s*[A-Z]-[0-9a-f]{6}\s*\|/.test(lines[i])) { idx = i + 1; break; }
    }
    if (lines.length && !lines[lines.length - 1].trim()) idx = Math.max(0, idx - 1);
    lines.splice(idx, 0, row);
    writeFileSync(p, lines.join("\n"));
  }
}

// ------------------------------------------------------- mode laporan

/**
 * Resolusi arc yang akan diaudit: --arc N eksplisit, atau (default) arc yang
 * menaungi bab terakhir di disk. Dipakai runReport / runAccept / runAcceptAll.
 */
function resolveArc(ctx) {
  const { arcs, lastOnDisk } = ctx;
  if (arcArg !== null) {
    const arc = arcs.find((a) => a.num === arcArg);
    if (!arc) {
      console.error(`Arc ${arcArg} tidak ada di arcs.md (terdaftar: ${arcs.map((a) => a.num).join(", ")}).`);
      process.exit(1);
    }
    return arc;
  }
  const arc = arcs.find((a) => lastOnDisk >= a.start && lastOnDisk <= a.end);
  if (!arc) {
    console.error(`Bab terakhir di disk (${lastOnDisk || "tidak ada"}) di luar semua rentang arcs.md — tentukan --arc N secara eksplisit.`);
    process.exit(1);
  }
  return arc;
}

function runReport() {
  if (!slug) {
    console.error("Pakai: npm run novel:audit -- <slug> [--arc N] [--report]");
    process.exit(1);
  }
  const ctx = loadNovel(slug);
  if (ctx.error) {
    console.error(ctx.error);
    process.exit(1);
  }
  const arc = resolveArc(ctx);

  const findings = collectFindings(arc, ctx);
  const { num: arcNum, start: aStart, end: aEnd } = arc;

  const label = { ok: "✓", "?": "?", "!": "!" };
  const cats = ["konteks", "tokoh", "level", "entitas", "item", "chekhov"];
  const catTitle = {
    konteks: "Konteks",
    tokoh: "Tokoh (world-state vs arc)",
    level: "Level (LitRPG)",
    entitas: "Entitas baru (kandidat belum tercatat)",
    item: "Item & aset",
    chekhov: "Chekhov",
  };
  const body = [];
  for (const c of cats) {
    const group = findings.filter((f) => f.cat === c);
    if (group.length === 0) continue;
    body.push(`### ${catTitle[c]}`);
    for (const f of group) {
      const line = `${label[f.level]} [${f.id}] ${f.msg}`;
      body.push(`- ${line}`);
    }
    body.push("");
  }

  const nQ = findings.filter((f) => f.level === "?").length;
  const nBang = findings.filter((f) => f.level === "!").length;

  if (SUMMARY) {
    printSummary(ctx, arc, findings);
  } else {
    console.log(`\n=== Audit kontinuitas arc ${arcNum} — ${slug} (bab ${aStart}–${aEnd}) ===\n`);
    for (const c of cats) {
      const group = findings.filter((f) => f.cat === c);
      if (group.length === 0) continue;
      console.log(`### ${catTitle[c]}`);
      for (const f of group) console.log(`  ${label[f.level]} [${f.id}] ${f.msg}`);
      console.log("");
    }
    console.log(`Ringkasan: ${nBang} kontradiksi kandidat, ${nQ} drift potensial, ${findings.filter((f) => f.level === "ok").length} konfirmasi konsisten.`);
    console.log("Laporan = pertanyaan, bukan vonis — konfirmasi manual sebelum memperbaiki world-state.md.");
    console.log(`Tandai temuan yang memang disengaja: npm run novel:audit -- ${slug} --accept <ID> --reason \"...\"\n`);
  }

  if (REPORT) {
    const lines = [
      `# Drift Report: ${slug}`,
      "",
      `Otomatis dari \`scripts/audit-arc.mjs\` · ${new Date().toISOString().slice(0, 10)}`,
      `Cakupan: arc ${arcNum} (bab ${aStart}–${aEnd}) — ${nBang} kontradiksi kandidat, ${nQ} drift potensial.`,
      "",
      ...body,
      "Laporan = pertanyaan, bukan vonis. Konfirmasi manual, lalu perbaiki world-state.md / bab.",
      "",
    ];
    writeFileSync(join(ctx.base, "drift-report.md"), lines.join("\n"));
    console.log(`✓ Ditulis ke novels/${slug}/drift-report.md`);
  }
}

/**
 * Cetak RINGKASAN audit — untuk cek cepat di tengah sesi menulis
 * (workflows/continue-writing.md). Satu angka per kategori + daftar temuan
 * level/entitas yang BELUM ditinjau (yang memblokir commit/publish).
 */
function printSummary(ctx, arc, findings) {
  const { slug, lastOnDisk, wsText } = ctx;
  const { num: arcNum, start: aStart, end: aEnd, status } = arc;
  const cats = ["konteks", "tokoh", "level", "entitas", "item", "chekhov"];
  const catShort = { konteks: "Konteks", tokoh: "Tokoh", level: "Level", entitas: "Entitas", item: "Item", chekhov: "Chekhov" };

  const wsHeader = wsText.match(/Terakhir diperbarui:\s*bab\s*(\d+)/i);
  const wsBab = wsHeader ? parseInt(wsHeader[1], 10) : null;
  const stale = wsBab !== null && wsBab < lastOnDisk ? ` — world-state basi (bab ${wsBab}, disk sudah ${lastOnDisk})` : "";

  console.log(`\n=== Audit drift — ${slug} · arc ${arcNum} (bab ${aStart}–${aEnd}) ===`);
  console.log(`Status arc: ${status || "?"} · bab di disk: ${lastOnDisk} · world-state: bab ${wsBab ?? "?"}${stale}\n`);

  console.log("Kategori      ✓  ?  !");
  for (const c of cats) {
    const g = findings.filter((f) => f.cat === c);
    if (g.length === 0) continue;
    const ok = g.filter((f) => f.level === "ok").length;
    const q = g.filter((f) => f.level === "?").length;
    const bang = g.filter((f) => f.level === "!").length;
    console.log(`  ${catShort[c].padEnd(10)} ${ok}  ${q}  ${bang}`);
  }
  const nOk = findings.filter((f) => f.level === "ok").length;
  const nQ = findings.filter((f) => f.level === "?").length;
  const nBang = findings.filter((f) => f.level === "!").length;
  console.log(`  ${("Total").padEnd(10)} ${nOk}  ${nQ}  ${nBang}\n`);

  const reviewed = readReviewedIds(slug);
  const blockers = findings.filter((f) => (f.cat === "level" || f.cat === "entitas") && !reviewed.has(f.id));
  if (blockers.length) {
    console.log(`⚠ ${blockers.length} temuan level/entitas BELUM ditinjau — blokir commit/publish:`);
    for (const f of blockers) console.log(`   ${f.id}  ${f.msg}`);
    console.log(`Tinjau: npm run novel:audit -- ${slug} --accept <ID> --reason \"...\"`);
  } else {
    console.log(`✓ Semua temuan level/entitas sudah ditinjau — aman lanjut menulis.`);
  }
  console.log("Detail penuh: npm run novel:audit -- <slug> --report");
  console.log("");
}

// ------------------------------------------------------- mode accept

function runAccept() {
  const ctx = loadNovel(slug);
  if (ctx.error) {
    console.error(ctx.error);
    process.exit(1);
  }
  const arc = resolveArc(ctx);
  const findings = collectFindings(arc, ctx);
  const target = findings.find((f) => f.id === ACCEPT);
  if (!target) {
    console.error(`ID "${ACCEPT}" tidak ada di temuan arc ${arc.num} saat ini.`);
    console.error("ID yang tersedia:");
    for (const f of findings) console.error(`  ${f.id}  [${f.cat}] ${f.msg.slice(0, 90)}`);
    process.exit(1);
  }
  addReviewRow(slug, target.id, target.cat, target.msg, REASON);
  console.log(`✓ [${target.id}] ditandai DITINJAU di novels/${slug}/audit-review.md`);
  console.log(`  ${target.msg}`);
}

/**
 * Tandai SEMUA temuan level/entitas arc ini sebagai sudah ditinjau dengan
 * satu alasan. Hanya untuk keputusan sadar menyeluruh (mis. seluruh arc
 * sengaja ditulis sebagai twist). Temuan yang sudah ditinjau dilewati.
 */
function runAcceptAll() {
  const ctx = loadNovel(slug);
  if (ctx.error) {
    console.error(ctx.error);
    process.exit(1);
  }
  const arc = resolveArc(ctx);
  const findings = collectFindings(arc, ctx);
  const reviewed = readReviewedIds(slug);
  const targets = findings.filter((f) => (f.cat === "level" || f.cat === "entitas") && !reviewed.has(f.id));

  if (targets.length === 0) {
    console.log(`Tidak ada temuan level/entitas yang belum ditinjau di arc ${arc.num} — tidak ada yang ditandai.`);
    return;
  }

  for (const f of targets) addReviewRow(slug, f.id, f.cat, f.msg, REASON);
  console.log(`✓ ${targets.length} temuan level/entitas arc ${arc.num} ditandai DITINJAU di novels/${slug}/audit-review.md`);
  if (REASON) console.log(`  Alasan bersama: "${REASON}"`);
  for (const f of targets) console.log(`  - ${f.id}  [${f.cat}] ${f.msg.slice(0, 100)}`);
  console.log("");
  console.log("Catatan: --accept-all cocok untuk keputusan menyeluruh (mis. arc ditulis");
  console.log("sebagai satu twist yang sengaja). Kalau beberapa temuan butuh alasan berbeda,");
  console.log("hapus baris yang tidak berlaku dari audit-review.md dan tandai satu per satu");
  console.log("dengan --accept <ID>.");
}

// ------------------------------------------------------- mode gate

function runGate() {
  // --gate dengan slug (dipakai novel:publish) = gate satu novel saja;
  // tanpa slug = semua novel serial (pre-commit / CI).
  const dirs = slug
    ? [slug]
    : readdirSync(NOVELS_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .filter((n) => !n.startsWith("."))
        .sort();

  const findingsByNovel = []; // {slug, findings}
  for (const name of dirs) {
    const ctx = loadNovel(name);
    if (ctx.error) {
      // Mode satu novel: novel non-serial tidak punya gate drift → dilewati,
      // bukan error (publish novel non-serial tetap jalan). Mode semua: yang
      // rusak parah ditangani check-novels.
      if (slug) console.log(`  – ${name}: bukan novel serial — gate drift dilewati.`);
      continue;
    }
    const withChapters = ctx.arcs.filter((a) => ctx.onDisk.some((n) => n >= a.start && n <= a.end));
    const all = [];
    for (const a of withChapters) all.push(...collectFindings(a, ctx));
    if (all.length) findingsByNovel.push({ slug: name, findings: all, ctx });
  }

  const scope = slug ? `publish ${slug}` : "pre-commit";
  console.log(`\n=== Gate audit drift (${scope}) — ${findingsByNovel.length} novel serial dengan bab ===\n`);
  let fail = 0;
  let stale = 0;
  for (const { slug: name, findings, ctx } of findingsByNovel) {
    const reviewed = readReviewedIds(name);
    const gateable = findings.filter((f) => f.cat === "level" || f.cat === "entitas");
    for (const f of gateable) {
      if (reviewed.has(f.id)) {
        console.log(`  ✓ ${name} [${f.id}] DITINJAU — ${f.msg}`);
      } else {
        fail++;
        console.log(`  ✗ ${name} [${f.id}] belum ditinjau — ${f.msg}`);
      }
    }
    for (const id of reviewed) {
      if (!findings.some((f) => f.id === id)) {
        stale++;
        console.log(`  ⚠ ${name} [${id}] catatan review basi — temuan sudah tidak ada (sudah diperbaiki?) — hapus barisnya`);
      }
    }
  }

  console.log("");
  if (fail) {
    console.log(`GAGAL: ${fail} temuan level/entitas belum ditinjau.`);
    console.log("Tinjau dulu: jalankan npm run novel:audit -- <slug> --report, lalu untuk tiap");
    console.log("temuan yang memang disengaja: npm run novel:audit -- <slug> --accept <ID> --reason \"...\".");
    console.log("Temuan yang BUKAN keputusan sadar = perbaiki world-state.md / bab, bukan di-review.");
    console.log("Lewati paksa: SKIP_AUDIT_GATE=1 (atau SKIP_NOVEL_CHECK=1 di pre-commit).");
    process.exitCode = 1;
  } else {
    console.log(`OK: semua temuan level/entitas sudah ditinjau (${stale ? `${stale} catatan basi — hapus barisnya` : "tidak ada catatan basi"}).`);
  }
}

// ---------------------------------------------------------------- main

if (GATE) {
  runGate();
} else if (ACCEPT_ALL) {
  if (!slug) {
    console.error("Pakai: npm run novel:audit -- <slug> --accept-all [--arc N] [--reason \"...\"]");
    process.exit(1);
  }
  runAcceptAll();
} else if (ACCEPT) {
  if (!slug) {
    console.error("Pakai: npm run novel:audit -- <slug> --accept <ID> [--reason \"...\"]");
    process.exit(1);
  }
  runAccept();
} else {
  runReport();
}
