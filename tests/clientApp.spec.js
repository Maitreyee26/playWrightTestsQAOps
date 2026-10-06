/**
 * Credentials:
jDoe@gmail.com
Learning123
1234567890
**/
const{test,expect}=require('@playwright/test')

test ('First Assignment',async ({page}) =>{

    
    // await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
    const emailTextBox = page.locator("#userEmail");
    const pswdTextBox = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const allCardTitles = page.locator(".card-body b");
    const product = page.locator (".card-body");
    const ordersLink = page.locator("button[routerlink*='myorders']");
    const placeOrderBtn = page.locator(".action__submit");
    const rowInOrdersPage = page.locator("tbody tr");

    const email = "jDoe@gmail.com"
    const productName = 'ZARA COAT 3';
    
    await emailTextBox.fill(email);
    await pswdTextBox.fill("Learning123");
    await loginBtn.click();

//     //console.log(await allCardTitles.first().textContent());

//    // await page.waitForLoadState("networkidle"); // one solution
    await allCardTitles.last().waitFor();

//     //console.log(await allCardTitles.allTextContents());
//     const allCardContents = await allCardTitles.allTextContents();
//     for(let i=0;i<allCardContents.length;i++)
//         {
//             if(allCardContents[i]== productName)
//                await page.locator(".fa-shopping-cart").nth(i+1).click();

//         }
 //await product.last().waitFor();
 await page.locator('.toast-container').textContent()
 const count = await product.count();
for (let i=0;i<count;i++)

{
    console.log(await product.nth(i).locator('b').textContent());
    if (await product.nth(i).locator('b').textContent()=== productName)
    {
       
            product.nth(i).locator("text= Add To Cart").click(),
             //product.nth(i).locator("[text = ' Add To Cart']").click(),
             await expect(page.locator('.toast-container')).toContainText("Product");
             console.log(await page.locator('.toast-container').textContent());
             break;
        
    }
}
//await page.pause();
 await page.locator("[routerlink*='cart']").click();
 await page.locator ("div li").first().waitFor();
 const bool = await page.locator(`h3:has-text("${productName}")`).isVisible(); //tagName:has-text
 expect(bool).toBeTruthy();
 await page.locator("button[type = 'button']").last().click();
 await page.locator("[placeholder *='Country']").pressSequentially("ind", { delay: 150 });
 //Here, a delay of 150 milliseconds is introduced between each key press.That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d

 const dropdown = page.locator(".ta-results");
 await dropdown.waitFor();
 const optionCount = await dropdown.locator("button").count();

 for(let i=0;i<optionCount;i++)

 {
    const text = await dropdown.locator("button").nth(i).textContent();
    if(text === " India")
    {
        await dropdown.locator("button").nth(i).click();
        break;
    }
 }
 expect (await page.locator("label[type='text']")).toHaveText(email);
 await page.locator(".input[type='text']").nth(2).fill("123");
 await page.locator(".input[type='text']").nth(3).fill("John Doe");
 await page.locator("[name = 'coupon']").fill("rahulshettyacademy");

 await placeOrderBtn.waitFor();
 await placeOrderBtn.click();
 //await page.waitForTimeout(4000)
 
 await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
 const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
 console.log(orderId[1].trim());
 const orderIdArray = orderId.trim().split('|');

 const id = orderIdArray[1].trim()

 await ordersLink.waitFor();
await ordersLink.click();


await page.locator("tbody").waitFor();
const countOfRow = await rowInOrdersPage.count();

for(let i=0;i<countOfRow;i++)
{
   // console.log(rowInOrdersPage.nth(i+1).textContent())
    if(await rowInOrdersPage.nth(i).locator("th").textContent()=== id)
    {
        await rowInOrdersPage.nth(i).locator("button").first().click();
        break;
    }
}
await expect (page.locator(".col-text")).toHaveText(id);

});