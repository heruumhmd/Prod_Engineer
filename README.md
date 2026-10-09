# Dicoding Jobs - Technical Test (Product Engineer)

Solusi lengkap untuk technical test posisi **Product Engineer** di **Dicoding Indonesia**. Proyek ini mengimplementasikan sistem lowongan pekerjaan (*Job Vacancy System*) yang mencakup fitur rekruter membuat lowongan pekerjaan dan pencari kerja mencari serta melihat detail lowongan, dibangun menggunakan arsitektur monorepo dengan **Laravel (PHP)** sebagai backend dan **Next.js (React/TypeScript)** sebagai frontend, serta dilengkapi unit test, feature test, dan end-to-end test (Playwright).

---

## 🛠️ Tech Stack & Versi Lingkungan

Semua dependensi dan versi telah diuji dan terverifikasi di lingkungan lokal:

- **PHP:** `8.3.26` (CLI)
- **Composer:** `2.8.12`
- **Node.js:** `v22.16.0`
- **npm:** `10.9.2`
- **Backend Framework:** Laravel `11.x`
- **Frontend Framework:** Next.js `16.x` (App Router, React 19, TypeScript 5)
- **Styling:** Tailwind CSS (mengikuti token warna & layout Figma)
- **State & Data Fetching:** TanStack React Query `v5`
- **Database:** SQLite (default zero-config Laravel 11, kompatibel penuh dengan MySQL)
- **Testing:**
  - Backend: PHPUnit (`php artisan test`) untuk Unit & Feature Integration Tests
  - Frontend: Playwright (`@playwright/test`) untuk End-to-End Tests

---

## 📁 Struktur Monorepo

```text
├── backend/                  # Laravel 11 RESTful API
│   ├── app/
│   │   ├── Enums/            # EmploymentType & MinExperience enums
│   │   ├── Http/Controllers/ # VacancyController (CRUD)
│   │   ├── Http/Requests/    # StoreVacancyRequest & UpdateVacancyRequest
│   │   ├── Http/Resources/   # VacancyResource & CompanyResource
│   │   └── Models/           # Vacancy & Company Eloquent models
│   ├── database/
│   │   ├── migrations/       # Schema migrasi companies & vacancies
│   │   └── seeders/          # DatabaseSeeder deterministik (data Figma)
│   └── tests/
│       ├── Unit/             # Scope search, model casts, form validation rules
│       └── Feature/          # Integration tests (POST, GET list/filter, detail, PUT, DELETE)
├── frontend/                 # Next.js 16 App Router
│   ├── app/
│   │   ├── page.tsx          # Frame 1 & 2: Daftar lowongan & pencarian judul
│   │   ├── vacancies/[id]/   # Frame 4: Detail lowongan pekerjaan
│   │   └── dashboard/        # Frame 3: Lowongan Saya & Manajemen
│   │       └── vacancies/
│   │           ├── new/      # Frame 5: Form Buat Lowongan Pekerjaan
│   │           └── [id]/edit/# Form Edit Lowongan Pekerjaan
│   ├── components/           # Navbar, Footer, Hero, JobCard, RichTextEditor, SanitizedHtml
│   ├── lib/                  # api.ts (fetcher), labels.ts (formatters)
│   ├── types/                # vacancy.ts (TypeScript interface & types)
│   └── e2e/                  # Playwright E2E spec (vacancies.spec.ts)
└── README.md
```

---

## 🚀 Panduan Setup & Menjalankan Proyek

### 1. Setup Backend (Laravel)

Buka terminal dan masuk ke folder `backend`:

```bash
cd backend

# 1. Pasang dependensi PHP
composer install

# 2. Siapkan berkas environment
cp .env.example .env

# 3. Generate application key
php artisan key:generate

# 4. Jalankan migrasi dan seeder deterministik
php artisan migrate:fresh --seed

# 5. Jalankan server Laravel
php artisan serve --port=8000
```
Backend API akan aktif di `http://127.0.0.1:8000`.

> **Catatan Database:** Secara default, Laravel 11 menggunakan database SQLite (`database/database.sqlite`). Untuk menggunakan MySQL, cukup ubah variabel `DB_CONNECTION=mysql` pada berkas `.env` dan sesuaikan kredensial database Anda.

---

### 2. Setup Frontend (Next.js)

Buka terminal baru dan masuk ke folder `frontend`:

```bash
cd frontend

# 1. Pasang dependensi Node.js
npm install

# 2. Buat berkas konfigurasi environment lokal
cp .env.example .env.local

# 3. Jalankan server development Next.js
npm run dev
```
Aplikasi web akan dapat diakses di `http://localhost:3000`.

---

## 🧪 Cara Menjalankan Seluruh Pengujian (Testing)

### A. Backend Tests (Unit + Feature Integration)

Pengujian backend menggunakan SQLite in-memory (`:memory:`), terisolasi dan tidak merusak database development:

```bash
cd backend
php artisan test
```

**Cakupan Pengujian Backend:**
1. **Unit Tests:**
   - `VacancyModelTest`: validasi factory, cast enum PHP (`EmploymentType`, `MinExperience`), dan logika `scopeSearch` (pencarian title insensitive, escape wildcard `%` dan `_`, penanganan term kosong/null).
   - `StoreVacancyRequestTest`: validasi aturan form request (required fields, limit max string, validasi enum, minimum candidates_needed, validasi tanggal aktif tidak boleh masa lampau, gaji maks >= gaji min).
2. **Feature Integration Tests:**
   - `test_post_valid_creates_vacancy_and_associates_company` (HTTP 201).
   - `test_post_invalid_returns_422_with_validation_errors` (HTTP 422 JSON errors).
   - `test_get_vacancies_returns_200_ordered_by_created_at_desc` (HTTP 200).
   - `test_get_vacancies_with_search_filters_by_title` (HTTP 200 dengan query matching & empty state).
   - `test_get_vacancy_detail_returns_all_fields_and_handles_404` (HTTP 200 & 404).
   - `test_put_valid_updates_vacancy` (HTTP 200).
   - `test_delete_removes_vacancy` (HTTP 204 & 404).

---

### B. Frontend End-to-End Tests (Playwright)

Pastikan backend sedang berjalan (`php artisan serve --port=8000`) dengan data seeder awal:

```bash
# Pastikan seeder dalam keadaan fresh
cd backend
php artisan migrate:fresh --seed

# Jalankan Playwright E2E
cd ../frontend
npx playwright test
```

**Skenario E2E yang Diuji (`e2e/vacancies.spec.ts`):**
1. **Buka daftar lowongan:** Pengguna membuka `/`, memeriksa ketersediaan teks header "Daftar Pekerjaan Terbaru" dan memverifikasi keberadaan tepat 4 kartu lowongan (`[data-testid="job-card"]`).
2. **Cari lowongan berdasarkan judul:** Pengguna mengisi input pencarian (`[data-testid="search-input"]`) dengan kata "Developer", header berganti menjadi "Hasil Pencarian", menampilkan 2 lowongan relevan (Android Developer & iOS Developer), serta menampilkan state kosong (`[data-testid="empty-state"]`) saat kata kunci tidak ditemukan.
3. **Lihat detail lowongan:** Pengguna mengklik kartu "Product Engineer", memverifikasi navigasi ke URL `/vacancies/:id`, memeriksa judul lowongan (`[data-testid="vacancy-detail-title"]`), badge "Full-Time", teks "Informasi Tambahan", dan durasi pengalaman "1-3 tahun".

---

## 📡 Dokumentasi Endpoint RESTful API

| Method | Endpoint | Deskripsi | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/vacancies` | Mengambil seluruh daftar lowongan (bisa filter `?search=<judul>`) | `200 OK` |
| `GET` | `/api/vacancies/{id}` | Mengambil detail spesifik lowongan pekerjaan | `200 OK` / `404 Not Found` |
| `POST` | `/api/vacancies` | Menambahkan lowongan pekerjaan baru | `201 Created` / `422 Unprocessable` |
| `PUT` | `/api/vacancies/{id}` | Memperbarui lowongan pekerjaan yang ada | `200 OK` / `422 Unprocessable` / `404` |
| `DELETE`| `/api/vacancies/{id}` | Menghapus lowongan pekerjaan | `204 No Content` / `404 Not Found` |

### Format Payload POST / PUT (`/api/vacancies`):
```json
{
  "title": "Product Engineer",
  "position": "Product Engineer",
  "employment_type": "full_time",
  "candidates_needed": 1,
  "active_until": "2026-12-31",
  "location": "Bandung",
  "is_remote": false,
  "description": "<h3>Job Description</h3><p>Deskripsi pekerjaan lengkap.</p>",
  "salary_min": 10000000,
  "salary_max": 15000000,
  "show_salary": false,
  "min_experience": "1_3"
}
```

---

## 🎨 Keputusan Desain & Kepatuhan Figma

1. **Reusabilitas Komponen:** Komponen `JobCard` bersifat reusable dan dapat menerima properti data lowongan yang dinamis.
2. **Akurasi UI:** 
   - Warna disesuaikan dengan token Figma (`#18181b` untuk dark hero/teks utama, `#2d3e50` untuk navy button/logo, `#eff6ff` & `#3b82f6` untuk badge, `#e4e4e7` untuk border).
   - Teks, tata letak, hero illustration capsule, dan logo dicoding mengikuti 5 frame Figma (List, Search, Detail, Dashboard, Create Form).
3. **Keamanan Konten (Sanitization):** Konten deskripsi pekerjaan dalam format HTML dibersihkan menggunakan DOMPurify (`SanitizedHtml`) sebelum dirender untuk mencegah celah XSS.
4. **Data Seeder Deterministik:** Urutan 4 lowongan pada seeder dibuat persis dengan tampilan Figma:
   - ID 1: Product Engineer (1-3 tahun)
   - ID 2: Android Developer (4-5 tahun)
   - ID 3: iOS Developer (1-3 tahun)
   - ID 4: Code Reviewer (Kurang dari 1 tahun)

---

## 📝 Catatan Tambahan & Keterbatasan yang Diketahui
- **Dropdown Posisi & Lokasi:** Sesuai rencana eksekusi, opsi dropdown form diisi dengan daftar posisi teknologi umum dan kota-kota di Indonesia (Bandung, Jakarta, Yogyakarta, Surabaya, Remote).
- **Otentikasi:** Sesuai spesifikasi soal dan Figma yang tidak menyertakan modul autentikasi/login, seluruh lowongan diasosiasikan secara otomatis dengan entitas perusahaan default (`Dicoding Indonesia`).
