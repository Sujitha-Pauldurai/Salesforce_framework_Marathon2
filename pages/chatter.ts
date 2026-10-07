import { Page } from "playwright/test";
import { expect } from "playwright/test";

export class Chatter{

    // Initializes the page object and makes it available throughout the class
    constructor(private page:Page){
    }

    //Method to open a cases pase
    async openChatterTab(){
        await this.page.getByRole('link',{name: "Chatter"}).click()
        await this.page.waitForLoadState("domcontentloaded")
        await expect(this.page).toHaveTitle("Chatter Home | Salesforce");
   
    }

    //Method to verify the post is liked or not
    async verifyPostLiked(caseNumber:string){

        //await this.page.getByTitle('Refresh this feed').nth(2).click()
        const refreshButton =  this.page.getByRole('button',{name:'Refresh this feed'})
        const feedItem = this.page.locator(`//span[text()="${caseNumber}"]/ancestor::article`)

        refreshButton.click()
        console.log("chat ",await feedItem.innerText());
        await expect(feedItem.getByText("Liked")).toBeVisible()

    }
}