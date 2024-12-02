import { BeforeAll, setWorldConstructor, Before, After, Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../features/support/world'; 
import { expect, chromium, Page, Browser, BrowserContext } from '@playwright/test';

setWorldConstructor(CustomWorld);

BeforeAll(async function() {
});

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({
    args: ['--disable-blink-features=AutomationControlled'],
    headless: false,
  });
  this.context = await this.browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    ignoreHTTPSErrors: true,
  });
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld) {
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});

Given('I open the Yum Brands homepage', async function (this: CustomWorld) {
  await this.page!.goto('https://www.yum.com/', { waitUntil: 'domcontentloaded' });
});

Then('I should see the page loaded successfully', async function (this: CustomWorld) {
  await expect(this.page!.locator('body')).toBeVisible();
});

Then('the page title should contain {string}', async function (this: CustomWorld, title: string) {
  const pageTitle = await this.page!.title();
  expect(pageTitle).toMatch(new RegExp(title, 'i'));
});

When('I click on the {string} menu link', async function (this: CustomWorld, menuLink: string) {
  const link = this.page!.locator(`text=${menuLink}`);
  await expect(link).toBeVisible();
  await link.click();
});

Then('I should be navigated to the {string} URL', async function (this: CustomWorld, url: string) {
  await expect(this.page!).toHaveURL(new RegExp(url));
});

Then('the page should load within {int} ms', async function (this: CustomWorld, loadTime: number) {
  const startTime = Date.now();
  await this.page!.goto('https://www.yum.com/', { waitUntil: 'domcontentloaded' });
  const duration = Date.now() - startTime;

  if (duration > loadTime) {
    throw new Error(`Page took ${duration} ms to load, exceeding the limit of ${loadTime} ms`);
  }
  console.log(`Page load time: ${duration} ms`);
});