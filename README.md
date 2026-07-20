# Hoe netwerkmarketing werkt — Remotion explainer

Educatieve verticale explainer video (1080×1920, 30fps, ~30s) opgebouwd met
[Remotion](https://www.remotion.dev/), in de huisstijl van **Ilse Vanesch /
Level Up by Fitmarathon**.

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
  1. `Scene1Hook` — "Hoe werkt netwerkmarketing écht?" (? → zelftekenend netwerk)
  2. `Scene2Difference` — traditioneel vs netwerk (twee zelftekenende flowcharts)
  3. `Scene3Mechanism` — gebruiken → delen → groeien (zelfbouwende team-boom)
  4. `Scene4Leverage` — hefboom & duplicatie (vermenigvuldigende nodes + count-up)
  5. `Scene5CTA` — "Bouw jouw netwerk mee op" (checklist + particles + DM-CTA)
- `src/theme.ts` — kleuren, safe zone, formaat
- `src/helpers.ts` — spring-entrance, count-up helpers
- `src/components/` — gedeelde UI (SceneLayout, typografie, particles, logo)
- `src/Cover.tsx` — Reel-voorblad (gecentreerd voor feed-grid crop)
- `public/fonts/` — zelf-gehoste Playfair Display + DM Sans (offline render)

## Ontwerp

- Achtergrond cream `#FAF7F6`, ink `#1A1717`, blush `#E48D8E`, diepe blush
  `#C56B6C` voor nadruk (geen groen — merk-conform).
- Koppen Playfair Display, body DM Sans. Alle iconen/diagrammen zijn
  SVG-componenten (geen externe assets).
- Alle entrees via `spring({ damping: 200 })`, gestaggerd 8–12 frames.
- Diagrammen tekenen zichzelf (`stroke-dashoffset`), getallen tellen op
  (`tabular-nums`). Slotscène heeft een particle-achtergrond.
- Safe zone: 150px top, 170px bottom, 60px zijkanten.
- Cijfers in scène 4 zijn illustratief (voorbeeld) en zo gelabeld.
