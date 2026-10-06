const {test,expect, request} = require ("@playwright/test");
const loginPayLoad = {userEmail: "jDoe@gmail.com", userPassword: "Learning123"};
const orderPayLoad = {orders: [{country: "Guinea", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

let token;
let orderId;
test.beforeAll(async() =>
    {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:loginPayLoad
    }
  );
 expect(loginResponse.ok()).toBeTruthy();
  const loginResponceJson = await loginResponse.json();
 token = loginResponceJson.token;

  console.log(token);

  const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data: orderPayLoad,
        headers:{
            'Authorization': token,
            'Content-Type':'application/json'
        },

    }
  )
  const orderResponseJson = await orderResponse.json();
  console.log(orderResponseJson);
  orderId = orderResponseJson.orders[0];


});

test.beforeEach(()=>{

});


//beforeAll runs at the 1st block before running all the testcse (test 1, test 2, test 3 
test ('Place An Order',async ({page}) =>{

    // const emailTextBox = page.locator("#userEmail");
    // const pswdTextBox = page.locator("#userPassword");
    // const loginBtn = page.locator("#login");
    const allCardTitles = page.locator(".card-body b");
    const product = page.locator (".card-body");
    const ordersLink = page.locator("button[routerlink*='myorders']");
    const placeOrderBtn = page.locator(".action__submit");
    const rowInOrdersPage = page.locator("tbody tr");

    const email = "jDoe@gmail.com"
    const productName = 'ZARA COAT 3';
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },token);

     await page.goto("https://rahulshettyacademy.com/client/");

 await ordersLink.waitFor();
await ordersLink.click();
await page.locator("tbody").waitFor();
const countOfRow = await rowInOrdersPage.count();

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