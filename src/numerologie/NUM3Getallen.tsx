import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow, Headline } from "../components/Typo";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { enter } from "../helpers";

const cells = [
  { n: 1, w: "Leider" },
  { n: 2, w: "Verbinder" },
  { n: 3, w: "Creatief" },
  { n: 4, w: "Bouwer" },
  { n: 5, w: "Vrijheid" },
  { n: 6, w: "Zorgzaam" },
  { n: 7, w: "Zoeker" },
  { n: 8, w: "Kracht" },
  { n: 9, w: "Wijsheid" },
];

export const NUM3Getallen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chipP = enter(frame, fps, 30 + 9 * 9);

  return (
    <SceneLayout justify="flex-start">
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>De negen</Eyebrow>
      </div>
      <div style={{ marginTop: 26 }}>
        <Headline delay={6} size={74}>
          Elk getal, een eigen kracht.
        </Headline>
      </div>

      <div
        style={{
          marginTop: 50,
          display: "grid",
          gridTemplateColumns: "repeat(3, 288px)",
          gap: 22,
        }}
      >
        {cells.map((c, i) => {
          const p = enter(frame, fps, 30 + i * 9);
          return (
            <div
              key={c.n}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 30}px) scale(${0.9 + p * 0.1})`,
                height: 176,
                borderRadius: 26,
                background: COLORS.bgSoft,
                border: `1px solid ${COLORS.cardBorder}`,
                boxShadow: `0 14px 32px ${COLORS.shadow}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <span style={{ fontFamily: HEADLINE_FONT, fontWeight: 800, fontSize: 78, color: COLORS.accentDeep, lineHeight: 1 }}>
                {c.n}
              </span>
              <span style={{ fontFamily: BODY_FONT, fontWeight: 600, fontSize: 30, color: COLORS.text }}>{c.w}</span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 40,
          opacity: chipP,
          transform: `translateY(${(1 - chipP) * 24}px)`,
          padding: "18px 36px",
          borderRadius: 999,
          background: COLORS.accentSoft,
          border: `1.5px solid ${COLORS.accent}`,
          color: COLORS.accentDeep,
          fontFamily: BODY_FONT,
          fontWeight: 600,
          fontSize: 34,
        }}
      >
        11 · 22 · 33 — meestergetallen
      </div>
    </SceneLayout>
  );
};
