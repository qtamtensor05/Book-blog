import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const source = await readFile(new URL("../public/landing-pages/complete-shelf-v2.html", import.meta.url));
assert.equal(createHash("sha256").update(source).digest("hex"), "606f200fed8602c243f40a11c8c364f0e625c57f80e7c97dc76419da207f198e");
let html = source.toString("utf8");
function replaceOnce(anchor, replacement) {
  assert.equal(html.split(anchor).length, 2, `Expected one source anchor: ${anchor}`);
  html = html.replace(anchor, () => replacement);
}
replaceOnce('    const BOOKS = [', `    import { projectBook } from "./book-blog-content.js";
    import { makeProjectCover, makeProjectPages } from "./book-blog-textures.js";

    const BOOKS = [`);
replaceOnce('    const COVER_CROPS = [', `    Object.assign(BOOKS[0], projectBook);

    const COVER_CROPS = [`);
replaceOnce('    function makeCoverTexture(book) {', `    function makeCoverTexture(book) {
      if (book.pages) return makeProjectCover(book, THREE, configureCanvasTexture);`);
replaceOnce('    function makeInteriorPageTextures(book) {', `    function makeInteriorPageTextures(book) {
      if (book.pages) return makeProjectPages(book, THREE, configureCanvasTexture, drawPaperSurface, seededRandom);`);
replaceOnce('    function getSpreadLabels(book) {', `    function getSpreadLabels(book) {
      if (book.spreadLabels) return book.spreadLabels;`);
replaceOnce('        await document.fonts.load("600 82px Inter");', `        await document.fonts.load("600 82px Inter");
        await document.fonts.load("400 20px Inter", "Giới thiệu dự án");
        await document.fonts.load("500 34px Inter", "Giới thiệu dự án");`);
// Initial UI and static fallback must agree with the custom book before initialization.
const moduleStart = html.indexOf('  <script type="module">');
html = html.slice(0, moduleStart)
  .replaceAll("Codex", "Book-blog")
  .replace("Precise intent, translated into tested systems.", "Một kệ sách tương tác để khám phá nội dung theo từng trang.")
  + html.slice(moduleStart);
await writeFile(new URL("../public/landing-pages/book-blog-shelf.html", import.meta.url), html);
console.log("Generated Book-blog shelf; canonical ThreeUI source unchanged.");
