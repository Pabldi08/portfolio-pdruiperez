import { iconGitHub, iconLinkedIn, iconMail, iconPhone } from "./icons.js?v=09a2de1e55";

const icons = {
    github: iconGitHub,
    linkedin: iconLinkedIn,
    mail: iconMail,
    phone: iconPhone
};

export function contactLink(contact) {
    const icon = icons[contact.icon]?.() ?? "";

    return `
        <a href="${contact.href}" target="${externalTarget(contact.href)}" rel="noreferrer"
            aria-label="${contact.type}: ${contact.label}"
            title="${contact.type}: ${contact.label}"
            class="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-zinc-950/75 text-emerald-300 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-emerald-400 hover:text-zinc-950">
            <span class="inline-flex h-5 w-5 items-center justify-center">
                ${icon}
            </span>
        </a>
    `;
}

function externalTarget(href) {
    return href.startsWith("http") ? "_blank" : "_self";
}
