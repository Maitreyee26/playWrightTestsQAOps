import {test, expect} from '@playwright/test'

test ("Special locators",async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByPlaceholder ("Password").fill("passWord");
    await page.getByLabel("Employed").check();
    await page.getByRole("button",{name: 'Submit'}).click();
    await page.getByText( "The Form has been submitted successfully!").isVisible();
})