import { expect, APIRequestContext } from "@playwright/test"
import client from "../test-data/apiClient.json"

export class APIMethods{

    
    protected request


    constructor(request:APIRequestContext){
        this.request = request
    }

    async generateAccessToken(){

        let resBody = await this.request.post('https://orgfarm-2596c4c030-dev-ed.develop.my.salesforce.com/services/oauth2/token',{
        headers:{
        "Content-Type" :"application/x-www-form-urlencoded"

        },
        form:{

        "grant_type":"client_credentials",
        "client_id": client.client_id,
        "client_secret":client.client_secret,

        }
        
    })  
    
    //deserialization-> json to obj
    let tokenRes=await resBody.json()
    console.log(tokenRes)

    expect(resBody.status()).toBe(200)      
    console.log(resBody.status());

    expect(resBody.statusText()).toBe("OK")
    console.log(resBody.statusText());

    let tokenType=tokenRes.token_type
    console.log(tokenType);

    let tokenValue = tokenRes.access_token
    console.log(tokenValue);

    let instanceURL = tokenRes.instance_url
    console.log(instanceURL);
    
    return {tokenT:tokenType,tokenV:tokenValue,iURL:instanceURL}
    }

    async createAccount(instanceURL:string,tokenType:string,tokenValue:any){
         let resBody =await this.request.post(`${instanceURL}/services/data/v65.0/sobjects/Account`,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${tokenType} ${tokenValue}`
        },
        data:{
            "Name" : "Account - PW API",
            "Description": "Account created using playwright API Request"
        }
    })

    let response = await resBody.json()
    console.log("New Account Details: \n",response);

    expect(resBody.status()).toBe(201)
    console.log(resBody.status())

    expect(resBody.statusText()).toBe('Created')
    console.log(resBody.statusText())

    let id=response.id
    console.log(id);

    return id
    
    }

    async createContact(instanceURL:string,tokenType:string,tokenValue:any){

        let resBody =await this.request.post(`${instanceURL}/services/data/v65.0/sobjects/Contact`,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${tokenType} ${tokenValue}`
        },
        data:{
            "LastName" : "Contact - PW API",
            "Description": "Contact created using playwright API Request",
            "Salutation":"Mr"
        }
    })

    let response = await resBody.json()
    console.log("New Contact Details: \n",response);

    expect(resBody.status()).toBe(201)
    console.log(resBody.status())

    expect(resBody.statusText()).toBe('Created')
    console.log(resBody.statusText())

    let contactId=response.id
    console.log(contactId);

    return contactId

    }

    async createCase(instanceURL:string,tokenType:string,tokenValue:any,contactId:string,accountID:string){

        let resBody =await this.request.post(`${instanceURL}/services/data/v65.0/sobjects/Case`,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${tokenType} ${tokenValue}`
        },
        data:{
            "AccountId": accountID,
            "ContactId": contactId,
            "Origin":"Phone",
            "Status":"New"
        }
    })

    let response = await resBody.json()
    console.log("New Case Details: \n",response);

    expect(resBody.status()).toBe(201)
    console.log(resBody.status())

    expect(resBody.statusText()).toBe('Created')
    console.log(resBody.statusText())

    let caseId=response.id
    console.log(caseId);

    return caseId

    }

    async getCaseDetails(instanceURL:string,tokenType:string,tokenValue:any,caseID:string){
        let resBody =await this.request.get(`${instanceURL}/services/data/v65.0/sobjects/Case/${caseID}`,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${tokenType} ${tokenValue}`
        }
    })

     let response = await resBody.json()
    console.log("Get Case Details: \n",response);

    expect(resBody.status()).toBe(200)
    console.log(resBody.status())

    expect(resBody.statusText()).toBe('OK')
    console.log(resBody.statusText())
    }

    async updateCaseDetails(instanceURL:string,tokenType:string,tokenValue:any,caseID:string){
        let resBody = await this.request.patch(`${instanceURL}/services/data/v65.0/sobjects/Case/${caseID}`,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${tokenType} ${tokenValue}`
        },
        data:{
            
            "Origin":"Web",
            "Status":"Working"
        }
    })
   // let response = await resBody.json()
    //console.log("Update Case Details: \n",response);

    expect(resBody.status()).toBe(204)
    console.log(resBody.status())

    expect(resBody.statusText()).toBe('No Content')
    console.log(resBody.statusText())
    }

    async deleteCaseDetails(instanceURL:string,tokenType:string,tokenValue:any,caseID:string){
        let resBody = await this.request.delete(`${instanceURL}/services/data/v65.0/sobjects/Case/${caseID}`,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${tokenType} ${tokenValue}`
        }
    })
    expect(resBody.status()).toBe(204)
    console.log(resBody.status())

    expect(resBody.statusText()).toBe('No Content')
    console.log(resBody.statusText())
    }


}