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

    async getDashboardItems(token:any,name:string){
        let resBody =await this.request.get(`${token.iURL}/services/data/v65.0/sobjects/Dashboard`,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${token.tokenT} ${token.tokenV}`
        }
    })
    
     let response = await resBody.json()
    console.log("Get Dashboard Details: \n",response);

    expect(resBody.status()).toBe(200)
    console.log(resBody.status())

    expect(resBody.statusText()).toBe('OK')
    console.log(resBody.statusText())

    let items = response.recentItems
    let itemID
    for(let i=0;i<items.length;i++){
        if(items[i].Title == name){
           
            itemID = items[i].Id
            
            break
        }
    }
    console.log("Item id: ",itemID);
    
    return itemID


    }

    async deleteDashboardItem(token:any,dashboardID:string){
        let resBody = await this.request.delete(`${token.iURL}/services/data/v65.0/sobjects/Dashboard/${dashboardID}`,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${token.tokenT} ${token.tokenV}`
        }
    })
    console.log(`${token.iURL}/services/data/v65.0/sobjects/Dashboard/${dashboardID}`);
    
    expect(resBody.status()).toBe(204)
    console.log(resBody.status())

    expect(resBody.statusText()).toBe('No Content')
    console.log(resBody.statusText())
    }


    async POSTRequest(token:any,table:string,value:object){

        let resBody = await this.request.post(`${token.iURL}/services/data/v65.0/sobjects/${table}`,{

            headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${token.tokenT} ${token.tokenV}`
        },
        data:value
            })

        let response = await resBody.json()
        console.log("New Lead Details: \n",response);

        expect(resBody.status()).toBe(201)
        console.log(resBody.status())

        expect(resBody.statusText()).toBe('Created')
        console.log(resBody.statusText())

        let leadId=response.id
        console.log(leadId);

        return leadId

    }

    async PATCHRequest(token:any,table:string,leadID:string,value:object){

        let resBody = await this.request.patch(`${token.iURL}/services/data/v65.0/sobjects/${table}/${leadID}`,{

            headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${token.tokenT} ${token.tokenV}`
        },
        data:value
            })

        expect(resBody.status()).toBe(204)
        console.log(resBody.status())

        expect(resBody.statusText()).toBe('No Content')
        console.log(resBody.statusText())

    }
}