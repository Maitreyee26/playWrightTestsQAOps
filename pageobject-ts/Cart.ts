import  {Page,Locator, expect} from  '@playwright/test';
export class Cart{
productCard : Locator;
checkOutBtn : Locator;
page: Page;

    constructor(page: Page){
        this.page = page
        this.productCard = page.locator("div li");
        this.checkOutBtn = page.locator("button[type = 'button']");

    }

    async verifyTheCart(productName: String){
        await this.productCard.first().waitFor();
        const bool = await this.page.locator("h3:has-text('"+productName+"')").isVisible(); //tagName:has-text
        expect(bool).toBeTruthy();
  
    }
    async navigateToCheckoutpage(){
        await this.checkOutBtn.last().click();
    }
}

module.exports = {Cart};