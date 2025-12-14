// script.js (Vanilla JS - GitHub Pages friendly)
document.addEventListener("DOMContentLoaded", () => {
  // ===== Programming Skills: animate bar =====
  const progItems = document.querySelectorAll(".skills-prog li[data-percent]");

  progItems.forEach((li, i) => {
    const percent = parseFloat(li.dataset.percent) || 0;
    const bar = li.querySelector(".skills-bar .bar");
    if (!bar) return;

    // start state
    bar.style.width = "0%";
    bar.style.transition = "none";

    // delay per item (like jQuery delay)
    setTimeout(() => {
      bar.style.transition = "width 1s linear";
      bar.style.width = percent + "%";
    }, i * 150);
  });

  // ===== Software Skills: animate circle + percentage text =====
  const softItems = document.querySelectorAll(".skills-soft li[data-percent]");

  softItems.forEach((li, i) => {
    const percent = parseFloat(li.dataset.percent) || 0;
    const circle = li.querySelector("circle.cbar");
    const small = li.querySelector("small");

    if (!circle) return;

    const r = circle.r.baseVal.value;
    const c = 2 * Math.PI * r;

    // set dash
    circle.style.strokeDasharray = `${c}`;
    circle.style.strokeDashoffset = `${c}`;

    // animate dash
    setTimeout(() => {
      circle.style.transition = "stroke-dashoffset 1s linear";
      const offset = ((100 - percent) / 100) * c;
      circle.style.strokeDashoffset = `${offset}`;
    }, i * 150);

    // animate number text
    if (small) {
      small.textContent = "0%";
      setTimeout(() => {
        const duration = 1000;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const value = Math.ceil(progress * percent);
          small.textContent = value + "%";
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      }, i * 150);
    }
  });
});
