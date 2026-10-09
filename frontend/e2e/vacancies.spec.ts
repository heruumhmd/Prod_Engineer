import { test, expect } from '@playwright/test';

test.describe('Dicoding Jobs Vacancy Scenarios', () => {
  test('1. Buka daftar lowongan', async ({ page }) => {
    await page.goto('/');

    // Verifikasi judul seksi terlihat
    await expect(page.getByText('Daftar Pekerjaan Terbaru')).toBeVisible();

    // Verifikasi ada tepat 4 job-card
    const cards = page.locator('[data-testid="job-card"]');
    await expect(cards).toHaveCount(4);
  });

  test('2. Cari lowongan berdasarkan judul', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill('Developer');

    // Header berganti ke 'Hasil Pencarian'
    await expect(page.getByText('Hasil Pencarian')).toBeVisible();

    // Harus ada 2 lowongan: Android Developer & iOS Developer
    const cards = page.locator('[data-testid="job-card"]');
    await expect(cards).toHaveCount(2);

    // Cari teks yang tidak ada
    await searchInput.fill('PosisiTidakAda123987');
    await expect(page.locator('[data-testid="empty-state"]')).toBeVisible();
    await expect(cards).toHaveCount(0);
  });

  test('3. Lihat detail lowongan', async ({ page }) => {
    await page.goto('/');

    // Klik kartu Product Engineer
    const productEngineerCard = page.locator('[data-testid="job-card"]').filter({ hasText: 'Product Engineer' });
    await expect(productEngineerCard).toBeVisible();
    await productEngineerCard.click();

    // Verifikasi URL detail
    await expect(page).toHaveURL(/\/vacancies\/\d+/);

    // Verifikasi judul detail dan field-field utama
    const detailTitle = page.locator('[data-testid="vacancy-detail-title"]');
    await expect(detailTitle).toBeVisible();
    await expect(detailTitle).toHaveText('Product Engineer');

    await expect(page.getByText('Full-Time')).toBeVisible();
    await expect(page.getByText('Informasi Tambahan')).toBeVisible();
    await expect(page.getByText('1-3 tahun')).toBeVisible();
  });
});
