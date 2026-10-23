import { expect, Page } from "playwright/test";

import users from "../test-data/users.json";
import ElementHandler from "../utils/elementHandler"
import { Locator } from "../Locators/locators";

export class LoginPage extends ElementHandler{

    constructor(page:Page){ 
        super(page)  

    }

    async login(){
           
            /*await this.page.getByRole('textbox', { name: 'username' }).fill(users.validUser.username);
             await this.page.getByRole('button', { name: 'Log In' }).click();
            await this.page.getByRole('textbox',{ name:"password"}).fill(users.validUser.password);
            await this.page.getByRole('button', { name: 'Log In' }).click();*/

            await this.clearAndFill(Locator.login.username.locator,users.validUser.username,Locator.login.username.role,Locator.login.username.name)
            await this.click(Locator.login.login.locator,Locator.login.login.role,Locator.login.login.name)
            await this.clearAndFill(Locator.login.password.locator,users.validUser.password,Locator.login.password.role,Locator.login.password.name)
            await this.click(Locator.login.login.locator,Locator.login.login.role,Locator.login.login.name)

          
            /* test.slow()
            await this.page.waitForTimeout(40000)
            // page.waitForLoadState()
            await this.page.context().storageState({path:'Data/salesForcelogin.json'}) */
            console.log(await this.page.title());
            
    }

    async openHome(){
        // Navigates to the Salesforce home page
            await this.page.goto("https://orgfarm-2596c4c030-dev-ed.develop.lightning.force.com/lightning/page/home");
           
            // Verifies that the session is already authenticated
            await expect(this.page).not.toHaveURL(/login/);
    }

}