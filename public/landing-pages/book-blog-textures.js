// Chỉ vẽ nội dung của cuốn tùy biến; hình học và chuyển động do nguồn gốc quản lý.
function linesFor(ctx, text, width) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/u)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > width) {
      lines.push(line);
      line = word;
    } else line = candidate;
  }
  if (line) lines.push(line);
  return lines;
}

function surface() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1536;
  const ctx = canvas.getContext("2d");
  ctx.scale(2, 2);
  return { canvas, ctx };
}

export function makeProjectCover(book, THREE, configure) {
  const { canvas, ctx } = surface();
  ctx.fillStyle = book.color;
  ctx.fillRect(0, 0, 512, 768);
  ctx.strokeStyle = book.foil;
  ctx.lineWidth = 1;
  ctx.strokeRect(24, 24, 464, 720);
  // Giữ vùng đầu và cuối cho lớp chữ foil có sẵn của renderer.
  ctx.lineWidth = 2;
  for (let leaf = 0; leaf < 4; leaf++) {
    const inset = leaf * 12;
    ctx.beginPath();
    ctx.moveTo(256, 435 + inset);
    ctx.lineTo(130 + inset, 385 + inset);
    ctx.lineTo(130 + inset, 215 + inset);
    ctx.lineTo(256, 265 + inset);
    ctx.lineTo(382 - inset, 215 + inset);
    ctx.lineTo(382 - inset, 385 + inset);
    ctx.lineTo(256, 435 + inset);
    ctx.lineTo(256, 265 + inset);
    ctx.stroke();
  }
  return configure(new THREE.CanvasTexture(canvas));
}

export function makeProjectPages(book, THREE, configure, drawPaperSurface, seededRandom) {
  return book.pages.map((page, index) => {
    const { canvas, ctx } = surface();
    drawPaperSurface(ctx, 512, 768, seededRandom(book.seed + index));
    ctx.fillStyle = "#28344a";
    ctx.strokeStyle = "#bba17d";
    ctx.font = '500 11px Inter, Arial, sans-serif';
    ctx.fillText("BOOK-BLOG / GIỚI THIỆU DỰ ÁN", 48, 48);
    ctx.textAlign = "right";
    ctx.fillText(String(index + 1).padStart(2, "0"), 464, 48);
    ctx.textAlign = "left";
    ctx.fillRect(48, 66, 416, 1);
    ctx.fillStyle = "#8f4b2e";
    ctx.font = '500 11px Inter, Arial, sans-serif';
    ctx.fillText(page.kicker, 48, 112);
    ctx.fillStyle = "#1d293e";
    ctx.font = '500 34px Inter, Arial, sans-serif';
    const headings = linesFor(ctx, page.title, 416);
    headings.forEach((line, i) => ctx.fillText(line, 48, 164 + i * 44));
    let y = 164 + headings.length * 44 + 16;
    ctx.font = '400 20px Inter, Arial, sans-serif';
    for (const paragraph of page.paragraphs) {
      for (const line of linesFor(ctx, paragraph, 408)) {
        if (y > 684) throw new Error(`Nội dung trang ${index + 1} vượt khung giấy`);
        ctx.fillText(line, 48, y);
        y += 30;
      }
      y += 18;
    }
    ctx.fillStyle = "#8f4b2e";
    ctx.fillRect(48, 720, 416, 1);
    ctx.font = '400 10px Inter, Arial, sans-serif';
    ctx.fillText("BOOK-BLOG · BẢN GIỚI THIỆU", 48, 742);
    const texture = configure(new THREE.CanvasTexture(canvas), { anisotropy: 16 });
    texture.name = `book-blog-interior-page-${index + 1}`;
    return texture;
  });
}
