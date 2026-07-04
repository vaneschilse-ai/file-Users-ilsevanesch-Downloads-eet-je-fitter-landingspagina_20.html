import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Particles } from "../components/Particles";
import { LogoBig, Butterfly } from "../components/Logo";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { enter } from "../helpers";

export const NM5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoP = enter(frame, fps, 4);
  const headP = enter(frame, fps, 18);
  const pillP = enter(frame, fps, 34);
  const subP = enter(frame, fps, 48);
  const signP = enter(frame, fps, 64);

  return (
    <SceneLayout justify="flex-start" showLogo={false}>
      <AbsoluteFill>
        <Particles />
      </AbsoluteFill>

      <div style={{ marginTop: 20, opacity: logoP, transform: `translateY(${(1 - logoP) * 30}px)` }}>
        <LogoBig />
      </div>

      <h1
        style={{
          margin: 0,
          marginTop: 56,
          fontFamily: HEADLINE_FONT,
          fontWeight: 800,
          fontSize: 88,
          color: COLORS.text,
          textAlign: "center",
          lineHeight: 1.04,
          opacity: headP,
          transform: `translateY(${(1 - headP) * 34}px)`,
        }}
      >
        Klaar om
        <br />
        te groeien?
      </h1>

      {/* CTA pill */}
      <div
        style={{
          marginTop: 50,
          padding: "26px 52px",
          borderRadius: 999,
          background: COLORS.accent,
          color: COLORS.bgSoft,
          fontFamily: BODY_FONT,
          fontWeight: 600,
          fontSize: 46,
          boxShadow: `0 20px 44px ${COLORS.accentGlow}`,
          opacity: pillP,
          transform: `scale(${0.88 + pillP * 0.12})`,
        }}
      >
        Stuur <span style={{ fontWeight: 600, letterSpacing: 1 }}>LEVELUP</span> in je DM
      </div>

      <div
        style={{
          marginTop: 24,
          fontFamily: BODY_FONT,
          fontWeight: 500,
          fontSize: 38,
          color: COLORS.textDim,
          textAlign: "center",
          opacity: subP,
        }}
      >
        of kijk op my.ilse.fit
      </div>

      {/* honest note */}
      <div
        style={{
          marginTop: 14,
          fontFamily: BODY_FONT,
          fontWeight: 400,
          fontSize: 28,
          color: COLORS.textDim,
          textAlign: "center",
          opacity: subP * 0.8,
          maxWidth: 760,
        }}
      >
        Een échte business die je stap voor stap opbouwt — jouw resultaat = jouw inzet.
      </div>

      <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 14, opacity: signP, transform: `translateY(${(1 - signP) * 24}px)` }}>
        <span style={{ fontFamily: HEADLINE_FONT, fontWeight: 700, fontSize: 44, color: COLORS.text }}>Liefs, Ilse</span>
        <Butterfly size={44} color={COLORS.accent} />
      </div>
    </SceneLayout>
  );
};
