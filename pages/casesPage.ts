import { Page } from "playwright/test";
import { expect } from "playwright/test";

// Imports lead test data from the JSON test data file
import contacts from "../test-data/contacts.json" 
import account from "../test-data/account.json"
import Case from "../test-data/case.json"


export class CasesPage{
   
    // Initializes the page object and makes it available throughout the class
    constructor(private page:Page){
    }

    //Method to open a cases pase
    async openCasesTab(){
        await this.page.getByRole('link',{name: "Cases"}).click()
        await this.page.waitForLoadState("domcontentloaded")
        await expect(this.page.getByRole('heading', { name: 'Cases', exact: true })).toBeVisible({timeout:30000})
   
    }

    //Return the existing cases count
    async casesCount():Promise<number>{
        let oldcaseCount
        oldcaseCount = await this.page.locator("table tbody tr").count();

        console.log(`Total rows: ${oldcaseCount}`);

        return oldcaseCount
        
    }

    //Method to create a newCase and return the created caseId
    async newCase():Promise<string>{

        let caseNumber
        await this.page.getByRole('button',{name: "New"}).click()
        await this.page.waitForLoadState("domcontentloaded");
        //await this.page.pause()

        //Contact
        await this.page.getByRole('combobox',{name: "Contact Name"}).click()
        await this.page.getByTitle('New Contact').click()
        await this.page.waitForLoadState("domcontentloaded");
        await this.newContact()
        
        //Account
        await this.page.getByRole('combobox',{name: "Account Name"}).click()
        await this.page.getByTitle('New Account').click()
        await this.page.waitForLoadState("domcontentloaded");
        await this.newAccount()
       

        await this.page.waitForLoadState("domcontentloaded");
        const statusDD = this.page.getByRole('combobox',{name: "Status"})
        
        //await statusDD.click()
        //await statusDD.getByTitle(Case.Case.status).click()
        await this.page.getByRole('combobox',{name: "Case Origin"}).click()
        await this.page.getByTitle(Case.Case.caseOrgin).first().click()
        await this.page.locator('[name="Subject"]').fill(Case.Case.subject)
        await this.page.getByRole('textbox',{name: "Description"}).fill(Case.Case.description)
        await this.page.getByRole('button', { name: 'Save', exact: true }).click();
        //await expect(this.page.locator('[data-key="success"][data-aura-class="forceToastMessage"]')).toBeVisible()


        //Using RegEx to verify the success prompt message "Ex: Case 0000107 was created"
        await this.verfiyToastMessage(/Case.*was created/)

        //Finding the newly created case number
        caseNumber = await this.page.locator('//p[text()="Case Number"]/following-sibling::p').innerText()
        console.log("Created case Number :",caseNumber);
        
        return caseNumber


    }

    //Method to create a contact
    async newContact(){

        await this.page.getByRole('combobox', { name: 'Salutation' }).click();
        await this.page.locator('span').filter({ hasText: contacts.Contact.Salutation }).first().click();
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(contacts.Contact.firstName);
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(contacts.Contact.lastName);
        await this.page.getByRole('button', { name: 'Save', exact: true }).click();
        await  this.verfiyToastMessage(`Contact "${contacts.Contact.firstName} ${contacts.Contact.lastName}" was created.`)

    }

    //Method to create a new Account
    async newAccount(){
        await this.page.getByRole('textbox',{name: "Account Name"}).fill(account.Account.accountName)
        await this.page.locator('[name="AccountNumber"]').fill(account.Account.accountNumber)
        
        const ratingDropdown = this.page.getByRole('combobox',{name: "Rating"})
        await ratingDropdown.click()
            
        if(await this.page.getByText(account.Account.Rating).isVisible())
            await this.page.getByText(account.Account.Rating).click()
        await expect(ratingDropdown).toHaveText(account.Account.Rating)

        await this.page.getByRole('button', { name: 'Save', exact: true }).click();

        await this.verfiyToastMessage(`Account "${account.Account.accountName}" was created.`)
    }

    //Method to verify and close the success prompt message
    async verfiyToastMessage(message:string | RegExp){

        const toastMsg = this.page.locator('[class="forceVisualMessageQueue"]')
        await expect(toastMsg).toBeVisible()
        console.log(await toastMsg.innerText());
        await expect(toastMsg).toContainText(message)
        await toastMsg.getByRole('button',{name:"Close"}).click()
        
    }

    //Method to update the case status
    async updateCaseStatus(newStatus:string){

        await this.page.getByTitle("Edit Status").click()
        const statusDD = this.page.getByRole('combobox',{name: "Status"})
        await statusDD.click()
        await this.page.getByRole('listbox', { name: 'Status' }).getByText('Escalated').click()
        await expect(statusDD).toHaveText(newStatus)
        await this.page.getByRole('button', { name: 'Save', exact: true }).click();
        


    }

    //Method to share a comment (Note: This method is not working with the speed of automation so added lot of code to assertion and wait)
    async shareAndUpdate(comment:string){
       //await this.page.pause()
       await this.page.waitForLoadState("domcontentloaded");

        await this.page.locator('[title="Share an update..."]').click();

        const textbox = this.page.getByRole('textbox', { name: "Share an update..." });

        await expect(textbox).toBeVisible();
        await textbox.fill(comment);
        await expect(textbox).toHaveText(comment)

        const shareButton = this.page.getByRole('button', { name: "Share", exact: true });
        console.log("Share : ",await shareButton.allInnerTexts());
        
       // await expect(shareButton).not.toBeDisabled()
        await shareButton.click();
        await this.verfiyToastMessage('Your update was shared.')

        //await this.page.waitForLoadState("domcontentloaded");

      /*   const commentBox = this.page.locator('//article[@data-type="TextPost"]')

        await expect(commentBox).toBeVisible()

        console.log(await commentBox.innerText());

        await expect(commentBox).toContainText(comment) */

       // const post = commentBox.locator('//div[@class="feedBodyInner Desktop oneApp"]//span');

       
        

       // await expect(post).toHaveText(comment);

       
        //await this.page.reload()

       // await this.page.pause()

    
    }


    //Method to like a feed : Currently implemented only when the case has single comment In future 
    // need to update for handling with multiple comments
    async likeFead(comment:string){

       // await this.page.pause()

        const refreshButton =  this.page.getByRole('button',{name:'Refresh this feed'}).first()
        const commentBox = this.page.locator('//article[@data-type="TextPost"]')

        console.log(refreshButton.isEnabled());
        

        for (let i = 0; i < 5; i++) {
            if (await commentBox.isVisible())
                 break;
            else
                await refreshButton.click();
               // await expect(commentBox).toBeVisible({ timeout: 3000 }).catch(() => {});
            }

        await expect(commentBox).toBeVisible();


       // await commentBox.waitFor({state:"visible"})

        const commentSpan = commentBox.locator('//div[@class="feedBodyInner Desktop oneApp"]//span').filter({hasText:comment})
        console.log(await commentBox.innerText());
        
        await commentBox.locator('[class="cuf-media-right forceChatterOverflowActionMenu uiMenu"]').click()
        await commentBox.locator('a').filter({ hasText: 'Like on Chatter' }).click()
         await this.verfiyToastMessage('Post was liked.')

    }



}
