import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { enter, countUp } from "../helpers";

// Donut showing a plate: mostly carbs, tiny protein sliver.
const Plate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const R = 150;
  const C = 2 * Math.PI * R;
  const draw = enter(frame, fps, 18);
  const proteinFrac = 0.15;

  return (
    <svg width={400} height={400} viewBox="0 0 420 420">
      <circle cx={210} cy={210} r={R} fill="none" stroke={COLORS.track} strokeWidth={54} />
      {/* carbs arc (light blush) */}
      <circle
        cx={210}
        cy={210}
        r={R}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={54}
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C * (1 - (1 - proteinFrac) * draw)}
        transform="rotate(-90 210 210)"
        opacity={0.55}
      />
      {/* protein sliver (deep blush) */}
      <circle
        cx={210}
        cy={210}
        r={R}
        fill="none"
        stroke={COLORS.accentDeep}
        strokeWidth={54}
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C * (1 - proteinFrac * draw)}
        transform={`rotate(${-90 + (1 - proteinFrac) * 360} 210 210)`}
      />
      <text x={210} y={198} textAnchor="middle" fill={COLORS.text} fontFamily={HEADLINE_FONT} fontSize={40} fontWeight={800}>
        Je bord
      </text>
      <text x={210} y={246} textAnchor="middle" fill={COLORS.accentDeep} fontFamily={BODY_FONT} fontSize={30} fontWeight={600}>
        15% eiwit
      </text>
    </svg>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const jij = enter(frame, fps, 40);
  const nodig = enter(frame, fps, 52);
  const pct = Math.round(countUp(frame, fps, 55, 60));

  return (
    <SceneLayout justify="flex-start">
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Eiwit-check</Eyebrow>
      </div>
      <div style={{ marginTop: 28 }}>
        <Headline delay={6} size={86}>
          Je eet te weinig eiwit.
        </Headline>
      </div>
      <Body delay={14}>En je voelt het — in je energie, je honger en je humeur.</Body>

      <div style={{ marginTop: 22 }}>
        <Plate />
      </div>

      <div style={{ width: 780, marginTop: 12 }}>
        {[
          { label: "JIJ", value: jij * 0.55, color: COLORS.accent },
          { label: "NODIG", value: nodig * 1.0, color: COLORS.accentDeep },
        ].map((row) => (
          <div key={row.label} style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
            <div style={{ width: 150, color: COLORS.text, fontSize: 34, fontWeight: 600, fontFamily: BODY_FONT }}>
              {row.label}
            </div>
            <div style={{ flex: 1, height: 46, borderRadius: 14, background: COLORS.track, overflow: "hidden" }}>
              <div style={{ width: `${row.value * 100}%`, height: "100%", borderRadius: 14, background: row.color }} />
            </div>
          </div>
        ))}
        <div
          style={{
            textAlign: "center",
            marginTop: 4,
            color: COLORS.textDim,
            fontSize: 36,
            fontWeight: 500,
            fontFamily: BODY_FONT,
            fontVariantNumeric: "tabular-nums",
            opacity: interpolate(frame, [58, 74], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          Gemiddeld haal je maar{" "}
          <span style={{ color: COLORS.accentDeep, fontWeight: 600 }}>{pct}%</span> van wat je nodig hebt
        </div>
      </div>
    </SceneLayout>
  );
};
