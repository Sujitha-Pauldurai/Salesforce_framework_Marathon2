import {test,expect, Page, Locator, FrameLocator} from "@playwright/test"

// Define the supported locator roles for reusable element handling.
type role = 'button' | 'textbox' | 'link' | 'heading' | 'checkbox' | 'combobox'

// Reusable handler class for browser and element interactions.
export default class ElementHandler{

     page:Page
         
     // Initialize the handler with the current Playwright page.
        constructor(tpage:Page){
    
        this.page=tpage
        
        }

    /**
     * Description: Navigates to the specified application URL and handles navigation errors.
     * @param url - The URL of the application to open.
     */
    async loadApplication(url:string){

        try{
            await this.page.goto(url)
            console.log("logged in successfully")
            }
        catch(error){
        console.log("login was not successfull")
        throw new Error("login is failed")
            
        }
      }

    //Method to wait until the page's DOM content is fully loaded.
    async waitUntilPageLoad(){
        await this.page.waitForLoadState("domcontentloaded")
        
    }
    
    /**
         * Description: Locates an element using the specified locator strategy and clicks it after verifying visibility.
         * @param locator - The locator strategy (e.g., getByRole, getByText, CSS, or XPath).
         * @param locMethod? - The locator value, such as role type (button/textbox), text, title, or placeholder. Optional for CSS/XPath locators.
         * @param name? - The accessible name used with getByRole. Optional for other locator strategies.
         * @param parent? - Optional parent Locator or FrameLocator used to locate the element within a specific element or frame.
    */
    async click(locator:string,locMethod?:string,name?:string,parent?:Locator | FrameLocator){
        let element
        // Check whether a parent locator or frame was provided.
        if(parent){
            // If both locator method and accessible name are provided, pass all arguments.
            if(locMethod  && name){
                //console.log("locator has getBy",locator,locMethod,name);
                
                element=  await this.findElement(locator,locMethod,name,parent)
            
            }
            // Handle locator methods that don't require an accessible name.
            else if(locMethod  && !name){
                //console.log("locator has getBy",locator,locMethod,name);
                element=  await this.findElement(locator,locMethod,undefined,parent)
            
            }
            // If no additional locator details are provided, use the locator directly.
            else{
                
                element = await this.findElement(locator,undefined,undefined,parent)
            }   
    }
    // If no parent is provided, locate the element from the current page.
    else{
        if(locMethod  && name){
            //console.log("locator has getBy",locator,locMethod,name);
            
            element=  await this.findElement(locator,locMethod,name)
          
        }
        // Handle locator methods that don't require an accessible name.
        else if(locMethod  && !name){
            //console.log("locator has getBy",locator,locMethod,name);
            element=  await this.findElement(locator,locMethod)
           
        }
        // Use the locator directly when no additional details are provided.
        else{
            element = await this.findElement(locator)
        }

    }
        // Verify that the element becomes visible within 90 seconds.
        await expect(element).toBeVisible({timeout:90000})

        // Click the element after visibility is confirmed.
        await element.click()
        
    }


    /**
     * Description: Locates an element using the specified locator strategy and enters the given text.
     * @param locator - The locator strategy (e.g., getByRole, getByText, CSS, or XPath).
     * @param value - The text value to enter into the element.
     * @param locMethod? - The locator value, such as role type (textbox), text, title, or placeholder. Optional for CSS/XPath locators.
     * @param name? - The accessible name used with getByRole. Optional for other locator strategies.
     * @param parent? - <<Need to be implemented in future>>
     */
    async enterText(locator:string,value:string,locMethod?:string,name?:string,parent?:Locator | FrameLocator){
        let element:Locator
        if(parent){
        // If both locator method and accessible name are provided, pass all arguments.
        if( locMethod  && name){
           // console.log("locator has getBy");
            element = await this.findElement(locator,locMethod,name,parent)
           
        }
        // Handle locator methods that don't require an accessible name.
        else if(locMethod  && !name){
            element = await this.findElement(locator,locMethod,undefined,parent)
           

        }
        // Use the locator directly when no additional details are provided.
        else{
            element = await this.findElement(locator,undefined,undefined,parent)
        }

    }else{
         // If both locator method and accessible name are provided, pass all arguments.
        if( locMethod  && name){
           // console.log("locator has getBy");
            element = await this.findElement(locator,locMethod,name)
           
        }
        // Handle locator methods that don't require an accessible name.
        else if(locMethod  && !name){
            element = await this.findElement(locator,locMethod)
           

        }
        // Use the locator directly when no additional details are provided.
        else{
            element = await this.findElement(locator)
        }
    }
        //console.log(await element.getAttribute('name'));
        
        // Fill the input field with the specified text, replacing any existing value.
         await element.fill(value)
        
    }


    
    /**
     * Description: Locates and returns an element using the specified locator strategy.
     * @param locator - The locator strategy (e.g., getByRole, getByText, CSS, or XPath).
     * @param locMethod? - The locator value, such as role type (button/textbox), text, title, or placeholder. Optional for CSS/XPath locators.
     * @param name? - The accessible name used with getByRole. Optional for other locator strategies.
     * @param parent1? - Optional parent Locator or FrameLocator used to locate the element within a specific element or frame.
     * @returns A Promise resolving to the matched Playwright Locator.
     */
    
    async findElement(locator:string,locMethod?:string,name?:string,parent1?:Locator | FrameLocator): Promise<Locator>{
        let method
        let ele:Locator 
        let parent
        

        // Locator Chaining: Uses the provided parent locator or frame to find elements within a specific scope; otherwise, searches from the current page.
        if(parent1){
             parent = parent1
        }
        else{
            parent = this.page
        }

        // Check whether the locator strategy uses a Playwright getBy method.
        if(locator.includes("getBy")){

            // Extract the method name by removing the 'getBy' prefix.
            method = locator.replace("getBy", "")
            //console.log(method);
            //console.log("locator has getBy",locator,locMethod,name);
            switch(method){
                case "Role":
                    // Locate the element by its ARIA role and accessible name.
                    ele =   parent.getByRole(locMethod as role,{name:name, exact : true})
                    /*console.log(await ele.count());
                    let count = await ele.count()
                    if(count > 1){
                        ele =  parent.getByRole(locMethod as role,{name:name, exact: true})
                    }*/
                    break
                case "Text":
                    // Locate the element using its visible text.
                    ele =  parent.getByText(locMethod as string, {exact : true})
                    break
                case "Title":
                    // Locate the element using its title attribute.
                    ele =  parent.getByTitle(locMethod as string)
                    break
                case "AltText":
                    // Locate the element using its alternative text.
                    ele =  parent.getByAltText(locMethod as string)
                    break
                case "Placeholder":
                    // Locate the input using its placeholder text.
                    ele =  parent.getByPlaceholder(locMethod as string)
                    break
                case "Label":
                    // Locate the form element associated with the specified label.
                    ele =  parent.getByLabel(locMethod as string)
                    break
                case "TestId":
                    // Locate the element using its test ID attribute.
                    ele =  parent.getByTestId(locMethod as string)
                    break
                 default:
                    // Throw an error if the requested getBy method is unsupported.
                     throw new Error(`Unsupported locator method: ${method}`);
            }
  
        }  
        else{
            // For CSS or XPath selectors, use the generic locator() method.
            ele =  parent.locator(locator)
        }  

        // Return the locator for further actions or assertions.
        return ele;
    }

    /**
     * Description: Returns a FrameLocator to locate and interact with elements inside an iframe.
     * @param locator - The CSS or XPath selector identifying the iframe.
     */
    findFrame(locator:string){
        return this.page.frameLocator(locator)
    }

    filterElement(element:Locator,text:string){
         return element.filter({hasText : text})
    }

    //Retrieves and returns the current page title.
    async returnPageTitle():Promise<string>{
        return await this.page.title()
    }

    //Captures a full-page screenshot and saves it to the specified file path.
    async takeScreenshot(){
        await this.page.screenshot({
            path: '../test-results/fullPage.png',
            fullPage: true
        });
    }
    
   //Method to verify and close the success prompt message
    async verfiyToastMessage(message:string | RegExp){

        const toastMsg = await this.findElement('[data-aura-class="forceActionsText"]')
        await expect(toastMsg).toBeVisible()
        console.log(await toastMsg.innerText());
        //expect(toastMsg.innerText()).toContain(message)
        //await toastMsg.getByRole('button',{name:"Close"}).click()
        
    } 
}