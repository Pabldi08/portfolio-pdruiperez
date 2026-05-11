import { getAllTags, getProjectsByTag } from "../data/projects.js?v=09a2de1e55";
import { projectCard } from "../components/projectCard.js?v=09a2de1e55";

export function projectsView(activeFilter) {
    const tags = getAllTags();
    const visibleProjects = getProjectsByTag(activeFilter);

    return `
        <section class="mx-auto max-w-6xl px-6 py-20">
            <a href="/" class="mb-8 inline-flex text-sm font-bold text-zinc-400 transition hover:text-emerald-300">&larr; Volver al inicio</a>
            <div class="mb-10 max-w-3xl">
                <p class="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">Todos los proyectos</p>
                <h1 class="text-5xl font-black tracking-tight md:text-7xl">El taller completo.</h1>
                <p class="text-description mt-5 text-lg leading-8 text-zinc-400">
                    Aqu&iacute; aparecen tanto los proyectos terminados como los que siguen creciendo. Cada tarjeta abre una vista con m&aacute;s detalle,
                    enlace a GitHub, demo interactiva o ejecutable cuando exista.
                </p>
            </div>

            <div class="mb-10 flex flex-wrap gap-3">
                ${tags.map(tag => filterButton(tag, activeFilter)).join("")}
            </div>

            <div class="grid gap-8 md:grid-cols-2">
                ${visibleProjects.map(projectCard).join("")}
            </div>
        </section>
    `;
}

function filterButton(tag, activeFilter) {
    const activeClasses = "border-emerald-400 bg-emerald-400 text-zinc-950";
    const idleClasses = "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-emerald-400/60 hover:text-emerald-300";
    const buttonClasses = activeFilter === tag ? activeClasses : idleClasses;

    return `
        <button type="button" data-filter="${tag}"
            class="rounded-full border px-4 py-2 text-sm font-bold transition ${buttonClasses}">
            ${tag}
        </button>
    `;
}
