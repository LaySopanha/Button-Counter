import { expect, test } from '@playwright/test';

test.describe('Button Counter App', () => {
	test('should display the counter and increment when button is pressed', async ({ page }) => {
		await page.goto('/');

		// Check the heading is visible
		await expect(page.getByRole('heading', { name: 'Button Counter' })).toBeVisible();

		// Check the initial count is displayed
		const countDisplay = page.locator('.count-display');
		await expect(countDisplay).toBeVisible();
		const initialText = await countDisplay.innerText();
		const initialCount = parseInt(initialText.trim(), 10);

		// Click the PRESS button
		const pressButton = page.getByRole('button', { name: /increase count|press/i });
		await expect(pressButton).toBeVisible();
		await pressButton.click();

		// Verify count incremented
		await expect(countDisplay).toContainText(String(initialCount + 1));
	});
});
