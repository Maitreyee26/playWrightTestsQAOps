const base = require("@playwright/test");

exports.customtest1 = base.test.extend({
  data: {
    userName: "jDoey@gmail.com",
    password: "Maitreyee00",
    productName: "ADIDAS ORIGINAL",
    countryName: "Guinea",
    countryCode: "Gui",
  }
});