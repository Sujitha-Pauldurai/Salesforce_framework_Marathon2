import { Page } from "playwright/test";
import { expect } from "playwright/test";

// Imports lead test data from the JSON test data file
import leads from "../test-data/leads.json";


export class LeadsPage{
   
    // Initializes the page object and makes it available throughout the class
    constructor(private page:Page){
    }

    //Opening the leads  page
    async openLeadsPage(){
       await this.page.locator('[data-id="Lead"]').click()
      
    }

    //Return the existing leadCount
    async leadCount():Promise<string>{
        let oldLeadCount
        oldLeadCount = await this.page.locator('//button[@data-api-name="TotalLead"]//p').nth(1).innerText()
        return oldLeadCount
        
    }

    //Method to create a new lead
    async newLead(){

         
        await this.page.getByRole('button', { name: 'New' }).click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.getByRole('combobox', { name: 'Salutation' }).click();
        await this.page.locator('span').filter({ hasText: leads.Lead1.Salutation }).first().click();
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(leads.Lead1.firstName);
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(leads.Lead1.lastName);
        await this.page.getByRole('textbox', { name: 'Company' }).fill(leads.Lead1.company);
        await this.page.getByRole('button', { name: 'Save', exact: true }).click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.page.locator('[name="primaryField"]')).toContainText(leads.Lead1.firstName)
        const confirmation = this.page.locator('[data-aura-class="forceToastMessage"]');
        await expect(confirmation).toBeVisible({ timeout: 30000 });
        console.log(await confirmation.innerText());
        
       
    }

    //Method to covert the lead to opportunity
    async convertLead(newName:string){
        const moreOption = this.page.getByRole('button',{name: "Show more actions"})
        await moreOption.click()
        console.log(await this.page.getByRole('menuitem', { name: 'Convert' }).isVisible({timeout:30000}));
        await this.page.getByRole('menuitem', { name: 'Convert' }).click()
        console.log(await this.page.getByRole('button').filter({hasText:leads.Lead1.company}).innerText());

        await this.page.getByRole('button').filter({hasText:leads.Lead1.company}).click()
        await this.page.getByRole('textbox',{name: "Opportunity Name *"}).clear()
        await this.page.getByRole('textbox',{name: "Opportunity Name *"}).fill(newName)
        await this.page.getByRole('button',{name: "Convert"}).click()
        await expect(this.page.getByText('Your lead has been converted')).toBeVisible()
        await this.page.getByRole('button',{name: "Go to Leads"}).click()
        

    }



}