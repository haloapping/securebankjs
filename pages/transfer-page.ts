import { Locator, Page } from "@playwright/test";
import * as allure from "allure-js-commons";

export enum AccountEnum {
  FirstAccount,
  SecondAccount,
}

export enum TransferDateEnum {
  Today,
  Scheduled,
}

export interface Transfer {
  fromAccount: AccountEnum;
  toAccount: AccountEnum;
  amount: number;
  memo?: string;
  transferDate: TransferDateEnum;
  selectDate?: string;
}

export class TransferPage {
  readonly page: Page;
  readonly transferMenu: Locator;
  readonly fromAccountSelectOption: Locator;
  readonly toAccountSelectOption: Locator;
  readonly amountInputTxt: Locator;
  readonly memoInputTxt: Locator;
  readonly transferDateTodayRadioBtn: Locator;
  readonly transferDateScheduleRadioBtn: Locator;
  readonly selectDateInputTxt: Locator;
  readonly reviewTransferBtn: Locator;
  readonly confirmTransferBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transferMenu = page.locator(
      "//a[@data-testid='sidebar-link-transfer']",
    );
    this.fromAccountSelectOption = page.locator(
      "//button[@data-testid='transfer-from-select']",
    );
    this.toAccountSelectOption = page.locator(
      "//button[@data-testid='transfer-to-select']",
    );
    this.amountInputTxt = page.locator(
      "//input[@data-testid='transfer-amount-input']",
    );
    this.memoInputTxt = page.locator("//input[@name='transfer_memo_field']");
    this.transferDateTodayRadioBtn = page.locator(
      "//input[@name='dateType' and @value='today']",
    );
    this.transferDateScheduleRadioBtn = page.locator(
      "//input[@name='dateType' and @value='scheduled']",
    );
    this.selectDateInputTxt = page.locator(
      "//input[@data-testid='transfer-scheduled-date-input']",
    );
    this.reviewTransferBtn = page.locator(
      "//button[@data-testid='review-transfer-btn']",
    );
    this.confirmTransferBtn = page.locator(
      "//button[@data-testid='confirm-transfer-btn']",
    );
  }

  async gotoTransferMenu() {
    await this.transferMenu.click();
  }

  async createTransfer(transfer: Transfer) {
    await allure.step("Fill transfer form", async () => {
      await this.fromAccountSelectOption.click();
      switch (transfer.fromAccount) {
        case AccountEnum.FirstAccount:
          await this.page.keyboard.press("ArrowDown");
          await this.page.keyboard.press("Enter");
          break;

        case AccountEnum.SecondAccount:
          await this.page.keyboard.press("ArrowDown");
          await this.page.keyboard.press("ArrowDown");
          await this.page.keyboard.press("Enter");
          break;

        default:
          break;
      }

      await this.toAccountSelectOption.click();
      switch (transfer.toAccount) {
        case AccountEnum.FirstAccount:
          await this.page.keyboard.press("ArrowDown");
          await this.page.keyboard.press("Enter");
          break;

        case AccountEnum.SecondAccount:
          await this.page.keyboard.press("ArrowDown");
          await this.page.keyboard.press("ArrowDown");
          await this.page.keyboard.press("Enter");
          break;

        default:
          break;
      }

      await this.amountInputTxt.fill(transfer.amount.toString());

      if (transfer?.memo !== undefined) {
        await this.memoInputTxt.fill(transfer.memo);
      }

      if (transfer.transferDate === TransferDateEnum.Today) {
        await this.transferDateTodayRadioBtn.click();
      } else {
        await this.transferDateScheduleRadioBtn.click();
        const date_parts = transfer.selectDate!.split("/");
        await this.page.keyboard.press("ArrowLeft");
        await this.page.keyboard.press("ArrowLeft");
        await this.page.keyboard.press(date_parts[0]);
        await this.page.keyboard.press("ArrowRight");
        await this.page.keyboard.press(date_parts[1]);
        await this.page.keyboard.press("ArrowRight");
        await this.page.keyboard.press(date_parts[2]);
      }

      const transferPageScreenshot = await this.page.screenshot({
        fullPage: true,
      });
      await allure.attachment(
        "Transfer page",
        transferPageScreenshot,
        "image/png",
      );

      await this.reviewTransferBtn.click();
    });

    const confirmTransferScreenshot = await this.page.screenshot({
      fullPage: true,
    });
    await allure.attachment(
      "Confrim transfer page",
      confirmTransferScreenshot,
      "image/png",
    );

    await this.confirmTransferBtn.click();

    const transferSuccessScreeshot = await this.page.screenshot({
      fullPage: true,
    });
    await allure.attachment(
      "Transfer success",
      transferSuccessScreeshot,
      "image/png",
    );
  }
}
