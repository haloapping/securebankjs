import { test, expect } from "@playwright/test";
import { AuthPage, LoginCredential } from "../pages/auth-page";
import ExcelJS from "exceljs";

test("login page", async ({ page }) => {
  const authPage = new AuthPage(page);
  await authPage.gotoLogin();
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile("testdata.xlsx");
  const ws = wb.getWorksheet("login");
  for (let index = 2; index < ws!.rowCount + 1; index++) {
    const loginCredential: LoginCredential = {
      username: ws!.getCell(`A${index}`).text,
      password: ws!.getCell(`B${index}`).text,
    };
    await authPage.validLogin(loginCredential);
    await authPage.logout();
  }
});
