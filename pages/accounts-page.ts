import { Locator, Page } from "@playwright/test";

export enum AccountTypeEnum {
  Checking,
  Savings,
  Credit,
}

export interface Account {
  accountName: string;
  accountType: AccountTypeEnum;
  startingBalance: number;
}

export class AccountsPage {
  readonly page: Page;
  readonly accountsMenu: Locator;
  readonly addAccountBtn: Locator;
  readonly accountNameInputTxt: Locator;
  readonly accountTypeSelectOption: Locator;
  readonly startingBalanceInputTxt: Locator;
  readonly termAndConditionCheckbox: Locator;
  readonly addNewAccountBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountsMenu = page.locator(
      "//a[@data-testid='sidebar-link-accounts']",
    );
    this.addAccountBtn = page.locator(
      "//button[@data-testid='add-account-btn']",
    );
    this.accountNameInputTxt = page.locator(
      "//input[@data-testid='account-form-name-input']",
    );
    this.accountTypeSelectOption = page.locator(
      "//button[@data-testid='account-form-type-select']",
    );
    this.startingBalanceInputTxt = page.locator(
      "//input[@name='account_balance_field']",
    );
    this.termAndConditionCheckbox = page.locator(
      "//span[@data-testid='account-form-accept-terms-checkbox']",
    );
    this.addNewAccountBtn = page.locator(
      "//button[@data-testid='save-account-form-btn']",
    );
  }

  async gotoAccountsMenu() {
    await this.accountsMenu.click();
  }

  async addNewAccount(newAccount: Account) {
    await this.addAccountBtn.click();
    await this.accountNameInputTxt.fill(newAccount.accountName);
    await this.accountTypeSelectOption.click();
    switch (newAccount.accountType) {
      case AccountTypeEnum.Checking:
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("Enter");
        break;

      case AccountTypeEnum.Savings:
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("Enter");
        break;

      case AccountTypeEnum.Credit:
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("Enter");
        break;

      default:
        break;
    }
    await this.startingBalanceInputTxt.fill(
      newAccount.startingBalance.toString(),
    );
    await this.termAndConditionCheckbox.click();
    await this.addNewAccountBtn.click();
  }
}
