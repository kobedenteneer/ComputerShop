import { test, expect } from '@playwright/test';

test.describe('Load Products', () => {
  test('should load all products on the product page', async ({ page }) => {
    await page.goto('http://localhost:5173/products');

    // Wacht tot de producten geladen zijn (laadindicator verdwijnt)
    await expect(page.locator('#loading-products')).toHaveCount(0, { timeout: 10000 });

    // Zoek alle gerenderde producten binnen de #products container
    const renderedProducts = page.locator('#products > .v-col-sm-6, #products > .v-col-md-4, #products > .v-col-xl-3');

    const productCount = await renderedProducts.count();
    console.log(`Aantal zichtbare producten: ${productCount}`);
    expect(productCount).toBeGreaterThan(0);

    // (Optioneel) check of elk product een titel en prijs bevat
    for (let i = 0; i < productCount; i++) {
      const product = renderedProducts.nth(i);
      await expect(product).toBeVisible();
      await expect(product).toContainText(/.+/); // bevat iets van tekst
      await expect(product).toContainText(/€\s*\d+/); // bevat een prijs
    }
  });
});
