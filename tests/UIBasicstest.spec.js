const {test, expect} = require('@playwright/test')

test ('First testcase', async ({browser})=>
{
    //playwright code
    // chrome - plugins/ cookies

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("rahulshettyacademy.com")
});

test ('Page First testcase', async ({page})=>
{
    //playwright code
    // chrome - plugins/ cookies
    const userName = page.locator("#username");
    const signInBtn = page.locator("#signInBtn")
    const pswd = page.locator("[type ='password']")
    const cardTitles = page.locator(".card-body a");


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());

    //await page.locator("#username").fill("maitreyee");
    await userName.fill("maitreyee");
    await page.locator("[type ='password']").fill("learning");
    await page.locator("#signInBtn").click();
    
    //wait until the locator shown up on the page
    console.log(await page.locator("[style *= 'block']").textContent());
    await expect(page.locator("[style *= 'block']")).toContainText("Incorrect");
    await userName.fill("rahulshettyacademy");
    await pswd.fill("Learning@830$3mK2")
    await signInBtn.click();
    
    console.log(await page.locator(".card-body .card-title").nth(1).textContent());

    console.log(await page.locator(".card-body a").first().textContent());
    const alltTitles = await cardTitles.allTextContents();
    console.log(alltTitles);

});

test ('UI controls', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const dropdown = page.locator("Select.form-control");
    await dropdown.selectOption("Consultant");
    const radiobtn =  page.locator (".radiotextsty");
    const documentLink = page.locator ("[href*='documents-request']");
    await radiobtn.last().click();
    await page.locator("#okayBtn").click();

    //assertion
    await expect ((radiobtn).last()).toBeChecked();
    console.log(await radiobtn.last().isChecked());
    await page.locator("#terms").check();

    await expect (page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect (documentLink).toHaveAttribute('class','blinkingText');

    await documentLink.click();
   
    
});

test('Child Window handle', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator ("[href*='documents-request']");
    

    const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'), // listed for any new page pending,rejected,fulfilled
        documentLink.click(),

    ]) //new page is opened
    
    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await userName.fill(domain);
    console.log(await userName.inputValue());



});

