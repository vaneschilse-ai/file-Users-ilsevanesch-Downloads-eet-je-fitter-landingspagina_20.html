import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";
import { Narration } from "../../components/Narration";
import { Particles } from "../../components/Particles";
import { LogoBig, Butterfly } from "../../components/Logo";
import { COLORS } from "../../theme";
import { HEADLINE_FONT, BODY_FONT } from "../../font";
import { enter } from "../../helpers";

const Moon: React.FC = () => (
  <svg width={64} height={64} viewBox="0 0 100 100">
    <path
      d="M64 20 A 34 34 0 1 0 80 64 A 26 26 0 1 1 64 20 Z"
      fill={COLORS.accentDeep}
    />
  </svg>
);

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoP = enter(frame, fps, 4);
  const headP = enter(frame, fps, 16);
  const cardP = enter(frame, fps, 30);
  const ctaP = enter(frame, fps, 58);
  const signP = enter(frame, fps, 72);

  return (
    <SceneLayout justify="flex-start" showLogo={false}>
      <Narration file="scene5.mp3" />
      <AbsoluteFill>
        <Particles />
      </AbsoluteFill>

      <div style={{ marginTop: 10, opacity: logoP, transform: `translateY(${(1 - logoP) * 30}px)` }}>
        <LogoBig />
      </div>

      <h1
        style={{
          margin: 0,
          marginTop: 40,
          fontFamily: HEADLINE_FONT,
          fontWeight: 800,
          fontSize: 78,
          color: COLORS.text,
          textAlign: "center",
          lineHeight: 1.05,
          opacity: headP,
          transform: `translateY(${(1 - headP) * 34}px)`,
        }}
      >
        Het is tijdelijk — en normaal
      </h1>

      {/* reassurance card */}
      <div
        style={{
          marginTop: 44,
          width: 900,
          padding: "40px 44px",
          borderRadius: 34,
          background: COLORS.bgSoft,
          border: `1.5px solid ${COLORS.accent}`,
          boxShadow: `0 26px 60px ${COLORS.shadow}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          opacity: cardP,
          transform: `translateY(${(1 - cardP) * 40}px) scale(${0.95 + cardP * 0.05})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Moon />
          <span style={{ fontFamily: HEADLINE_FONT, fontWeight: 800, fontSize: 52, color: COLORS.text }}>
            &apos;s Nachts reset je lichaam
          </span>
        </div>
        <div style={{ fontFamily: BODY_FONT, fontWeight: 500, fontSize: 40, color: COLORS.textDim, textAlign: "center", lineHeight: 1.32, maxWidth: 760 }}>
          Je verteert, ontspant en verliest vocht. &apos;s Ochtends voel je je weer
          plat — beloof je.
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: 40,
          padding: "22px 50px",
          borderRadius: 999,
          background: COLORS.accent,
          color: COLORS.bgSoft,
          fontFamily: BODY_FONT,
          fontWeight: 600,
          fontSize: 42,
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
          marginTop: 32,
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
