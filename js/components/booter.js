// Add new boot entries here to extend the menu without touching the render logic.
const bootOptions = [
    {
        id: "portfolio",
        label: "Portfolio",
        description: "Entrar&aacute;s en la p&aacute;gina principal con proyectos destacados, CV, stack t&eacute;cnico y enlaces de contacto.",
        path: "/"
    },
    {
        id: "projects",
        label: "Projects",
        description: "Ir&aacute;s directamente al listado completo de proyectos para revisar c&oacute;digo, tecnolog&iacute;as usadas y detalles de cada entrega.",
        path: "/proyectos"
    }
];

let selectedOptionIndex = 0;
let active = false;

export function shouldShowBooter() {
    return window.location.pathname === "/" && window.history.state?.booted !== true;
}

export function startBooter() {
    active = true;
    selectedOptionIndex = 0;
    renderBooter();
}

export function stopBooter() {
    active = false;
}

export function handleBooterClick(event) {
    if (!active) return false;

    const option = event.target.closest("[data-boot-option]");
    if (!option) return false;

    activateBootOption(option.dataset.bootOption);
    return true;
}

export function handleBooterKeydown(event) {
    if (!active) return false;

    if (event.key === "ArrowDown") {
        event.preventDefault();
        selectedOptionIndex = (selectedOptionIndex + 1) % bootOptions.length;
        renderBooter();
        return true;
    }

    if (event.key === "ArrowUp") {
        event.preventDefault();
        selectedOptionIndex = (selectedOptionIndex - 1 + bootOptions.length) % bootOptions.length;
        renderBooter();
        return true;
    }

    if (event.key === "Enter") {
        event.preventDefault();
        activateBootOption(bootOptions[selectedOptionIndex].id);
        return true;
    }

    return false;
}

function activateBootOption(optionId) {
    const option = bootOptions.find(item => item.id === optionId) ?? bootOptions[0];
    stopBooter();
    window.history.replaceState({ booted: true }, "", option.path);
    window.dispatchEvent(new Event("popstate"));
}

function renderBooter() {
    const app = document.querySelector("#app");
    if (!app) return;

    app.innerHTML = booterView();
    app.querySelector(`[data-boot-option="${bootOptions[selectedOptionIndex].id}"]`)?.focus({ preventScroll: true });
}

function booterView() {
    const selectedOption = bootOptions[selectedOptionIndex];

    return `
        <section class="min-h-screen bg-[#050506] px-4 py-5 font-mono text-zinc-100 sm:px-8" aria-labelledby="boot-title">
            <div class="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-5xl flex-col">

                <header class="text-xs">
                    <div class="flex flex-wrap gap-x-6 gap-y-0.5 text-zinc-600 mb-3">
                        <span>pdruiperez UEFI <span class="text-zinc-500">v2.6.0</span></span>
                        <span class="text-zinc-500">Arch Linux x86_64</span>
                        <span>CPU: Intel Core i7-12700H</span>
                        <span>RAM: 16384 MB <span class="text-sky-400">OK</span></span>
                        <span>Boot: /dev/nvme0n1p1</span>
                    </div>
                    <div class="border-y border-zinc-800 py-2 grid sm:grid-cols-[1fr_auto_1fr] items-center gap-1 font-bold tracking-wide">
                        <p class="text-zinc-400"><span class="text-sky-400">↑↓</span> Select&nbsp;&nbsp;&nbsp;<span class="text-sky-400">Enter</span> Boot</p>
                        <h1 id="boot-title" class="text-center text-sky-400">pdruiperez Bootloader</h1>
                        <p class="text-zinc-400 sm:text-right"><span class="text-sky-400">B</span> Blank Entry</p>
                    </div>
                </header>

                <div class="flex flex-1 flex-col items-center justify-center py-10 gap-10">
                    <div class="text-center">
                        <pre class="mx-auto w-fit max-w-full overflow-x-auto whitespace-pre text-left text-[0.55rem] leading-[1.15] text-sky-400 sm:text-xs" aria-label="Logo PABLO en ASCII">${asciiLogo()}</pre>
                        <p class="mt-3 text-xs text-zinc-600 tracking-[0.25em]">pablo d&iacute;az ruip&eacute;rez &middot; software developer</p>
                    </div>

                    <div class="w-full max-w-xl">
                        <p class="text-[0.6rem] tracking-[0.25em] uppercase text-zinc-700 mb-1">── Boot Options ──────────────────────────</p>
                        <div role="listbox" aria-label="Opciones de arranque" class="mb-8">
                            ${bootOptions.map((option, index) => bootOption(option, index)).join("")}
                        </div>

                        <p class="text-[0.6rem] tracking-[0.25em] uppercase text-zinc-700 mb-2">── Selected ──────────────────────────────</p>
                        <div class="min-h-[5rem]">
                            <p class="text-sm leading-relaxed text-zinc-400 max-w-lg" role="status" aria-live="polite">${selectedOption.description}</p>
                        </div>
                    </div>
                </div>

                <footer class="border-t border-zinc-800 pt-3 pb-1 text-xs flex flex-wrap justify-between gap-2 text-zinc-600">
                    <span>Seleccione una entrada y pulse <span class="font-bold text-sky-300">Enter</span> para arrancar.</span>
                    <span class="hidden sm:inline text-zinc-700">pdruiperez.com</span>
                    <span class="sr-only">Use flecha arriba, flecha abajo y Enter para seleccionar.</span>
                </footer>

            </div>
        </section>
    `;
}

function bootOption(option, index) {
    const selected = index === selectedOptionIndex;
    const activeClasses = selected
        ? "bg-sky-400 text-zinc-950"
        : "text-zinc-300 hover:bg-white/[0.06] hover:text-sky-300";

    return `
        <button type="button"
            class="block w-full px-3 py-1.5 text-left text-sm font-black leading-6 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${activeClasses}"
            data-boot-option="${option.id}"
            role="option"
            aria-selected="${selected}">
            <span aria-hidden="true" class="mr-3 inline-block w-3 text-center">${selected ? "▶" : " "}</span>${option.label}
        </button>
    `;
}

function asciiLogo() {
    return String.raw`██████╗  █████╗ ██████╗ ██╗      ██████╗
██╔══██╗██╔══██╗██╔══██╗██║     ██╔═══██╗
██████╔╝███████║██████╔╝██║     ██║   ██║
██╔═══╝ ██╔══██║██╔══██╗██║     ██║   ██║
██║     ██║  ██║██████╔╝███████╗╚██████╔╝
╚═╝     ╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝`;
}
