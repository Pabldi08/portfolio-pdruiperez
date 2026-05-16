import { getProjectBySlug } from "../data/projects.js?v=cf5e129c45";
import { iconDownload, iconGitHub, iconTerminal } from "../components/icons.js?v=cf5e129c45";
import { getAccentClasses, renderPreview, tagList } from "../components/preview.js?v=cf5e129c45";
import { renderVirtualConsole } from "../components/virtualConsole.js?v=cf5e129c45";

export function projectDetailView(slug) {
    const project = getProjectBySlug(slug);

    if (!project) {
        return notFoundView();
    }

    const classes = getAccentClasses(project.accent);

    return `
        <section class="mx-auto max-w-6xl px-6 py-20">
            <a href="/proyectos" class="mb-8 inline-flex text-sm font-bold text-zinc-400 transition hover:text-sky-300">&larr; Volver a proyectos</a>

            <div class="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div>
                    <span class="rounded-full border ${classes.ring} px-3 py-1 text-xs font-bold ${classes.text}">${project.status}</span>
                    <h1 class="mt-6 text-5xl font-black tracking-tight md:text-7xl">${project.title}</h1>
                    <p class="mt-4 text-xl font-semibold text-zinc-500">${project.subtitle}</p>
                    <p class="text-description mt-8 text-lg leading-8 text-zinc-300">${project.description}</p>

                    <div class="mt-8 flex flex-wrap gap-2">${tagList(project)}</div>

                    <div class="mt-10 flex flex-col gap-4 sm:flex-row">
                        ${githubButton(project)}
                        ${artifactButton(project, classes)}
                    </div>

                    ${project.artifact?.note ? `<p class="mt-4 text-sm text-zinc-500">${project.artifact.note}</p>` : ""}
                </div>

                <aside class="rounded-2xl border border-white/10 bg-zinc-900/75 p-6 shadow-2xl shadow-black/30">
                    <div class="overflow-hidden rounded-xl border border-white/10">
                        ${renderPreview(project)}
                    </div>

                    <div class="mt-8">
                        <h2 class="text-2xl font-black">Qu&eacute; demuestra</h2>
                        <ul class="text-description mt-5 space-y-4 text-zinc-400">
                            ${project.highlights.map(item => `
                                <li class="flex gap-3">
                                    <span class="mt-2 h-2 w-2 shrink-0 rounded-full ${classes.bg}"></span>
                                    <span>${item}</span>
                                </li>
                            `).join("")}
                        </ul>
                    </div>
                </aside>
            </div>

            ${renderVirtualConsole(project)}
        </section>
    `;
}

function githubButton(project) {
    if (!project.githubUrl) {
        return `
            <span class="inline-flex cursor-not-allowed items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 font-black text-zinc-500">
                ${iconGitHub()} Repositorio pendiente
            </span>
        `;
    }

    return `
        <a href="${project.githubUrl}" target="_blank" rel="noreferrer"
            class="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3 font-black text-zinc-950 transition hover:-translate-y-1 hover:bg-zinc-200">
            ${iconGitHub()} Repositorio
        </a>
    `;
}

function artifactButton(project, classes) {
    if (project.console) {
        return `
            <button type="button" data-open-console="${project.slug}"
                class="inline-flex items-center justify-center gap-3 rounded-full ${classes.button} px-6 py-3 font-black transition hover:-translate-y-1">
                ${iconTerminal()} ${project.console.ctaLabel ?? "Abrir consola"}
            </button>
        `;
    }

    if (!project.artifact?.url) {
        return `
            <span class="inline-flex cursor-not-allowed items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 font-black text-zinc-500">
                ${iconDownload()} Demo o ejecutable pendiente
            </span>
        `;
    }

    return `
        <a href="${project.artifact.url}"
            class="inline-flex items-center justify-center gap-3 rounded-full ${classes.button} px-6 py-3 font-black transition hover:-translate-y-1">
            ${iconDownload()} ${project.artifact.label}
        </a>
    `;
}

function notFoundView() {
    return `
        <section class="mx-auto max-w-3xl px-6 py-24">
            <a href="/proyectos" class="mb-8 inline-flex text-sm font-bold text-zinc-400 transition hover:text-sky-300">&larr; Volver a proyectos</a>
            <h1 class="text-5xl font-black">Proyecto no encontrado</h1>
            <p class="text-description mt-5 text-zinc-400">La vista que buscas no existe o el proyecto ha cambiado de identificador.</p>
        </section>
    `;
}
