# Nederlandse voice-over — script & timing

Warme, directe toon ("jij"), korte zinnen — Ilse's stem. Elke regel is één
scène (~6,3 sec). Totaal ~30 sec. Eerlijk en bescheiden — geen "word snel rijk".

Gekozen AI-stem: **Roman** — Higgsfield seed_audio
`voice_id: 7e63ac18-5fcd-4aba-8078-a86d4e11c127`, `voice_type: preset`.

| Scène | Bestand | Tekst |
|------|---------|-------|
| 1 | `public/vo/scene1.mp3` | Hoe werkt netwerkmarketing nou écht? Simpel: een bedrijf geeft z'n reclamegeld terug aan mensen die het product delen. |
| 2 | `public/vo/scene2.mp3` | In de winkel betaalt een merk dure reclame en tussenhandel. In een netwerk gaat die marge naar wie het aanbeveelt — naar jou. |
| 3 | `public/vo/scene3.mp3` | Het werkt zo: jij gebruikt het product, deelt je resultaat, en tevreden klanten blijven. Een paar bouwen mee. |
| 4 | `public/vo/scene4.mp3` | Je verdient aan je eigen verkoop, én een klein deel over je team. Dat is hefboom: niet harder werken, maar samen. |
| 5 | `public/vo/scene5.mp3` | Wil jij dit ook opbouwen? Flexibel, op jouw tempo, met het Level Up-team. Stuur me een DM. Liefs, Ilse. |

## Zo zet je de voice-over aan

1. Zet 5 clips in `public/vo/` met de namen `scene1.mp3` … `scene5.mp3`.
   - Ofwel je **eigen opname** (mooiste voor je brand),
   - ofwel AI-gegenereerd (zie hieronder).
2. Zet in `src/components/Narration.tsx` de vlag `VO_ENABLED = true`.
3. Preview in Remotion Studio. Loopt een clip te lang/kort? Pas
   `SCENE_DURATION` (of een losse scène) aan in `src/theme.ts` zodat beeld
   en stem gelijk lopen.

## AI genereren (zodra er weer credits zijn)

De 5 regels hierboven kunnen in één keer met de Roman-stem gegenereerd worden.
Vul Higgsfield-credits aan (of koppel Pika) en genereer scene1…scene5.
