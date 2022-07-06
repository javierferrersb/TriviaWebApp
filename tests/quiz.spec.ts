import { test, expect, type Page } from "@playwright/test";

const baseUrl: string = "https://trivia.javierferrersb.dev/";

test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator(".select-wrapper").waitFor();
    await page.locator(".start-button").click();
    await page.locator(".question-area").waitFor();
});

function delay(time: number): Promise<unknown> {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

test.describe("Bottom bar", () => {
    test("bottom bar is visible", async ({ page }) => {
        await expect(page.locator(".bottom-bar")).toBeVisible();
    });

    test("next button text", async ({ page }) => {
        await expect(page.locator(".next-button")).toHaveText("NEXT");
    });

    test("bottom bar number works", async ({ page }) => {
        for (let i = 1; i < 6; i++) {
            await expect(page.locator(".progress-text")).toHaveText(`${i} / 5`);
            await page.locator(".question-option >> nth=0").click();
            await page.locator(".next-button").click();
        }
    });

    test("bottom bar progress indicator works", async ({ page }) => {
        for (let i = 1; i < 6; i++) {
            expect(
                await page
                    .locator(".progress-indicator-fill")
                    .evaluate((indicator) => {
                        return window
                            .getComputedStyle(indicator)
                            .getPropertyValue("width");
                    })
            ).toEqual(`${i * 40}px`);
            await page.locator(".question-option >> nth=0").click();
            await page.locator(".next-button").click();
            await delay(700);
        }
    });

    test("next button enabled when needed", async ({ page }) => {
        for (let i = 0; i < 4; i++) {
            await expect(page.locator(".next-button")).toBeDisabled();
            await page.locator(`.question-option >> nth=${i}`).click();
            await expect(page.locator(".next-button")).toBeEnabled();
            await page.locator(".next-button").click();
        }
    });

    test("previous button not visible", async ({ page }) => {
        await expect(
            page.locator(".next-button >> text=PREVIOUS")
        ).not.toBeVisible();
    });

    test("next button moves to finished screen", async ({ page }) => {
        for (let i = 0; i < 5; i++) {
            await page.locator(`.question-option >> nth=${i % 4}`).click();
            await page.locator(".next-button").click();
        }
        await page.locator(".banner-title").waitFor();
    });
});

test.describe("Answering questions", () => {
    test("question clicked gets selected", async ({ page }) => {
        for (let i = 0; i < 4; i++) {
            await page.locator(`.question-option >> nth=${i}`).click();
            await expect(
                page.locator(`.question-option >> nth=${i}`)
            ).toHaveClass(/active/);
        }
    });

    test("only one question can be selected", async ({ page }) => {
        for (let i = 0; i < 4; i++) {
            await page.locator(`.question-option >> nth=${i}`).click();
            await expect(
                page.locator(`.question-option >> nth=${i}`)
            ).toHaveClass(/active/);
            for (let j = 0; j < 4; j++) {
                if (j !== i) {
                    // eslint-disable-next-line jest/no-conditional-expect
                    await expect(
                        page.locator(`.question-option >> nth=${j}`)
                    ).not.toHaveClass(/active/);
                }
            }
        }
    });
});
