const { LoginPage } = require("./LoginPage.js");
const { Dashboard } = require("./Dashboard.js");
const { Cart } = require("./Cart.js");
const { CheckOutPage } = require("./CheckOutPage.js");
const { OrderHistoryPage } = require("./OrderHistoryPage.js");

class POMmanager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboard = new Dashboard(this.page);
    this.cart = new Cart(this.page);
    this.checkOutPage = new CheckOutPage(this.page);
    this.orderHistoryPage = new OrderHistoryPage(this.page);
  }
  getLoginPage() {
    return this.loginPage;
  }
  getDashboardPage() {
    return this.dashboard;
  }
  getCart() {
    return this.cart;
  }
  getCheckOutPage() {
    return this.checkOutPage;
  }
  getOrderHistoryPage() {
    return this.orderHistoryPage;
  }
}
module.exports = { POMmanager };
