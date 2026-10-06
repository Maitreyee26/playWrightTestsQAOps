# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: clientAppPO.spec.js >> @Web Client App Login ADIDAS ORIGINAL
- Location: tests\clientAppPO.spec.js:16:1

# Error details

```
TimeoutError: locator.textContent: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.col-text')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [aria-hidden] [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - heading "Your Orders" [level=1] [ref=e26]
    - table [ref=e27]:
      - rowgroup [ref=e28]:
        - row [ref=e29]:
          - columnheader "Order Id" [ref=e30]
          - columnheader "Product Image" [ref=e31]
          - columnheader "Name" [ref=e32]
          - columnheader "Price" [ref=e33]
          - columnheader "Ordered Date" [ref=e34]
          - columnheader "View" [ref=e35]
          - columnheader "Delete" [ref=e36]
      - rowgroup [ref=e37]:
        - row [ref=e38]:
          - rowheader "6ab4c3d32be7a4bc2b6863d4" [ref=e39]
          - cell [ref=e40]
          - cell "ADIDAS ORIGINAL" [ref=e42]
          - cell "$ 11500" [ref=e43]
          - cell "Thu Sep 24" [ref=e44]
          - cell [ref=e45]:
            - button "View" [ref=e46] [cursor=pointer]
          - cell [ref=e47]:
            - button "Delete" [ref=e48] [cursor=pointer]
        - row [ref=e49]:
          - rowheader "6ab4c0e82be7a4bc2b6857b1" [ref=e50]
          - cell [ref=e51]
          - cell "ADIDAS ORIGINAL" [ref=e53]
          - cell "$ 11500" [ref=e54]
          - cell "Thu Sep 24" [ref=e55]
          - cell [ref=e56]:
            - button "View" [ref=e57] [cursor=pointer]
          - cell [ref=e58]:
            - button "Delete" [ref=e59] [cursor=pointer]
        - row [ref=e60]:
          - rowheader "6ab4bf842be7a4bc2b68527e" [ref=e61]
          - cell [ref=e62]
          - cell "ADIDAS ORIGINAL" [ref=e64]
          - cell "$ 11500" [ref=e65]
          - cell "Thu Sep 24" [ref=e66]
          - cell [ref=e67]:
            - button "View" [ref=e68] [cursor=pointer]
          - cell [ref=e69]:
            - button "Delete" [ref=e70] [cursor=pointer]
        - row [ref=e71]:
          - rowheader "6ab4bf7d2be7a4bc2b68522a" [ref=e72]
          - cell [ref=e73]
          - cell "ADIDAS ORIGINAL" [ref=e75]
          - cell "$ 11500" [ref=e76]
          - cell "Thu Sep 24" [ref=e77]
          - cell [ref=e78]:
            - button "View" [ref=e79] [cursor=pointer]
          - cell [ref=e80]:
            - button "Delete" [ref=e81] [cursor=pointer]
        - row [ref=e82]:
          - rowheader "6ab4bf132be7a4bc2b685091" [ref=e83]
          - cell [ref=e84]
          - cell "ADIDAS ORIGINAL" [ref=e86]
          - cell "$ 11500" [ref=e87]
          - cell "Thu Sep 24" [ref=e88]
          - cell [ref=e89]:
            - button "View" [ref=e90] [cursor=pointer]
          - cell [ref=e91]:
            - button "Delete" [ref=e92] [cursor=pointer]
        - row [ref=e93]:
          - rowheader "6ab4bf0c2be7a4bc2b685064" [ref=e94]
          - cell [ref=e95]
          - cell "ADIDAS ORIGINAL" [ref=e97]
          - cell "$ 11500" [ref=e98]
          - cell "Thu Sep 24" [ref=e99]
          - cell [ref=e100]:
            - button "View" [ref=e101] [cursor=pointer]
          - cell [ref=e102]:
            - button "Delete" [ref=e103] [cursor=pointer]
        - row [ref=e104]:
          - rowheader "6ab3da072be7a4bc2b669b46" [ref=e105]
          - cell [ref=e106]
          - cell "ADIDAS ORIGINAL" [ref=e108]
          - cell "$ 11500" [ref=e109]
          - cell "Wed Sep 23" [ref=e110]
          - cell [ref=e111]:
            - button "View" [ref=e112] [cursor=pointer]
          - cell [ref=e113]:
            - button "Delete" [ref=e114] [cursor=pointer]
    - generic [ref=e115]: "* If orders Will be more than 7 your last order will get deleted"
  - generic [ref=e117]:
    - button "Go Back to Shop" [ref=e118] [cursor=pointer]
    - button "Go Back to Cart" [ref=e119] [cursor=pointer]
```

# Test source

```ts
  1  | class OrderHistoryPage {
  2  |   constructor(page) {
  3  |     this.orderTable = page.locator("tbody");
  4  |     this.rowInOrdersPage = page.locator("tbody tr");
  5  |     this.orderdIdDetails =page.locator(".col-text");
  6  |   }
  7  | 
  8  |   async searchAndSelect(orderId) {
  9  |     await this.orderTable.waitFor();
  10 |     const countOfRow = await this.rowInOrdersPage.count();
  11 | 
  12 |     for (let i = 0; i < countOfRow; i++) {
  13 |       // console.log(rowInOrdersPage.nth(i+1).textContent())
  14 |       if (
  15 |         (await this.rowInOrdersPage.nth(i).locator("th").textContent()) === orderId
  16 |       ) 
  17 |       {
  18 |         await this.rowInOrdersPage.nth(i).locator("button").first().click();
  19 |         break;
  20 |       }
  21 |     }
  22 |   }
  23 | 
  24 |   async getOrderId(){
> 25 |     return await this.orderdIdDetails.textContent();
     |                                       ^ TimeoutError: locator.textContent: Timeout 10000ms exceeded.
  26 |   }
  27 | }
  28 | module.exports = {OrderHistoryPage}
  29 | 
```