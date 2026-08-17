import { readySignal } from './readySignal'

/**
 * Sinyal "status bookmark sudah diketahui" — dipakai BookmarkButton untuk
 * memberi tahu halaman (mis. skeleton daftar bab di halaman novel) bahwa
 * status sudah dimuat, tanpa bergantung urutan eksekusi script.
 *
 * Implementasinya lewat readySignal generik; lihat readySignal.ts untuk
 * penjelasan kenapa berbasis promise + state di window.
 */
const signal = readySignal('bookmarkReady')

/** Menunggu sampai status bookmark selesai dimuat. */
export function bookmarkReady(): Promise<void> {
  return signal.wait()
}

/** Dipanggil BookmarkButton begitu status bookmarknya diketahui. */
export function markBookmarkReady(): void {
  signal.mark()
}
