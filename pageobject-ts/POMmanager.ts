
import { LoginPage } from "./LoginPage";
import { Dashboard } from "./Dashboard";
import { Cart } from "./Cart"
import { CheckOutPage } from "./CheckOutPage";
import { OrderHistoryPage } from "./OrderHistoryPage";
import {Page} from '@playwright/test'

export class POMmanager {

  loginPage: LoginPage;
  dashboard : Dashboard;
  cart : Cart;
  checkOutPage: CheckOutPage;
  orderHistoryPage: OrderHistoryPage;
  page: Page;

  constructor(page: any) {
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
