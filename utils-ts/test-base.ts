
import {test as baseTest} from '@playwright/test';
interface Data
{
    userName: string,
    password: string,
    productName: string,
    countryName: string,
    countryCode: string,


}
export const customtest1 = baseTest.extend<{data:Data}>
({
  data: {
    userName: "jDoey@gmail.com",
    password: "Maitreyee00",
    productName: "ADIDAS ORIGINAL",
    countryName: "Guinea",
    countryCode: "Gui",
  }
});