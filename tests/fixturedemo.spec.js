const {test,expect,request} = require('@playwright/test');
const {customtest} = require ('../utils/fixtures.js');
customtest("Fixtures demo",async({authenticatedPage})=>{

    //Fixture: a reusable code block
    await authenticatedPage.goto("https://rahulshettyacademy.com/client/");


})
