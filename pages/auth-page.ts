import { Locator, Page } from "@playwright/test";
import * as allure from "allure-js-commons";

export interface LoginCredential {
  username: string;
  password: string;
}

export class AuthPage {
  readonly page: Page;
  readonly usernameInputTxt: Locator;
  readonly passwordInputTxt: Locator;
  readonly loginBtn: Locator;
  readonly logoutBtn: Locator;
  readonly errLoginMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInputTxt = page.locator("#login-username");
    this.passwordInputTxt = page.locator("#login-password");
    this.loginBtn = page.locator("//button[@data-testid='login-submit-btn']");
    this.logoutBtn = page.locator("//button[@data-testid='topbar-logout-btn']");
    this.errLoginMsg = page.locator(
      "//span[@data-testid='login-error-message']",
    );
  }

  async gotoLogin() {
    process.loadEnvFile();
    const baseUrl = process.env.BASE_URL!;

    await allure.step("Navigate to login page", async () => {
      await this.page.goto(baseUrl);
      const loginPageScreenshot = await this.page.screenshot({
        fullPage: true,
      });
      await allure.attachment("Login page", loginPageScreenshot, "image/png");
    });
  }

  async invalidLogin(loginCredential: LoginCredential) {
    await allure.step("Fill login form", async () => {
      await this.usernameInputTxt.fill(loginCredential.username);
      await this.passwordInputTxt.fill(loginCredential.password);
      const loginPageScreenshot = await this.page.screenshot({
        fullPage: true,
      });
      await allure.attachment("Login page", loginPageScreenshot, "image/png");
    });

    await allure.step("Dashboard page", async () => {
      await this.loginBtn.click();
      const dashboardPageSs = await this.page.screenshot({
        fullPage: true,
      });
      await allure.attachment("Dashboard page", dashboardPageSs, "image/png");
    });

    const isErrLoginMsgVisible = await this.errLoginMsg.isVisible();
    console.log("Hi:", isErrLoginMsgVisible);
    if (isErrLoginMsgVisible) {
      await allure.step("Login page", async () => {
        await this.logoutBtn.click();
        const loginPageSs = await this.page.screenshot({
          fullPage: true,
        });
        await allure.attachment("Login page", loginPageSs, "image/png");
      });
    }
  }

  async validLogin(loginCredential: LoginCredential) {
    await allure.step("Fill login form", async () => {
      await this.usernameInputTxt.fill(loginCredential.username);
      await this.passwordInputTxt.fill(loginCredential.password);
      const loginPageScreenshot = await this.page.screenshot({
        fullPage: true,
      });
      await allure.attachment("Login page", loginPageScreenshot, "image/png");
    });

    await allure.step("Dashboard page", async () => {
      await this.loginBtn.click();
      const dashboardPageSs = await this.page.screenshot({
        fullPage: true,
      });
      await allure.attachment("Dashboard page", dashboardPageSs, "image/png");
    });
  }

  async logout() {
    await allure.step("Login page", async () => {
      await this.logoutBtn.click();
      const loginPageSs = await this.page.screenshot({
        fullPage: true,
      });
      await allure.attachment("Login page", loginPageSs, "image/png");
    });
  }
}
