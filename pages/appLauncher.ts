
import { text } from "node:stream/consumers";
import { Page } from "playwright/test";
import { expect } from "playwright/test";

//import users from "../test-data/users.json";

export class appLaunch{

    // Initializes the page object and makes it available throughout the class
    constructor(private page:Page){   

    }

    //Method to open a app page from the app Launcher screen
    async openApp(app:string){
           
        console.log("app launch",await this.page.title());
        
        await this.page.getByTitle('App Launcher').click();
       
        await expect(this.page.getByRole('heading',{name: "App Launcher",exact:true})).toBeVisible({timeout:30000})
       
        await this.page.getByLabel('View All Applications').click();

        const appLaunchDiv= this.page.locator('//div[@aria-label="App Launcher"]')
        const searchBox = this.page.getByPlaceholder("Search apps or items...");

        await this.page.waitForLoadState("domcontentloaded")
        await searchBox.fill(app);

        const appResult = this.page.locator(`[data-name="${app}"]`).first();

        await expect(appResult).not.toBeHidden({
            timeout: 30000
        });
        console.log("Visible:", await appResult.isVisible());
        console.log("Count:", await appResult.count());

        await appResult.click();

        


        /* 
        
        await expect(appLaunchDiv.getByText(app).first()).toBeVisible({  timeout: 30000});

        console.log(await appLaunchDiv.filter({hasText:app}).first().innerText());
        
        await appLaunchDiv.filter({hasText:app}).first().click() */
       // await appLaunchDiv.getByText(app).nth(0).click()
        //await expect(this.page.getByTitle(app)).toBeVisible()
       
                  
    }

}