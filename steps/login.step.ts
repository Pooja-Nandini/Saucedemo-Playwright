 import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "@playwright/test";
import { strict as assert } from "assert";
import { LoginPage } from "../pages/loginPage";

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Given("user open the login page", async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
});

When(/^user login with "([^"]*)" and "([^"]*)"$/, async (username, password) => {
	    await loginPage.login(username, password);
});

Then("user should land on the products page", async function () {
  const isVisible = await loginPage.titleProducts.isVisible();
  assert.equal(isVisible, true, "Products page did not load");
  await page.waitForTimeout(3000); 
  await browser.close();// wait 3 seconds

});
