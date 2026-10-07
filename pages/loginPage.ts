import { Page } from "playwright/test";

import users from "../test-data/users.json";

export class LoginPage{

    constructor(private page:Page){   

    }

    async login(){
           
            await this.page.getByRole('textbox', { name: 'username' }).fill(users.validUser.username);
            await this.page.getByRole('button', { name: 'Log In' }).click();
            await this.page.getByRole('textbox',{ name:"password"}).fill(users.validUser.password);
            await this.page.getByRole('button', { name: 'Log In' }).click();
            /* test.slow()
            await this.page.waitForTimeout(40000)
            // page.waitForLoadState()
            await this.page.context().storageState({path:'Data/salesForcelogin.json'}) */
            console.log(await this.page.title());
            
    }

}