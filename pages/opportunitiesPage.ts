import {  Page } from "playwright/test";
import { expect } from "playwright/test";

//import leads from "../test-data/leads.json";


export class Opportunities{
   
    // Initializes the page object and makes it available throughout the class
    constructor(private page:Page){
    }

    //Method to open a oppotunities Page
    async openOpportunities(){
        await this.page.getByRole('link',{name: "Opportunities"}).click()
        await this.page.waitForLoadState("domcontentloaded")
        await expect(this.page.getByRole('heading', { name: 'Opportunities', exact: true })).toBeVisible({timeout:30000})
    }

    //Method to find a opportunity is present or not in the Recently Viewed table
    async findOpportunity(opportinityName:string){

        const opportunitiesTable = this.page.locator('//table[@aria-label= "Recently Viewed" ]')
        const opportinityNameList= await opportunitiesTable.locator('//th[@data-label="Opportunity Name"]').all()
        for(const opportunity of opportinityNameList){
            let oppName = await opportunity.innerText()
            console.log(oppName);
            if(opportinityName === oppName){
                console.log(`The opportunity ${opportinityName} is present in the Recently Viewed table`);
                
                break;        
            }
        
        }
    }

    //Method to open a Opportunity Detail page
    async openOpportunityDetail(opportinityName:string){
        const opportunitiesTable = this.page.locator('//table[@aria-label= "Recently Viewed" ]')
        const opportinityNameList= await opportunitiesTable.locator('//th[@data-label="Opportunity Name"]').all()
        for(const opportunity of opportinityNameList){
            let oppName = await opportunity.innerText()
            console.log(oppName);
            if(opportinityName === oppName){
                await opportunity.getByRole('link',{name: opportinityName}).click()      
                break;        
            }
        
        }
        await expect(this.page.getByRole('heading',{name: opportinityName})).toBeVisible()

    }

}