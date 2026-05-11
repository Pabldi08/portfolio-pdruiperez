import { homeView } from "./views/homeView.js?v=09a2de1e55";
import { projectDetailView } from "./views/projectDetailView.js?v=09a2de1e55";
import { projectsView } from "./views/projectsView.js?v=09a2de1e55";

let activeProjectFilter = "Todos";

export function renderRoute() {
    const app = document.querySelector("#app");
    const path = normalizePath(window.location.pathname);

    if (path === "/") {
        app.innerHTML = homeView();
        window.scrollTo(0, 0);
        return;
    }

    const sectionRoutes = {
        "/stack": "stack",
        "/cv": "cv",
        "/sobre-mi": "cv",
        "/contacto": "contacto"
    };

    if (sectionRoutes[path]) {
        app.innerHTML = homeView();
        requestAnimationFrame(() => {
            document.querySelector(`#${sectionRoutes[path]}`)?.scrollIntoView({ behavior: "smooth" });
        });
        return;
    }

    if (path === "/proyectos") {
        app.innerHTML = projectsView(activeProjectFilter);
        window.scrollTo(0, 0);
        return;
    }

    if (path.startsWith("/proyectos/")) {
        app.innerHTML = projectDetailView(path.replace("/proyectos/", ""));
        window.scrollTo(0, 0);
        return;
    }

    app.innerHTML = homeView();
}

export function navigateTo(path) {
    const nextPath = normalizePath(path);

    if (nextPath === normalizePath(window.location.pathname)) {
        renderRoute();
        return;
    }

    window.history.pushState({}, "", nextPath);
    renderRoute();
}

export function setProjectFilter(filter) {
    activeProjectFilter = filter;
    navigateTo("/proyectos");
}

function normalizePath(path) {
    if (!path || path === "/index.html") {
        return "/";
    }

    const cleanPath = path.replace(/\/+$/, "");
    return cleanPath || "/";
}
