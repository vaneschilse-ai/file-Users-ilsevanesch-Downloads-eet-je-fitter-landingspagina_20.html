import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow, Headline } from "../components/Typo";
import { COLORS, FONT } from "../theme";
import { enter } from "../helpers";

// --- benefit icons ---------------------------------------------------------
const FullIcon: React.FC = () => (
  <svg width={84} height={84} viewBox="0 0 100 100">
    <circle cx={50} cy={50} r={34} fill="none" stroke={COLORS.success} strokeWidth={7} />
    <path d="M50 50 L50 26 M50 50 L68 60" stroke={COLORS.success} strokeWidth={7} strokeLinecap="round" />
  </svg>
);
const MuscleIcon: React.FC = () => (
  <svg width={84} height={84} viewBox="0 0 100 100">
    <path
      d="M28 40 Q28 26 44 26 Q54 26 56 38 Q72 36 74 54 Q76 74 54 76 Q30 78 26 58 Q24 46 28 40 Z"
      fill="none"
      stroke={COLORS.success}
      strokeWidth={7}
      strokeLinejoin="round"
    />
    <path d="M44 44 Q52 50 50 62" stroke={COLORS.success} strokeWidth={6} strokeLinecap="round" fill="none" />
  </svg>
);
const SugarIcon: React.FC = () => (
  <svg width={84} height={84} viewBox="0 0 100 100">
    <path
      d="M20 40 Q30 20 40 40 T60 40 T80 40"
      fill="none"
      stroke={COLORS.textDim}
      strokeWidth={5}
      strokeLinecap="round"
      opacity={0.5}
    />
    <path d="M20 64 L80 64" fill="none" stroke={COLORS.success} strokeWidth={7} strokeLinecap="round" />
  </svg>
);

const cards = [
  { icon: <FullIcon />, title: "Verzadiging", sub: "je blijft langer vol" },
  { icon: <MuscleIcon />, title: "Spierbehoud", sub: "je verbrandt meer" },
  { icon: <SugarIcon />, title: "Stabiele\nbloedsuiker", sub: "minder cravings" },
];

const BenefitCard: React.FC<{ c: (typeof cards)[number]; delay: number }> = ({
  c,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateX(${(1 - p) * -50}px)`,
        width: 820,
        padding: "30px 34px",
        borderRadius: 26,
        background: COLORS.bgSoft,
        border: `1px solid ${COLORS.cardBorder}`,
        display: "flex",
        alignItems: "center",
        gap: 30,
      }}
    >
      <div
        style={{
          width: 118,
          height: 118,
          borderRadius: 24,
          background: COLORS.successSoft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {c.icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div
          style={{
            color: COLORS.text,
            fontSize: 46,
            fontWeight: FONT.headline,
            lineHeight: 1.05,
            whiteSpace: "pre-line",
          }}
        >
          {c.title}
        </div>
        <div style={{ color: COLORS.textDim, fontSize: 34, fontWeight: FONT.body }}>
          {c.sub}
        </div>
      </div>
    </div>
  );
};

export const Scene4Benefits: React.FC = () => {
  return (
    <SceneLayout justify="flex-start">
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>De oplossing</Eyebrow>
      </div>
      <div style={{ marginTop: 26 }}>
        <Headline delay={6} size={70}>
          Eiwit houdt je vol én sterk.
        </Headline>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 26,
          marginTop: 54,
        }}
      >
        {cards.map((c, i) => (
          <BenefitCard key={c.title} c={c} delay={26 + i * 12} />
        ))}
      </div>
    </SceneLayout>
  );
};
