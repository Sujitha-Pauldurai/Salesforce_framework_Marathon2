import {test,expect, Page, Locator} from "@playwright/test"

type role = 'button' | 'textbox' | 'link' | 'heading' | 'checkbox' | 'combobox'

export default class ElementHandler{

    constructor(protected page:Page){}
    
    async click(locator:string,locMethod?:string,name?:string){
        let element
        if(locMethod  && name){
            console.log("locator has getBy",locator,locMethod,name);
            
            element=  await this.findElement(locator,locMethod,name)
          
        }
        else if(locMethod  && !name){
            console.log("locator has getBy",locator,locMethod,name);
            element=  await this.findElement(locator,locMethod)
           
        }
        else{
            element = await this.findElement(locator)
        }

         await element.click()
        
    }

    async clearAndFill(locator:string,value:string,locMethod?:string,name?:string){
        let element:Locator
        if( locMethod  && name){
           // console.log("locator has getBy");
            element = await this.findElement(locator,locMethod,name)
           
        }
        else if(locMethod  && !name){
            element = await this.findElement(locator,locMethod)
           

        }
        else{
            element = await this.findElement(locator)
        }
        console.log(await element.getAttribute('name'));
        
         await element.fill(value)
        
    }

    async findElement(locator:string,locMethod?:string,name?:string): Promise<Locator>{
        let method
        let ele:Locator 
        if(locator.includes("getBy")){
            method = locator.replace("getBy", "")
            console.log(method);
            console.log("locator has getBy",locator,locMethod,name);
            switch(method){
                case "Role":
                    ele =   this.page.getByRole(locMethod as role,{name:name})
                    console.log( ele.count());
                    let count = await ele.count()
                    if(count > 1){
                        ele =  this.page.getByRole(locMethod as role,{name:name, exact: true})
                    }
                    break
                case "Text":
                    ele =  this.page.getByText(locMethod as string)
                    break
                case "Title":
                    ele =  this.page.getByTitle(locMethod as string)
                    break
                case "AltText":
                    ele =  this.page.getByAltText(locMethod as string)
                    break
                case "Placeholder":
                    ele =  this.page.getByPlaceholder(locMethod as string)
                    break
                case "Label":
                    ele =  this.page.getByLabel(locMethod as string)
                    break
                case "TestId":
                    ele =  this.page.getByTestId(locMethod as string)
                    break
                 default:
                     throw new Error(`Unsupported locator method: ${method}`);
            }

         
        }  
        else{
            ele = await this.page.locator(locator)
        }  

        return ele
    }
    
}