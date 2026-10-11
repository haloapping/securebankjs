import { Locator, Page } from "@playwright/test";

export enum FromAccountEnum {
  Checking,
  Savings,
}

export enum PayeeEnum {
  RahulSharma,
  PriyMehta,
  AmitVerma,
}

export interface SendMoney {
  fromAccount: FromAccountEnum;
  payee: PayeeEnum;
  amount: number;
  note?: string;
}

export class SendMoneyPage {
  readonly page: Page;
  readonly sendMoneyMenu: Locator;
  readonly fromAccountSelectOption: Locator;
  readonly payeeSelectOption: Locator;
  readonly amountInputTxt: Locator;
  readonly noteInputTxt: Locator;
  readonly reviewAndSendBtn: Locator;
  readonly confirmSendBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sendMoneyMenu = page.locator(
      "//a[@data-testid='sidebar-link-send-money']",
    );
    this.fromAccountSelectOption = page.locator(
      "//button[@data-testid='send-from-account-select']",
    );
    this.payeeSelectOption = page.locator(
      "//button[@data-testid='payee-select']",
    );
    this.amountInputTxt = page.locator(
      "//input[@data-testid='send-amount-input']",
    );
    this.noteInputTxt = page.locator("input[data-testid='send-note-input']");
    this.reviewAndSendBtn = page.locator(
      "//button[@data-testid='review-send-btn']",
    );
    this.confirmSendBtn = page.locator(
      "//button[@data-testid='confirm-send-btn']",
    );
  }

  async gotoSendMoneyMenu() {
    await this.sendMoneyMenu.click();
  }

  async createSendMoney(sendMoney: SendMoney) {
    await this.fromAccountSelectOption.click();
    switch (sendMoney.fromAccount) {
      case FromAccountEnum.Checking:
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("Enter");
        break;

      case FromAccountEnum.Savings:
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("Enter");
        break;

      default:
        break;
    }

    await this.payeeSelectOption.click();
    switch (sendMoney.payee) {
      case PayeeEnum.RahulSharma:
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("Enter");
        break;

      case PayeeEnum.PriyMehta:
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("Enter");
        break;

      case PayeeEnum.AmitVerma:
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("Enter");
        break;

      default:
        break;
    }

    await this.amountInputTxt.fill(sendMoney.amount.toString());

    if (sendMoney.note !== undefined) {
      await this.noteInputTxt.fill(sendMoney.note);
    }

    await this.reviewAndSendBtn.click();
    await this.confirmSendBtn.click();
  }
}
