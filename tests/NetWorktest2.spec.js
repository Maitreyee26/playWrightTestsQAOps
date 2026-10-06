const { test, expect, request } = require("@playwright/test");
const loginPayLoad = {
  userEmail: "jDoe@gmail.com",
  userPassword: "Learning123",
};
const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};
const { APIUtils } = require("../utils/APIUtils");
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response = {};
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

test("Security test request intercept", async ({page}) => {
  //login and reach orders page
  const ordersLink = page.locator("button[routerlink*='myorders']");
  
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
await page.goto("https://rahulshettyacademy.com/client/");
  
  //continue is used to intercept request in page
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6aaa7b2252cfef34ed0e188b",
      }),
  );
  await ordersLink.click();
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});
// const { test, expect, request } = require("@playwright/test");

// const loginPayLoad = {
//   userEmail: "jDoe@gmail.com",
//   userPassword: "Learning123",
// };

// const orderPayLoad = {
//   orders: [
//     {
//       country: "India",
//       productOrderedId: "6960eac0c941646b7a8b3e68",
//     },
//   ],
// };

// const { APIUtils } = require("./utils/APIUtils");

// test('@QW Security test request intercept', async ({ page }) => {
 
//     //login and reach orders page
//     await page.goto("https://rahulshettyacademy.com/client");
//     await page.locator("#userEmail").fill("anshika@gmail.com");
//     await page.locator("#userPassword").fill("Iamking@000");
//     await page.locator("[value='Login']").click();
//     await page.waitForLoadState('networkidle');
//     await page.locator(".card-body b").first().waitFor();
 
//     await page.locator("button[routerlink*='myorders']").click();
//     await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
//         route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
//     await page.locator("button:has-text('View')").first().click();
//     await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
// })