# Calonge Stays — Sitio web de apartamentos turísticos

Sitio estático (HTML5 + CSS3 + JavaScript puro) para promocionar los apartamentos
en Calonge, Costa Brava, y dirigir a los visitantes a contactar por WhatsApp.
No requiere backend, base de datos ni pagos online — listo para publicarse en
GitHub Pages.

## Cómo poner tus fotos (fácil)

Todas las imágenes están en `assets/images/` y son **archivos .jpg**.
Para cambiarlas, solo tienes que:

1. Tomar tu foto real.
2. Renombrarla EXACTAMENTE igual que el archivo que vas a reemplazar
   (por ejemplo `hero-pool.jpg`).
3. Reemplazar el archivo viejo por el nuevo en `assets/images/`, manteniendo
   el formato `.jpg`.

No hace falta tocar ningún código. Si tu foto es `.png`, conviértela a `.jpg`
antes (cualquier editor de fotos del celular lo hace al "exportar" o "compartir").

## Contacto configurado

- WhatsApp: +33 6 99 73 46 14
- Correo: VillaCalongeEs@gmail.com

(Puedes cambiarlos en `assets/js/main.js`, al inicio del archivo, y en los
enlaces `mailto:` de cada página HTML.)

## Publicar en GitHub Pages

1. Sube el **contenido** de esta carpeta (no la carpeta en sí) a la raíz de tu
   repositorio en GitHub.
2. Ve a Settings → Pages → Source: rama `main`, carpeta `/ (root)`.
3. Tu sitio quedará en `https://tu-usuario.github.io/tu-repositorio/`.

## Datos legales pendientes de completar

Antes de publicar definitivamente, sustituye estos marcadores en
`aviso-legal.html` y `privacidad.html`:

- `[NOMBRE COMPLETO O RAZÓN SOCIAL DEL PROPIETARIO]`
- `[NIF/CIF]`
- `[FECHA]` (fecha de última actualización de las políticas)

También actualiza `https://calongestays.example.com/` por el dominio real
en: todas las etiquetas `<link rel="canonical">`, `robots.txt` y `sitemap.xml`.

## Auditoría responsive (última revisión)

- Se reforzó `overflow-x:hidden` a nivel global para evitar scroll horizontal.
- Se corrigió un grid de apartamentos que usaba un estilo en línea y no
  respetaba el diseño de una sola columna en móvil.
- Se ajustaron tamaños de fuente, paddings y botones en breakpoints de
  1024px, 768px y 480px en hero, navbar, FAQ, ubicación, experiencias y
  formularios.
- El mapa de Google Maps reduce su altura en tablets y móviles.

## Aviso de cookies y formulario

- Se añadió un banner de cookies (aceptar / rechazar) que recuerda la
  elección del usuario.
- El formulario de contacto exige aceptar la Política de Privacidad antes
  de poder enviarse.
- Se crearon las páginas `aviso-legal.html`, `privacidad.html` y
  `cookies.html`, enlazadas desde el footer de todas las páginas.
