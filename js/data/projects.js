// Cambia featured a true en los dos proyectos que quieras ensenar en la pagina principal.
// Si quieres una captura solo para la demo del comando /view, usa:
// console.preview.image: { src: "assets/projects/mario/mario-demo.png", alt: "Demo de Mario" }
export const projects = [
    {
        slug: "mario-consola",
        title: "Mario por Consola",
        subtitle: "Juego en consola con l&oacute;gica de plataformas",
        featured: false,
        status: "Terminado",
        accent: "emerald",
        tags: ["Java", "POO", "MVC"],
        summary: "Clon funcional de Mario en Java puro, con gesti&oacute;n de colisiones, estados, f&iacute;sicas simples y renderizado por consola.",
        description: "Mi primer contacto con la POO. Separaci&oacute;n de responsabilidades y control de estado dentro de un juego. La idea principal es construir un bucle jugable sencillo, con entidades, escenario, colisiones y reglas suficientemente claras para poder seguir ampli&aacute;ndolo. Teniendo presente el MVC",
        highlights: [
            "Bucle principal de juego y actualizaci&oacute;n de estado.",
            "Gesti&oacute;n de entidades, obst&aacute;culos y colisiones.",
            "Renderizado por consola para reforzar la l&oacute;gica sin depender de un motor gr&aacute;fico."
        ],
        githubUrl: "https://github.com/Pabldi08/MarioBros-TP1",
        artifact: null,
        preview: "terminal",
        console: {
            ctaLabel: "Abrir consola virtual",
            title: "Mario Console Runtime",
            prompt: "pablo@mario:~$",
            initialLines: [
                "Entorno virtual preparado.",
                "Escribe /help para ver los comandos disponibles."
            ],
            unknownCommand: [
                "Comando no reconocido.",
                "Prueba con /help para ver las opciones preparadas."
            ],
            preview: {
                title: "Demo placeholder",
                description: "Sustituye este bloque por una imagen, GIF o captura real del proyecto cuando quieras ense&ntilde;arlo."
            },
            commands: {
                "/help": {
                    lines: [
                        "Comandos preparados:",
                        "/help  -> muestra la ayuda de la consola.",
                        "/view  -> abre la demo visual del proyecto.",
                        "/clear -> limpia el historial de salida."
                    ]
                },
                "/view": {
                    lines: [
                        "MarioBross 3.0  |  Time: 100  Points: 0  Lives: 3",
                        "",
                        "    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4",
                        "  +-------------------------------+",
                        "0 |                     B         |",
                        "1 |                               |",
                        "2 |      ####               ####  |",
                        "3 |                    #########  |",
                        "4 |M   ####  ####      ######### D|",
                        "5 |###############################|",
                        "  +-------------------------------+",
                        ""
                    ],
                    revealPreview: true
                }
            }
        }
    },
    {
        slug: "flickit",
        title: "FlickIt",
        subtitle: "Arquitectura por capas y diseño backend",
        featured: false,
        status: "Terminado",
        accent: "amber",
        tags: ["Java", "SQL", "MVC"],
        summary: "Aplicaci&oacute;n pensada para practicar servicios, DAO, base de datos y separaci&oacute;n entre negocio, presentaci&oacute;n e integraci&oacute;n junto al MVC. ",
        description: "Proyecto reservado para una aplicaci&oacute;n m&aacute;s completa, con arquitectura por capas, consultas SQL y una estructura mantenible. Est&aacute; pensado como evoluci&oacute;n natural desde ejercicios de consola hacia una aplicaci&oacute;n con m&aacute;s piezas reales. ",
        highlights: [
            "Modelo de dominio separado de la persistencia.",
            "Capa DAO o repositorio para aislar acceso a datos.",
            "Base preparada para a&ntilde;adir interfaz o API."
        ],
        githubUrl: "",
        artifact: {
            label: "Descargar EXE",
            url: "",
        },
        preview: "backend"
    },
    {
        slug: "estructuras-de-datos",
        title: "Pr&aacute;cticas de estructuras de datos",
        subtitle: "Ejercicios y algoritmos en Java/C++",
        featured: false,
        status: "Pr&aacute;cticas",
        accent: "rose",
        tags: ["C++", "Algoritmos"],
        summary: "Colecci&oacute;n de ejercicios para reforzar listas, pilas, colas, &aacute;rboles, mapas y an&aacute;lisis de complejidad.",
        description: "Conjunto de pr&aacute;cticas peque&ntilde;as centradas en entender c&oacute;mo se comportan las estructuras de datos y cu&aacute;ndo conviene utilizar cada una. Sirve como base t&eacute;cnica para proyectos m&aacute;s grandes.",
        highlights: [
            "Implementaciones y uso pr&aacute;ctico de estructuras comunes.",
            "Resoluci&oacute;n de problemas con distintos enfoques.",
            "C&oacute;digo preparado para comparar legibilidad y eficiencia."
        ],
        githubUrl: "",
        artifact: null,
        preview: "backend"
    },
    {
        slug: "ecosistema",
        title: "Ecosistema",
        subtitle: "Arquitectura por capas y diseño backend",
        featured: true,
        status: "Terminado",
        accent: "violet",
        tags: ["Java", "MVC", "POO"],
        summary: "Aplicaci&oacute;n pensada para practicar servicios, DAO, base de datos y separaci&oacute;n entre negocio, presentaci&oacute;n e integraci&oacute;n junto al MVC. ",
        description: "Proyecto reservado para una aplicaci&oacute;n m&aacute;s completa, con arquitectura por capas, consultas SQL y una estructura mantenible. Est&aacute; pensado como evoluci&oacute;n natural desde ejercicios de consola hacia una aplicaci&oacute;n con m&aacute;s piezas reales.",
        highlights: [
            "Modelo de dominio separado de la persistencia.",
            "Capa DAO o repositorio para aislar acceso a datos.",
            "Base preparada para a&ntilde;adir interfaz o API."
        ],
        githubUrl: "",
        artifact: {
            label: "Descargar EXE",
            url: "",
        },
        preview: "backend"
    },
    {
        slug: "portfolio",
        title: "Portfolio personal",
        subtitle: "Web est&aacute;tica para presentar proyectos",
        featured: true,
        status: "En evoluci&oacute;n",
        accent: "cyan",
        tags: ["HTML", "Tailwind", "JavaScript"],
        summary: "Portfolio responsive con navegaci&oacute;n por vistas, proyectos destacados, listado completo y p&aacute;ginas de detalle.",
        description: "Esta web funciona como carta de presentaci&oacute;n y como espacio para documentar la evoluci&oacute;n de los proyectos. Est&aacute; hecha de forma sencilla para que sea f&aacute;cil de mantener, editar y publicar sin depender de frameworks pesados.",
        highlights: [
            "Vista principal con proyectos destacados.",
            "Listado completo de proyectos con tarjetas interactivas.",
            "Detalle individual con enlaces a repositorio y ejecutables cuando existan."
        ],
        githubUrl: "https://github.com/Pabldi08/portfolio-pdiazruiperez",
        artifact: null,
        preview: "web"
    }
];

export function getFeaturedProjects(limit = 2) {
    return projects.filter(project => project.featured).slice(0, limit);
}

export function getAllTags() {
    return ["Todos", ...new Set(projects.flatMap(project => project.tags))];
}

export function getProjectsByTag(tag) {
    return tag === "Todos"
        ? projects
        : projects.filter(project => project.tags.includes(tag));
}

export function getProjectBySlug(slug) {
    return projects.find(project => project.slug === slug);
}
