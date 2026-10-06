import {Page} from '@playwright/test';
import { LoginPage } from "./LoginPage";
import { Admin_ManageEventPage } from './Admin_ManageEventPage';

export class POMmanager{
    page: Page;
    loginPage : any;
    adminManageEventPage: any;
    
    constructor(page:Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.adminManageEventPage = new Admin_ManageEventPage(this.page);

    }

    getLoginpage(){
        return this.loginPage;
    }

    getadminManageEventPage(){
        return this.adminManageEventPage;
    }

}

// module.exports ={POMmanager};