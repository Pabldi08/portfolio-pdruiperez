# Bienvenido a mi portfolio

Portfolio personal desarrollado con HTML, Tailwind CSS y JavaScript.

## Uso en Linux

### Que instalar

- Node.js 20 LTS o superior
- npm, incluido con Node.js
- Git, si necesitas clonar el repositorio

En Ubuntu, Debian o derivadas:

```bash
sudo apt update
sudo apt install -y nodejs npm git
node --version
npm --version
```

Si tu distribucion instala una version antigua de Node.js, usa NodeSource para instalar Node.js 20:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

En Arch Linux o derivadas:

```bash
sudo pacman -Syu nodejs npm git
```

En Fedora:

```bash
sudo dnf install nodejs npm git
```

### Secuencia de comandos

Desde la carpeta del proyecto:

```bash
npm install
npm run build
```

Para desarrollar con recompilacion automatica de Tailwind CSS:

```bash
npm run watch:css
```

Para servir la web localmente puedes usar cualquier servidor estatico. Una opcion simple con Node.js es:

```bash
npx serve .
```

Despues abre la URL local que muestre la terminal, normalmente `http://localhost:3000`.
