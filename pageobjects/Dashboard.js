const {expect}= require ('@playwright/test');

class Dashboard {
  constructor(page) {

    this.allCardTitles = page.locator(".card-body b");
    this.product = page.locator(".card-body");
    this.cartLink = page.locator("[routerlink*='cart']");
    this.textContainer= page.locator(".toast-container");
    this. ordersLink = page.locator("button[routerlink*='myorders']");
  }

  async searchForCardTitle(productName) {
    await this.allCardTitles.last().waitFor();
    const count = await this.product.count();
    for (let i = 0; i < count; i++) {
      console.log(await this.product.nth(i).locator("b").textContent());
      if (
        (await this.product.nth(i).locator("b").textContent()) === productName
      ) {
        this.product.nth(i).locator("text= Add To Cart").click();
        //product.nth(i).locator("[text = ' Add To Cart']").click(),
        await this.verifyTheAddToCartMessage();
        break;
      }
    }
  }
  async verifyTheAddToCartMessage() {
    await expect(this.textContainer).toContainText("Product");
    console.log(await this.textContainer.textContent());
  }
  async navigateToCart(){
    await this.cartLink.click();
  }
  async navigateToOrders(){
    await this.ordersLink.waitFor();
    await this.ordersLink.click();
  }
}

module.exports = {Dashboard};