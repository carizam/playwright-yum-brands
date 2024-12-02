import { BeforeAll, setWorldConstructor, After } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import { Page } from '@playwright/test';


setWorldConstructor(CustomWorld);

BeforeAll(async function () { 

});

After(async function (this: CustomWorld) {
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});