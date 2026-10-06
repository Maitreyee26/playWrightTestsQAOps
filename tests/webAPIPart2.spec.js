const {test,expect, request} = require ("@playwright/test");
const loginPayLoad = {userEmail: "jDoe@gmail.com", userPassword: "Learning123"};
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const {APIUtils} = require('../utils/APIUtils');
let response={};
test.beforeAll(async() =>
    {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils (apiContext,loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);

});


//beforeAll runs at the 1st block before running all the testcse (test 1, test 2, test 3 
test ('Place An Order',async ({page}) =>{
    const ordersLink = page.locator("button[routerlink*='myorders']");
    const rowInOrdersPage = page.locator("tbody tr");
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },response.token);

     await page.goto("https://rahulshettyacademy.com/client/");

 await ordersLink.waitFor();
await ordersLink.click();
await page.locator("tbody").waitFor();
const countOfRow = await rowInOrdersPage.count();
const orderId = response.orderId
for(let i=0;i<countOfRow;i++)
{
   // console.log(rowInOrdersPage.nth(i+1).textContent())
    if(await rowInOrdersPage.nth(i).locator("th").textContent()=== orderId)
    {
        await rowInOrdersPage.nth(i).locator("button").first().click();
        break;
    }
}
await expect (page.locator(".col-text")).toHaveText(orderId);

});