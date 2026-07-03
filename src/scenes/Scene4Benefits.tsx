import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Narration } from "../components/Narration";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { enter } from "../helpers";

const FullIcon: React.FC = () => (
  <svg width={84} height={84} viewBox="0 0 100 100">
    <circle cx={50} cy={50} r={34} fill="none" stroke={COLORS.accentDeep} strokeWidth={7} />
    <path d="M50 50 L50 26 M50 50 L68 60" stroke={COLORS.accentDeep} strokeWidth={7} strokeLinecap="round" />
  </svg>
);
const EnergyIcon: React.FC = () => (
  <svg width={84} height={84} viewBox="0 0 100 100">
    <path d="M56 18 L30 56 L48 56 L44 82 L72 42 L52 42 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={7} strokeLinejoin="round" />
  </svg>
);
const CalmIcon: React.FC = () => (
  <svg width={84} height={84} viewBox="0 0 100 100">
    <path d="M20 62 Q30 42 40 62 T60 62 T80 62" fill="none" stroke={COLORS.textDim} strokeWidth={5} strokeLinecap="round" opacity={0.4} />
    <path d="M20 62 L80 62" fill="none" stroke={COLORS.accentDeep} strokeWidth={7} strokeLinecap="round" />
  </svg>
);

const cards = [
  { icon: <FullIcon />, title: "Langer vol", sub: "minder snacken tussendoor" },
  { icon: <EnergyIcon />, title: "Stabiele energie", sub: "geen dip in de middag" },
  { icon: <CalmIcon />, title: "Minder cravings", sub: "rust rond eten" },
];

const BenefitCard: React.FC<{ c: (typeof cards)[number]; delay: number }> = ({ c, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateX(${(1 - p) * -50}px)`,
        width: 840,
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
        <div style={{ color: COLORS.text, fontSize: 50, fontWeight: 800, fontFamily: HEADLINE_FONT, lineHeight: 1.04 }}>
          {c.title}
        </div>
        <div style={{ color: COLORS.textDim, fontSize: 34, fontWeight: 400, fontFamily: BODY_FONT }}>{c.sub}</div>
      </div>
    </div>
  );
};

export const Scene4Benefits: React.FC = () => {
  return (
    <SceneLayout justify="flex-start">
      <Narration file="scene4.mp3" />
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>De sleutel</Eyebrow>
      </div>
      <div style={{ marginTop: 26 }}>
        <Headline delay={6} size={82}>
          Eiwit is je fundament.
        </Headline>
      </div>
      <Body delay={14}>Zo werk je mét je lichaam — geen strijd, geen dieet.</Body>

      <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 46 }}>
        {cards.map((c, i) => (
          <BenefitCard key={c.title} c={c} delay={26 + i * 12} />
        ))}
      </div>
    </SceneLayout>
  );
};
