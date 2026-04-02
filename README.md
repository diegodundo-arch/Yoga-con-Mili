# Yoga con Mili

App web mobile-first para la práctica de yoga de Mili. SPA en React con reservas de clases, meditaciones guiadas, tips de bienestar, tienda y música.

## Stack

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19 | UI |
| Vite | 7 | Build + dev server |
| Tailwind CSS | 3 | Estilos |
| Lucide React | 0.577 | Iconografía |
| Web Audio API | nativa | Cuencos + agua (sin dependencias) |

## Estructura

```
src/
├── components/
│   ├── Home.jsx            # Hero + accesos rápidos + mantra
│   ├── Navbar.jsx          # Navegación bottom fixed (6 tabs)
│   ├── BookingCalendar.jsx # Calendario + horario semanal + Mercado Pago
│   ├── DailyTips.jsx       # Meditaciones (timers + audio) · Infusiones · Mantras
│   ├── VideoGallery.jsx    # Próximamente
│   ├── Marketplace.jsx     # Tienda próximamente + WhatsApp
│   └── SpotifySection.jsx  # Embed playlist + link a Spotify
├── constants/
│   └── config.js           # URLs externas (Mercado Pago, WhatsApp, Spotify)
└── index.css               # Componentes globales (zen-card, btn-primary, etc.)
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ listo para deploy
npm run preview  # preview del build
```

## Constantes externas

Todas las URLs y números de contacto están centralizados en `src/constants/config.js`:

```js
MERCADOPAGO_URL     // link de pago
WHATSAPP_NUMBER     // número sin + ni espacios
SPOTIFY_PLAYLIST_ID
SPOTIFY_PLAYLIST_URL
```

## Deploy

La app se despliega automáticamente en **Vercel** al hacer push a `main`.

- Root directory: `yoga-con-mili`
- Build command: `npm run build`
- Output: `dist`

## Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| `linen` | `#F5F1E8` | Fondo principal (brand) |
| `clay` | `#C0653B` | Terracota (acento primario) |
| `deep-green` | `#3C2E1D` | Marrón profundo (texto) |
| `sage` | `#8DA290` | Verde sage (acento secundario) |
| `beige` | `#EDE4D8` | Beige suave |
| `stone` | `#9E9E8E` | Subtexto / secundario |

## Tipografía

- **Poppins** — cuerpo y UI general
- **Quicksand Medium** — marca ("yoga con mili")

## Horario de clases

El componente `BookingCalendar` lee el horario desde el array `SCHEDULE` en el mismo archivo.

- Lunes a viernes: 5 clases (07:00 · 10:30 · 13:00 · 19:00 · 21:30)
- Sábado: 1 clase (10:30)
- Domingo: día de descanso

## Timers de meditación

Implementados con Web Audio API (sin dependencias externas):

| Timer | Duración | Audio |
|---|---|---|
| Respiración 4-7-8 | 5 min | Cuencos al cambiar fase |
| Body scan | 8 min | Cuencos tibetanos cada 20 s (396 Hz / 432 Hz alternados) |
| Meditación del lago | 15 min | Loop de agua (ruido marrón filtrado) |
