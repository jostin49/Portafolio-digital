# Portafolio Digital — Jostin Fernando Chalan Mora

> **Estudiante:** Jostin Fernando Chalan Mora
> **Carrera:** Ingeniería en Software (Octavo Semestre)
> **Institución:** Universidad Estatal de Milagro (UNEMI)
> **Ubicación:** Naranjito, Guayas, Ecuador
> **Contacto:** [jostinmora740@gmail.com](mailto:jostinmora740@gmail.com)
> **GitHub:** [github.com/jostin49](https://github.com/jostin49)
> **Portafolio en línea:** [jostin49.github.io/Portafolio-digital](https://jostin49.github.io/Portafolio-digital/)

---

## Vista Previa del Proyecto

![Vista del portafolio en laptop, tablet y móvil](assets/preview.jpg)

> 🌐 **Demo en vivo:** [jostin49.github.io/Portafolio-digital](https://jostin49.github.io/Portafolio-digital/)

---

## 1. Descripción del Proyecto

Portafolio web individual, interactivo y accesible desarrollado desde cero con estricta **separación de capas**:

- **Estructura:** HTML5 Semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`, `<aside>`, `<footer>`, formularios con `<label>`, `<input>`, `<textarea>`).
- **Presentación:** CSS3 Propio con **CSS Custom Properties** (`:root` y `[data-theme="dark"]`), Flexbox, CSS Grid y diseño responsive fluido con 7 breakpoints (360px – 1200px+).
- **Comportamiento:** JavaScript Modular puro — 9 funcionalidades interactivas incluyendo modo oscuro con `localStorage`, menú responsive, filtros, modales accesibles, validación de formularios y scroll to top.

---

## 2. Tecnologías Utilizadas

| Tecnología | Rol en el proyecto |
|---|---|
| HTML5 Semántico | Estructura del sitio |
| CSS3 + Custom Properties | Presentación y Design System |
| JavaScript ES6+ | Interactividad y comportamiento |
| Flexbox + CSS Grid | Layout responsive |
| Git + GitHub | Control de versiones |
| GitHub Pages | Despliegue y hosting gratuito |

---

## 3. Secciones del Sitio

| # | Sección | Descripción |
|---|---|---|
| 1 | **Inicio (`#inicio`)** | Único `<h1>`, presentación académica, foto de perfil y accesos rápidos |
| 2 | **Sobre Mí (`#sobre-mi`)** | Resumen biográfico, estudios en UNEMI, bachillerato técnico en informática y valores |
| 3 | **Habilidades (`#habilidades`)** | 14 habilidades en 6 categorías con filtro interactivo, íconos SVG, niveles de dominio y modal con barra de progreso animada |
| 4 | **Proyectos (`#proyectos`)** | 5 proyectos académicos con imagen, descripción, tecnologías, repositorio y filtro por categoría |
| 5 | **Design System (`#design-system`)** | Paleta de colores, escala tipográfica, tokens de espaciado y componentes reutilizables |
| 6 | **Contacto (`#contacto`)** | Email, GitHub, ubicación y formulario validado en tiempo real |

---

## 4. Habilidades Técnicas

| Habilidad | Nivel | Categoría |
|---|---|---|
| HTML5 Semántico | 80% | Frontend |
| CSS3 & Custom Properties | 80% | Frontend |
| JavaScript (ES6+) | 80% | Frontend |
| React | 75% | Frontend |
| Tailwind CSS | 75% | Frontend |
| Python | 75% | Backend |
| Django & REST Framework | 78% | Backend |
| PostgreSQL | 80% | Base de datos |
| SQL Server | 75% | Base de datos |
| AWS Cloud Foundations | 70% | Cloud & DevOps |
| Docker | 70% | Cloud & DevOps |
| Git | 88% | Herramientas |
| GitHub / GitLab | 85% | Herramientas |
| Soporte Técnico Intel | 70% | Hardware |

---

## 5. Proyectos Destacados

| Proyecto | Descripción | Tecnologías | Repositorio |
|---|---|---|---|
| **EcoScan** | Clasificación de residuos con IA | Python, TensorFlow, React | [Ver repo](https://github.com/Jostinchalan/EcoScam---Clasificacion-de-Residuos) |
| **CuentIA** | Generador de cuentos infantiles con IA | Python, Django, React | [Ver repo](https://github.com/Jostinchalan/CUENTIA) |
| **AgroMercado** | E-commerce agrícola de venta directa | Django, PostgreSQL, React | [Ver repo](https://github.com/Jostinchalan/AgroMercado) |
| **GUIOSPRO-FLOSS** | Evaluación de software libre | HTML, CSS, JS | [Ver repo](https://github.com/Jostinchalan/GUIOSPRO-FLOSS) |
| **UNEMI Bikes** | Sistema de préstamo de bicicletas (UX/UI) | Figma, UX Design | — |

---

## 6. Funcionalidades JavaScript

| # | Funcionalidad | Descripción |
|---|---|---|
| 1 | Tema claro / oscuro | Alterna entre ambos temas con transición suave |
| 2 | Persistencia (`localStorage`) | Guarda la preferencia de tema entre sesiones |
| 3 | Menú responsive | Hamburguesa animada para móviles con accesibilidad (`aria-expanded`) |
| 4 | Filtro de proyectos | Filtra las tarjetas de proyecto por categoría con animación |
| 5 | Filtro de habilidades | Muestra/oculta pills por categoría técnica |
| 6 | Modal de habilidades | Al hacer clic, muestra detalle con barra de progreso animada |
| 7 | Modal catálogo de proyectos | Abre un modal completo con todos los proyectos y filtros |
| 8 | Validación de formulario | Validación en tiempo real campo por campo con mensajes de error |
| 9 | Scroll to top | Botón flotante que aparece al hacer scroll y regresa al inicio |

---

## 7. Visualización y Ejecución Local

Al ser un proyecto desarrollado con estándares web puros (HTML5, CSS3, JavaScript):

```bash
# Opción 1: Abrir directamente
# Doble clic en index.html — se abre en cualquier navegador moderno (Chrome, Firefox, Edge, Safari)

# Opción 2: Con Live Server (VS Code)
# Instala la extensión "Live Server" y haz clic en "Go Live"
```

---

## 8. Despliegue en GitHub Pages

El portafolio está publicado en:

🌐 **[https://jostin49.github.io/Portafolio-digital/](https://jostin49.github.io/Portafolio-digital/)**

Para republicar desde cero:

```bash
# 1. Inicializar Git
git init
git add .
git commit -m "feat: portafolio profesional interactivo con HTML5, CSS y JS"

# 2. Conectar al repositorio remoto
git remote add origin https://github.com/jostin49/Portafolio-digital.git
git branch -M main
git push -u origin main
```

Luego en GitHub:
- Ve a **Settings** > **Pages**
- En **Source**, selecciona **Deploy from a branch** → rama **main** / **root**
- El sitio se publica automáticamente en `https://jostin49.github.io/Portafolio-digital/`

---

## 9. Estructura del Proyecto

```
Portafolio-Jostin-Chalan/
├── index.html          # Página principal (HTML5 semántico)
├── css/
│   ├── variables.css   # Design tokens (CSS Custom Properties)
│   └── styles.css      # Estilos globales y componentes
├── js/
│   └── main.js         # JavaScript modular (9 funcionalidades)
├── assets/
│   ├── icons/          # SVGs de tecnologías
│   ├── foto_perfil.png
│   ├── jostin_cutout.png
│   ├── EcoScam.png
│   ├── CuentIA.png
│   ├── AgroMercado.png
│   ├── GuiosPro.png
│   └── unemi_bikes.png
└── README.md
```

---

*Desarrollado por Jostin Fernando Chalan Mora — UNEMI, Ingeniería en Software, 2026*
