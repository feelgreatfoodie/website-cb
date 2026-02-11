import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('mobile menu opens and closes', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');

    const menuButton = page.getByRole('button', { name: /open menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Mobile nav should appear
    const mobileNav = page.getByRole('navigation', { name: /mobile/i });
    await expect(mobileNav).toBeVisible();

    // Close menu
    const closeButton = page.getByRole('button', { name: /close menu/i });
    await closeButton.click();
    await expect(mobileNav).not.toBeVisible();
  });

  test('desktop nav scrolls to sections', async ({ page, isMobile }) => {
    test.skip(isMobile === true, 'Desktop-only test');

    const nav = page.getByRole('navigation', { name: /main/i });
    await expect(nav).toBeVisible();

    // Click the Journey link
    await nav.getByText('Journey').click();
    await page.waitForTimeout(1000);

    const journey = page.locator('#journey');
    await expect(journey).toBeInViewport();
  });

  test('mobile nav link scrolls to section and closes menu', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');

    const menuButton = page.getByRole('button', { name: /open menu/i });
    await menuButton.click();

    const mobileNav = page.getByRole('navigation', { name: /mobile/i });
    await mobileNav.getByText('Workshop').click();

    // Menu should close after clicking
    await expect(mobileNav).not.toBeVisible();

    // Section should be in view
    await page.waitForTimeout(1000);
    const workshop = page.locator('#workshop');
    await expect(workshop).toBeInViewport();
  });
});
