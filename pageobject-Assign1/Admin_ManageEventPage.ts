import {Page, Locator} from  '@playwright/test'

// Step 2 — Create a new event
// - Navigate to /admin/events
// - Generate a unique event title using Test Event ${Date.now()} — store this in a variable, you will need it throughout the test
// - Fill Title field (locate by id #event-title-input)
// - Fill Description textarea (locate using #admin-event-form textarea)
// - Fill City field (locate by label City)
// - Fill Venue field (locate by label Venue)
// - Fill Event Date & Time field (locate by label Event Date & Time) — use your futureDateValue() helper
// - Fill Price ($) field (locate by label Price ($)) — use any number e.g. 100
// - Fill Total Seats field (locate by label Total Seats) — use 50
// - Click the submit button (locate by id #add-event-btn)
// - Assert: toast message Event created! is visible

export class Admin_ManageEventPage{

     titleTxtBox: Locator;
     descriptionTxtArea: Locator;
     cityField: Locator;
     venueField : Locator;
     eventDateField: Locator;
     priceField : Locator;
     tSeats : Locator;
     submitBtn: Locator;
     page: Page;
     

    constructor(page : Page){
        this.page = page;
        this.titleTxtBox = page.locator("#event-title-input");
        this.descriptionTxtArea = page.locator("#admin-event-form textarea)")
        this.cityField = page.getByLabel("City");
        this.venueField = page.getByLabel("Venue");
        this.eventDateField = page.getByLabel("Event Date & Time");
        this.priceField = page.getByLabel("Price");
        this.tSeats= page.getByLabel("Total Seats");
        this.submitBtn = page.locator("#id");
    }

    
    async navigateToAdminEvents(){
         await this.page.goto("https://eventhub.rahulshettyacademy.com/admin/events");
    }
    
    
    
    async fillThedetails(){

    }

}

// module.exports ={Admin_ManageEventPage}

