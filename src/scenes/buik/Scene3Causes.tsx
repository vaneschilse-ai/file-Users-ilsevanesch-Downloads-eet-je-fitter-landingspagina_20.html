import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";
import { Narration } from "../../components/Narration";
import { Eyebrow, Headline, Body } from "../../components/Typo";
import { COLORS } from "../../theme";
import { HEADLINE_FONT, BODY_FONT } from "../../font";
import { enter } from "../../helpers";

const HourglassIcon: React.FC = () => (
  <svg width={84} height={84} viewBox="0 0 100 100">
    <path d="M28 22 L72 22 M28 78 L72 78" stroke={COLORS.accentDeep} strokeWidth={7} strokeLinecap="round" />
    <path d="M34 24 L66 24 L50 50 L66 76 L34 76 L50 50 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={6} strokeLinejoin="round" />
    <path d="M42 68 L58 68 L50 56 Z" fill={COLORS.accentDeep} />
  </svg>
);
const WaveIcon: React.FC = () => (
  <svg width={84} height={84} viewBox="0 0 100 100">
    <path d="M18 54 Q30 30 42 54 T66 54 T90 54" fill="none" stroke={COLORS.accentDeep} strokeWidth={7} strokeLinecap="round" />
  </svg>
);
const DropIcon: React.FC = () => (
  <svg width={84} height={84} viewBox="0 0 100 100">
    <path d="M50 22 C 40 40, 28 54, 28 66 C 28 79, 38 86, 50 86 C 62 86, 72 79, 72 66 C 72 54, 60 40, 50 22 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={6} strokeLinejoin="round" />
  </svg>
);

const cards = [
  { icon: <HourglassIcon />, title: "Tragere spijsvertering", sub: "eten blijft langer 'onderweg'" },
  { icon: <WaveIcon />, title: "Hormonen schommelen", sub: "vanaf 35+ voel je 't sneller" },
  { icon: <DropIcon />, title: "Zout houdt vocht vast", sub: "bewerkt eten laat je opzwellen" },
];

const CauseCard: React.FC<{ c: (typeof cards)[number]; delay: number }> = ({ c, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateX(${(1 - p) * -50}px)`,
        width: 900,
        padding: "30px 34px",
        borderRadius: 28,
        background: COLORS.bgSoft,
        border: `1px solid ${COLORS.cardBorder}`,
        boxShadow: `0 18px 40px ${COLORS.shadow}`,
        display: "flex",
        alignItems: "center",
        gap: 30,
      }}
    >
      <div style={{ width: 118, height: 118, borderRadius: 26, background: COLORS.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {c.icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ color: COLORS.text, fontSize: 48, fontWeight: 800, fontFamily: HEADLINE_FONT, lineHeight: 1.04 }}>
          {c.title}
        </div>
        <div style={{ color: COLORS.textDim, fontSize: 34, fontWeight: 400, fontFamily: BODY_FONT }}>{c.sub}</div>
      </div>
    </div>
  );
};

export const Scene3Causes: React.FC = () => {
  return (
    <SceneLayout justify="flex-start">
      <Narration file="scene3.mp3" />
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Waarom juist nu</Eyebrow>
      </div>
      <div style={{ marginTop: 24 }}>
        <Headline delay={6} size={74}>
          Vanaf 35 voel je &apos;t sneller
        </Headline>
      </div>
      <Body delay={14}>Je vertering wordt trager en je hormonen schommelen — je buik reageert directer.</Body>

      <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 44 }}>
        {cards.map((c, i) => (
          <CauseCard key={c.title} c={c} delay={26 + i * 12} />
        ))}
      </div>
    </SceneLayout>
  );
};
