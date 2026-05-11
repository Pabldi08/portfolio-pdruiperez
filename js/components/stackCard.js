import { iconCode, iconDatabase, iconGitBranch, iconList } from "./icons.js?v=09a2de1e55";

const icons = {
    code: iconCode,
    database: iconDatabase,
    git: iconGitBranch,
    list: iconList
};

export function stackCard(item) {
    return `
        <div class="stack-card flex items-start gap-4 rounded-2xl border border-white/10 bg-zinc-950/70 p-6">
            <div class="stack-media flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                ${stackMedia(item)}
            </div>
            <div>
                <h3 class="font-black text-zinc-100">${item.title}</h3>
                <p class="text-description mt-2 text-sm leading-6 text-zinc-400">${item.description}</p>
            </div>
        </div>
    `;
}

function stackMedia(item) {
    if (item.image?.src) {
        return `<img src="${assetSrc(item.image.src)}" alt="${item.image.alt ?? item.title}" class="h-10 w-10 object-contain">`;
    }

    return icons[item.icon]?.() ?? "";
}

function assetSrc(src) {
    if (src.startsWith("/") || src.startsWith("http") || src.startsWith("data:")) {
        return src;
    }

    return `/${src}`;
}
