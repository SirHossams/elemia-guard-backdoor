// Elemia Guard — Backdoor Website
// Dropdown nav toggle (department names)

document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dept-dropdown");

  dropdowns.forEach((dd) => {
    const trigger = dd.querySelector("button");
    if (!trigger) return;

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dd.classList.contains("open");
      dropdowns.forEach((other) => other.classList.remove("open"));
      if (!isOpen) dd.classList.add("open");
    });
  });

  document.addEventListener("click", () => {
    dropdowns.forEach((dd) => dd.classList.remove("open"));
  });

  // Ad slider
  document.querySelectorAll(".ad-slider").forEach((slider) => {
    const track = slider.querySelector(".ad-slider-track");
    const slides = Array.from(slider.querySelectorAll(".ad-slide"));
    const dotsWrap = slider.querySelector(".ad-slider-dots");
    const prevBtn = slider.querySelector(".ad-slider-arrow.prev");
    const nextBtn = slider.querySelector(".ad-slider-arrow.next");
    if (!track || slides.length === 0) return;

    let index = 0;
    let timer = null;
    const intervalMs = 5000;

    const dots = slides.map((_, i) => {
      const dot = document.createElement("button");
      dot.className = "ad-slider-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
      return dot;
    });

    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === index));
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
      resetTimer();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function resetTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, intervalMs);
    }

    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    slider.addEventListener("mouseenter", () => { if (timer) clearInterval(timer); });
    slider.addEventListener("mouseleave", resetTimer);

    render();
    resetTimer();
  });
});
