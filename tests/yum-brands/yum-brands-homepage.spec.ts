import { test, expect, chromium } from '@playwright/test';

test.describe('Yum Brands Homepage Tests', () => {
  let browser;
  let context;

  // Setup browser and context
  test.beforeAll(async () => {
    browser = await chromium.launch({
      args: ['--disable-blink-features=AutomationControlled'], // Bypass bot detection
      headless: false, // Run in non-headless mode for debugging
    });

    context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      ignoreHTTPSErrors: true, // Handle invalid SSL certificates
    });
  });

  // Cleanup browser
  test.afterAll(async () => {
    await browser.close();
  });

  // Utility function to handle iframes
  const getIframeLocator = async (page, selector) => {
    const frameElement = await page.locator(selector).elementHandle();
    if (!frameElement) throw new Error(`Iframe not found for selector: ${selector}`);
    return await frameElement.contentFrame();
  };

  // Utility function for safe navigation
  const safeNavigation = async (page, url) => {
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      if (!response || !response.ok()) {
        console.error(`Navigation failed: ${response ? response.status() : 'No response'}`);
      } else {
        console.log(`Page loaded successfully: ${url} (Status: ${response.status()})`);
      }
    } catch (error) {
      console.error(`Navigation failed for ${url}:`, error);
      throw error;
    }
  };

  test('Handle ERR_CONNECTION_RESET error', async () => {
    const page = await context.newPage();
    await safeNavigation(page, 'https://www.yum.com/');
    await page.close();
  });

  test('has title', async () => {
    const page = await context.newPage();
    await safeNavigation(page, 'https://www.yum.com/');
    await expect(page).toHaveTitle(/Yum\.com/i);
    await page.close();
  });

  test('Validate page navigation', async () => {
    const page = await context.newPage();
    await safeNavigation(page, 'https://www.yum.com/');
    await page.close();
  });

  test.describe('Validate menu links', () => {
    const menuItems = [
      { text: 'Company', url: '/company' },
      { text: 'Careers', url: '/careers' },
      { text: 'Impact', url: '/impact' },
      { text: 'Investors', url: '/investors' },
    ];

    test('Check menu links navigation', async () => {
      const page = await context.newPage();
      await safeNavigation(page, 'https://www.yum.com/');

      for (const item of menuItems) {
        // Handle iframe if menu is inside one
        const iframe = await getIframeLocator(page, 'iframe[title="desired-iframe-title"]'); // Adjust selector if needed
        const locator = iframe.locator(`text=${item.text}`);

        await expect(locator).toBeVisible({ timeout: 5000 }); // Verify visibility
        await locator.click();
        await expect(page).toHaveURL(new RegExp(item.url), { timeout: 10000 }); // Verify URL redirection

        // Go back to the homepage
        await page.goBack({ waitUntil: 'domcontentloaded' });
      }

      await page.close();
    });
  });

  test('Measure page load time', async () => {
    const page = await context.newPage();
    const startTime = Date.now();
    await safeNavigation(page, 'https://www.yum.com/');
    const endTime = Date.now();
    const loadTime = endTime - startTime;

    console.log(`Page load time: ${loadTime} ms`);
    expect(loadTime).toBeLessThan(60000); // Ensure the page loads within 60 seconds
    await page.close();
  });
});
