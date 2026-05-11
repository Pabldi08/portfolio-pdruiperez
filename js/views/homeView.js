import { getFeaturedProjects } from "../data/projects.js?v=09a2de1e55";
import { contacts } from "../data/contacts.js?v=09a2de1e55";
import { resumeItems } from "../data/resume.js?v=09a2de1e55";
import { stackItems } from "../data/stack.js?v=09a2de1e55";
import { contactLink } from "../components/contactLink.js?v=09a2de1e55";
import { iconBriefcase } from "../components/icons.js?v=09a2de1e55";
import { projectCard } from "../components/projectCard.js?v=09a2de1e55";
import { stackCard } from "../components/stackCard.js?v=09a2de1e55";

export function homeView() {
    const featured = getFeaturedProjects();

    return `
        <header class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
            <section>
                <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                    <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                    Portfolio personal en desarrollo
                </div>

                <h1 class="text-5xl font-black leading-tight tracking-tight md:text-7xl">
                    Desarrollo software con foco en
                    <span class="bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-200 bg-clip-text text-transparent">
                        Java, C++, datos y backend.
                    </span>
                </h1>

                <p class="text-description mt-6 max-w-xl text-lg leading-8 text-zinc-400">
                    Soy Pablo, estudiante de Ingenier&iacute;a Inform&aacute;tica en crecimiento. Aqu&iacute; documento proyectos, pr&aacute;cticas y experimentos:
                    desde juegos en consola hasta aplicaciones con arquitectura m&aacute;s seria.
                </p>

                <div class="mt-10 flex flex-col gap-4 sm:flex-row">
                    <a href="/proyectos"
                        class="rounded-full bg-emerald-400 px-7 py-3 text-center font-bold text-zinc-950 shadow-lg shadow-emerald-400/20 transition hover:-translate-y-1 hover:bg-emerald-300">
                        Ver todos los proyectos
                    </a>
                    <a href="/cv"
                        class="rounded-full border border-white/15 px-7 py-3 text-center font-bold text-zinc-200 transition hover:-translate-y-1 hover:border-emerald-400 hover:text-emerald-300">
                        Ver CV
                    </a>
                </div>
            </section>

            <section class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/40">
                <div class="overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
                    <div class="flex items-center gap-2 border-b border-white/10 bg-zinc-900 px-4 py-3">
                        <span class="h-3 w-3 rounded-full bg-red-500"></span>
                        <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
                        <span class="h-3 w-3 rounded-full bg-green-500"></span>
                        <span class="ml-3 text-xs text-zinc-500">terminal</span>
                    </div>

                    <div class="space-y-4 p-6 font-mono text-sm">
                        <p><span class="text-emerald-400">pablo@portfolio</span>:<span class="text-cyan-300">~</span>$ java Main</p>
                        <p class="text-zinc-400">Compilando proyecto...</p>
                        <p class="text-zinc-300">OK POO aplicada</p>
                        <p class="text-zinc-300">OK L&oacute;gica de negocio separada</p>
                        <p class="text-zinc-300">OK C&oacute;digo limpio y mantenible</p>
                        <p><span class="text-emerald-400">Output:</span> listo para seguir aprendiendo.</p>
                    </div>
                </div>
            </section>
        </header>

        <section id="cv" class="mx-auto max-w-6xl px-6 py-20">
            <div class="mb-12 flex items-center gap-4">
                <span class="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-100">
                    ${iconBriefcase()}
                </span>
                <div>
                    <p class="mb-1 text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">Curr&iacute;culum</p>
                    <h2 class="text-4xl font-black tracking-tight md:text-5xl">CV y experiencia pr&aacute;ctica</h2>
                </div>
            </div>

            <div class="relative">
                <div class="absolute bottom-8 left-3 top-3 w-px bg-white/15 md:left-4"></div>
                <div class="space-y-14">
                    ${resumeItems.map(resumeItem).join("")}
                </div>
            </div>
        </section>

        <section id="proyectos-destacados" class="mx-auto max-w-6xl px-6 py-20">
            <div class="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <p class="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">Proyectos destacados</p>
                    <h2 class="text-4xl font-black tracking-tight md:text-5xl">Dos cosas que quiero ense&ntilde;ar primero</h2>
                </div>
                <a href="/proyectos" class="text-sm font-bold text-cyan-300 transition hover:text-cyan-200">
                    Ver listado completo
                </a>
            </div>

            <div class="grid gap-8 md:grid-cols-2">
                ${featured.map(projectCard).join("")}
            </div>
        </section>

        <section id="stack" class="border-y border-white/10 bg-white/[0.03]">
            <div class="mx-auto max-w-6xl px-6 py-20">
                <p class="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">Stack</p>
                <h2 class="mb-10 text-4xl font-black tracking-tight">Stack que estoy trabajando</h2>

                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    ${stackItems.map(stackCard).join("")}
                </div>
            </div>
        </section>

        <section id="contacto" class="mx-auto max-w-6xl px-6 py-20">
            <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div>
                    <p class="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">Contacto</p>
                    <h2 class="text-4xl font-black tracking-tight">&iquest;Construimos algo?</h2>
                </div>

                <div class="flex flex-wrap gap-4">
                    ${contacts.map(contactLink).join("")}
                </div>
            </div>
        </section>
    `;
}

function resumeItem(item) {
    return `
        <article class="relative grid gap-5 pl-12 md:grid-cols-[0.9fr_1.5fr] md:gap-12 md:pl-16">
            <span class="absolute left-0 top-2 z-10 h-7 w-7 rounded-full border-4 border-zinc-950 bg-emerald-400 shadow-lg shadow-emerald-400/25 md:left-1"></span>

            <div>
                <h3 class="text-2xl font-black leading-tight text-emerald-300">${item.title}</h3>
                <p class="mt-2 text-xl font-black text-white">${item.organization}</p>
                <p class="mt-2 text-sm font-bold text-zinc-500">${item.period}</p>
            </div>

            <div>
                <p class="text-description max-w-2xl text-lg leading-8 text-zinc-300">${item.description}</p>
                ${resumeLink(item)}
            </div>
        </article>
    `;
}

function resumeLink(item) {
    if (!item.link) {
        return "";
    }

    const isExternal = item.link.href.startsWith("http");
    const target = isExternal ? ' target="_blank" rel="noreferrer"' : "";

    return `
        <a href="${item.link.href}"${target}
            class="mt-4 inline-flex text-base font-black text-amber-200 transition hover:text-amber-100">
            ${item.link.label} &rarr;
        </a>
    `;
}
