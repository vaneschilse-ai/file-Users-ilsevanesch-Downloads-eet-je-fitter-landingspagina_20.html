import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS } from "../theme";
import { BODY_FONT } from "../font";
import { enter } from "../helpers";

const BoxIcon: React.FC = () => (
  <svg width={84} height={84} viewBox="0 0 100 100">
    <path d="M50 20 L80 36 L80 68 L50 84 L20 68 L20 36 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={6} strokeLinejoin="round" />
    <path d="M20 36 L50 52 L80 36 M50 52 L50 84" fill="none" stroke={COLORS.accentDeep} strokeWidth={6} strokeLinejoin="round" />
  </svg>
);
const PeopleIcon: React.FC = () => (
  <svg width={84} height={84} viewBox="0 0 100 100">
    <circle cx={38} cy={38} r={13} fill="none" stroke={COLORS.accentDeep} strokeWidth={6} />
    <circle cx={66} cy={42} r={11} fill="none" stroke={COLORS.accentDeep} strokeWidth={6} />
    <path d="M20 76 Q20 56 38 56 Q52 56 55 70" fill="none" stroke={COLORS.accentDeep} strokeWidth={6} strokeLinecap="round" />
    <path d="M52 74 Q54 60 66 60 Q82 60 82 78" fill="none" stroke={COLORS.accentDeep} strokeWidth={6} strokeLinecap="round" />
  </svg>
);
const HeartIcon: React.FC = () => (
  <svg width={84} height={84} viewBox="0 0 100 100">
    <path d="M50 78 C 20 58 22 32 40 32 C 50 32 50 42 50 42 C 50 42 50 32 60 32 C 78 32 80 58 50 78 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={6} strokeLinejoin="round" />
  </svg>
);

const tiles = [
  { icon: <BoxIcon />, label: "Product" },
  { icon: <PeopleIcon />, label: "Mensen" },
  { icon: <HeartIcon />, label: "Passie" },
];

export const NM1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneLayout justify="flex-start">
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Online inkomen</Eyebrow>
      </div>
      <div style={{ marginTop: 30 }}>
        <Headline delay={6} size={80}>
          Hoe werkt
          <br />
          netwerk&shy;marketing?
        </Headline>
      </div>
      <Body delay={14}>Geen winkel, geen baas. Jij deelt producten die je zélf gebruikt.</Body>

      <div style={{ display: "flex", gap: 30, marginTop: 60 }}>
        {tiles.map((t, i) => {
          const p = enter(frame, fps, 34 + i * 10);
          return (
            <div
              key={t.label}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 44}px) scale(${0.9 + p * 0.1})`,
                width: 240,
                padding: "34px 18px",
                borderRadius: 30,
                background: COLORS.bgSoft,
                border: `1px solid ${COLORS.cardBorder}`,
                boxShadow: `0 18px 40px ${COLORS.shadow}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 18,
              }}
            >
              <div style={{ width: 130, height: 130, borderRadius: 26, background: COLORS.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {t.icon}
              </div>
              <div style={{ color: COLORS.text, fontSize: 36, fontWeight: 600, fontFamily: BODY_FONT }}>{t.label}</div>
            </div>
          );
        })}
      </div>
    </SceneLayout>
  );
};
