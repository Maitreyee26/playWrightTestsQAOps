import {Locator, Page} from '@playwright/test'


export class LoginPage{
    page: Page;
    loginBtn: Locator;
    emailTextBox: Locator;
    pswdTextBox: Locator;

    constructor(page: Page){
        this.page = page;
        this.loginBtn = page.locator("#login");
        this.emailTextBox = page.locator("#userEmail");
        this.pswdTextBox = page.locator("#userPassword");
    }
async goTo(){
    await this.page.goto("https://rahulshettyacademy.com/client");
}

    async validLogin( userName: string, password:string){
    await this.emailTextBox.fill(userName);
    await this.pswdTextBox .fill(password);
    await this.loginBtn.click();
    }

}

module.exports= {LoginPage};