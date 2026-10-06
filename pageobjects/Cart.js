const {expect}= require ('@playwright/test');
class Cart{
    constructor(page){
        this.page = page
        this.productCard = page.locator("div li");
        this.checkOutBtn = page.locator("button[type = 'button']");

    }

    async verifyTheCart(productName){
        await this.productCard.first().waitFor();
        const bool = await this.page.locator("h3:has-text('"+productName+"')").isVisible(); //tagName:has-text
        expect(bool).toBeTruthy();
  
    }
    async navigateToCheckoutpage(){
        await this.checkOutBtn.last().click();
    }
}

module.exports = {Cart};