
import { text } from "node:stream/consumers";
import { Page } from "playwright/test";
import { expect } from "playwright/test";

//import users from "../test-data/users.json";

export class appLaunch{

    // Initializes the page object and makes it available throughout the class
    constructor(private page:Page){   

    }

    async openAppLauncher(){
        console.log("app launch",await this.page.title());
        
        await this.page.getByTitle('App Launcher').click();
       
        await expect(this.page.getByRole('heading',{name: "App Launcher",exact:true})).toBeVisible({timeout:30000})
       
        await this.page.getByLabel('View All Applications').click();

        
    }

    async search(name:string){
         const searchBox = this.page.getByPlaceholder("Search apps or items...");

        await this.page.waitForLoadState("domcontentloaded")
        await searchBox.fill(name);

    }

    //Method to open a app page from the app Launcher screen
    async openApp(app:string){
           
       this.openAppLauncher()

       this.search(app)

        //const appLaunchDiv= this.page.locator('//div[@aria-label="App Launcher"]')
       

        const appResult = this.page.locator(`[data-name="${app}"]`).first();

        await expect(appResult).not.toBeHidden({
            timeout: 30000
        });
        console.log("Visible:", await appResult.isVisible());
        console.log("Count:", await appResult.count());

        await appResult.click();

       
                  
    }

    //Method to open a item  from the app Launcher screen
    async openItem(app:string){
           
       this.openAppLauncher()

       this.search(app)

       console.log(`-------Opening ${app}---------`);
       

       const ItemArea =  this.page.getByRole('button',{name: "All Items"})
       if(await ItemArea.getAttribute("aria-expanded") === 'false'){
            ItemArea.click()
        }

       const appResult = this.page.locator(`[data-label="${app}"]`).first();

        await expect(appResult).not.toBeHidden({
            timeout: 30000
        });
        //console.log("Visible:", await appResult.isVisible());
        //console.log("Count:", await appResult.count());

        await appResult.click();

       
                  
    }

}