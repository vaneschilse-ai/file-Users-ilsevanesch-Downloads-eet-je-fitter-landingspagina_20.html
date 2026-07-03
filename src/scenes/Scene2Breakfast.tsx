import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { enter, countUp } from "../helpers";

const Bread: React.FC = () => (
  <svg width={104} height={104} viewBox="0 0 100 100">
    <path d="M20 55 Q20 30 50 30 Q80 30 80 55 L80 74 Q80 80 74 80 L26 80 Q20 80 20 74 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={5} strokeLinejoin="round" />
    <path d="M34 44 L66 44 M34 56 L66 56" stroke={COLORS.accentDeep} strokeWidth={4} strokeLinecap="round" />
  </svg>
);
const Oats: React.FC = () => (
  <svg width={104} height={104} viewBox="0 0 100 100">
    <path d="M22 48 L78 48 Q76 78 50 78 Q24 78 22 48 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={5} strokeLinejoin="round" />
    <path d="M16 48 L84 48" stroke={COLORS.accentDeep} strokeWidth={5} strokeLinecap="round" />
    <path d="M40 30 Q44 40 40 46 M52 26 Q56 38 52 46 M64 32 Q68 40 64 46" stroke={COLORS.accentDeep} strokeWidth={4} strokeLinecap="round" fill="none" />
  </svg>
);
const Yogurt: React.FC = () => (
  <svg width={104} height={104} viewBox="0 0 100 100">
    <path d="M32 40 L68 40 L62 80 Q62 82 60 82 L40 82 Q38 82 38 80 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={5} strokeLinejoin="round" />
    <path d="M30 40 Q30 30 50 30 Q70 30 70 40" fill="none" stroke={COLORS.accentDeep} strokeWidth={5} strokeLinecap="round" />
  </svg>
);

const items = [
  { icon: <Bread />, name: "Brood", grams: 4 },
  { icon: <Oats />, name: "Havermout", grams: 6 },
  { icon: <Yogurt />, name: "Yoghurt", grams: 4 },
];

const Card: React.FC<{ item: (typeof items)[number]; delay: number }> = ({ item, delay }) => {
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
        padding: "30px 18px",
        borderRadius: 28,
        background: COLORS.bgSoft,
        border: `1px solid ${COLORS.cardBorder}`,
        boxShadow: `0 18px 40px ${COLORS.shadow}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div style={{ width: 120, height: 120, borderRadius: 24, background: COLORS.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {item.icon}
      </div>
      <div style={{ color: COLORS.text, fontSize: 34, fontWeight: 600, fontFamily: BODY_FONT }}>{item.name}</div>
      <div style={{ color: COLORS.accentDeep, fontSize: 46, fontWeight: 800, fontFamily: HEADLINE_FONT, fontVariantNumeric: "tabular-nums" }}>
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
        <Eyebrow delay={0}>De oorzaak</Eyebrow>
      </div>
      <div style={{ marginTop: 26 }}>
        <Headline delay={6} size={80}>
          Het begint bij je ontbijt.
        </Headline>
      </div>
      <Body delay={14}>Brood, havermout of yoghurt geven weinig eiwit. Je start je dag al met een tekort.</Body>

      <div style={{ display: "flex", gap: 24, marginTop: 44 }}>
        {items.map((it, i) => (
          <Card key={it.name} item={it} delay={30 + i * 10} />
        ))}
      </div>

      <div style={{ width: 800, marginTop: 46, opacity: barP }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: COLORS.textDim,
            fontSize: 32,
            fontWeight: 600,
            fontFamily: BODY_FONT,
            marginBottom: 14,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span>
            Jouw ontbijt: <span style={{ color: COLORS.accentDeep, fontWeight: 600 }}>{total}g</span>
          </span>
          <span style={{ color: COLORS.text }}>Doel: 30g</span>
        </div>
        <div style={{ height: 40, borderRadius: 14, background: COLORS.track, overflow: "hidden", position: "relative" }}>
          <div style={{ width: `${(total / 30) * 100 * barP}%`, height: "100%", borderRadius: 14, background: COLORS.accent }} />
          <div style={{ position: "absolute", left: "100%", top: -6, bottom: -6, width: 5, background: COLORS.accentDeep, transform: "translateX(-5px)", borderRadius: 3 }} />
        </div>
      </div>
    </SceneLayout>
  );
};
