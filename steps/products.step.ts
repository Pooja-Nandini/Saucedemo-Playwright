import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import { chromium, Page, Browser } from "@playwright/test";
import assert from "assert";

let page: Page;
let browser: Browser;
let loginPage: LoginPage;
let productsPage: ProductsPage;

Given(/^user is on the products page with "([^"]*)" and "([^"]*)"$/, async function(username: string, password: string) {
	 browser = await chromium.launch({ headless: false });
      const context = await browser.newContext();
      page = await context.newPage();
      loginPage = new LoginPage(page);
      await loginPage.loginAction(username,password)
});

When(/^user select any "([^"]*)" from the dropdown$/, async function(option: string) {
    productsPage=new ProductsPage(page)
	await productsPage.selectOptionFromDropdown(option)
});

Then(/^the products should display accordingly$/, async function() {
	await productsPage.productPrices();    
});

Then(/^add the products to the cart$/,async function() {
	await productsPage.addTheProducts();
});

When(/^clicked on the shopping cart$/, async function() {
	await productsPage.iconShoppingCart.click()
});

Then(/^user is navigated to your cart page$/, async function() {
	assert.strictEqual(await productsPage.titleYourCart.isVisible(),true," not navigated to your cart page")
});

Then(/^the product labels should display$/, async function() {
	assert.strictEqual(await productsPage.productLabel.first().isVisible(),true,"product1 label is not displayed")
    assert.strictEqual(await productsPage.productLabel.last().isVisible(),true,"product2 label is not displayed")
});

When(/^clicked on the checkout button$/,async function () {
	await productsPage.btnCheckout.click();
});

Then(/^navigate to checkout your information page$/, async function() {
	await productsPage.titleCheckOutYourInformation.isVisible();
});

When(/^user fill "([^"]*)" "([^"]*)" "([^"]*)" details$/, async function(firstname: string, lastname: string, zip:string) {
	await productsPage.fillDetails(firstname,lastname,zip);

});

When(/^click on continue button$/, async function() {
	await productsPage.btnContinue.click();
});

Then(/^the user should land on checkout overview page$/, async function() {
	assert.strictEqual(await productsPage.titleCheckoutOverview.isVisible(), true, "User not landed on checkout overview page")
});

Then(/^the total price of the products along with tax display$/, async function()  {
	await productsPage.calculateTotalPrice();
});

When(/^user click on the finish button$/, async function() {

	await productsPage.btnFinish.click()
});

Then(/^the thank you banner should display$/, async function() {
    assert.strictEqual(await productsPage.bannerThankyou.isVisible(), true, " The thank you banner is not displayed")
    await browser.close();

});




