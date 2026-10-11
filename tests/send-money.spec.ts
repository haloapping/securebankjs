import { test } from "@playwright/test";
import { AuthPage, LoginCredential } from "../pages/auth-page";
import {
  FromAccountEnum,
  PayeeEnum,
  SendMoney,
  SendMoneyPage,
} from "../pages/send-money-page";

test("transfer page", async ({ page }) => {
  const authPage = new AuthPage(page);
  await authPage.gotoLogin();
  const loginCredential: LoginCredential = {
    username: "standard_user",
    password: "bank_sauce",
  };
  await authPage.validLogin(loginCredential);

  const sendMoneyPage = new SendMoneyPage(page);
  await sendMoneyPage.gotoSendMoneyMenu();
  const sendMoney: SendMoney = {
    fromAccount: FromAccountEnum.Savings,
    payee: PayeeEnum.AmitVerma,
    amount: 1456,
    note: "Ok",
  };
  await sendMoneyPage.createSendMoney(sendMoney);

  await authPage.logout();
});
