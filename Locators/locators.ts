import { title } from "node:process";

export const Locator={

    PWLocators:{
        role:'getByRole',
        title:'getByTitle',
        text:'getByText',
        placeholder:'getByPlaceholder',
        altText:'getByAltText',
        testId:'getByTestId',
        label:'getByLabel'
    },
    role:{
        button : 'button',
        textbox : 'textbox',
        link : 'link',
        heading: 'heading',
        checkbox:'checkbox',
        combobox: 'combobox',
        dialog: 'dialog'
    },

    login:{
        username:{
            locator : 'getByRole',
            role : 'textbox',
            name : 'username'
        },
        password:{
            locator : 'getByRole',
            role : 'textbox',
            name : 'password'
        },
                    
        login:{
            locator : 'getByRole',
            role : 'button',
            name : 'Log In'
        }

        
    },

    case:{
        newBName: 'New',
        contactName : 'Contact Name',
        NewContactTitle : 'New Contact',
        accountName : 'Account Name',
        NewAccountTitle : 'New Account',
        statusName : 'Status',
        caseOrginName : 'Case Origin',
        subject: '[name="Subject"]',
        descName : 'Description',
        saveName : 'Save',
        caseNo: '//p[text()="Case Number"]/following-sibling::p',

        //New case
        NC_SalutationName : 'Salutation',
        NC_fName : 'First Name',
        NC_lName:'Last Name',

        //New account--pending



    },

    dashboard:{
        newDBName : 'New Dashboard',
        newDBframe : 'iframe[title="dashboard"]',
        DBname : "#dashboardNameInput",
        createBut : '#submitBtn',
        saveBname : 'Save',
        doneBname : 'Done',
        popuoMsg : 'Dashboard Saved'
    },
    searchbar: '[placeholder="Search..."]'
}