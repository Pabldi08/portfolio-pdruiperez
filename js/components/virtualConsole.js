import { getProjectBySlug } from "../data/projects.js?v=cf5e129c45";
import { getAccentClasses } from "./preview.js?v=cf5e129c45";

export function renderVirtualConsole(project) {
    if (!project.console) {
        return "";
    }

    const classes = getAccentClasses(project.accent);
    const initialLines = project.console.initialLines ?? [];
    const prompt = project.console.prompt ?? "demo@portfolio:~$";

    return `
        <section id="console-${project.slug}" class="mt-14 hidden" data-console-panel="${project.slug}">
            <div class="rounded-3xl border border-white/10 bg-zinc-950/80 shadow-2xl shadow-black/40">
                <div class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
                    <div>
                        <p class="text-xs font-bold uppercase tracking-[0.3em] ${classes.text}">Consola virtual</p>
                        <h2 class="mt-2 text-2xl font-black text-white">${project.console.title ?? project.title}</h2>
                        <p class="text-description mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                            Entorno interactivo preparado para demos de proyectos de terminal. Puedes ampliar los comandos cuando quieras desde los datos del proyecto.
                        </p>
                    </div>

                    <button type="button" data-close-console="${project.slug}"
                        class="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-white/20 hover:text-white">
                        Cerrar
                    </button>
                </div>

                <div class="grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <div class="overflow-hidden rounded-2xl border border-white/10 bg-black">
                        <div class="flex items-center gap-2 border-b border-white/10 bg-zinc-900 px-4 py-3">
                            <span class="h-3 w-3 rounded-full bg-red-500"></span>
                            <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
                            <span class="h-3 w-3 rounded-full bg-green-500"></span>
                            <span class="ml-3 text-xs text-zinc-500">runtime.web</span>
                        </div>

                        <div class="min-h-[18rem] max-h-[24rem] space-y-2 overflow-y-auto px-4 py-5 font-mono text-sm text-zinc-200" data-console-output="${project.slug}">
                            ${renderConsoleLines(initialLines)}
                        </div>

                        <form class="border-t border-white/10 bg-zinc-950 px-4 py-4" data-console-form="${project.slug}">
                            <label class="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                                <span class="shrink-0 ${classes.text}">${prompt}</span>
                                <input
                                    type="text"
                                    name="command"
                                    value=""
                                    autocomplete="off"
                                    spellcheck="false"
                                    placeholder="/help"
                                    class="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                                >
                            </label>
                        </form>
                    </div>

                    <div class="space-y-4">
                        <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                            <p class="text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">Comandos base</p>
                            <ul class="mt-4 space-y-3 text-sm text-zinc-300">
                                <li><span class="${classes.text}">/help</span> muestra la ayuda inicial.</li>
                                <li><span class="${classes.text}">/view</span> abre la demo visual.</li>
                                <li><span class="${classes.text}">/clear</span> limpia el historial.</li>
                            </ul>
                        </div>

                        <div class="hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5" data-console-preview="${project.slug}">
                            ${renderConsolePreview(project)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

export function openConsolePanel(projectSlug) {
    const panel = document.querySelector(`[data-console-panel="${projectSlug}"]`);
    if (!panel) {
        return;
    }

    panel.classList.remove("hidden");
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
    panel.querySelector('input[name="command"]')?.focus();
}

export function closeConsolePanel(projectSlug) {
    const panel = document.querySelector(`[data-console-panel="${projectSlug}"]`);
    if (!panel) {
        return;
    }

    panel.classList.add("hidden");
}

export function handleConsoleSubmit(projectSlug, command) {
    const project = getProjectBySlug(projectSlug);
    const panel = document.querySelector(`[data-console-panel="${projectSlug}"]`);
    const output = document.querySelector(`[data-console-output="${projectSlug}"]`);

    if (!project?.console || !panel || !output) {
        return;
    }

    const trimmedCommand = command.trim();
    if (!trimmedCommand) {
        return;
    }

    appendConsoleLine(output, `${project.console.prompt ?? "demo@portfolio:~$"} ${trimmedCommand}`, "prompt");

    if (trimmedCommand === "/clear") {
        output.innerHTML = "";
        appendConsoleLine(output, "Historial limpiado.", "muted");
        return;
    }

    const commandResponse = project.console.commands?.[trimmedCommand];
    const lines = commandResponse?.lines ?? project.console.unknownCommand ?? ["Comando no reconocido."];

    lines.forEach(line => appendConsoleLine(output, line));

    if (commandResponse?.revealPreview) {
        panel.querySelector(`[data-console-preview="${projectSlug}"]`)?.classList.remove("hidden");
    }
}

function renderConsoleLines(lines) {
    return lines.map(line => renderConsoleLine(line, "muted")).join("");
}

function renderConsoleLine(line, tone = "default") {
    const toneClass = tone === "prompt"
        ? "text-sky-300"
        : tone === "muted"
            ? "text-zinc-400"
            : "text-zinc-200";

    return `<p class="${toneClass} whitespace-pre">${escapeHtml(line)}</p>`;
}

function appendConsoleLine(output, line, tone = "default") {
    output.insertAdjacentHTML("beforeend", renderConsoleLine(line, tone));
    output.scrollTop = output.scrollHeight;
}

function renderConsolePreview(project) {
    if (project.console?.preview?.image?.src) {
        return `
            <div class="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
                <img src="${project.console.preview.image.src}" alt="${project.console.preview.image.alt ?? project.title}" class="h-56 w-full object-cover object-center">
            </div>
        `;
    }

    return `
        <div class="rounded-2xl border border-dashed border-white/10 bg-zinc-950/70 p-6">
            <p class="text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">Vista /view</p>
            <div class="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-sky-400/10 via-cyan-400/10 to-transparent p-6">
                <p class="text-lg font-black text-white">${project.console?.preview?.title ?? "Demo visual"}</p>
                <p class="text-description mt-3 text-sm leading-6 text-zinc-400">
                    ${project.console?.preview?.description ?? "Este bloque puede sustituirse por una captura o animacion real del proyecto."}
                </p>
                <div class="mt-5 grid grid-cols-6 gap-2">
                    <span class="aspect-square rounded-lg bg-sky-400/30"></span>
                    <span class="aspect-square rounded-lg bg-white/10"></span>
                    <span class="aspect-square rounded-lg bg-white/10"></span>
                    <span class="aspect-square rounded-lg bg-white/10"></span>
                    <span class="aspect-square rounded-lg bg-amber-300/30"></span>
                    <span class="aspect-square rounded-lg bg-white/10"></span>
                </div>
            </div>
        </div>
    `;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
