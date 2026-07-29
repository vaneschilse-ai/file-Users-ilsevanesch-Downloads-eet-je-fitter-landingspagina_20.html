import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";
import { Narration } from "../../components/Narration";
import { Eyebrow, Headline, Body } from "../../components/Typo";
import { COLORS } from "../../theme";
import { HEADLINE_FONT, BODY_FONT } from "../../font";
import { enter, countUp } from "../../helpers";

const Egg: React.FC = () => (
  <svg width={92} height={92} viewBox="0 0 100 100">
    <path d="M50 20 C 32 20 26 50 26 62 C 26 78 38 84 50 84 C 62 84 74 78 74 62 C 74 50 68 20 50 20 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={5} />
  </svg>
);
const Skyr: React.FC = () => (
  <svg width={92} height={92} viewBox="0 0 100 100">
    <path d="M32 40 L68 40 L62 80 Q62 82 60 82 L40 82 Q38 82 38 80 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={5} strokeLinejoin="round" />
    <path d="M30 40 Q30 30 50 30 Q70 30 70 40" fill="none" stroke={COLORS.accentDeep} strokeWidth={5} strokeLinecap="round" />
  </svg>
);
const Kwark: React.FC = () => (
  <svg width={92} height={92} viewBox="0 0 100 100">
    <path d="M26 50 L74 50 Q70 78 50 78 Q30 78 26 50 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={5} strokeLinejoin="round" />
    <path d="M18 50 L82 50" stroke={COLORS.accentDeep} strokeWidth={5} strokeLinecap="round" />
    <path d="M44 34 Q48 42 44 48 M56 32 Q60 42 56 48" fill="none" stroke={COLORS.accentDeep} strokeWidth={4} strokeLinecap="round" />
  </svg>
);
const Shake: React.FC = () => (
  <svg width={92} height={92} viewBox="0 0 100 100">
    <path d="M40 22 L60 22 L60 32 L64 40 L64 82 Q64 84 62 84 L38 84 Q36 84 36 82 L36 40 L40 32 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={5} strokeLinejoin="round" />
    <path d="M37 54 L63 54" stroke={COLORS.accentDeep} strokeWidth={5} strokeLinecap="round" />
  </svg>
);

const items = [
  { icon: <Egg />, name: "2 eieren", grams: 13 },
  { icon: <Skyr />, name: "Skyr", grams: 20 },
  { icon: <Kwark />, name: "Magere kwark", grams: 18 },
  { icon: <Shake />, name: "Eiwitshake", grams: 25 },
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
        width: 216,
        padding: "26px 12px",
        borderRadius: 26,
        background: COLORS.bgSoft,
        border: `1px solid ${COLORS.cardBorder}`,
        boxShadow: `0 16px 36px ${COLORS.shadow}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div style={{ width: 108, height: 108, borderRadius: 22, background: COLORS.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {item.icon}
      </div>
      <div
        style={{
          color: COLORS.text,
          fontSize: 30,
          fontWeight: 600,
          fontFamily: BODY_FONT,
          textAlign: "center",
          lineHeight: 1.15,
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.name}
      </div>
      <div style={{ color: COLORS.accentDeep, fontSize: 44, fontWeight: 800, fontFamily: HEADLINE_FONT, fontVariantNumeric: "tabular-nums" }}>
        {g}g
      </div>
    </div>
  );
};

export const Scene4Sources: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = Math.round(countUp(frame, fps, 33, 92));
  const barP = enter(frame, fps, 92);
  const goal = 30;

  return (
    <SceneLayout justify="flex-start">
      <Narration file="scene4.mp3" />
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Zo kom je aan 30g</Eyebrow>
      </div>
      <div style={{ marginTop: 24 }}>
        <Headline delay={6} size={78}>
          Mik op 25–30 gram
        </Headline>
      </div>
      <Body delay={14}>Combineer een paar eiwitbronnen en je zit zó op je doel.</Body>

      <div style={{ display: "flex", gap: 16, marginTop: 42 }}>
        {items.map((it, i) => (
          <Card key={it.name} item={it} delay={28 + i * 10} />
        ))}
      </div>

      <div style={{ width: 900, marginTop: 50, opacity: barP }}>
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
            2 eieren + skyr: <span style={{ color: COLORS.accentDeep, fontWeight: 700 }}>{total}g</span>
          </span>
          <span style={{ color: COLORS.text }}>Doel: {goal}g</span>
        </div>
        <div style={{ height: 40, borderRadius: 14, background: COLORS.track, overflow: "hidden", position: "relative" }}>
          <div style={{ width: `${Math.min((total / (goal * 1.15)) * 100, 100) * barP}%`, height: "100%", borderRadius: 14, background: COLORS.accent }} />
          {/* goal marker */}
          <div
            style={{
              position: "absolute",
              left: `${(goal / (goal * 1.15)) * 100}%`,
              top: -6,
              bottom: -6,
              width: 5,
              background: COLORS.accentDeep,
              borderRadius: 3,
            }}
          />
        </div>
      </div>
    </SceneLayout>
  );
};
