import { test, expect, type Page } from "@playwright/test";

const baseUrl: string = "https://trivia.javierferrersb.dev/";

test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
});

test.describe("Website title", () => {
    test("website title is correct", async ({ page }) => {
        await expect(page).toHaveTitle(/Trivia App/);
    });
});

test.describe("Start Page", () => {
    test.skip("start button shows loading until load then start", async ({
        page,
    }) => {
        if (await page.locator(".select-wrapper").isVisible()) {
            page.reload();
        }
        await expect(page.locator(".start-button")).toHaveText("Loading...");
        if (await page.locator(".select-wrapper").isVisible()) {
            page.reload();
        }
        expect(await page.locator(".start-button").isDisabled()).toBe(true);
        await page.locator(".select-wrapper").waitFor();
        await expect(page.locator(".start-button")).toHaveText("Start quiz");
        expect(await page.locator(".start-button").isDisabled()).toBe(false);
    });
    test("categories selector visible", async ({ page }) => {
        if (await page.locator(".select-wrapper").isVisible()) {
            page.reload();
        }
        await expect(page.locator(".select-wrapper")).toBeHidden();
        if (await page.locator(".select-wrapper").isVisible()) {
            page.reload();
        }
        await expect(page.locator(".lds-ellipsis")).toBeVisible();
        await page.locator(".select-wrapper").waitFor();
        await expect(page.locator(".lds-ellipsis")).toBeHidden();
        await expect(page.locator(".select-wrapper")).toBeVisible();
    });

    test("start page logo", async ({ page }) => {
        await expect(page.locator(".logo")).toBeVisible();
    });
    test("start page title", async ({ page }) => {
        await expect(page.locator(".title")).toHaveText("Trivia App");
    });

    test("about button text", async ({ page }) => {
        await expect(page.locator(".material-symbols-outlined")).toHaveText(
            "info"
        );
    });

    test("about button works", async ({ page }) => {
        await page.locator(".info-button").click();
        expect(page.url()).toContain("/about");
    });

    test("category selector works", async ({ page }) => {
        await page.locator(".select-wrapper").waitFor();
        await page.locator(".topic-select").selectOption({ index: 3 });
    });

    test("loading quiz spinner works", async ({ page }) => {
        await page.locator(".select-wrapper").waitFor();
        await page.locator(".start-button").click();
        await expect(page.locator(".lds-spinner")).toBeVisible();
    });
});

test.describe("About page", () => {
    test.skip("about router works", async ({ page }) => {
        await page.goto(`${baseUrl}about`);
        page.reload();
        await expect(page.locator(".about-message-text")).toHaveText(
            "Simple trivia webapp made using React and Typescript"
        );
    });

    test("back button works", async ({ page }) => {
        await page.locator(".info-button").click();
        await page.locator(".back-button").click();
        expect(page.url()).toBe(baseUrl);
    });
    test("about section logo", async ({ page }) => {
        await page.locator(".info-button").click();
        await expect(page.locator(".logo")).toBeVisible();
    });
    test("about section title", async ({ page }) => {
        await page.locator(".info-button").click();
        await expect(page.locator(".about-message-title")).toHaveText(
            "Trivia App"
        );
    });
    test("about section message", async ({ page }) => {
        await page.locator(".info-button").click();
        await expect(page.locator(".about-message-text")).toHaveText(
            "Simple trivia webapp made using React and Typescript"
        );
    });
    test("about section links text", async ({ page }) => {
        await page.locator(".info-button").click();
        await expect(page.locator(".about-message-link >> nth=0")).toHaveText(
            "Questions obtained from Open Trivia DB (CC BY-SA 4.0)"
        );
        await expect(page.locator(".about-message-link >> nth=1")).toHaveText(
            "Github Project Link"
        );
    });
    test("about section db link", async ({ page }) => {
        await page.locator(".info-button").click();
        await expect(
            page.locator(".about-message-link >> nth=0")
        ).toHaveAttribute("href", "https://opentdb.com/");
    });
    test("about section github link", async ({ page }) => {
        await page.locator(".info-button").click();
        await expect(
            page.locator(".about-message-link >> nth=1")
        ).toHaveAttribute(
            "href",
            "https://github.com/javierferrersb/TriviaWebApp"
        );
    });
    test("about section footer message", async ({ page }) => {
        await page.locator(".info-button").click();
        await expect(page.locator(".footer-message")).toHaveText(
            "Made with ❤️ in Spain"
        );
    });
    test("about section footer link", async ({ page }) => {
        await page.locator(".info-button").click();
        await expect(page.locator(".footer-message")).toHaveAttribute(
            "href",
            "https://github.com/javierferrersb/"
        );
    });
});
