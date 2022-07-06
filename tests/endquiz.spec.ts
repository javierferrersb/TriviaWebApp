import { test, expect, type Page } from "@playwright/test";

const baseUrl: string = "https://trivia.javierferrersb.dev/";

test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator(".select-wrapper").waitFor();
    await page.locator(".start-button").click();
    await page.locator(".question-area").waitFor();
    for (let i = 0; i < 5; i++) {
        await page.locator(`.question-option >> nth=${i % 4}`).click();
        await page.locator(".next-button").click();
    }
    await page.locator(".banner-title").waitFor();
});

test.describe("Finished banner", () => {
    test.skip("confetti shows up when everything is correct", async ({
        page,
    }) => {
        test.setTimeout(300000);
        while (
            (await page.locator(".banner-subtitle").innerText()) !==
            "You got 5 out of 5 questions right"
        ) {
            await page.locator(".replay-button").click();
            await page.locator(".select-wrapper").waitFor();
            await page.locator(".start-button").click();
            await page.locator(".question-area").waitFor();
            for (let i = 0; i < 5; i++) {
                await page.locator(`.question-option >> nth=${i % 4}`).click();
                await page.locator(".next-button").click();
            }
            await page.locator(".banner-title").waitFor();
        }
        await expect(page.locator("canvas")).toBeVisible();
    });

    test("banner title", async ({ page }) => {
        await expect(page.locator(".banner-title")).toHaveText(
            "Quiz finished!"
        );
    });

    test("review text", async ({ page }) => {
        await expect(page.locator(".review-button")).toHaveText(
            "Review answers"
        );
    });

    test("play again text", async ({ page }) => {
        await expect(page.locator(".replay-button")).toHaveText("Play again");
    });

    test("play again button works", async ({ page }) => {
        await page.locator(".replay-button").click();
        await page.locator(".select-wrapper").waitFor();
        await expect(page.locator(".title")).toBeVisible();
    });
});

test.describe("Review answers", () => {
    test("Number of correct questions is correct", async ({ page }) => {
        const numberOfCorrectQuestions: number = await page
            .locator(".banner-subtitle")
            .innerText()
            .then((text) => parseInt(text.split(" ")[2]));

        await page.locator(".review-button").click();

        let correctQuestions: number = 0;

        for (let i = 0; i < 5; i++) {
            // Number of questions
            if (await page.locator(`.question-option.incorrect`).isVisible()) {
                correctQuestions++;
            }
            if (i < 4) {
                await page.locator(".next-button >> nth=1").click();
                await page.locator(".question-text").waitFor();
            }
        }
        expect(5 - correctQuestions).toEqual(numberOfCorrectQuestions);
    });

    test("Previous button works", async ({ page }) => {
        await page.locator(".review-button").click();

        for (let i = 1; i < 5; i++) {
            await expect(page.locator(".progress-text")).toHaveText(`${i} / 5`);
            await page.locator(".question-option >> nth=1").click();
            await page.locator(".next-button >> nth=1").click();
        }
        for (let i = 5; i >= 2; i--) {
            await expect(page.locator(".progress-text")).toHaveText(`${i} / 5`);
            await page.locator(".question-option >> nth=1").click();
            await page.locator(".next-button >> nth=0").click();
        }
    });

    test("next button text", async ({ page }) => {
        await page.locator(".review-button").click();

        await expect(page.locator(".next-button >> nth=1")).toHaveText("NEXT");
    });

    test("play again questions text", async ({ page }) => {
        await page.locator(".review-button").click();

        await expect(page.locator(".replay-button-questions")).toHaveText(
            "Play again"
        );
    });

    test("previous button text", async ({ page }) => {
        await page.locator(".review-button").click();

        await expect(page.locator(".next-button >> nth=0")).toHaveText(
            "PREVIOUS"
        );
    });

    test("play again questions button works", async ({ page }) => {
        await page.locator(".review-button").click();

        await page.locator(".replay-button-questions").click();
        await page.locator(".select-wrapper").waitFor();
        await expect(page.locator(".title")).toBeVisible();
    });
});
