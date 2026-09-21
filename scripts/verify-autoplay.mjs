import assert from "node:assert/strict";
import { chromium } from "playwright";

const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(process.env.TEST_URL || "http://127.0.0.1:4174/Book-blog/");
  const host = page.frameLocator("iframe");
  await host.locator(".webgl-ready").waitFor({ timeout: 90000 });
  const title = host.locator("#selection-title");
  const control = host.locator(".shelf-autoplay");
  await page.mouse.move(5, 5);
  const first = await title.textContent();
  await page.waitForTimeout(5200);
  assert.notEqual(await title.textContent(), first, "Shelf advances without input");
  await control.click();
  const paused = await title.textContent();
  await page.waitForTimeout(5200);
  assert.equal(await title.textContent(), paused, "Pause holds selection");
  await control.click();
  await page.waitForTimeout(5200);
  assert.notEqual(await title.textContent(), paused, "Resume advances selection");
  await host.locator("#inspect").click();
  await host.locator(".mode-detail:not(.is-opening)").waitFor();
  const opened = await host.locator("#detail-title").textContent();
  await page.waitForTimeout(9000);
  assert.equal(await title.textContent(), opened, "Reading pauses autoplay");
  await host.locator("#close-detail").click();
  await page.mouse.move(5, 5);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await host.locator(".shelf-autoplay:disabled").waitFor();
  assert.equal(await control.isDisabled(), true);
  const reduced = await title.textContent();
  await page.waitForTimeout(5200);
  assert.equal(await title.textContent(), reduced, "Reduced motion disables autoplay");
  assert.deepEqual(errors, []);
  console.log("PASS: automatic advance, pause/resume, reading pause, reduced motion; no browser errors.");
} finally {
  await browser.close();
}
