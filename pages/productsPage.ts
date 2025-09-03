import { Page } from "@playwright/test"
import { Locator } from "@playwright/test";

import assert from "assert";

class ProductsPage{
     readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
    public get iconFilter(){
        return this.page.locator('//select[@data-test="product-sort-container"]')
    }
    public get prices(){
        return this.page.locator('//div[@data-test="inventory-item-price"]')
    }
    public get btnAddToCart(){
        return this.page.locator('//button[text()="Add to cart"]')
    }
    public get iconShoppingCart(){
        return this.page.locator('a.shopping_cart_link')
    }
    public get btnCheckout(){
        return this.page.locator('button#checkout')
    }
    public get inputFirstName(){
        return this.page.locator('//input[@placeholder="First Name"]')
    }
    public get inputLastName(){
        return this.page.locator('//input[@placeholder="Last Name"]')
    }
    public get inputZip(){
        return this.page.locator('//input[@placeholder="Zip/Postal Code"]')
    }
    public get btnContinue(){
        return this.page.locator('//input[@data-test="continue"]')
    }
    public get productLabel(){
        return this.page.locator('div.cart_item_label')
    }
    public get titleCheckOutYourInformation(){
        return this.page.locator('//span[text()="Checkout: Your Information"]')
    }
    public get titleYourCart(){
        return this.page.locator('//span[text()="Your Cart"]');
    }
    public get itemTotal(){
        return this.page.locator('div.summary_subtotal_label')
    }
    public get tax(){
        return this.page.locator('div.summary_tax_label')
    }
    public get total(){
        return this.page.locator('div.summary_total_label')
    }
    public get titleCheckoutOverview(){
        return this.page.locator('//span[text()="Checkout: Overview"]')
    }
    public get btnFinish(){
        return this.page.locator('//button[@data-test="finish"]')
    }
    public get bannerThankyou(){
        return this.page.locator('//h2[text()="Thank you for your order!"]')
    }
    public async selectOptionFromDropdown(option: string){
        let pricesBeforeSelect=await this.prices.allTextContents();
        console.log(`The prices of all the products before selectiong an option ${pricesBeforeSelect}`);
        const numericBefore = pricesBeforeSelect.map(p => parseFloat(p.replace('$', '')));
        console.log(`The prices of all the products before selectiong an option ${numericBefore}`);
        await this.iconFilter.selectOption({label:option})
        await this.page.waitForTimeout(1000); 
    }
    public async productPrices(){
        let pricesAfterSelect=await this.prices.allTextContents();
        console.log(`All the product prices after selecting are ${pricesAfterSelect}`);
        const numericAfter = pricesAfterSelect.map(p => parseFloat(p.replace('$', '')));
        console.log(`All the product prices after selecting are ${numericAfter}`);
    }
    public async addTheProducts(){
        let allPrices =await this.productPrices();
        for(let i=0;i<2;i++){
            await this.btnAddToCart.nth(i).click();  
        }
        console.log("Two products are added in to the cart")
    }
    public async fillDetails(firstname:string, lastname: string, zip:string){
        await this.inputFirstName.fill(firstname);
        await this.inputLastName.fill(lastname);
        await this.inputZip.fill(zip);
        console.log(`All the necessary data are filled firstname: ${firstname}, lastname: ${lastname}, zip: ${zip}`)
    }
    public async calculateTotalPrice(){
       let txtTotalItem= await this.itemTotal.innerText();
       console.log("The item total is: "+txtTotalItem)
       const totalItem = parseFloat(txtTotalItem.split("$")[1]);
       console.log(totalItem);

       let txtTax=await this.tax.innerText();
       console.log("The tax is: "+txtTax)
       const totalTax = parseFloat(txtTax.split("$")[1]);
       console.log(totalTax);

       let txtTotal=await this.total.innerText();
       console.log("The total is: "+txtTotal)
       const totalAmount = parseFloat(txtTotal.split("$")[1]);
       console.log(totalAmount);

       let totalPrice=totalItem+totalTax;
       console.log(`The total price is: ${totalPrice}`)
       assert.strictEqual(totalPrice, totalAmount, "Total price does not match the sum of products");
       console.log("Total price matched with the total item and tax")
    }
}
export {ProductsPage}