import  {Page,Locator, expect} from  '@playwright/test';

export class CheckOutPage {
  countrySelect : Locator;
  dropdown : Locator;
  userNameTxtBox : Locator;
  txtBox : Locator;
  couponTxtBox : Locator;
  placeOrderBtn: Locator;
  thankyouMessage: Locator;
  orderIds: Locator;
  
  constructor(page: Page) {
    this.countrySelect = page.locator("[placeholder *='Country']");
    this.dropdown = page.locator(".ta-results");
    this.userNameTxtBox = page.locator("label[type='text']");
    this.txtBox = page.locator(".input[type='text']");
    this.couponTxtBox = page.locator("[name = 'coupon']");
    this.placeOrderBtn = page.locator(".action__submit");
    this.thankyouMessage = page.locator(".hero-primary");
    this.orderIds= page
    .locator(".em-spacer-1 .ng-star-inserted")
  }
  async selectOption(countryCode: string, countryName: string) {
    await this.countrySelect
      .pressSequentially(countryCode);
    await this.dropdown.waitFor();
    const optionCount = await this.dropdown.locator("button").count();

    for (let i = 0; i < optionCount; i++) {
      let text: any;
       text  = await this.dropdown.locator("button").nth(i).textContent();
      if (text.trim() === countryName) {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }
  async fillTheDetails(userName: string) {
    await expect(this.userNameTxtBox).toHaveText(userName);
    await this.txtBox.nth(2).fill("123");
    await this.txtBox.nth(3).fill("John Doe");
    await this.couponTxtBox.fill("rahulshettyacademy");
  }

  async navigateToThankYouPage() {
    await this.placeOrderBtn.click();
      await expect(this.thankyouMessage).toHaveText(
    " Thankyou for the order. ",
  );
  

  }

  async fetchTheOrderId(){
    let orderId : any
     orderId = await 
    this.orderIds.textContent();
  console.log(orderId[1].trim());
  const orderIdArray = orderId.trim().split("|");

  return(orderIdArray[1].trim());

  
  }
}

module.exports= {CheckOutPage}
