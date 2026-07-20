import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Narration } from "../components/Narration";
import { Particles } from "../components/Particles";
import { LogoBig, Butterfly } from "../components/Logo";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { enter } from "../helpers";

const Check: React.FC = () => (
  <div
    style={{
      width: 56,
      height: 56,
      borderRadius: 999,
      background: COLORS.accentDeep,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <svg width={30} height={30} viewBox="0 0 24 24">
      <path
        d="M5 13 L10 18 L19 6"
        fill="none"
        stroke={COLORS.bgSoft}
        strokeWidth={3.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const perks = ["Flexibel, naast je leven", "Samen met het Level Up-team", "Op jouw tempo"];

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoP = enter(frame, fps, 4);
  const headP = enter(frame, fps, 16);
  const cardP = enter(frame, fps, 28);
  const ctaP = enter(frame, fps, 64);
  const signP = enter(frame, fps, 78);

  return (
    <SceneLayout justify="flex-start" showLogo={false}>
      <Narration file="scene5.mp3" />
      <AbsoluteFill>
        <Particles />
      </AbsoluteFill>

      {/* big brand logo */}
      <div style={{ marginTop: 6, opacity: logoP, transform: `translateY(${(1 - logoP) * 30}px)` }}>
        <LogoBig />
      </div>

      {/* headline */}
      <h1
        style={{
          margin: 0,
          marginTop: 40,
          fontFamily: HEADLINE_FONT,
          fontWeight: 800,
          fontSize: 76,
          color: COLORS.text,
          textAlign: "center",
          lineHeight: 1.05,
          maxWidth: 900,
          opacity: headP,
          transform: `translateY(${(1 - headP) * 34}px)`,
        }}
      >
        Bouw jouw netwerk mee op
      </h1>

      {/* perks card */}
      <div
        style={{
          marginTop: 44,
          width: 900,
          padding: "38px 44px",
          borderRadius: 34,
          background: COLORS.bgSoft,
          border: `1.5px solid ${COLORS.accent}`,
          boxShadow: `0 26px 60px ${COLORS.shadow}`,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          opacity: cardP,
          transform: `translateY(${(1 - cardP) * 40}px) scale(${0.95 + cardP * 0.05})`,
        }}
      >
        {perks.map((perk, i) => {
          const p = enter(frame, fps, 36 + i * 10);
          return (
            <div
              key={perk}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                opacity: p,
                transform: `translateX(${(1 - p) * -36}px)`,
              }}
            >
              <Check />
              <span style={{ fontFamily: BODY_FONT, fontSize: 42, fontWeight: 600, color: COLORS.text }}>
                {perk}
              </span>
            </div>
          );
        })}
      </div>

      {/* CTA button */}
      <div
        style={{
          marginTop: 44,
          padding: "22px 52px",
          borderRadius: 999,
          background: COLORS.accent,
          color: COLORS.bgSoft,
          fontFamily: BODY_FONT,
          fontWeight: 600,
          fontSize: 44,
          boxShadow: `0 18px 40px ${COLORS.accentGlow}`,
          opacity: ctaP,
          transform: `scale(${0.9 + ctaP * 0.1})`,
        }}
      >
        Stuur me een DM 💬
      </div>

      {/* signature */}
      <div
        style={{
          marginTop: 34,
          display: "flex",
          alignItems: "center",
          gap: 14,
          opacity: signP,
          transform: `translateY(${(1 - signP) * 24}px)`,
        }}
      >
        <span style={{ fontFamily: HEADLINE_FONT, fontWeight: 700, fontSize: 44, color: COLORS.text }}>
          Liefs, Ilse
        </span>
        <Butterfly size={44} color={COLORS.accent} />
      </div>
    </SceneLayout>
  );
};
