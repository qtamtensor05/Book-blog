# Working Volumes

Exact-source integration of ThreeUI's `CompleteShelfLandingPage`.

## GitHub Pages

Kệ sách tự chuyển sang cuốn tiếp theo mỗi 4 giây. Khi rê chuột lên sách hoặc mở sách, kệ tạm dừng; sau thao tác chuột/phím, chờ 8 giây trước khi tự chạy lại. Có nút **Tạm dừng tự chạy / Tiếp tục tự chạy** ở góc trên bên phải. Tự chạy tắt khi người xem bật giảm chuyển động và tạm ngưng khi tab bị ẩn.

Trang giới thiệu: https://qtamtensor05.github.io/Book-blog/

Workflow `.github/workflows/pages.yml` build và triển khai khi push lên `main`, hoặc chạy thủ công từ tab Actions. Dùng GitHub Pages của repository public và runner tiêu chuẩn `ubuntu-latest`; không cần server, tên miền trả phí hay API key. Artifact chỉ lưu 1 ngày.

Trong Settings → Pages, chọn Source: **GitHub Actions**. Đường dẫn repository được lấy từ cấu hình Pages; iframe và tài nguyên dùng cùng base path. Có thể kiểm tra local bằng biến môi trường `PAGES_BASE_PATH=/Book-blog/` khi build, rồi mở `/Book-blog/` trên preview server.

Thêm vào README profile để dẫn người xem tới kệ sách:

```md
[📚 Khám phá kệ sách Book-blog](https://qtamtensor05.github.io/Book-blog/)
```

## Cuốn mẫu Book-blog

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173. Build with `npm run build`; serve the production build with `npm run preview`.

The workspace initially contained only `Skill.md`, so this integration supplies a minimal React/TypeScript/Vite application. `src/Scene.tsx` retains all eight configured typography props and now uses the customized project shelf. Vite and TypeScript still resolve the original ThreeUI component import to local verified source, rather than the older npm package implementation.

## Source preservation

- [Registered bundle](https://threeui.com/source-code/complete-shelf-landing-page.json), retained in `vendor/threeui/complete-shelf-landing-page.json`.
- [Canonical HTML](https://threeui.com/landing-pages/complete-shelf-v2.html), served byte-for-byte at `/landing-pages/complete-shelf-v2.html`.
- Revision: `606f200fed8602c243f40a11c8c364f0e625c57f80e7c97dc76419da207f198e`.
- All four registered files remain at their original paths and are verified during every production build. Git attributes prevent line-ending conversion.
- `CompleteShelfLandingPage.tsx` extracts the exact registered component function into a focused entry point. The full `LandingPages.tsx` is retained for provenance but is not compiled because it imports unrelated catalog components absent from the bundle.
- `LandingPageFrame.tsx` and `threeui.css` are unchanged. Typography is applied through the authored frame API without rewriting the HTML.
- The supporting [pageTypography.ts](https://github.com/MengTo/threeui/blob/main/src/shaders/landing-pages/pageTypography.ts) and the Complete Shelf recipe from [pageRecipes.ts](https://github.com/MengTo/threeui/blob/main/src/shaders/landing-pages/pageRecipes.ts) were retrieved from the official repository on 2026-09-21. The recipe and its number-format helpers are copied without behavioral changes.
- The shared stylesheet's `fonts/fragment-mono.woff2` is copied from its official repository path. Upstream license notices are under `vendor/threeui/`.

The HTML retains its embedded artwork and textures, Three.js **0.165.0** import map on jsDelivr, and Google Fonts Inter stylesheet. Those script/font requests require network access. Only the React host is lazy-loaded; the HTML is served as a static document, never bundled into JavaScript.

## Verification

```sh
npm run verify:source
npm run build
# With the development server running and Google Chrome installed:
npm run test:browser
```

Set `TEST_URL` to test another local server. Browser verification covers all seven volumes, navigation, keyboard/wheel input, opening and closing books, sample pages, reset view, mobile touch configuration, reduced motion, pixel ratio, resize, and actual WebGL context loss. Screenshots and the browser report are written to ignored `artifacts/`.

The authored mobile renderer caps pixel ratio at 1.5 and desktop at 2; the host preserves these limits. Context loss displays the authored static catalog and asks for a reload. The original document owns its animation/listener/renderer disposal on `beforeunload`; unloading the iframe also releases its browsing context.

At 390px width the authored open-book layout lets the book extend behind the upper part of the detail text. This source behavior is preserved; the controls remain within the viewport.
