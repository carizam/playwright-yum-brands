import { World, IWorldOptions } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';

export class CustomWorld extends World {
  browser: Browser | null = null;
  context: BrowserContext | null = null;
  page: Page | null = null;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() { 
    try {
      this.browser = await chromium.launch({
        headless: false, 
      });
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage(); 1 
    } catch (error) {
      console.error('Error al inicializar Playwright:', error);
    }
  }
}