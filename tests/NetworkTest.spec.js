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

//Fake the payload as there is no page
//intercept the response
test("Place An Order", async ({ page }) => {
  const ordersLink = page.locator("button[routerlink*='myorders']");
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill({
        response,
        body,
      });
    },
  );
  //await ordersLink.waitFor();
  await page.pause();
  await ordersLink.click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  );

  console.log(await page.locator(".mt-4").textContent());
});
