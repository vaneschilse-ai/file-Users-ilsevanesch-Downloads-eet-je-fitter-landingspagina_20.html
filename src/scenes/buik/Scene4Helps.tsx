import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";
import { Narration } from "../../components/Narration";
import { Eyebrow, Headline, Body } from "../../components/Typo";
import { COLORS } from "../../theme";
import { HEADLINE_FONT, BODY_FONT } from "../../font";
import { enter, countUp } from "../../helpers";

const Check: React.FC = () => (
  <div
    style={{
      width: 54,
      height: 54,
      borderRadius: 999,
      background: COLORS.accentDeep,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <svg width={28} height={28} viewBox="0 0 24 24">
      <path d="M5 13 L10 18 L19 6" fill="none" stroke={COLORS.bgSoft} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const tips = ["Eet rustig & kauw goed", "Minder zout & bewerkt eten", "Niet te laat & te zwaar eten"];

export const Scene4Helps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardP = enter(frame, fps, 20);
  const pillP = enter(frame, fps, 66);
  const mins = Math.round(countUp(frame, fps, 10, 70));

  return (
    <SceneLayout justify="flex-start">
      <Narration file="scene4.mp3" />
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Wat helpt</Eyebrow>
      </div>
      <div style={{ marginTop: 24 }}>
        <Headline delay={6} size={78}>
          Zo voelt je buik lichter
        </Headline>
      </div>
      <Body delay={14}>Kleine gewoontes, groot verschil — geen dieet nodig.</Body>

      <div
        style={{
          marginTop: 46,
          width: 920,
          padding: "40px 44px",
          borderRadius: 34,
          background: COLORS.bgSoft,
          border: `1.5px solid ${COLORS.accent}`,
          boxShadow: `0 26px 60px ${COLORS.shadow}`,
          display: "flex",
          flexDirection: "column",
          gap: 26,
          opacity: cardP,
          transform: `translateY(${(1 - cardP) * 40}px) scale(${0.96 + cardP * 0.04})`,
        }}
      >
        {tips.map((tip, i) => {
          const p = enter(frame, fps, 30 + i * 10);
          return (
            <div key={tip} style={{ display: "flex", alignItems: "center", gap: 24, opacity: p, transform: `translateX(${(1 - p) * -34}px)` }}>
              <Check />
              <span style={{ fontFamily: BODY_FONT, fontSize: 40, fontWeight: 600, color: COLORS.text }}>{tip}</span>
            </div>
          );
        })}
      </div>

      {/* highlighted count-up tip */}
      <div
        style={{
          marginTop: 34,
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "22px 40px",
          borderRadius: 999,
          background: COLORS.accentSoft,
          border: `2px solid ${COLORS.accentDeep}`,
          opacity: pillP,
          transform: `scale(${0.92 + pillP * 0.08})`,
        }}
      >
        <span style={{ fontFamily: HEADLINE_FONT, fontWeight: 800, fontSize: 66, color: COLORS.accentDeep, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
          {mins} min
        </span>
        <span style={{ fontFamily: BODY_FONT, fontWeight: 600, fontSize: 38, color: COLORS.text }}>
          wandelen na het eten
        </span>
      </div>
    </SceneLayout>
  );
};
