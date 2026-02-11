import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();
  });

  test('submit button is disabled without required fields', async ({ page }) => {
    const submit = page.locator('#contact').getByRole('button', { name: /send/i });
    await expect(submit).toBeVisible();
    await expect(submit).toBeDisabled();
  });

  test('submit button is enabled with name and email', async ({ page }) => {
    const section = page.locator('#contact');

    await section.getByPlaceholder('Your name').fill('Test User');
    await section.getByPlaceholder('you@company.com').fill('test@example.com');

    const submit = section.getByRole('button', { name: /send/i });
    await expect(submit).toBeEnabled();
  });
});
