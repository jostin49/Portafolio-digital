# Portafolio Digital de Ingeniería de Software (HTML5, CSS3, JavaScript)

> **Estudiante:** Jostin Fernando Chalan Mora  
> **Carrera:** Ingeniería en Software (Octavo Semestre)  
> **Institución:** Universidad Estatal de Milagro (UNEMI)  
> **Ubicación:** Naranjito, Guayas, Ecuador  
> **Contacto:** [jostinmora740@gmail.com](mailto:jostinmora740@gmail.com) | WhatsApp: +593 98 060 1334  
> **GitHub:** [github.com/Jostinchalan](https://github.com/Jostinchalan)

---

## 1. Descripción del Proyecto

Portafolio web individual, interactivo y accesible desarrollado desde cero con estricta **separación de capas**:
- **Estructura:** HTML5 Semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`, `<aside>`, `<footer>`, formularios con labels).
- **Presentación:** CSS3 Propio con **CSS Custom Properties** (`:root` y `[data-theme="dark"]`), Flexbox, CSS Grid y diseño responsive fluido sin desbordamiento.
- **Comportamiento:** JavaScript Modular puro para la interactividad (modo oscuro con localStorage, menú responsive, filtros de proyectos y habilidades, modal accesible, validación de formularios y scroll to top).

---

## 2. Secciones del Sitio

1. **Inicio / Presentación (`#inicio`):** Único encabezado principal `<h1>`, presentación académica y accesos rápidos.
2. **Sobre Mí (`#sobre-mi`):** Resumen biográfico, estudios en UNEMI, bachillerato técnico en informática, ficha profesional y valores.
3. **Habilidades / Skills (`#habilidades`):** Frontend, Backend, Bases de Datos, Cloud, Herramientas, Hardware & IoT, con niveles de dominio, barras de progreso y filtro.
4. **Proyectos Destacados (`#proyectos`):** EcoScam, CUENTIA, AgroMercado y GUIOSPRO-FLOSS con especificación del problema que resuelven, filtro y modal de detalle.
5. **Experiencia Laboral (`#experiencia`):** Asistencia Técnica PC y pasantías preprofesionales en UNEMI.
6. **Educación & Certificaciones (`#educacion`):** Ingeniería en Software y certificaciones oficiales en Cloud Computing (AWS y GCP).
7. **Design System / Componentes (`#design-system`):** Muestra viva de la paleta de colores, tokens, tipografía, regla de espaciados y componentes interactivos.
8. **Contacto (`#contacto`):** Canales directos y formulario semántico validado en tiempo real.

---

## 3. Visualización y Ejecución

Al ser un proyecto desarrollado con estándares web puros (HTML5, CSS3, JavaScript):
- Puedes abrir directamente el archivo `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge, Safari).
- O puedes utilizar cualquier servidor local (como Live Server en VS Code).

---

## 4. Despliegue en GitHub Pages

1. Inicializa el repositorio en Git:
   ```bash
   git init
   git add .
   git commit -m "feat: portafolio profesional interactivo con HTML5, CSS y JS"
   ```
2. Conéctalo a tu repositorio público de GitHub:
   ```bash
   git remote add origin https://github.com/Jostinchalan/Portafolio-Web.git
   git branch -M main
   git push -u origin main
   ```
3. En GitHub:
   - Ve a **Settings** > **Pages**.
   - En **Source**, selecciona **Deploy from a branch** y elige la rama **main** / **root**.
   - Guarda los cambios. Tu sitio web se publicará automáticamente en:
     `https://jostinchalan.github.io/Portafolio-Web/`
