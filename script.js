const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");

const readSavedTheme = () => {
  try {
    return localStorage.getItem("portfolio-theme");
  } catch (error) {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch (error) {
    // Some file:// contexts block storage; the toggle still works for the current page.
  }
};

const getInitialTheme = () => readSavedTheme() || "light";

const setTheme = (theme) => {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;

  if (themeToggle && themeLabel) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Activar modo claro" : "Activar modo oscuro");
    themeLabel.textContent = isDark ? "Modo claro" : "Modo oscuro";
  }

  saveTheme(theme);
};

const updateHeader = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

setTheme(getInitialTheme());
updateHeader();

window.addEventListener("scroll", updateHeader, { passive: true });

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
