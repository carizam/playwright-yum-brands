import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import assert from 'assert';

let browser: Browser;
let page: Page;

Given('I navigate to the Yum Brands homepage', async () => {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    ignoreHTTPSErrors: true,
  });
  page = await context.newPage();
  await page.goto('https://www.yum.com/', { waitUntil: 'domcontentloaded' });
});

Then('the page title should contain {string}', async (expectedTitle: string) => {
  const pageTitle = await page.title();
  assert(
    pageTitle.includes(expectedTitle),
    `Expected title to include "${expectedTitle}", but got "${pageTitle}"`
  );
  await browser.close();
});

When('the page loads', async () => {
  const startTime = Date.now();
  await page.goto('https://www.yum.com/', { waitUntil: 'load' });
  const endTime = Date.now();
  const loadTime = endTime - startTime;
  assert(loadTime < 60000, `Page load time exceeded 60 seconds. Actual: ${loadTime} ms`);
});

When('I click on the {string} link', async (menuItem: string) => {
  await page.locator(`text=${menuItem}`).click();
});

Then('the URL should contain {string}', async (expectedUrl: string) => {
  const currentUrl = page.url();
  assert(
    currentUrl.includes(expectedUrl),
    `Expected URL to include "${expectedUrl}", but got "${currentUrl}"`
  );
});
