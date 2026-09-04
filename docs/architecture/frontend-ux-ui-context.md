# Contexto Frontend, UX y UI

## Propósito del producto

**Women’s Health Clinic / AR&CO** es una aplicación Laravel/Inertia con dos
superficies visuales claramente separadas:

1. Una landing pública enfocada en salud femenina, confianza médica y
   conversión a contacto o cita.
2. Un panel privado bajo `/admin` para gestionar el contenido del sitio.

La landing comunica una clínica de atención ginecológica integral, gineco-
oncología, ultrasonidos, estética y clases prenatales. Su personalidad debe ser
cálida, humana, médica, cuidada y confiable; nunca fría, corporativa o recargada.

El Admin usa la base visual del Laravel React Starter Kit. No se debe intentar
hacer que el Admin copie el lenguaje visual de la landing salvo que una petición
lo indique explícitamente.

## Stack y punto de entrada

- Laravel 13 proporciona rutas, datos y respuestas Inertia.
- React 19 + TypeScript implementan la interfaz.
- Inertia React conecta los pages del servidor con los componentes React.
- Tailwind CSS 4 define el estilo utilitario; `resources/css/app.css` contiene
  tokens globales, fuentes y animaciones compartidas.
- Radix UI provee primitivas accesibles; los wrappers están en
  `resources/js/components/ui/`.
- Lucide React es la única familia de íconos para componentes nuevos.
- Embla se utiliza para los carruseles públicos de testimonios y blog.
- BlockNote almacena y renderiza el cuerpo estructurado de los artículos.

Entrada de la aplicación: `resources/js/app.tsx`.

```text
Nombre del page Inertia
├─ public/*   → LandingLayout
├─ auth/*     → AuthLayout
├─ settings/* → AppLayout + SettingsLayout
└─ resto      → AppLayout (Admin/starter kit)
```

## Mapa de archivos frontend

```text
resources/js/
├─ app.tsx                         Inicializa Inertia, tooltips, toaster y layouts.
├─ pages/
│  ├─ public/
│  │  ├─ home.tsx                  Composición de la Home.
│  │  ├─ contact.tsx               Composición de contacto/cita/mapa.
│  │  └─ blog/
│  │     ├─ index.tsx              Índice y filtros de artículos publicados.
│  │     └─ show.tsx               Artículo individual y contenido BlockNote.
│  ├─ admin/                       Módulos de contenido privados.
│  ├─ auth/                        Acceso, recuperación, 2FA y passkeys.
│  ├─ settings/                    Perfil, seguridad y apariencia.
│  └─ dashboard.tsx                Dashboard del Starter Kit.
├─ layouts/
│  ├─ landing-layout.tsx           Navbar + animación/revelado de páginas públicas.
│  ├─ app-layout.tsx               Shell del Admin.
│  ├─ app/app-sidebar-layout.tsx   Sidebar plegable y header de Admin.
│  └─ auth/                        Layouts del flujo de autenticación.
├─ components/
│  ├─ landing/                     Componentes exclusivos de la web pública.
│  ├─ ui/                          Primitivas de UI reutilizables basadas en Radix.
│  └─ app-*.tsx, nav-*.tsx         Componentes del Starter Kit/Admin.
├─ hooks/
│  ├─ use-business.ts              Teléfono, correo, horarios y datos del negocio.
│  ├─ use-current-url.ts           Estado de ruta activa para Inertia.
│  └─ use-appearance.tsx           Preferencia light/dark del Admin.
└─ types/                          Contratos TypeScript compartidos.
```

## Límites de producto

### Landing pública

Rutas relevantes:

- `/`: Home.
- `/contact`: datos de contacto, formulario de cita y mapa.
- `/blog`: artículos publicados, categorías, etiquetas y filtros.
- `/blog/{slug}`: artículo publicado individual.

Todo componente público debe vivir, en principio, en
`resources/js/components/landing/`. Las páginas en `pages/public/` deben
componer secciones y pasar datos; no deben acumular UI reutilizable compleja.

### Admin y autenticación

- Las rutas privadas viven bajo `/admin`.
- El Admin conserva el shell del Starter Kit: sidebar, header, cards, inputs,
  menús, settings y tokens semánticos light/dark.
- Los módulos existentes incluyen usuarios, blogs, categorías, testimonios,
  citas y configuración del negocio.
- Autenticación y passkeys viven bajo `/admin/*`.
- El logo de Admin y autenticación usa `public/images/filled-logo.png`.

No filtrar acciones, props o datos de administración hacia `pages/public/`.

## Sistema visual

### Tipografía

La fuente global actual es **Outfit** variable, cargada localmente desde
`/fonts/outfit/variable/outfit-latin-ext-wght-normal.woff2`.

- Títulos: pesos `font-black` o `font-bold`, tracking negativo corto
  (`tracking-[-0.04em]` aprox.) y line-height compacto.
- Cuerpo: peso normal o medio, line-height amplio, especialmente en párrafos
  médicos y explicativos.
- Eyebrows: 11–12 px, mayúsculas, tracking amplio entre `0.2em` y `0.28em`,
  usualmente rosa primario.
- Las secciones públicas escriben en español y usan un tono claro, respetuoso
  y no alarmista.

### Paleta pública

La landing combina rosa médico, azul navy y superficies muy claras.

| Rol | Color | Uso |
| --- | --- | --- |
| Navy principal | `#09123f` / `#15234a` | Títulos, íconos y texto de alto contraste. |
| Texto base | `#20243a` | Cuerpo oscuro y superficie global. |
| Rosa principal | `#e9648d` | CTA, enlaces, indicadores, bordes e íconos. |
| Rosa intenso | `#c9003c` | Botón primario del video y franja final del footer. |
| Rosa hero | `#f26b96` | Fondo de hero cuando la imagen no cubre. |
| Rosa footer | `#e06488` | Bloque principal del footer. |
| Rosa cita | `#ff91ad` | Fondo de la sección de agenda. |
| Blush | `#fff0f7` / `#fff8fb` | Fondo de páginas y secciones alternas. |
| Rosa decorativo | `#f7ddea` / `#fceaf2` | Fondos suaves, ornamentos y acentos. |
| Texto secundario | `#6f7080` | Párrafos, metadatos y contenido de soporte. |
| Borde | `#f0d4df` | Inputs y contornos ligeros. |

Los servicios pueden usar acentos secundarios (`#df4daf`, `#e99bd5`,
`#eca2d8`, `#7da2ff`, `#a79bff`) en círculos e indicadores. Deben servir para
diferenciar, no competir con el rosa principal.

### Tokens light/dark del Starter Kit

`resources/css/app.css` define tokens semánticos para las primitivas del Admin:

- Light: fondo `#fff8fb`, cards blancas, foreground `#20243a`, primary
  `#e9648d`, sidebar blush.
- Dark: fondo navy `#10172f`, cards `#182142`, foreground `#fff4f8`, primary
  `#f07fa2` y bordes púrpura oscuros.

Las pantallas Admin deben preferir tokens como `bg-background`, `bg-card`,
`text-foreground`, `border-border` y `text-muted-foreground` en lugar de
colores hardcodeados. En la landing, los colores directos son intencionales
porque reproducen una composición editorial específica.

### Espaciado, contenedores y forma

- `LandingContainer` centraliza el ancho: `min(1180px, viewport - 2rem)` en
  móvil y `min(1180px, viewport - 3rem)` desde `sm`.
- Espaciado vertical público habitual: `py-12` a `py-24`; priorizar aire y
  jerarquía antes que densidad.
- Radios dominantes: `rounded-lg` en cards, imágenes y formularios;
  `rounded-full` en avatares, iconos y dots.
- Sombras: navy muy translúcido y suave. Nunca usar sombras negras pesadas.
- Las superficies alternan blanco y blush para dividir secciones sin líneas
  duras.

## Landing: composición y experiencia

### Navbar fijo

Archivo: `components/landing/landing-navbar.tsx`.

- Es `fixed`, superior y `z-50`.
- Al inicio de un hero es transparente; al cruzar su mitad pasa a blanco con
  blur; al salir del hero se vuelve sólido con sombra suave.
- En escritorio usa enlaces: Inicio, Servicios, Contacto, Blog,
  Testimoniales y Agendar cita, más buscador visual y CTA telefónico.
- El enlace activo usa `font-black` y una línea rosa gruesa inferior.
- En móvil se reemplaza por botón Menu/X y un panel rosa desplegable.
- La navegación a hashes mide el header y deja 16 px extra, por lo que los
  destinos no deben quedar tapados. `html` también usa `scroll-padding-top`
  de 112 px (88 px móvil).
- Los destinos existentes son `#servicios`, `#testimoniales` y
  `#agendar-cita`; usan `scroll-mt-*` además del cálculo JavaScript.

No cambiar el navbar a `sticky` sin revisar los cálculos de anchor y el
comportamiento sobre los heroes.

### Home

Archivo compositor: `pages/public/home.tsx`.

Orden deliberado de secciones:

1. `HomeHeroSection`: imagen de fondo, composición con foto de especialistas,
   promesa principal y CTA “Ver video”. El video actual es
   `/videos/HomeVideo.mp4` y se abre en un `Dialog` Radix grande, hasta 92vw y
   84vh, para acomodar también video vertical. El hero identifica el target
   `data-navbar-hero`.
2. `HomeAboutSection`: mosaico fotográfico, logo, misión, visión y valores.
3. `HomeExperienceSection`: señales de confianza: años, premios IOCIM y
   pacientes. Los números 10, 5 y 3,200 cuentan una única vez al entrar al
   viewport.
4. `HomeServicesSection`: grid de servicios médicos y card CTA destacada.
5. `HomeSpecialistsSection`: dos perfiles profesionales, imagen circular, rol
   y biografía.
6. `HomeTestimonialsSection`: carrusel Embla responsivo de testimonios.
7. `HomeFeaturedBlogsSection`: carrusel Embla de posts destacados publicados.
8. `LandingFooter`: contacto, enlaces, dirección, horarios y redes.

La Home recibe `featuredBlogs` y `testimonials` desde Laravel. Las tarjetas de
servicio, testimonios y blog usan componentes propios; no duplicar su markup
desde el page.

Nota de consistencia: el contrato global del negocio aún expone
`hero_video_url`, pero el hero público actual usa una ruta estática
`/videos/HomeVideo.mp4`. Antes de volver a hacer configurable este video, usar
una única fuente de verdad y actualizar el contrato, el Admin y el Hero juntos.

### Contacto y agenda

Archivo compositor: `pages/public/contact.tsx`.

1. `ContactHeroSection`: hero rosa con breadcrumb simple.
2. `ContactInfoSection`: tres cards de ubicación, correo y teléfono; los datos
   vienen del perfil global del negocio.
3. `ContactAppointmentSection`: formulario Inertia con campos nombre,
   teléfono, correo, fecha y mensaje. Envía `POST /appointments`, conserva el
   scroll, muestra errores por campo y confirma éxito sin abandonar la página.
   Visualmente es un layout 50/50: formulario rosa translúcido y fotografía.
4. `ContactMapSection`: iframe de Google Maps sólo si existen latitud y
   longitud; usa lazy loading.

### Blog

- `BlogHeroSection` usa hero editorial rosa y presenta el título Blog.
- El índice combina una cuadrícula de `BlogCard`, filtros/sidebar y paginación.
- `BlogCard` superpone una card blanca sobre su imagen y prioriza fecha,
  título rosa, extracto y enlace.
- La página individual presenta imagen principal, título `h1`, autor, fecha,
  categoría, extracto, contenido estructurado, etiquetas, compartidos,
  relacionados y sidebar.
- `BlogContentRenderer` convierte bloques de BlockNote a HTML semántico:
  headings, párrafos, listas, quotes, divisores e imágenes con caption.

No renderizar HTML arbitrario del blog. Ampliar el renderer de bloques si se
incorporan nuevos tipos de contenido.

## Movimiento e interacción

La landing busca sentirse pausada y cuidada, no llamativa ni mecánica.

### Animaciones globales

- `landing-hero-enter`: entrada del contenido de hero con opacidad y
  `translateY(18px)` durante 1000 ms, curva
  `cubic-bezier(0.22, 1, 0.36, 1)`.
- `landing-video-pulse`: pulso sutil del aro del CTA de video, 3.6 s, con
  inicio retrasado de 1.4 s.
- `LandingLayout` observa cada `main > section` con `IntersectionObserver`.
  Cuando una sección entra en viewport, añade `landing-reveal is-visible`.
- `landing-reveal` transiciona opacidad y blur (4 px a 0) durante 1000 ms.
  La demora escalonada es de 65 ms por sección, con tope de 320 ms.

El reveal no usa `transform` en el contenedor de sección. Esto es importante:
transformar el target alteraba el cálculo de los anchors bajo el navbar fijo.

### Microinteracciones

- Cards de servicios y contacto: elevación vertical corta y sombra más visible
  en hover.
- Enlaces y botones: transiciones de color; no aplicar rebotes o escalas grandes.
- Flechas en cards de contacto: pequeño desplazamiento diagonal en hover.
- Dots de carrusel: cambian entre rosa activo y gris azulado inactivo.
- Dialog del video: overlay oscuro, controles nativos y cierre accesible.

### Movimiento reducido

`@media (prefers-reduced-motion: reduce)` reduce duración de animaciones y
transiciones a 0.01 ms y desactiva scroll suave. Los contadores de experiencia
saltan directamente al valor final bajo esa preferencia.

Al crear una animación nueva, debe tener una razón UX, durar aproximadamente
300–1000 ms y respetar esta preferencia. Evitar loops decorativos salvo el
pulso discreto del video.

## Responsive y accesibilidad

- La composición es desktop-first, pero se colapsa a una columna en móvil.
- Navegación de escritorio aparece desde `xl`; antes se usa menú móvil.
- Los grids principales pasan a una columna o a dos según `sm`, `md` y `lg`.
- Los carruseles muestran 1 card móvil, 2 en `sm` y 3 en `lg` cuando aplica.
- La altura de heroes y la posición de imágenes usan breakpoints específicos;
  conservar `object-position` al sustituir imágenes de marca.
- Formularios usan labels visuales o `sr-only`, errores por campo y disabled
  state durante envíos.
- Diálogos, menús, tooltips, selectores y controles del Admin parten de
  primitivas accesibles de Radix.
- Todo icono funcional necesita `aria-label` o texto adyacente; las imágenes
  de contenido necesitan `alt` descriptivo en español.

## Datos compartidos y contenido dinámico

`useBusiness()` obtiene datos compartidos de Inertia:

```text
business.profile
├─ name, email, phone, appointment_phone
├─ address, google_maps_url
├─ latitude, longitude
└─ hero_video_url

business.hours[]
business.social_links[]
```

Estos datos alimentan navbar, contacto, footer, mapa y SEO público. Antes de
agregar datos de negocio nuevos, ampliar el contrato TypeScript en
`resources/js/types/business.ts` y el prop compartido de Laravel.

## SEO público

`components/landing/public-seo.tsx` es el único componente de metadata de la
landing. Se utiliza en Home, Contacto, índice de Blog y artículo individual.

Incluye título, descripción, canonical, Open Graph, Twitter Cards y JSON-LD.
El schema base es `MedicalClinic` con datos verificados del negocio. Los
artículos añaden `BlogPosting` y toman los campos `seo_title` y
`seo_description` del post cuando existan.

Las rutas `/sitemap.xml` y `/robots.txt` sólo contemplan la superficie pública.
El Admin no debe recibir SEO comercial ni aparecer en el sitemap.

## Reglas para futuras modificaciones

1. Distinguir siempre landing, autenticación y Admin antes de editar.
2. Para UI pública reutilizable, crear o extender componentes en
   `components/landing/`; no inflar los pages.
3. Reutilizar `LandingContainer`, palette, radios, sombras y jerarquía
   tipográfica antes de inventar tokens nuevos.
4. Mantener una conversión visible hacia contacto o cita cuando una nueva
   sección lo amerite.
5. Usar Lucide; no introducir otra familia de iconos.
6. No añadir dependencias de animación para efectos que CSS, Radix,
   IntersectionObserver o Embla ya resuelven.
7. No modificar el shell o flujos del Admin por cambios visuales de la landing.
8. Mantener contenido médico claro y prudente; no inventar credenciales,
   resultados clínicos, ubicaciones o premios.
9. Al tocar anchors, navbar o reveal, probar servicios, testimoniales y agenda
   para asegurar que el header fijo no cubre los destinos.
10. Mantener SEO solamente en rutas públicas y respetar el componente
    `PublicSeo`.

## Verificación frontend

Usar los comandos más pequeños que correspondan:

```bash
npm run types:check
npm run lint:check
npm run format:check
npm run build
```

Para cambios públicos, revisar además en desktop y móvil:

- Navbar en hero, scroll intermedio y sección sólida.
- Menú móvil y anchors con offset correcto.
- Contraste de texto sobre fotografía.
- Carruseles, formulario de cita, modal de video y preferencia de movimiento
  reducido.
- Estados sin posts, sin mapa, sin redes y con errores de formulario.

No ejecutar migraciones, seeders ni pruebas con base de datos sin autorización
explícita.
