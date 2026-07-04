import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Particles } from "../components/Particles";
import { LogoBig, Butterfly } from "../components/Logo";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { enter } from "../helpers";

export const NUM5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoP = enter(frame, fps, 4);
  const headP = enter(frame, fps, 18);
  const quoteP = enter(frame, fps, 30);
  const pillP = enter(frame, fps, 42);
  const subP = enter(frame, fps, 54);
  const signP = enter(frame, fps, 66);

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
          marginTop: 50,
          fontFamily: HEADLINE_FONT,
          fontWeight: 800,
          fontSize: 82,
          color: COLORS.text,
          textAlign: "center",
          lineHeight: 1.04,
          opacity: headP,
          transform: `translateY(${(1 - headP) * 34}px)`,
        }}
      >
        Wat weet jouw
        <br />
        getal al?
      </h1>

      <p
        style={{
          margin: 0,
          marginTop: 22,
          maxWidth: 820,
          fontFamily: HEADLINE_FONT,
          fontWeight: 700,
          fontSize: 40,
          color: COLORS.accentDeep,
          textAlign: "center",
          lineHeight: 1.25,
          opacity: quoteP,
        }}
      >
        “Wat als jouw getal al weet wat jij nog niet ziet?”
      </p>

      <div
        style={{
          marginTop: 40,
          padding: "26px 50px",
          borderRadius: 999,
          background: COLORS.accent,
          color: COLORS.bgSoft,
          fontFamily: BODY_FONT,
          fontWeight: 600,
          fontSize: 44,
          boxShadow: `0 20px 44px ${COLORS.accentGlow}`,
          opacity: pillP,
          transform: `scale(${0.88 + pillP * 0.12})`,
        }}
      >
        Stuur <span style={{ letterSpacing: 1 }}>NUMEROLOGIE</span>
      </div>

      <div
        style={{
          marginTop: 22,
          fontFamily: BODY_FONT,
          fontWeight: 500,
          fontSize: 38,
          color: COLORS.textDim,
          textAlign: "center",
          opacity: subP,
        }}
      >
        of kijk op my.ilse.fit/numerologie
      </div>

      <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 14, opacity: signP, transform: `translateY(${(1 - signP) * 24}px)` }}>
        <span style={{ fontFamily: HEADLINE_FONT, fontWeight: 700, fontSize: 44, color: COLORS.text }}>Liefs, Ilse</span>
        <Butterfly size={44} color={COLORS.accent} />
      </div>
    </SceneLayout>
  );
};
