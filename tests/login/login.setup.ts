import { test as setup } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";

setup("Login and save storage state", async ({ page }) => {

    await page.goto("/");

    const loginPage = new LoginPage(page);

    await loginPage.login();

    // Enter OTP manually
    await page.pause();

    // Go to Salesforce application
    await page.goto(
        "https://orgfarm-2596c4c030-dev-ed.develop.lightning.force.com/lightning/page/home"
    );

    await page.waitForLoadState("domcontentloaded");

    // Save authenticated session
    await page.context().storageState({
        path: "test-data/salesforce.json"
    });
});