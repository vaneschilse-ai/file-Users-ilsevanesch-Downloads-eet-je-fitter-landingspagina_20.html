import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS, FONT } from "../theme";
import { enter, countUp } from "../helpers";

// --- simple SVG food icons -------------------------------------------------
const Bread: React.FC = () => (
  <svg width={110} height={110} viewBox="0 0 100 100">
    <path
      d="M20 55 Q20 30 50 30 Q80 30 80 55 L80 74 Q80 80 74 80 L26 80 Q20 80 20 74 Z"
      fill="none"
      stroke={COLORS.accent}
      strokeWidth={5}
      strokeLinejoin="round"
    />
    <path d="M34 44 L66 44 M34 56 L66 56" stroke={COLORS.accent} strokeWidth={4} strokeLinecap="round" />
  </svg>
);
const Oats: React.FC = () => (
  <svg width={110} height={110} viewBox="0 0 100 100">
    <path d="M22 48 L78 48 Q76 78 50 78 Q24 78 22 48 Z" fill="none" stroke={COLORS.accent} strokeWidth={5} strokeLinejoin="round" />
    <path d="M16 48 L84 48" stroke={COLORS.accent} strokeWidth={5} strokeLinecap="round" />
    <path d="M40 30 Q44 40 40 46 M52 26 Q56 38 52 46 M64 32 Q68 40 64 46" stroke={COLORS.accent} strokeWidth={4} strokeLinecap="round" fill="none" />
  </svg>
);
const Yogurt: React.FC = () => (
  <svg width={110} height={110} viewBox="0 0 100 100">
    <path d="M32 40 L68 40 L62 80 Q62 82 60 82 L40 82 Q38 82 38 80 Z" fill="none" stroke={COLORS.accent} strokeWidth={5} strokeLinejoin="round" />
    <path d="M30 40 Q30 30 50 30 Q70 30 70 40" fill="none" stroke={COLORS.accent} strokeWidth={5} strokeLinecap="round" />
  </svg>
);

const items = [
  { icon: <Bread />, name: "Brood", grams: 4 },
  { icon: <Oats />, name: "Havermout", grams: 6 },
  { icon: <Yogurt />, name: "Yoghurt", grams: 4 },
];

const Card: React.FC<{
  item: (typeof items)[number];
  delay: number;
}> = ({ item, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay);
  const g = Math.round(countUp(frame, fps, item.grams, delay + 6));
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 40}px) scale(${0.9 + p * 0.1})`,
        width: 250,
        padding: "28px 18px",
        borderRadius: 26,
        background: COLORS.bgSoft,
        border: `1px solid ${COLORS.cardBorder}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      {item.icon}
      <div style={{ color: COLORS.text, fontSize: 34, fontWeight: FONT.semi }}>
        {item.name}
      </div>
      <div
        style={{
          color: COLORS.accent,
          fontSize: 44,
          fontWeight: FONT.headline,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {g}g
      </div>
    </div>
  );
};

export const Scene2Breakfast: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = Math.round(countUp(frame, fps, 14, 78));
  const barP = enter(frame, fps, 78);

  return (
    <SceneLayout justify="flex-start">
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Oorzaak #1</Eyebrow>
      </div>
      <div style={{ marginTop: 26 }}>
        <Headline delay={6} size={72}>
          Het begint bij je ontbijt.
        </Headline>
      </div>
      <Body delay={14}>
        Brood, havermout en yoghurt geven weinig eiwit — je start met een tekort.
      </Body>

      <div style={{ display: "flex", gap: 24, marginTop: 44 }}>
        {items.map((it, i) => (
          <Card key={it.name} item={it} delay={30 + i * 10} />
        ))}
      </div>

      {/* total vs goal */}
      <div style={{ width: 800, marginTop: 46, opacity: barP }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: COLORS.textDim,
            fontSize: 32,
            fontWeight: FONT.semi,
            marginBottom: 14,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span>
            Totaal ontbijt:{" "}
            <span style={{ color: COLORS.accent, fontWeight: FONT.headline }}>
              {total}g
            </span>
          </span>
          <span style={{ color: COLORS.success }}>Doel: 30g</span>
        </div>
        <div
          style={{
            height: 40,
            borderRadius: 12,
            background: COLORS.track,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${(total / 30) * 100 * barP}%`,
              height: "100%",
              borderRadius: 12,
              background: COLORS.accent,
            }}
          />
          {/* goal marker */}
          <div
            style={{
              position: "absolute",
              left: "100%",
              top: -6,
              bottom: -6,
              width: 4,
              background: COLORS.success,
              transform: "translateX(-4px)",
            }}
          />
        </div>
      </div>
    </SceneLayout>
  );
};
