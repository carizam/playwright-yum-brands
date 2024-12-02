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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const hooks_1 = require("../support/hooks");
const assert_1 = __importDefault(require("assert"));
(0, cucumber_1.Given)('I navigate to the Yum Brands homepage', () => __awaiter(void 0, void 0, void 0, function* () {
    yield hooks_1.page.goto('https://www.yum.com/', { waitUntil: 'domcontentloaded' });
}));
(0, cucumber_1.Then)('the page title should contain {string}', (expectedTitle) => __awaiter(void 0, void 0, void 0, function* () {
    const pageTitle = yield hooks_1.page.title();
    (0, assert_1.default)(pageTitle.includes(expectedTitle), `Expected title to include "${expectedTitle}", but got "${pageTitle}"`);
}));
(0, cucumber_1.When)('the page loads', () => __awaiter(void 0, void 0, void 0, function* () {
    const startTime = Date.now();
    yield hooks_1.page.goto('https://www.yum.com/', { waitUntil: 'load' });
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    (0, assert_1.default)(loadTime < 60000, `Page load time exceeded 60 seconds. Actual: ${loadTime} ms`);
}));
(0, cucumber_1.When)('I click on the {string} link', (menuItem) => __awaiter(void 0, void 0, void 0, function* () {
    const link = hooks_1.page.locator(`text=${menuItem}`);
    yield link.click();
}));
(0, cucumber_1.Then)('the URL should contain {string}', (expectedUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUrl = hooks_1.page.url();
    (0, assert_1.default)(currentUrl.includes(expectedUrl), `Expected URL to include "${expectedUrl}", but got "${currentUrl}"`);
}));
