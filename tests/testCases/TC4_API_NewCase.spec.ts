import { test,request } from "@playwright/test"
import {APIMethods} from "../../pages/APIMethods"

test("API Testng", async({request})=>{

    let apiMethods=new APIMethods(request)

    let tokenDetails = await apiMethods.generateAccessToken()
    
    let accountID = await apiMethods.createAccount(tokenDetails.iURL, tokenDetails.tokenT, tokenDetails.tokenV)

    let contactId = await apiMethods.createContact(tokenDetails.iURL, tokenDetails.tokenT, tokenDetails.tokenV)

    let caseId = await apiMethods.createCase(tokenDetails.iURL, tokenDetails.tokenT, tokenDetails.tokenV, contactId, accountID)

    await apiMethods.getCaseDetails(tokenDetails.iURL, tokenDetails.tokenT, tokenDetails.tokenV, caseId)

    await apiMethods.updateCaseDetails(tokenDetails.iURL, tokenDetails.tokenT, tokenDetails.tokenV, caseId)

    await apiMethods.deleteCaseDetails(tokenDetails.iURL, tokenDetails.tokenT, tokenDetails.tokenV, caseId)
})