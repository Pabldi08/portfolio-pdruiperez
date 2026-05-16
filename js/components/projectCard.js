import { getAccentClasses, renderPreview, tagList } from "./preview.js?v=cf5e129c45";

export function projectCard(project) {
    const classes = getAccentClasses(project.accent);

    return `
        <a href="/proyectos/${project.slug}"
            class="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/75 shadow-xl shadow-black/20 transition hover:-translate-y-2 ${classes.border}">
            ${renderPreview(project)}
            <div class="p-7">
                <div class="mb-4 flex items-center justify-between gap-3">
                    <span class="rounded-full border ${classes.ring} px-3 py-1 text-xs font-bold ${classes.text}">${project.status}</span>
                </div>
                <h3 class="text-2xl font-black text-white group-hover:${classes.text}">${project.title}</h3>
                <p class="mt-2 text-sm font-semibold text-zinc-500">${project.subtitle}</p>
                <p class="text-description mt-4 leading-7 text-zinc-400">${project.summary}</p>
                <div class="mt-6 flex flex-wrap gap-2">${tagList(project)}</div>
            </div>
        </a>
    `;
}
