# Portafolio · webs, apps móviles e IA

Sitio para vender desarrollos (páginas web, tiendas, apps móviles y asistentes con IA) con planes de precio,
calculadora de cotización por WhatsApp y un **Laboratorio** con cuatro portafolios animados.

Construido con **Next.js 16 (App Router)**, **React 19**, **Tailwind v4** y el design system
[`@chroma-yesid/ui`](https://www.npmjs.com/package/@chroma-yesid/ui). La marca ("Índice": editorial, claro y oscuro)
vive en una capa propia sobre los tokens de Chroma: [`app/brand.css`](app/brand.css).

## Empezar

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Comando | Qué hace |
|---|---|
| `pnpm typecheck` | TypeScript sin emitir |
| `pnpm lint` | ESLint (Next + TypeScript) |
| `pnpm test` | Pruebas unitarias (vitest): precios, calculadora, mensajes de WhatsApp |
| `pnpm test:e2e` | Playwright: tipografía, calculadora y humo. Usa el Chrome instalado (`PW_CHANNEL=chromium` para el de Playwright) |
| `pnpm build` | Compilación de producción |

Para probar contra una URL ya publicada: `BASE_URL=https://tu-sitio.vercel.app pnpm test:e2e`.

## Dónde se edita cada cosa

Todo el contenido está en [`content/`](content) (datos tipados) y los precios salen de **un solo cálculo**,
[`lib/pricing.ts`](lib/pricing.ts): `precio = horas × tarifa × (1 + imprevistos)`, redondeado hacia arriba.
Los planes y la calculadora comparten esa fórmula y hay una prueba que garantiza que nunca se contradigan.

| Quiero cambiar… | Archivo |
|---|---|
| Nombre, WhatsApp, redes | [`content/site.ts`](content/site.ts) (el WhatsApp también acepta `NEXT_PUBLIC_WHATSAPP`) |
| Tarifa por hora, imprevistos, recargos | [`lib/pricing.ts`](lib/pricing.ts) |
| Planes y horas de cada uno | [`content/planes.ts`](content/planes.ts) |
| Preguntas y extras de la calculadora | [`content/calculadora.ts`](content/calculadora.ts) |
| Servicios y método | [`content/servicios.ts`](content/servicios.ts) |
| Proyectos del portafolio | [`content/proyectos.ts`](content/proyectos.ts) |
| Proceso, preguntas frecuentes, costos de terceros | `content/proceso.ts`, `content/faq.ts`, `content/terceros.ts` |
| Colores, tamaños de texto, fuentes | [`app/brand.css`](app/brand.css) |

## Pendientes antes de lanzar

Lo que sigue es **provisional** y hay que confirmarlo o reemplazarlo:

- [ ] **WhatsApp real.** Hoy es un marcador (`57XXXXXXXXXX`) que no escribe a nadie. Ponlo en `content/site.ts` o en la variable `NEXT_PUBLIC_WHATSAPP`.
- [ ] **Nombre comercial** (hoy "Yesid Carrillo") y redes.
- [ ] **Proyectos reales.** Los 6 de `content/proyectos.ts` son muestras marcadas "Ejemplo".
- [ ] **Método de trabajo** (3 preguntas en `content/servicios.ts`) y **textos de la portada**: revisa que suenen a ti.
- [ ] **Políticas** en `content/faq.ts`: propiedad del código, mantenimiento y horas, IVA y factura.
- [ ] **Capacidad semanal** (`HOURS_PER_WEEK` en `lib/pricing.ts`): define los plazos que muestra la calculadora (hoy 25/35/45 h por semana).
- [ ] **Dominio propio.**

## Laboratorio

Los cuatro portafolios animados (Señal, Índice, Pestañas, Lienzo) son páginas HTML estáticas en
[`public/laboratorio/`](public/laboratorio), servidas con URLs limpias por los `rewrites` de [`next.config.ts`](next.config.ts):
`/laboratorio`, `/laboratorio/senal|indice|pestanas|lienzo` y `/laboratorio/comparar`. Los enlaces viejos
(`/comparar.html`, `/conceptos/...`) redirigen allí.

La **siguiente fase** es migrarlos a React con Chroma.

## Pruebas de tipografía

[`tests/typography.spec.ts`](tests/typography.spec.ts) mide la página real en 360, 390, 768, 1280 y 1440 px y **falla si una
palabra se parte entre dos líneas**, si un texto grande se sale de la pantalla, si hay scroll horizontal o si un título
pasa de 3 líneas en móvil. Lo que se desplaza a propósito (marquesinas, pistas horizontales) se excluye con
`data-audit-ignore` o `aria-hidden`.

## Notas

- **Parche de Chroma:** `@chroma-yesid/ui` 0.3.0 pinta el título y la descripción de `SelectableCardGroup` en fila en web
  (al cuerpo le falta `flex-col`). Hay un parche acotado en `app/brand.css`; se quita cuando el design system lo corrija.
- **Chroma `Button` es un `<button>`.** Para enlaces con aspecto de botón (WhatsApp, anclas) se usa
  [`components/ui/ButtonLink.tsx`](components/ui/ButtonLink.tsx), con las mismas clases semánticas.
- **Títulos grandes:** la escala de Chroma llega a 36 px, así que los títulos usan los tokens fluidos `text-hero` y
  `text-display-xl` de `app/brand.css` (con `text-wrap: balance`).
- **TypeScript 6:** `typescript-eslint` aún no soporta TypeScript 7.
- `negocio/` (análisis comercial y tarifa interna) y `inspiracion/` (capturas de Mobbin) están en `.gitignore`: no se publican.
- `AGENTS.md` lo genera `next dev`.

## Publicación

Se despliega en Vercel (`framework: nextjs` en [`vercel.json`](vercel.json)). Con el repo conectado, cada `git push`
a `main` publica en producción.
