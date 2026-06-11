const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;

if (savedTheme) {
  root.dataset.theme = savedTheme;
} else if (prefersLight) {
  root.dataset.theme = "light";
}

const toggle = document.querySelector("[data-theme-toggle]");
const syncToggle = () => {
  if (!toggle) return;
  toggle.textContent = root.dataset.theme === "light" ? "☀" : "☾";
};

syncToggle();

toggle?.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
  syncToggle();
});

document.querySelector("[data-print]")?.addEventListener("click", () => {
  window.print();
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 }
  );

  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add("in"));
}
