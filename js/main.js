import { navigateTo, renderRoute, setProjectFilter } from "./router.js?v=cf5e129c45";
import { handleBooterClick, handleBooterKeydown, shouldShowBooter, startBooter, stopBooter } from "./components/booter.js?v=cf5e129c45";
import { closeConsolePanel, handleConsoleSubmit, openConsolePanel } from "./components/virtualConsole.js?v=cf5e129c45";

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

function closeMobileMenu() {
    if (!mobileMenu || mobileMenu.hidden) return;
    mobileMenu.hidden = true;
    mobileMenuBtn?.setAttribute("aria-expanded", "false");
    mobileMenuBtn?.querySelector(".icon-menu")?.classList.remove("hidden");
    mobileMenuBtn?.querySelector(".icon-close")?.classList.add("hidden");
}

mobileMenuBtn?.addEventListener("click", () => {
    const willOpen = mobileMenu.hidden;
    mobileMenu.hidden = !willOpen;
    mobileMenuBtn.setAttribute("aria-expanded", String(willOpen));
    mobileMenuBtn.querySelector(".icon-menu").classList.toggle("hidden", willOpen);
    mobileMenuBtn.querySelector(".icon-close").classList.toggle("hidden", !willOpen);
});

document.addEventListener("click", (event) => {
    if (handleBooterClick(event)) {
        return;
    }

    const internalLink = event.target.closest("a[href^='/']");
    if (internalLink && internalLink.origin === window.location.origin) {
        event.preventDefault();
        closeMobileMenu();
        navigateTo(internalLink.pathname);
        return;
    }

    const filterButton = event.target.closest("[data-filter]");
    if (filterButton) {
        setProjectFilter(filterButton.dataset.filter);
        return;
    }

    const openConsoleButton = event.target.closest("[data-open-console]");
    if (openConsoleButton) {
        openConsolePanel(openConsoleButton.dataset.openConsole);
        return;
    }

    const closeConsoleButton = event.target.closest("[data-close-console]");
    if (closeConsoleButton) {
        closeConsolePanel(closeConsoleButton.dataset.closeConsole);
    }
});

document.addEventListener("keydown", (event) => {
    handleBooterKeydown(event);
});

document.addEventListener("submit", (event) => {
    const consoleForm = event.target.closest("[data-console-form]");
    if (!consoleForm) return;

    event.preventDefault();

    const input = consoleForm.querySelector('input[name="command"]');
    const command = input?.value ?? "";

    handleConsoleSubmit(consoleForm.dataset.consoleForm, command);

    if (input) {
        input.value = "";
        input.focus();
    }
});

window.addEventListener("popstate", renderApp);
renderApp();

function renderApp() {
    closeMobileMenu();

    if (shouldShowBooter()) {
        setShellVisible(false);
        startBooter();
        return;
    }

    stopBooter();
    setShellVisible(true);
    renderRoute();
}

function setShellVisible(visible) {
    document.querySelectorAll("[data-site-shell]").forEach(element => {
        element.hidden = !visible;
    });
}
