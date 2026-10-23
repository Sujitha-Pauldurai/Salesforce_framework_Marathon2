//import custom fixtures
import {test} from "../../utils/customFixture"

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


test("Testcase 2: Create and verify a New Case in Chatter ", async({loginFix,caseFix,chatterFix,openAppFix}) => {

    // The application takes lot of time to load elements and pages. test.slow() allows additional execution time for this test 
    test.slow()

    loginFix.openHome()

 
    //let openApp = new appLaunch(page)

    //await page.waitForLoadState("domcontentloaded");
  
    // Open the defined sales force app page using the created appLaunch class object
    //await openAppFix.openApp(app)

    //let caseP = new CasesPage(page)

    //Opening the cases tab
    await caseFix.openCasesTab()

    //Calling the method to find we have any existing cases and it's count
    await caseFix.casesCount()

    //calling a method to create a newCase and storing the newly created case number in a variable
    let caseNumber = await caseFix.newCase()

    //Calling a method to update the case status
    await caseFix.updateCaseStatus(updateStatus)

    //Calling a method to share a comment
    await caseFix.shareAndUpdate(comment)

    //Calling a method to like the post
    await caseFix.likeFead(comment)

    //let chatP = new Chatter(page)

    //Calling a method to opening a Chatter tab
    await chatterFix.openChatterTab()

    //Calling a method to verify the post is Liked or not
    //await chatP.verifyPostLiked(caseNumber)
    await chatterFix.verifyPostLiked("00001123")

})