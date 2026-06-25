# Calonge Stays — Sitio web de apartamentos turísticos

Sitio estático (HTML5 + CSS3 + JavaScript puro) para promocionar los apartamentos
en Calonge, Costa Brava, y dirigir a los visitantes a contactar por WhatsApp.
No requiere backend, base de datos ni pagos online — listo para publicarse en
GitHub Pages.

## Estructura

```
/
├── index.html          Página principal (hero, apartamentos, piscina, servicios, ubicación)
├── apartamentos.html   Detalle de los 3 apartamentos disponibles
├── galeria.html        Galería con filtros y lightbox
├── contacto.html       WhatsApp + formulario que abre un correo (mailto)
├── assets/
│   ├── css/style.css   Todos los estilos (tokens de color/tipografía al inicio del archivo)
│   ├── js/main.js      Menú móvil, scroll reveal, lightbox, enlaces de WhatsApp, formulario
│   ├── images/         Imágenes (actualmente placeholders SVG, ver abajo)
│   ├── icons/          Carpeta reservada para iconos adicionales
│   └── videos/         Carpeta reservada para vídeo de fondo si se añade
├── favicon.ico
└── README.md
```

## ⚠️ Antes de publicar: 3 cosas que debes cambiar

1. **Fotos reales.** Las imágenes en `assets/images/` son marcadores de posición
   (SVG con el nombre de cada espacio) para que puedas ver la maquetación
   funcionando. Sustitúyelas por fotografías reales de los apartamentos,
   manteniendo el mismo nombre de archivo (o actualiza la ruta en el HTML).
   Formatos recomendados: `.jpg` o `.webp`, comprimidos para web.

2. **Número de WhatsApp.** Abre `assets/js/main.js` y cambia esta línea con tu
   número en formato internacional, sin espacios ni símbolos:
   ```js
   var WHATSAPP_NUMBER = "34600000000";
   ```

3. **Correo de reservas.** En el mismo archivo, cambia:
   ```js
   var GMAIL_ADDRESS = "reservas@calongestays.com";
   ```
   y también el enlace `mailto:` que aparece en cada página (footer y
   `contacto.html`).

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube todo el contenido de esta carpeta
   (manteniendo la estructura de carpetas) a la rama `main`.
2. En GitHub, ve a **Settings → Pages**.
3. En **Source**, elige la rama `main` y la carpeta `/ (root)`.
4. Guarda. En unos minutos tu sitio estará disponible en
   `https://tu-usuario.github.io/tu-repositorio/`.
5. Si quieres un dominio propio, añade un archivo `CNAME` con tu dominio y
   configura el DNS según la documentación de GitHub Pages.

## Notas de diseño

- Paleta: negro `#14130F`, blanco, beige `#EFE8D8` / `#F7F3E9`, dorado suave
  `#B6904C` / `#D8BD89`, grises claros `#F4F2EE`.
- Tipografía: **Fraunces** (titulares) + **Inter** (texto), cargadas desde
  Google Fonts.
- El botón flotante de WhatsApp aparece en todas las páginas y siempre abre
  un mensaje prellenado con el nombre del apartamento correspondiente.
- El Apartamento 4 no aparece en el sitio porque ya está alquilado.
- El mapa usa un iframe de Google Maps embebido sin necesidad de API key.
- Las animaciones respetan `prefers-reduced-motion`.

## Edición rápida de contenido

- **Textos de las tarjetas de apartamentos:** editar directamente en
  `index.html` (sección `#apartamentos`) y `apartamentos.html`.
- **Galería:** añade o quita bloques `.gallery-item` en `galeria.html`;
  cada uno tiene un atributo `data-category` que controla los filtros.
- **Colores y tipografía:** todo se controla desde las variables `:root` al
  principio de `assets/css/style.css`.
