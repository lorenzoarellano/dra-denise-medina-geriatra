# 📋 Especificaciones Técnicas: Rediseño y Migración de API - dradenisemedina.com

## 🎯 Objetivo General
Modernizar la interfaz visual y el rendimiento del sitio web actual sin cambiar el stack tecnológico base. Se realizará una transición de **Bootstrap a Tailwind CSS + GSAP** y se migrará la fuente de datos de **Firebase a WordPress REST API**, garantizando que el posicionamiento SEO en Durango no se vea afectado.

---

## 🎨 1. Concepto Visual y Estética
> [!IMPORTANT]
> **Instrucciones de diseño:**
> El diseño debe ser al estilo Apple liquid glass con fondos gradient motion.
    -Navbar tipo isla gon efecto glass.
    -Debe utilizar Lucide Icons
    -- **Glassmorphism (`.glass`, `.backdrop-blur-custom`):** Fondos semitransparentes (`rgba(255, 255, 255, 0.1)`), difuminado profundo `backdrop-filter: blur(10px)` con la propiedad `will-change: backdrop-filter` para aceleración GPU.
    - Texto destacado: `bg-gradient-to-r from-primary to-cream bg-clip-text text-transparent`.
- **Parallax y Movimiento:** Clases personalizadas `.parallax` (optimizadas: fijas en escritorio, normal en móvil para ahorrar batería y recursos).

* **Paleta de Colores:** [DESC AQUI - Ej: Primario #8766aa, Secundario #ca8ebe, negros: #4e4d4d]
* **Tipografía:** Se mantienen las fuentes actuales (Correctamente validadas).
* **Assets:** Conversión obligatoria de imágenes `.jpg/.png` a `.webp` para mejorar métricas LCP, esta conversión yo la haré manualmente asi que hay que conservar las iamgenes que tenemos.

---

## 🛠 2. Stack Tecnológico (Mantenimiento de Estructura)
* **Arquitectura:** HTML Dinámico / JavaScript (Sin frameworks de SSR/Nuxt).
* **Estilos:** Tailwind CSS (Sustituyendo a Bootstrap 4/5).
* **Animaciones:** GSAP (Foco en interactividad y fluidez).
* **Backend de Contenidos:** WordPress REST API (Sustituyendo Firebase).

---

## 🏗 3. Protocolo de Preservación SEO (Prioridad Alta)
Para asegurar que el sitio se mantenga en la primera página de Google:

1.  **Persistencia de URLs:** No se deben modificar las rutas. La página de post debe seguir respondiendo a: `post.html?slug=[valor]`. 
2.  **Integridad de Etiquetas:** Los textos actuales envueltos en `<h1>`, `<h2>` y `<h3>` deben mantener exactamente la misma jerarquía. No usar clases de Tailwind para "simular" encabezados (ej. no usar un `<p class="text-2xl font-bold">` donde antes había un `<h2>`).
3.  **Paridad de Slugs:** Los slugs configurados en WordPress deben ser idénticos a los que actualmente existen en Firebase para no romper los enlaces indexados.
4.  **Atributos Alt y Meta:** Se deben copiar íntegramente los `alt=""` de las imágenes y los `meta description` de cada sección.

---

## 🚀 4. Plan de Ejecución Paso a Paso

### Fase 1: Sustitución de Framework CSS
* Eliminar la dependencia de `bootstrap.min.css`.
* Re-mapear el layout (Grid/Flexbox) usando clases de **Tailwind CSS**.
* Asegurar que el diseño sea "Mobile First" dada la importancia de las búsquedas de salud en dispositivos móviles.

### Fase 2: Implementación de GSAP
* Añadir animaciones de entrada (fade-in, slide) para secciones de servicios y testimonios.
* **Control de CLS:** Las animaciones no deben desplazar elementos de texto durante la carga para evitar penalizaciones en Core Web Vitals.

### Fase 3: Migración de Lógica de Datos (JS)
* Modificar el script de carga en `post.html`.
* Reemplazar la consulta a la SDK de Firebase por una petición `fetch()` o `axios` a:
  `https://tu-wordpress.com/wp-json/wp/v2/posts?slug=${slug_extraido_de_url}`
* Mapear los campos de WordPress (title.rendered, content.rendered) a los contenedores actuales.

### Fase 4: Optimización de Rendimiento (WPO)
* Reemplazar imágenes pesadas por WebP.
* Minificar el nuevo archivo CSS de Tailwind.

---

## ✅ 5. Checklist de Validación Final
- [ ] ¿La URL `post.html?slug=...` carga el contenido correcto desde WordPress?
- [ ] ¿El HTML final mantiene los mismos encabezados que la versión anterior?
- [ ] ¿Se han migrado los certificados de COFEPRIS y Cédulas Profesionales sin cambios?
- [ ] ¿El tiempo de carga es menor al actual?