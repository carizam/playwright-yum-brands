"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
class CustomWorld {
    constructor() {
        this.browser = null;
        this.context = null;
        this.page = null;
    }
}
(0, cucumber_1.setWorldConstructor)(CustomWorld);
(0, cucumber_1.BeforeAll)(function () {
    return __awaiter(this, void 0, void 0, function* () {
    });
});
(0, cucumber_1.Before)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.browser = yield test_1.chromium.launch({
            args: ['--disable-blink-features=AutomationControlled'],
            headless: false,
        });
        this.context = yield this.browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            ignoreHTTPSErrors: true,
        });
        this.page = yield this.context.newPage();
    });
});
(0, cucumber_1.After)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        yield ((_a = this.page) === null || _a === void 0 ? void 0 : _a.close());
        yield ((_b = this.context) === null || _b === void 0 ? void 0 : _b.close());
        yield ((_c = this.browser) === null || _c === void 0 ? void 0 : _c.close());
    });
});
(0, cucumber_1.Given)('I open the Yum Brands homepage', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.goto('https://www.yum.com/', { waitUntil: 'domcontentloaded' });
    });
});
(0, cucumber_1.Then)('I should see the page loaded successfully', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, test_1.expect)(this.page.locator('body')).toBeVisible();
    });
});
(0, cucumber_1.Then)('the page title should contain {string}', function (title) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageTitle = yield this.page.title();
        (0, test_1.expect)(pageTitle).toMatch(new RegExp(title, 'i'));
    });
});
(0, cucumber_1.When)('I click on the {string} menu link', function (menuLink) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = this.page.locator(`text=${menuLink}`);
        yield (0, test_1.expect)(link).toBeVisible();
        yield link.click();
    });
});
(0, cucumber_1.Then)('I should be navigated to the {string} URL', function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, test_1.expect)(this.page).toHaveURL(new RegExp(url));
    });
});
(0, cucumber_1.Then)('the page should load within {int} ms', function (loadTime) {
    return __awaiter(this, void 0, void 0, function* () {
        const startTime = Date.now();
        yield this.page.goto('https://www.yum.com/', { waitUntil: 'domcontentloaded' });
        const duration = Date.now() - startTime;
        if (duration > loadTime) {
            throw new Error(`Page took ${duration} ms to load, exceeding the limit of ${loadTime} ms`);
        }
        console.log(`Page load time: ${duration} ms`);
    });
});
