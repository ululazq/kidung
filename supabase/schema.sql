-- ============================================================
-- Kidung — skema bookmark & riwayat baca
-- Jalankan di Supabase Dashboard → SQL Editor → New query.
-- Aman dijalankan ulang (pakai IF NOT EXISTS).
-- ============================================================

-- Bookmark: penanda bab (chapter_slug terisi) atau seluruh novel
-- (chapter_slug NULL).
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  novel_slug text not null,
  chapter_slug text,
  created_at timestamptz not null default now()
);

-- Satu bookmark per bab (untuk chapter_slug terisi).
create unique index if not exists bookmarks_chapter_unique
  on public.bookmarks (user_id, novel_slug, chapter_slug)
  where chapter_slug is not null;

-- Satu bookmark per novel (untuk chapter_slug NULL).
-- Indeks unik parsial, karena NULL tidak dianggap sama oleh UNIQUE biasa.
create unique index if not exists bookmarks_novel_unique
  on public.bookmarks (user_id, novel_slug)
  where chapter_slug is null;

create index if not exists bookmarks_user_idx
  on public.bookmarks (user_id, created_at desc);

-- Riwayat baca: bab terakhir yang dibaca per novel.
create table if not exists public.reading_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  novel_slug text not null,
  chapter_slug text not null,
  updated_at timestamptz not null default now(),
  unique (user_id, novel_slug)
);

create index if not exists reading_history_user_idx
  on public.reading_history (user_id, updated_at desc);

-- Progres baca: persen posisi scroll per bab (0–100), dipakai untuk
-- memulihkan posisi saat bab yang sama dibuka lagi.
create table if not exists public.reading_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  novel_slug text not null,
  chapter_slug text not null,
  progress real not null default 0,
  updated_at timestamptz not null default now(),
  unique (user_id, novel_slug, chapter_slug)
);

create index if not exists reading_progress_user_idx
  on public.reading_progress (user_id, updated_at desc);

-- ============================================================
-- Izin peran (GRANT) — wajib untuk tabel yang dibuat via SQL mentah;
-- tanpa ini kueri gagal 42501 "permission denied" sebelum RLS bekerja.
-- ============================================================

grant select, insert, update, delete on public.bookmarks to authenticated;
grant select, insert, update, delete on public.reading_history to authenticated;
grant select, insert, update, delete on public.reading_progress to authenticated;
-- anon (belum login) boleh SELECT — RLS tetap menyaring: tidak ada baris
-- yang terlihat karena auth.uid() kosong.
grant select on public.bookmarks to anon;
grant select on public.reading_history to anon;
grant select on public.reading_progress to anon;

-- ============================================================
-- Row Level Security — tiap pengguna hanya bisa melihat/mengubah
-- datanya sendiri. Kunci keamanan situs ini.
-- ============================================================

alter table public.bookmarks enable row level security;
alter table public.reading_history enable row level security;

-- bookmarks
drop policy if exists "Bookmarks: lihat milik sendiri" on public.bookmarks;
create policy "Bookmarks: lihat milik sendiri"
  on public.bookmarks for select
  using (auth.uid() = user_id);

drop policy if exists "Bookmarks: tambah milik sendiri" on public.bookmarks;
create policy "Bookmarks: tambah milik sendiri"
  on public.bookmarks for insert
  with check (auth.uid() = user_id);

drop policy if exists "Bookmarks: hapus milik sendiri" on public.bookmarks;
create policy "Bookmarks: hapus milik sendiri"
  on public.bookmarks for delete
  using (auth.uid() = user_id);

-- reading_history
drop policy if exists "History: lihat milik sendiri" on public.reading_history;
create policy "History: lihat milik sendiri"
  on public.reading_history for select
  using (auth.uid() = user_id);

drop policy if exists "History: tambah milik sendiri" on public.reading_history;
create policy "History: tambah milik sendiri"
  on public.reading_history for insert
  with check (auth.uid() = user_id);

drop policy if exists "History: perbarui milik sendiri" on public.reading_history;
create policy "History: perbarui milik sendiri"
  on public.reading_history for update
  using (auth.uid() = user_id);

-- reading_progress

alter table public.reading_progress enable row level security;

drop policy if exists "Progress: lihat milik sendiri" on public.reading_progress;
create policy "Progress: lihat milik sendiri"
  on public.reading_progress for select
  using (auth.uid() = user_id);

drop policy if exists "Progress: tambah milik sendiri" on public.reading_progress;
create policy "Progress: tambah milik sendiri"
  on public.reading_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "Progress: perbarui milik sendiri" on public.reading_progress;
create policy "Progress: perbarui milik sendiri"
  on public.reading_progress for update
  using (auth.uid() = user_id);
