import { navigateTo, renderRoute, setProjectFilter } from "./router.js?v=09a2de1e55";
import { closeConsolePanel, handleConsoleSubmit, openConsolePanel } from "./components/virtualConsole.js?v=09a2de1e55";

document.addEventListener("click", (event) => {
    const internalLink = event.target.closest("a[href^='/']");
    if (internalLink && internalLink.origin === window.location.origin) {
        event.preventDefault();
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

window.addEventListener("popstate", renderRoute);
renderRoute();
