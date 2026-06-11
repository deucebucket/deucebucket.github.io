const visualPolish = document.createElement("link");
visualPolish.rel = "stylesheet";
visualPolish.href = "visual-polish.css?v=3";
document.head.appendChild(visualPolish);

const mobileFixes = document.createElement("link");
mobileFixes.rel = "stylesheet";
mobileFixes.href = "mobile-fixes.css?v=2";
document.head.appendChild(mobileFixes);

const printStyles = document.createElement("link");
printStyles.rel = "stylesheet";
printStyles.href = "print-resume.css?v=2";
document.head.appendChild(printStyles);

const printResume = document.querySelector(".print-resume");
if (printResume) {
  printResume.style.display = "none";

  const clankerHeading = Array.from(printResume.querySelectorAll("h3"))
    .find(heading => heading.textContent?.includes("Clanker"));

  const clankerParagraph = clankerHeading?.nextElementSibling;
  if (clankerParagraph && !clankerParagraph.textContent.includes("zenodo")) {
    clankerParagraph.textContent =
      "Built experimental conversation-state and persistent agent-state systems around structured emotional/intent signals, mood/state persistence, feedback loops, trigger-driven behavior, and host integration rules. Published the VADUGWI method as a Zenodo preprint: doi.org/10.5281/zenodo.19383636.";
  }
}

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
  if (printResume) {
    printResume.style.display = "block";
  }
  window.print();
  setTimeout(() => {
    if (printResume) {
      printResume.style.display = "none";
    }
  }, 500);
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
