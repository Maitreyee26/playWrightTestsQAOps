class LoginPage{
    constructor(page){
        this.page = page;
        this.loginBtn = page.locator("#login");
        this.emailTextBox = page.locator("#userEmail");
        this.pswdTextBox = page.locator("#userPassword");
    }
async goTo(){
    await this.page.goto("https://rahulshettyacademy.com/client");
}

    async validLogin(userName, password){
    await this.emailTextBox.fill(userName);
    await this.pswdTextBox .fill(password);
    await this.loginBtn.click();
    }

}

module.exports= {LoginPage};