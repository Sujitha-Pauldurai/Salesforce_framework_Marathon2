import {test as base} from "@playwright/test"
import { LoginPage } from "../pages/loginPage"
import { appLaunch } from "../pages/appLauncher"
import { CasesPage } from "../pages/casesPage"
import { Chatter } from "../pages/chatter"
import { DashboardPage } from "../pages/dashboard"
import { APIMethods } from "./apiHandler"
import { LeadsPage } from "../pages/LeadsPage"

type myFixtures={

    loginFix : LoginPage,
    openAppFix : appLaunch,
    caseFix : CasesPage,
    chatterFix : Chatter,
    dashboardFix : DashboardPage,
    APIFix : APIMethods,
    leadFix : LeadsPage

}

export const test=base.extend<myFixtures>({

    loginFix:async({page},use)=>{
    let objlp=new LoginPage(page)
    await use(objlp)

    },
    openAppFix:async({page},use)=>{
    let objap=new appLaunch(page)
    await use(objap)

    },
    caseFix:async({page},use)=>{
    let objcp=new CasesPage(page)
    await use(objcp)

    },
    chatterFix:async({page},use)=>{
    let objchp=new Chatter(page)
    await use(objchp)

    },
    dashboardFix:async({page},use)=>{
    let dbcp=new DashboardPage(page)
    await use(dbcp)

    },
    leadFix:async({page},use)=>{
    let lp=new LeadsPage(page)
    await use(lp)

    },
    APIFix:async({request},use)=>{
    let apip=new APIMethods(request)
    await use(apip)

    }


})