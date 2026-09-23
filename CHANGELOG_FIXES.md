# CHANGELOG_FIXES.md

### Fix #1 — Supabase workflow "Remote migration versions not found" + inquiries schema never applied

Tanggal · File · Masalah · Akar · Fix · Verifikasi · Pelajaran · Log Keyword · Deploy

| | |
|---|---|
| Tanggal | 2026-09-24 |
| File | `supabase/migrations/001_initial_cms.sql`, `002_harden_admin_helper.sql`, `002_inquiries.sql` → `20260820011046_`. `20260820011208_`. `20260924000000_inquiries.sql` |
| Masalah | Supabase Deploy workflow gagal: "Remote migration versions not found in local migrations directory". Tabel `inquiries` tidak pernah ada di DB production meski file migrasinya ada di repo. |
| Akar | Remote DB merekam versi migrasi timestamp (`20260820011046`, `20260820011208`) sementara folder lokal memakai skema `001_/002_`. Supabase CLI menganggap versi remote "tidak ditemukan" di direktori lokal → workflow batal. Migrasi inquiries (dulu `002_inquiries.sql`) tidak pernah di-push, dan merujuk `public.is_admin()` yang justru di-`drop` oleh migrasi hardening `002_harden_admin_helper.sql` (hanya `private.is_admin()` yang bertahan). |
| Fix | Rename 3 file migrasi agar versi lokal = versi remote (git mv), selaraskan isi `harden_admin_helper` dengan statement dari `schema_migrations` (revoke juga `authenticated`), ubah policy inquiries ke `private.is_admin()`, lalu `supabase db push --linked`. |
| Verifikasi | `supabase migration list` → 3/3 versi cocok (20260820011046, 20260820011208, 20260924000000). `db push` sukses: tabel `inquiries` + RLS aktif + 2 policy (`Anyone can submit inquiries` INSERT anon/authenticated, `Admins can manage inquiries` ALL) terverifikasi via Management API. Lint bersih, commit `07d7106` pushed ke main. **PENDING verifikasi** lulusnya workflow run berikutnya (push trigger). |
| Pelajaran | Versi migrasi di remote adalah source of truth nomor versi, bukan penamaan file lokal. Mixing skema penomoran (`001_` vs timestamp) memutus sinkronisasi CLI. Migrasi SQL yang baru dibuat harus memakai fungsi yang masih hidup (`private.is_admin()`), bukan yang sudah di-drop. |
| Log Keyword | `Remote migration versions not found`, `db push`, `schema_migrations`, `inquiries`, `private.is_admin`, `bctvhelcpaeqbzvcwvyw` |
| Deploy | Supabase project `bctvhelcpaeqbzvcwvyw` (database). Aplikasi Vercel `bitmindstudio.web.id` — domain masih gagal resolve (isu terpisah). |