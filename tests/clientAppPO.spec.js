/**
 * Credentials:
jDoe@gmail.com
Learning123
1234567890
**/
const { test, expect } = require("@playwright/test");
const {dataset} = JSON.parse(JSON.stringify(require('../utils/clientAppPOTestData.json')))
const {POMmanager} = require('../pageobjects/POMmanager.js');
const { customtest1 } = require("../utils/test-base.js");




for (const data of dataset){
test(`@Web Client App Login ${data.productName}`, async ({ page }) => {
 
  

  const userName = data.userName;
  const password = data.password;
  const productName = data.productName;
  const countryName = data.countryName;
  const countryCode = data.countryCode;
  // login page using POM
  const pomManager = new POMmanager(page);

  const loginPage =  pomManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(userName, password);
 

  //dashboard
  const dashBoard =  pomManager.getDashboardPage();
  await dashBoard.searchForCardTitle(productName);
  await dashBoard.navigateToCart();

  //cart
  const cart =  pomManager.getCart();
  await cart.verifyTheCart(productName);
  await cart.navigateToCheckoutpage();
 

  //Here, a delay of 150 milliseconds is introduced between each key press.That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d


//checkout page
const checkoutPage =  pomManager.getCheckOutPage();
await checkoutPage.fillTheDetails(userName);
await checkoutPage.selectOption(countryCode, countryName);
await checkoutPage.navigateToThankYouPage();
const orderId = await checkoutPage.fetchTheOrderId();

//await page.waitForTimeout(4000)
const orderHistoryPage =  pomManager.getOrderHistoryPage();
await dashBoard.navigateToOrders();
await orderHistoryPage.searchAndSelect(orderId);


await expect(
  await orderHistoryPage.getOrderId()
).toBe(orderId);
});



}

customtest1("Client App Logincustomtest1", async ({ page, data }) => {
  const userName = data.userName;
  const password = data.password;
  const productName = data.productName;
  const countryName = data.countryName;
  const countryCode = data.countryCode;
  // login page using POM
  const pomManager = new POMmanager(page);

  const loginPage =  pomManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(userName, password);
 

  //dashboard
  const dashBoard =  pomManager.getDashboardPage();
  await dashBoard.searchForCardTitle(productName);
  await dashBoard.navigateToCart();

  //cart
  const cart =  pomManager.getCart();
  await cart.verifyTheCart(productName);
  await cart.navigateToCheckoutpage();
 

  //Here, a delay of 150 milliseconds is introduced between each key press.That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d


//checkout page
const checkoutPage =  pomManager.getCheckOutPage();
await checkoutPage.fillTheDetails(userName);
await checkoutPage.selectOption(countryCode, countryName);
await checkoutPage.navigateToThankYouPage();
const orderId = await checkoutPage.fetchTheOrderId();

//await page.waitForTimeout(4000)
const orderHistoryPage =  pomManager.getOrderHistoryPage();
await dashBoard.navigateToOrders();
await orderHistoryPage.searchAndSelect(orderId);


await expect(
  await orderHistoryPage.getOrderId()
).toBe(orderId);
});
