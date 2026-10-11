import { test } from "@playwright/test";
import { AuthPage, LoginCredential } from "../pages/auth-page";
import {
  AccountEnum,
  Transfer,
  TransferDateEnum,
  TransferPage,
} from "../pages/transfer-page";
import ExcelJS from "exceljs";

test("transfer page", async ({ page }) => {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile("testdata.xlsx");
  const ws = wb.getWorksheet("transfer");

  for (let index = 2; index < ws!.rowCount + 1; index++) {
    const authPage = new AuthPage(page);
    await authPage.gotoLogin();
    const loginCredential: LoginCredential = {
      username: ws!.getCell(`A${index}`).text,
      password: ws!.getCell(`B${index}`).text,
    };
    await authPage.validLogin(loginCredential);

    const transferPage = new TransferPage(page);
    await transferPage.gotoTransferMenu();

    const fromtAccountExcel: string = ws!.getCell(`C${index}`).text;
    let fromAccount: AccountEnum;
    if (fromtAccountExcel === "Checking") {
      fromAccount = AccountEnum.FirstAccount;
    } else {
      fromAccount = AccountEnum.SecondAccount;
    }

    const toAccountExcel: string = ws!.getCell(`D${index}`).text;
    let toAccount: AccountEnum;
    if (toAccountExcel === "Checking") {
      toAccount = AccountEnum.FirstAccount;
    } else {
      toAccount = AccountEnum.SecondAccount;
    }

    const transferDateExcel: string = ws!.getCell(`G${index}`).text;
    let transferDate: TransferDateEnum;
    let selectDate: string;
    if (transferDateExcel === "Today") {
      transferDate = TransferDateEnum.Today;
    } else {
      transferDate = TransferDateEnum.Scheduled;
      selectDate = ws!.getCell(`H${index}`).text;
    }
    const transfer: Transfer = {
      fromAccount: fromAccount,
      toAccount: toAccount,
      amount: ws!.getCell(`E${index}`).value as number,
      transferDate: TransferDateEnum.Today,
    };
    if (transfer.memo !== undefined) {
      transfer.memo = ws!.getCell(`F${index}`).text;
    }

    await transferPage.createTransfer(transfer);

    await authPage.logout();
  }
});
