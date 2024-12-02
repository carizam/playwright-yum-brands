import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../support/hooks';
import assert from 'assert';

Given('I navigate to the Yum Brands homepage', async () => {
  await page.goto('https://www.yum.com/', { waitUntil: 'domcontentloaded' });
});

Then('the page title should contain {string}', async (expectedTitle: string) => {
  const pageTitle = await page.title();
  assert(
    pageTitle.includes(expectedTitle),
    `Expected title to include "${expectedTitle}", but got "${pageTitle}"`
  );
});

When('the page loads', async () => {
  const startTime = Date.now();
  await page.goto('https://www.yum.com/', { waitUntil: 'load' });
  const endTime = Date.now();
  const loadTime = endTime - startTime;
  assert(loadTime < 60000, `Page load time exceeded 60 seconds. Actual: ${loadTime} ms`);
});

When('I click on the {string} link', async (menuItem: string) => {
  const link = page.locator(`text=${menuItem}`);
  await link.click();
});

Then('the URL should contain {string}', async (expectedUrl: string) => {
  const currentUrl = page.url();
  assert(
    currentUrl.includes(expectedUrl),
    `Expected URL to include "${expectedUrl}", but got "${currentUrl}"`
  );
});
