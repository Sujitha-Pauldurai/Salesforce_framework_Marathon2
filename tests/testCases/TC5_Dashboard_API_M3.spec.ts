//import custom fixtures
import {test} from "../../utils/customFixture"

//Reuses the saved Salesforce authentication session
test.use(
    {
       storageState:'test-data/salesforce.json' 
    }
)

// Defines which application to be opened from the App launcher page
let item ="Dashboards"
//app = "Marketing CRM Classic"

let dbName = 'Salesforce Automation by Sujitha'

test("Testcase 5: Create a dashboard and verify it using API  ", async({loginFix,openAppFix,dashboardFix,APIFix}) => {

     // The application takes lot of time to load elements and pages. test.slow() allows additional execution time for this test 
    test.slow()

    loginFix.openHome()
  
    // Open the defined sales force app page using the created appLaunch class object
    await openAppFix.openItem(item)

    await dashboardFix.newDashboard(dbName)

    let token=await APIFix.generateAccessToken()

    let dashboardID = await APIFix.getDashboardItems(token,dbName)

    await APIFix.deleteDashboardItem(token, dashboardID)

})