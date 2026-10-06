const base = require('@playwright/test');
const {APIUtils} = require('./APIUtils.js');
const {request} = require('@playwright/test');

const loginPayLoad = {userEmail: "jDoe@gmail.com", userPassword: "Learning123"};
const orderPayLoad = {orders: [{country: "Guinea", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

exports.customtest = base.test.extend({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill(loginPayLoad.userEmail);
    await page.locator('#userPassword').fill(loginPayLoad.userPassword);
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    await use(page);
    //tear down
    await context.close();





  },

  createOrder : async({},use)=>
  {
   const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext,loginPayLoad);
   const response =  await apiUtils.createOrder(orderPayLoad);
   await use(response);
   await apiContext.dispose();

  },

  testDataForOrder : {

    productName : 'ADIDAS ORIGINAL'
  }
});








