import {test} from "../../utils/customFixture"
import leads from "../../test-data/leads.json"

//Reuses the saved Salesforce authentication session
test.use(
    {
       storageState:'test-data/salesforce.json' 
    }
) 

// Defines which application to be opened from the App launcher page
let item ="Leads"
//app = "Marketing CRM Classic"

let dbName = 'Salesforce Automation by Sujitha'

let tableName = 'Lead'

test("Testcase 5: Create a dashboard and verify it using API  ", async({loginFix,openAppFix,leadFix,APIFix}) => {

     // The application takes lot of time to load elements and pages. test.slow() allows additional execution time for this test 
    test.slow()

     let token=await APIFix.generateAccessToken()

    let leadID = await APIFix.POSTRequest(token, tableName,leads.Lead1)

    await APIFix.PATCHRequest(token, tableName,leadID, leads.Lead1Update)

    await loginFix.openHome()
  
    // Open the defined sales force app page using the created appLaunch class object
    //await openAppFix.openItem(item)

    await leadFix.search_Delete_Lead("Thanush")





    

})