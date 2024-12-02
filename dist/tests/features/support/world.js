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
exports.CustomWorld = void 0;
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
class CustomWorld extends cucumber_1.World {
    constructor(options) {
        super(options);
        this.browser = null;
        this.context = null;
        this.page = null;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.browser = yield test_1.chromium.launch({
                    headless: false,
                });
                this.context = yield this.browser.newContext();
                this.page = yield this.context.newPage();
                1;
            }
            catch (error) {
                console.error('Error al inicializar Playwright:', error);
            }
        });
    }
}
exports.CustomWorld = CustomWorld;
