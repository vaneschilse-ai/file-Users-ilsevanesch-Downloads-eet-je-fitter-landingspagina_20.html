import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";
import { Narration } from "../../components/Narration";
import { Eyebrow, Headline, Body } from "../../components/Typo";
import { COLORS } from "../../theme";
import { HEADLINE_FONT, BODY_FONT } from "../../font";
import { enter, countUp } from "../../helpers";

// Breakfast plate as a donut: only a thin protein slice, mostly carbs.
const Plate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const R = 150;
  const C = 2 * Math.PI * R;
  const draw = enter(frame, fps, 18);
  const proteinFrac = 0.22; // ~8g of a ~30g goal
  const grams = Math.round(countUp(frame, fps, 8, 40));

  return (
    <svg width={440} height={440} viewBox="0 0 420 420">
      <circle cx={210} cy={210} r={R} fill="none" stroke={COLORS.track} strokeWidth={54} />
      {/* carbs / rest (light blush) */}
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
        opacity={0.5}
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
      <text
        x={210}
        y={196}
        textAnchor="middle"
        fill={COLORS.accentDeep}
        fontFamily={HEADLINE_FONT}
        fontSize={88}
        fontWeight={800}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {grams}g
      </text>
      <text x={210} y={244} textAnchor="middle" fill={COLORS.textDim} fontFamily={BODY_FONT} fontSize={30} fontWeight={600}>
        eiwit
      </text>
    </svg>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const capP = interpolate(frame, [56, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneLayout justify="flex-start">
      <Narration file="scene1.mp3" />
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Ontbijt-check</Eyebrow>
      </div>
      <div style={{ marginTop: 26 }}>
        <Headline delay={6} size={84}>
          Je ontbijt mist eiwit.
        </Headline>
      </div>
      <Body delay={14}>
        Brood, havermout of yoghurt geven maar 4 tot 8 gram. Je dag begint al met
        een tekort.
      </Body>

      <div style={{ marginTop: 40 }}>
        <Plate />
      </div>

      <div
        style={{
          marginTop: 24,
          fontFamily: BODY_FONT,
          fontSize: 36,
          fontWeight: 500,
          color: COLORS.textDim,
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
          opacity: capP,
        }}
      >
        gemiddeld ontbijt: <span style={{ color: COLORS.accentDeep, fontWeight: 600 }}>±8g</span> — doel:{" "}
        <span style={{ color: COLORS.text, fontWeight: 600 }}>30g</span>
      </div>
    </SceneLayout>
  );
};
