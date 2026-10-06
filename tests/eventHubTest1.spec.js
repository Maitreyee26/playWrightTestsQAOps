const { test, expect, request } = require("@playwright/test");
const { APIUtilsEhub } = require("../utils/APIUtils_eventHub");


const loginPayLoad = {
  email: "johnDoe@gmail.com",
  password: "8S76VJt_V8Dwf8V",
};
const SIX_EVENTS_RESPONSE = {
  data: [
    {
      id: 1,
      title: "Tech Summit 2025",
      category: "Conference",
      eventDate: "2025-06-01T10:00:00.000Z",
      venue: "HICC",
      city: "Hyderabad",
      price: "999",
      totalSeats: 200,
      availableSeats: 150,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 2,
      title: "Rock Night Live",
      category: "Concert",
      eventDate: "2025-06-05T18:00:00.000Z",
      venue: "Palace Grounds",
      city: "Bangalore",
      price: "1500",
      totalSeats: 500,
      availableSeats: 300,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 3,
      title: "IPL Finals",
      category: "Sports",
      eventDate: "2025-06-10T19:30:00.000Z",
      venue: "Chinnaswamy",
      city: "Bangalore",
      price: "2000",
      totalSeats: 800,
      availableSeats: 50,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 4,
      title: "UX Design Workshop",
      category: "Workshop",
      eventDate: "2025-06-15T09:00:00.000Z",
      venue: "WeWork",
      city: "Mumbai",
      price: "500",
      totalSeats: 50,
      availableSeats: 20,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 5,
      title: "Lollapalooza India",
      category: "Festival",
      eventDate: "2025-06-20T12:00:00.000Z",
      venue: "Mahalaxmi Racecourse",
      city: "Mumbai",
      price: "3000",
      totalSeats: 5000,
      availableSeats: 2000,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 6,
      title: "AI & ML Expo",
      category: "Conference",
      eventDate: "2025-06-25T10:00:00.000Z",
      venue: "Bangalore International Exhibition Centre",
      city: "Bangalore",
      price: "750",
      totalSeats: 300,
      availableSeats: 180,
      imageUrl: null,
      isStatic: false,
    },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};
const FOUR_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

//loginAndGoToEvents(page) function 
async function loginAndGoToEvents(page) {
  await page.addInitScript((token) => {
    window.localStorage.setItem("eventhub_token", token);
  }, response);

  await page.goto("https://eventhub.rahulshettyacademy.com/events");
};

let response = {};

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtilsEhub(apiContext, loginPayLoad);
  response = await apiUtils.getToken();
});



test("Test 1 — Banner IS visible when 6 events are returned", async ({
  page,
}) => {

   // Step 1 — Set up the API mock
  await page.route(
    "https://api.eventhub.rahulshettyacademy.com/api/events*",
    async (route) => {
      // response = await page.request.fetch(route.request);
      const body = JSON.stringify(SIX_EVENTS_RESPONSE);

      await route.fulfill({
        contentType: "application/json",
        body,
        status: 200,
      });
    },
  );
  // Step 2 — Login and navigate
  await loginAndGoToEvents(page);
  // await page.goto("https://eventhub.rahulshettyacademy.com/events");
// Step 3 — Verify cards loaded from mock
  await expect(
  page.locator("[data-testid='event-card']").first()
).toBeVisible();
  await expect(page.locator("[data-testid='event-card']")).toHaveCount(6);
  await expect(page.getByText(/sandbox holds up to/i)).toBeVisible();
  await expect(page.getByText(/sandbox holds up to/i)).toContainText("9 bookings");
});

test('Test 2 — Banner is NOT visible when 4 events are returned',async ({page})=>{
await page.route(
    "https://api.eventhub.rahulshettyacademy.com/api/events*",
    async (route) => {
      // response = await page.request.fetch(route.request);
      const body = JSON.stringify(FOUR_EVENTS_RESPONSE);

      await route.fulfill({
        contentType: "application/json",
        body,
        status: 200,
      });
    },
  );
  // Step 2 — Login and navigate
  await loginAndGoToEvents(page);

   
  // Step 3 — Verify cards loaded from mock
  await page.locator("[data-testid='event-card']").first().isVisible();
  await expect(page.locator("[data-testid='event-card']")).toHaveCount(4);

const isBannerVisible = await page.getByText(/sandbox holds up to/i).isVisible();

console.log(isBannerVisible);

expect(isBannerVisible).toBeFalsy();

})