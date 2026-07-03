# Nederlandse voice-over — script & timing

Warme, directe toon ("jij"), korte zinnen — Ilse's stem. Elke regel is één
scène (~5,5 sec). Totaal ~28 sec.

Gekozen AI-stem: **Roman** — Higgsfield seed_audio
`voice_id: 7e63ac18-5fcd-4aba-8078-a86d4e11c127`, `voice_type: preset`.

| Scène | Bestand | Tekst |
|------|---------|-------|
| 1 | `public/vo/scene1.mp3` | Wat jij eet, voel jij. En van eiwit krijg je waarschijnlijk veel te weinig binnen. |
| 2 | `public/vo/scene2.mp3` | Het begint al bij je ontbijt. Brood, havermout of yoghurt geven maar weinig eiwit. |
| 3 | `public/vo/scene3.mp3` | En dat voel je. Een dip in je energie, trek in zoet, en een humeur dat schommelt. |
| 4 | `public/vo/scene4.mp3` | Eiwit is je fundament. Het houdt je langer vol en geeft rust en stabiele energie. |
| 5 | `public/vo/scene5.mp3` | Reset daarom je ontbijt. Start met dertig gram eiwit, en voel het verschil. Liefs, Ilse. |

## Zo zet je de voice-over aan

1. Zet 5 clips in `public/vo/` met de namen `scene1.mp3` … `scene5.mp3`.
   - Ofwel je **eigen opname** (mooiste voor je brand),
   - ofwel AI-gegenereerd (zie hieronder).
2. Zet in `src/components/Narration.tsx` de vlag `VO_ENABLED = true`.
3. Preview in Remotion Studio. Loopt een clip te lang/kort? Pas
   `SCENE_DURATION` (of een losse scène) aan in `src/theme.ts` zodat beeld
   en stem gelijk lopen.

## AI genereren (zodra er weer Higgsfield-credits zijn)

De helper `scripts/generate-vo.md` bevat de exacte tool-aanroepen met de
Roman-stem. Op dit moment lukt genereren niet: de Higgsfield-workspace staat
op **0 credits** en Pika is niet gekoppeld. Vul credits aan (of koppel Pika)
en de 5 regels kunnen in één keer gegenereerd worden.
