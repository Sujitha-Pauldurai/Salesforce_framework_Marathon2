import { expect, Page } from "@playwright/test";
import { Locator } from "../Locators/locators"; 

import ElementHandler from "../utils/elementHandler1"


export class DashboardPage extends ElementHandler{
   
    // Initializes the page object and makes it available throughout the class
    constructor(page:Page){
        super(page)
    }
    
    async newDashboard(name:string){
        await this.click(Locator.PWLocators.role,Locator.role.button,Locator.dashboard.newDBName)
        let frameD =  this.findFrame(Locator.dashboard.newDBframe)
        await this.enterText(Locator.dashboard.DBname, name,undefined,undefined,frameD)
        await this.click(Locator.dashboard.createBut,undefined,undefined,frameD)
        await this.waitUntilPageLoad()
        await this.click(Locator.PWLocators.role,Locator.role.button,Locator.dashboard.saveBname,frameD)
        await this.verfiyToastMessage(Locator.dashboard.popuoMsg)
        await this.waitUntilPageLoad()
        await this.click(Locator.PWLocators.role,Locator.role.button,Locator.dashboard.doneBname,frameD)
        await this.waitUntilPageLoad()
        console.log(await this.returnPageTitle());
        await this.waitUntilPageLoad()
        frameD =  this.findFrame(Locator.dashboard.newDBframe)
        //expect(await this.returnPageTitle());
        //let header = this.findElement('slds-page-header__name-title')
        await expect((await this.findElement(`span[title="${name}"]`,undefined,undefined,frameD))).toBeVisible()
        await expect((await this.findElement(`span[title="${name}"]`,undefined,undefined,frameD))).toContainText(name)

    }

}