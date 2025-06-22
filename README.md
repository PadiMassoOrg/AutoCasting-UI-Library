# 🎨 AutoCasting UI Library

**UI Library oficial para el ecosistema de Auto Casting**  
Construida con React, TailwindCSS, Storybook y Rollup.

---

## 🚀 ¿Qué incluye este repositorio?

- ⚛️ Componentes reutilizables en React
- 🎨 Estilos con TailwindCSS 4
- 📘 Documentación visual con Storybook
- 📦 Build listo para distribución vía NPM o uso local
- ✅ Soporte completo para TypeScript y tipado externo

---

## 🧰 Requisitos previos

Asegurate de tener instalado:

- Node.js **v22+** (instalación recomendada con [NVM](https://github.com/nvm-sh/nvm))
- npm **v10+**

> ⚠️ Otros entornos pueden fallar al compilar TailwindCSS v4.  
> Se recomienda estrictamente usar `nvm` y Node 22.16.0 para desarrollo local.

---

## 📦 Instalación local y uso con Storybook

```bash
git clone https://github.com/PadiMassoOrg/AutoCasting-UI-Library.git
cd AutoCasting-UI-Library

# Instalación de dependencias
npm install

# Iniciar Storybook (http://localhost:6006)
npm run storybook
```

---

## 🛠️ Scripts disponibles

- npm run build (Compila la librería: Rollup + CSS (genera la carpeta dist/))
- npm run storybook (Levanta el entorno visual con Storybook)
- npm run lint (Ejecuta ESLint sobre los archivos fuente)
- npm run format (Formatea el código con Prettier)

---

## 🔁 Flujo de desarrollo diario

Para trabajar localmente en la librería y reflejar los cambios en tu frontend:

1. Modificá o creá componentes en src/components.

2. Corré el build para regenerar el output consumible:

```bash
npm run build
```

3. En tu frontend, asegurate de importar el paquete local actualizado.

> Tip: Si tu frontend no refleja cambios, intentá borrar .turbo, .next, o reiniciar el dev server.

---

## 📚 Documentación extendida

Para más detalles sobre arquitectura, releases, convenciones y CI/CD, consultá:

📖 [Documentación en Confluence](https://padimasso.atlassian.net/wiki/spaces/AC/pages/3047425/Auto+Casting+UI+Library)
