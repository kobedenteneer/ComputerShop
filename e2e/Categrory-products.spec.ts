import { test, expect } from '@playwright/test';

test('should filter products by category when a category is selected', async ({ page }) => {
  await page.goto('http://localhost:5173/products');

  const allProducts = page.locator('#products > .v-col-sm-6, #products > .v-col-md-4, #products > .v-col-xl-3');
  await expect(page.locator('#loading-products')).toHaveCount(0);
  await expect(allProducts.first()).toBeVisible();

  const totalBefore = await allProducts.count();
  expect(totalBefore).toBeGreaterThan(0);

  const categoryCheckbox = page.locator('#filters input[type="checkbox"]').first();
  const label = await categoryCheckbox.getAttribute('aria-label') ?? 'onbekend';
  await categoryCheckbox.check();

  // Wacht op verandering in DOM (via herberekende computed property in Vue)
  await expect(async () => {
    const count = await allProducts.count();
    expect(count).toBeLessThan(totalBefore);
  }).toPass({ timeout: 5000 });

  const filteredCount = await allProducts.count();
  console.log(`Filter actief (${label}): ${filteredCount} van ${totalBefore} producten`);
});
