import {Page,Locator} from '@playwright/test';


export class OrderHistoryPage {

orderTable : Locator;
rowInOrdersPage : Locator;
orderdIdDetails : Locator;

  constructor(page: Page) {
    this.orderTable = page.locator("tbody");
    this.rowInOrdersPage = page.locator("tbody tr");
    this.orderdIdDetails =page.locator(".col-text");
  }

  async searchAndSelect(orderId: any) {
    await this.orderTable.waitFor();
    const countOfRow = await this.rowInOrdersPage.count();

    for (let i = 0; i < countOfRow; i++) {
      // console.log(rowInOrdersPage.nth(i+1).textContent())
      if (
        (await this.rowInOrdersPage.nth(i).locator("th").textContent()) === orderId
      ) 
      {
        await this.rowInOrdersPage.nth(i).locator("button").first().click();
        break;
      }
    }
  }

  async getOrderId(){
    return await this.orderdIdDetails.textContent();
  }
}
module.exports = {OrderHistoryPage}
