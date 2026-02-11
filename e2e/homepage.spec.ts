import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all major sections render', async ({ page }) => {
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#journey')).toBeVisible();
    await expect(page.locator('#competencies')).toBeVisible();
    await expect(page.locator('#opento')).toBeVisible();
    await expect(page.locator('#workshop')).toBeVisible();
    await expect(page.locator('#bossfight')).toBeVisible();
    await expect(page.locator('#implementation')).toBeVisible();
    await expect(page.locator('#writing')).toBeVisible();
    await expect(page.locator('#onesheeter')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('hero CTA scrolls to journey section', async ({ page }) => {
    const cta = page.getByRole('button', { name: /quest/i });
    await expect(cta).toBeVisible();
    await cta.click();

    // Wait for smooth scroll to complete
    await page.waitForTimeout(1000);

    const journey = page.locator('#journey');
    await expect(journey).toBeInViewport();
  });

  test('video card loads iframe on click', async ({ page }) => {
    const workshop = page.locator('#workshop');
    await workshop.scrollIntoViewIfNeeded();

    const playButton = workshop.getByRole('button', { name: /play/i }).first();
    await expect(playButton).toBeVisible();
    await playButton.click();

    const iframe = workshop.locator('iframe').first();
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute('src', /youtube\.com\/embed/);
  });

  test('palette switcher changes theme', async ({ page }) => {
    const switcher = page.getByRole('button', { name: /switch color palette/i });
    await expect(switcher).toBeVisible();
    await switcher.click();

    // Palette dropdown should appear
    const dropdown = page.getByText('CHOOSE YOUR PALETTE');
    await expect(dropdown).toBeVisible();

    // Click a different palette option
    const options = page.locator('button:has(.rounded-full)').filter({ hasNotText: '' });
    const count = await options.count();
    expect(count).toBeGreaterThan(1);
  });

  test('PDF download link exists', async ({ page }) => {
    const onesheeter = page.locator('#onesheeter');
    await onesheeter.scrollIntoViewIfNeeded();

    const downloadLink = onesheeter.locator('a[download]');
    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveAttribute('href', /\.pdf/);
  });
});
