# BITMIND STUDIO — Phase 4 Complete

## Services Experience

`/services` telah diubah menjadi halaman jasa yang menjelaskan positioning, scope, proses, proof, dan jalur inquiry secara lengkap.

Section yang tersedia:

1. Service hero dengan CTA ke `/contact` dan `/work`
2. Editorial core service blocks dari `services.ts`
3. Typical project deliverables
4. Project types
5. Data-driven pricing approach
6. Detailed service process
7. Typical timeline
8. Related real work
9. Why work with BITMIND
10. Website Care & Maintenance
11. Accessible FAQ
12. Final project CTA

Setiap service memiliki link `/contact?service={slug}` untuk mengisi Project Type secara otomatis.

## Conversion Strategy

Conversion flow menghubungkan homepage, services, work, dan contact:

```text
Homepage / Work
→ Understand Services
→ Review Scope, Process, Pricing and Proof
→ Start a Project
→ Qualified Inquiry Form
```

Homepage memiliki link Services yang eksplisit. Work page memiliki CTA ke Services dan Contact. Services menghubungkan portfolio proof dan inquiry untuk setiap jasa.

## Pricing

Pricing disimpan di `src/data/pricing.ts` menggunakan type `ServicePricing`.

Tidak ada harga final yang dibuat tanpa persetujuan. Semua service menggunakan `Custom quotation based on scope` dengan note yang menjelaskan faktor penentu quotation.

## Contact Experience

`/contact` menggunakan editorial two-column layout:

- Project introduction dan qualification guidance
- Daftar material yang dibutuhkan dari client
- Penjelasan langkah setelah inquiry
- Inquiry form frontend
- Link kembali ke portfolio
- WhatsApp CTA dirender secara conditional jika URL sudah tersedia di config

## Inquiry Form

Fields:

- Name
- Email
- WhatsApp
- Company / Brand
- Project Type
- Estimated Budget
- Target Timeline
- Project Description
- Reference Website

Project Type mendukung preselection dari query valid seperti `/contact?service=company-profile-website`. Query yang tidak valid diabaikan.

Submit sengaja dinonaktifkan. Form tidak menampilkan fake success dan menjelaskan bahwa backend belum aktif.

## Site Config

Centralized config tersedia di `src/config/site.ts`.

Current production candidate:

```text
https://bitmindstudio.web.id
```

URL dapat dioverride dengan `NEXT_PUBLIC_SITE_URL`, sehingga migrasi ke `bitmindstudio.id` tidak memerlukan perubahan di banyak component.

Metadata, Open Graph URL, robots, sitemap, footer domain, social links, browser frame, dan project preview menggunakan centralized config.

## Homepage Integration

- Hero `Start a Project` menuju `/contact`
- Hero `View Our Work` menuju `/work`
- Services summary memiliki `Explore Services` menuju `/services`
- Featured case study menggunakan project data dan link `/work/[slug]`
- Final CTA menuju `/contact`
- Navbar desktop dan mobile menuju `/contact`

## Responsive

### Mobile

- Service blocks dan form menggunakan single-column flow
- Input memiliki minimum height 48px
- Project Type, Budget, dan Timeline stack secara vertikal
- CTA tetap memiliki touch target yang cukup

### Tablet

- Form identity fields menggunakan dua kolom
- Service details dan process mulai membentuk responsive grids
- Metadata dan proof tetap mudah dibaca tanpa half-desktop layout yang sempit

### Desktop

- Service hero menggunakan large editorial typography
- Service blocks menggunakan 12-column-inspired composition
- Contact menggunakan intro/form split layout
- Pricing, related work, trust, dan timeline memanfaatkan ruang tanpa membuat text terlalu lebar

## Accessibility

- Visible labels untuk semua input, select, dan textarea
- Required fields menggunakan native HTML validation
- Disabled submit memiliki explanatory status text
- FAQ menggunakan button, `aria-expanded`, `aria-controls`, `aria-labelledby`, dan region semantics
- Focus state tetap terlihat
- Mobile menu memiliki expanded state dan menutup setelah CTA dipilih

## Performance

Server Components digunakan untuk seluruh Services page, layout, pricing, process, proof, dan contact composition.

Client Components hanya digunakan untuk:

- Inquiry form state dan query preselection
- FAQ accordion state
- Existing navbar interaction
- Existing motion wrappers

Tidak ada dependency baru, form library, analytics script, database, atau backend service.

## Validation

```text
npm run lint
PASS

npm run build
PASS
```

Local route checks:

```text
/                                              200
/services                                      200
/contact                                       200
/contact?service=company-profile-website       200
/work                                          200
```

## Technical Notes

- Form submission menunggu backend integration.
- WhatsApp URL dan contact email masih kosong, sehingga tidak ditampilkan sebagai contact channel palsu.
- Budget ranges berada di `src/data/inquiry.ts` dan dapat diubah tanpa menyentuh form component.
- Pricing menggunakan custom quotation sampai nilai starting price disetujui.
- Planned analytics events didokumentasikan di `docs/conversion-events.md`; tidak ada analytics yang terpasang.

## Next Phase

```text
Ready for Phase 5 — CMS, Project & Product Management.

Waiting for approval before continuing.
```
