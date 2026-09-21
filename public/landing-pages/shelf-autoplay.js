// Chuyển sách sau 4 giây; nhường điều khiển 8 giây sau thao tác của người xem.
export function startShelfAutoplay({ canAdvance, advance }) {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "shelf-autoplay";
  document.querySelector(".editorial-index").append(button);
  let enabled = !reducedMotion.matches;
  let timer;
  let disposed = false;

  function render() {
    button.disabled = reducedMotion.matches;
    button.textContent = reducedMotion.matches
      ? "Đã giảm chuyển động"
      : enabled ? "Tạm dừng tự chạy" : "Tiếp tục tự chạy";
    button.setAttribute("aria-label", button.textContent);
    button.dataset.enabled = String(enabled);
  }

  function schedule(delay = 2000) {
    clearTimeout(timer);
    if (disposed || !enabled || reducedMotion.matches || document.hidden) return;
    timer = setTimeout(() => {
      if (canAdvance()) advance();
      schedule();
    }, delay);
  }

  function onInteraction() { schedule(8000); }
  function onVisibility() { schedule(); }
  function onMotion() {
    enabled = !reducedMotion.matches;
    render();
    schedule();
  }
  function toggle() {
    enabled = !enabled;
    render();
    schedule();
  }

  button.addEventListener("click", toggle);
  for (const event of ["pointerdown", "wheel", "keydown"]) {
    document.addEventListener(event, onInteraction, { capture: true, passive: true });
  }
  document.addEventListener("visibilitychange", onVisibility);
  reducedMotion.addEventListener("change", onMotion);
  render();
  schedule();

  return () => {
    disposed = true;
    clearTimeout(timer);
    button.removeEventListener("click", toggle);
    for (const event of ["pointerdown", "wheel", "keydown"]) {
      document.removeEventListener(event, onInteraction, true);
    }
    document.removeEventListener("visibilitychange", onVisibility);
    reducedMotion.removeEventListener("change", onMotion);
    button.remove();
  };
}
