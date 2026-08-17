/**
 * Sinyal kesiapan berbasis promise yang dibagikan antar script (pola yang
 * dipakai BookmarkButton → daftar bab di halaman novel).
 *
 * Mengapa bukan event biasa: event bersifat fire-and-forget — kalau listener
 * terdaftar setelah event terlempar, event hilang (makanya dulu ada timeout
 * pengaman). Signal ini deterministik: siapapun yang menunggu dulu atau
 * terlanjur selesai dulu, hasilnya tetap sama. State-nya ditaruh di window
 * supaya aman walau bundler menduplikasi modul ini ke beberapa bundle.
 */

export interface ReadySignal {
  /** Menunggu sampai mark() dipanggil (langsung selesai bila sudah). */
  wait(): Promise<void>
  /** Tandai selesai — semua penunggu (dulu & nanti) langsung lanjut. */
  mark(): void
}

interface SignalState {
  promise: Promise<void>
  resolve: () => void
  done: boolean
}

const KEY_PREFIX = '__kidungSignal_'

function getState(key: string): SignalState {
  const w = window as unknown as Record<string, SignalState | undefined>
  const k = KEY_PREFIX + key
  let s = w[k]
  if (!s) {
    let resolve!: () => void
    const promise = new Promise<void>((r) => {
      resolve = r
    })
    s = { promise, resolve, done: false }
    w[k] = s
  }
  return s
}

/**
 * Buat sinyal kesiapan bernama. Key yang sama di script mana pun akan
 * berbagi state yang sama.
 */
export function readySignal(key: string): ReadySignal {
  return {
    wait() {
      return getState(key).promise
    },
    mark() {
      const s = getState(key)
      if (s.done) return
      s.done = true
      s.resolve()
    },
  }
}
