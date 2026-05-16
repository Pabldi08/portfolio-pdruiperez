import { homeView } from "./views/homeView.js?v=cf5e129c45";
import { projectDetailView } from "./views/projectDetailView.js?v=cf5e129c45";
import { projectsView } from "./views/projectsView.js?v=cf5e129c45";
import { getProjectBySlug } from "./data/projects.js?v=cf5e129c45";
import { setupScrollAnimations } from "./animations.js?v=cf5e129c45";

let activeProjectFilter = "Todos";

function setTitle(title) {
    document.title = title ? `${title} | pdruiperez` : "pdruiperez | Portfolio";
}

export function renderRoute() {
    const app = document.querySelector("#app");
    const path = normalizePath(window.location.pathname);

    if (path === "/") {
        setTitle(null);
        app.innerHTML = homeView();
        window.scrollTo(0, 0);
        setupScrollAnimations();
        return;
    }

    const sectionRoutes = {
        "/stack": "stack",
        "/cv": "cv",
        "/sobre-mi": "cv",
        "/contacto": "contacto"
    };

    if (sectionRoutes[path]) {
        setTitle(null);
        app.innerHTML = homeView();
        setupScrollAnimations();
        requestAnimationFrame(() => {
            document.querySelector(`#${sectionRoutes[path]}`)?.scrollIntoView({ behavior: "smooth" });
        });
        return;
    }

    if (path === "/proyectos") {
        setTitle("Proyectos");
        app.innerHTML = projectsView(activeProjectFilter);
        window.scrollTo(0, 0);
        setupScrollAnimations();
        return;
    }

    if (path.startsWith("/proyectos/")) {
        const slug = path.replace("/proyectos/", "");
        const project = getProjectBySlug(slug);
        setTitle(project?.title ?? "Proyecto");
        app.innerHTML = projectDetailView(slug);
        window.scrollTo(0, 0);
        setupScrollAnimations();
        return;
    }

    setTitle("Página no encontrada");
    app.innerHTML = notFoundView();
    setupScrollAnimations();
}

function notFoundView() {
    return `
        <section class="mx-auto max-w-3xl px-6 py-24 text-center">
            <p class="text-sm font-bold uppercase tracking-[0.25em] text-sky-400">404</p>
            <h1 class="mt-4 text-5xl font-black tracking-tight">P&aacute;gina no encontrada</h1>
            <p class="mt-5 text-lg text-zinc-400">La ruta que buscas no existe o ha cambiado de direcci&oacute;n.</p>
            <a href="/" class="mt-10 inline-flex rounded-full bg-sky-400 px-7 py-3 font-bold text-zinc-950 transition hover:bg-sky-300">
                Volver al inicio
            </a>
        </section>
    `;
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
