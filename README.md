# Waarom je te weinig eiwitten eet — Remotion explainer

Educatieve verticale explainer video (1080×1920, 30fps, ~28s) opgebouwd met
[Remotion](https://www.remotion.dev/).

## Preview / bewerken

```bash
npm install
npm run studio      # opent Remotion Studio in de browser
```

## Renderen naar MP4

```bash
npm run build       # -> out/video.mp4
```

## Structuur

- `src/Video.tsx` — koppelt de 5 scènes met `TransitionSeries` (12-frame fades)
- `src/scenes/` — één component per scène
  1. `Scene1Hook` — "Je eet te weinig eiwit." (bord-donut + JIJ vs NODIG)
  2. `Scene2Breakfast` — ontbijt-oorzaak (eiwit per ontbijtproduct)
  3. `Scene3Deficit` — spierverlies (zelftekenende grafiek + hongermeter)
  4. `Scene4Benefits` — voordelen van eiwit (3 kaarten)
  5. `Scene5CTA` — "Mik op 30g per maaltijd" (count-up + checklist + particles)
- `src/theme.ts` — kleuren, safe zone, formaat
- `src/helpers.ts` — spring-entrance, count-up helpers
- `src/components/` — gedeelde UI (SceneLayout, typografie, particles)
- `public/fonts/` — zelf-gehoste Inter (400/600/800) zodat renderen offline werkt

## Ontwerp

- Achtergrond `#0a0a0a`, wit, indigo `#6366f1`, groen `#22c55e`, Inter.
- Alle iconen/diagrammen zijn SVG-componenten (geen externe assets).
- Alle entrees via `spring({ damping: 200 })`, gestaggerd 8–12 frames.
- Safe zone: 150px top, 170px bottom, 60px zijkanten.
