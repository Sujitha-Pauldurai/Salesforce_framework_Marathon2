import { test, expect } from "@playwright/test";


test.use(
    {
       storageState:'test-data/salesforce.json' 
    }
)

test("Verify Salesforce login", async ({ page }) => {

    await page.goto("https://orgfarm-2596c4c030-dev-ed.develop.lightning.force.com/lightning/page/home");

    await expect(page).not.toHaveURL(/login/);


});