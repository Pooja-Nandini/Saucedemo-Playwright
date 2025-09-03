import { Page } from "@playwright/test";

 class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public get inputUsername() {
    return this.page.locator('//input[@data-test="username"]');
  }

  public get inputPassword() {
    return this.page.locator('//input[@data-test="password"]');
  }

  public get btnLogin() {
    return this.page.locator("#login-button");
  }

  public get titleProducts() {
    return this.page.locator("span.title");
  }

  public async navigateToLoginPage() {
    await this.page.goto("https://www.saucedemo.com/");
  }

 public async login(username: string, password: string) {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.btnLogin.click();
  }
  public async loginAction(username: string, password: string){
    await this.navigateToLoginPage();
    await this.login(username, password)
  }

}
export{LoginPage}
