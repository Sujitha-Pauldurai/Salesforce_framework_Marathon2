//import Page objects from the Pages folder
import { appLaunch } from "../../pages/appLauncher";

import { LeadsPage } from "../../pages/LeadsPage";

import { Opportunities } from "../../pages/opportunitiesPage";

import  { expect,test } from "playwright/test";

//Reuses the saved Salesforce authentication session
test.use(
    {
       storageState:'test-data/salesforce.json' 
    }
)

// Defines which application to be opened from the App launcher page
let app ="Marketing CRM Classic"
//app = "Service"


test("Testcase 1: Verify Lead Creation and Conversion to Opportunity", async({page}) => {

    // The application takes lot of time to load elements and pages. test.slow() allows additional execution time for this test 
    test.slow()

    // Navigates to the Salesforce home page
    await page.goto("https://orgfarm-2596c4c030-dev-ed.develop.lightning.force.com/lightning/page/home");
    
    // Verifies that the session is already authenticated
    await expect(page).not.toHaveURL(/login/);

    await page.waitForLoadState("domcontentloaded");

    let openApp = new appLaunch(page)
  
    // Open the defined sales force app page using the created appLaunch class object
    await openApp.openApp(app)

    let lead = new LeadsPage(page)

    // Open the Leads page using the created LeadPage class object
    await lead.openLeadsPage()

    //Retrieve and print the current number of leads
    let leadCount = await lead.leadCount()

    console.log("Total Leads Present : ",leadCount);

    //Create a new lead
    await lead.newLead() 

    let opportunityName:string = "QEagle"
    
    //Convert the created lead to an opportinity
    await lead.convertLead(opportunityName) 

    let opportunity = new Opportunities(page) 

    // assert the lead is sucessfully converted into opportunity
    await opportunity.openOpportunities()

    await opportunity.findOpportunity(opportunityName)

    await opportunity.openOpportunityDetail(opportunityName)
    





})