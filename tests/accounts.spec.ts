import { test, expect } from "@playwright/test";
import { AuthPage, LoginCredential } from "../pages/auth-page";
import { AccountsPage, Account, AccountTypeEnum } from "../pages/accounts-page";
import ExcelJS from "exceljs";

test("account page", async ({ page }) => {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile("testdata.xlsx");
  const ws = wb.getWorksheet("accounts");

  for (let index = 2; index < ws!.rowCount + 1; index++) {
    const authPage = new AuthPage(page);
    await authPage.gotoLogin();
    const loginCredential: LoginCredential = {
      username: ws!.getCell(`A${index}`).text,
      password: ws!.getCell(`B${index}`).text,
    };
    await authPage.validLogin(loginCredential);

    const accountsPage = new AccountsPage(page);
    await accountsPage.gotoAccountsMenu();

    const accountTypeExcel = ws!.getCell(`C${index}`).text;
    let accountType: AccountTypeEnum;
    if (accountTypeExcel === "Checking") {
      accountType = AccountTypeEnum.Checking;
    } else if (accountTypeExcel === "Savings") {
      accountType = AccountTypeEnum.Savings;
    } else {
      accountType = AccountTypeEnum.Credit;
    }

    const account: Account = {
      accountName: ws!.getCell(`D${index}`).text,
      accountType: accountType,
      startingBalance: ws!.getCell(`E${index}`).value as number,
    };
    await accountsPage.addNewAccount(account);

    await authPage.logout();
  }
});
