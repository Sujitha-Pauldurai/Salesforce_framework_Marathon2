import test, { expect } from "@playwright/test";
import { appLaunch } from "../../pages/appLauncher";

import { LeadsPage } from "../../pages/LeadsPage";

//Reuses the saved Salesforce authentication session
test.use(
    {
       storageState:'test-data/salesforce.json' 
    }
)

// Defines which application to be opened from the App launcher page
let app ="Leads"
//app = "Service"


test("Testcase 3: Create Lead - Week6/Day3 assignment", async({page}) => {


        test.slow()

     // Navigates to the Salesforce home page
        await page.goto("https://orgfarm-2596c4c030-dev-ed.develop.lightning.force.com/lightning/page/home");
        
        // Verifies that the session is already authenticated
        await expect(page).not.toHaveURL(/login/);
    
        await page.waitForLoadState("domcontentloaded");
    
        let openApp = new appLaunch(page)
      
        // Open the defined sales force app page using the created appLaunch class object
        await openApp.openItem(app)
    
        let lead = new LeadsPage(page)

        //Retrieve and print the current number of leads
        let leadCount = await lead.leadCount()

        console.log("Total Leads Present : ",leadCount);

        //Create a new lead
        await lead.newLead() 

        console.log("-----------------------------");
        

})