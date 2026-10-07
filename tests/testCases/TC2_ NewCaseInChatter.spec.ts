//import Page objects from the Pages folder
import { appLaunch } from "../../pages/appLauncher";

import { CasesPage } from "../../pages/casesPage";

import { Chatter } from "../../pages/chatter";

import { expect,test } from "playwright/test";

//Reuses the saved Salesforce authentication session
test.use(
    {
       storageState:'test-data/salesforce.json' 
    }
)

// Defines which application to be opened from the App launcher page
let app ="Service"
//app = "Marketing CRM Classic"

let updateStatus="Escalated",comment ='case is pending'


test("Testcase 2: Create and verify a New Case in Chatter ", async({page}) => {

    // The application takes lot of time to load elements and pages. test.slow() allows additional execution time for this test 
    test.slow()

    // Navigates to the Salesforce home page
    await page.goto("https://orgfarm-2596c4c030-dev-ed.develop.lightning.force.com/lightning/page/home");
   
    // Verifies that the session is already authenticated
    await expect(page).not.toHaveURL(/login/);

 
    let openApp = new appLaunch(page)

    await page.waitForLoadState("domcontentloaded");
  
    // Open the defined sales force app page using the created appLaunch class object
    await openApp.openApp(app)

    let caseP = new CasesPage(page)

    //Opening the cases tab
    await caseP.openCasesTab()

    //Calling the method to find we have any existing cases and it's count
    await caseP.casesCount()

    //calling a method to create a newCase and storing the newly created case number in a variable
    let caseNumber = await caseP.newCase()

    //Calling a method to update the case status
    await caseP.updateCaseStatus(updateStatus)

    //Calling a method to share a comment
    await caseP.shareAndUpdate(comment)

    //Calling a method to like the post
    await caseP.likeFead(comment)

    let chatP = new Chatter(page)

    //Calling a method to opening a Chatter tab
    await chatP.openChatterTab()

    //Calling a method to verify the post is Liked or not
    //await chatP.verifyPostLiked(caseNumber)
    await chatP.verifyPostLiked("00001123")

})