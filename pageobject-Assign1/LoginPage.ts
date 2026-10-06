import {test,Page,Locator,expect} from '@playwright/test';

// - Navigate to /login

// - Fill email field (locate by placeholder you@email.com)

// - Fill password field (locate by label Password)

// - Click the login button (locate by id #login-btn)

// - Assert: link with text Browse Events → is visible (confirms login success)

export class LoginPage{
    emailTxtBox : Locator;
    passwordTxtBox : Locator;
    loginBtn : Locator;
    browserEvent: Locator;

    constructor(page: Page){
        this.emailTxtBox = page.locator("[placeholder='you@email.com']");
        this.passwordTxtBox =page.getByLabel("password");
        this.loginBtn = page.locator("#login-btn");
        this.browserEvent = page.getByRole('link', { name: 'Browse Events' })
    }

    async fillTheDetails(email : string, password:string){
        await this.emailTxtBox.fill(email);
        await this.passwordTxtBox.fill(password);
        await this.loginBtn.click();

    }
    async verifyLoginSuccess() {
        await expect(this.browserEvent).toBeVisible();
    }

}

// module.exports = {LoginPage};
