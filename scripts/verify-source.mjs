import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const bundle = JSON.parse(await readFile(new URL("../vendor/threeui/complete-shelf-landing-page.json", import.meta.url), "utf8"));
const expected = {
  "src/shaders/landing-pages/LandingPages.tsx": "4d379461ad00eb4de7900df312878035383de7e1ed4e13283b8143a2eea9d30a",
  "src/shaders/landing-pages/LandingPageFrame.tsx": "61de2cc50888aac4ac5557420b07fa47ed3543bb57c1e0055fafdefa53dbaa78",
  "public/landing-pages/complete-shelf-v2.html": "606f200fed8602c243f40a11c8c364f0e625c57f80e7c97dc76419da207f198e",
  "src/shaders/threeui.css": "efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf",
};
for (const [path, hash] of Object.entries(expected)) {
  const bytes = await readFile(new URL(`../${path}`, import.meta.url));
  assert.equal(createHash("sha256").update(bytes).digest("hex"), hash, path);
  const registeredFile = bundle.files.find((file) => file.path === path);
  if (registeredFile.code !== undefined) assert.ok(bytes.toString("utf8") === registeredFile.code, path);
  console.log(`Verified ${path}`);
}
const registered = bundle.files[0].code.match(/export function CompleteShelfLandingPage[\s\S]*?\n}/)[0];
const local = await readFile(new URL("../src/shaders/landing-pages/CompleteShelfLandingPage.tsx", import.meta.url), "utf8");
assert.ok(local.includes(registered), "Local export must preserve the registered component function");
