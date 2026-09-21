import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];
const report = [];
const baseURL = process.env.TEST_URL || "http://127.0.0.1:5173";

async function ready(page) {
  await page.goto(baseURL);
  const iframe = await page.waitForSelector("iframe");
  const frame = await iframe.contentFrame();
  await frame.waitForSelector(".webgl-ready", { timeout: 90000 });
  await frame.waitForSelector("#threeui-page-typography", { state: "attached" });
  return frame;
}

async function detail(frame) {
  await frame.locator("#inspect").click();
  await frame.waitForSelector(".mode-detail:not(.is-opening)");
  await frame.locator("#toggle-book").click();
  await frame.waitForFunction(() => document.querySelector("#page-label").textContent === "Giới thiệu");
  await frame.locator("#next-page").click();
  assert.equal(await frame.locator("#page-counter").textContent(), "02 / 05");
  await frame.locator("#previous-page").click();
  assert.equal(await frame.locator("#page-counter").textContent(), "01 / 05");
  for (const label of ["Ý tưởng · Khám phá", "Tương tác · Công nghệ", "Cấu trúc · Chạy dự án", "Hướng phát triển"]) {
    await frame.locator("#next-page").click();
    assert.equal(await frame.locator("#page-label").textContent(), label);
  }
  assert.equal(await frame.locator("#next-page").isDisabled(), true);
  for (let i = 0; i < 4; i++) await frame.locator("#previous-page").click();
  await frame.locator("#reset-view").click();
  await frame.waitForTimeout(700);
}

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(`${message.text()} ${message.location().url}`); });
  let frame = await ready(page);
  assert.equal(await frame.locator(".marker").count(), 7);
  await page.screenshot({ path: "artifacts/desktop-shelf.png" });
  const titles = ["Book-blog", "Claude Code", "Cursor", "Antigravity", "Figma", "Framer", "Xcode"];
  for (let index = 0; index < titles.length; index++) {
    await frame.locator(".marker").nth(index).click();
    await frame.waitForFunction((title) => document.querySelector("#selection-title").textContent === title, titles[index]);
    await page.waitForTimeout(800);
  }
  await frame.locator("#next").click();
  await frame.waitForFunction(() => document.querySelector("#selection-title").textContent === "Book-blog");
  await page.waitForTimeout(800);
  await detail(frame);
  await page.screenshot({ path: "artifacts/desktop-open-book.png" });
  await page.keyboard.press("ArrowRight");
  assert.equal(await frame.locator("#page-counter").textContent(), "02 / 05");
  await page.keyboard.press("Escape");
  await frame.waitForFunction(() => !document.querySelector("#browse-ui").inert);
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(1000);
  assert.equal(await frame.locator("#selection-title").textContent(), "Claude Code");
  await page.mouse.move(700, 300);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(1200);
  assert.notEqual(await frame.locator("#selection-title").textContent(), "Claude Code");
  report.push("Desktop: seven volumes, wraparound, open/close, sample pages, reset, keyboard and wheel passed.");
  await page.setViewportSize({ width: 1024, height: 768 });
  assert.equal(await frame.evaluate(() => document.querySelector("#scene").width), 1024);
  await frame.evaluate(() => document.querySelector("#scene").getContext("webgl2").getExtension("WEBGL_lose_context").loseContext());
  await frame.waitForSelector("#static-fallback", { state: "visible" });
  assert.equal(await frame.locator(".fallback-book").count(), 7);
  report.push("Resize and actual WebGL context loss: complete static catalog remains available.");
  await context.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const phone = await mobile.newPage();
  phone.on("pageerror", (error) => errors.push(error.message));
  frame = await ready(phone);
  await phone.screenshot({ path: "artifacts/mobile-shelf.png" });
  assert.equal(await frame.evaluate(() => matchMedia("(pointer: coarse)").matches), true);
  assert.equal(await frame.evaluate(() => document.querySelector("#scene").width), 585);
  assert.equal(await frame.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await detail(frame);
  assert.equal(await frame.locator("#detail-panel").evaluate((el) => {
    const bounds = el.getBoundingClientRect();
    return getComputedStyle(el).opacity === "1" && bounds.top >= 0 && bounds.bottom <= innerHeight;
  }), true);
  await phone.screenshot({ path: "artifacts/mobile-open-book.png" });
  await frame.locator("#close-detail").click();
  await frame.waitForFunction(() => !document.querySelector("#browse-ui").inert);
  report.push("Mobile: touch, reduced motion, authored 1.5x pixel ratio, navigation and book controls passed.");
  await mobile.close();
  assert.deepEqual(errors, [], "Browser errors");
  await writeFile("artifacts/browser-report.json", JSON.stringify({ report, errors }, null, 2));
  console.log(report.join("\n"));
} finally {
  await browser.close();
}
