import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Particles } from "../components/Particles";
import { LogoBig, Butterfly } from "../components/Logo";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { enter, countUp } from "../helpers";

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoP = enter(frame, fps, 4);
  const headP = enter(frame, fps, 16);
  const cardP = enter(frame, fps, 30);
  const grams = Math.round(countUp(frame, fps, 30, 40));
  const urlP = enter(frame, fps, 52);
  const signP = enter(frame, fps, 66);

  return (
    <SceneLayout justify="flex-start" showLogo={false}>
      <AbsoluteFill>
        <Particles />
      </AbsoluteFill>

      {/* big brand logo */}
      <div style={{ marginTop: 10, opacity: logoP, transform: `translateY(${(1 - logoP) * 30}px)` }}>
        <LogoBig />
      </div>

      {/* headline */}
      <h1
        style={{
          margin: 0,
          marginTop: 40,
          fontFamily: HEADLINE_FONT,
          fontWeight: 800,
          fontSize: 82,
          color: COLORS.text,
          textAlign: "center",
          opacity: headP,
          transform: `translateY(${(1 - headP) * 34}px)`,
        }}
      >
        Reset je ontbijt.
      </h1>

      {/* product card */}
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
          gap: 12,
          opacity: cardP,
          transform: `translateY(${(1 - cardP) * 40}px) scale(${0.94 + cardP * 0.06})`,
        }}
      >
        <div style={{ fontFamily: BODY_FONT, fontWeight: 600, fontSize: 30, letterSpacing: 4, color: COLORS.accentDeep }}>
          FITMARATHON
        </div>
        <div style={{ fontFamily: HEADLINE_FONT, fontWeight: 800, fontSize: 56, color: COLORS.text, textAlign: "center", lineHeight: 1.05 }}>
          Eiwitten &amp; Ontbijt Reset
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}>
          <span style={{ fontFamily: HEADLINE_FONT, fontWeight: 800, fontSize: 120, color: COLORS.accentDeep, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
            {grams}
          </span>
          <span style={{ fontFamily: HEADLINE_FONT, fontWeight: 800, fontSize: 60, color: COLORS.text }}>g</span>
          <span style={{ fontFamily: BODY_FONT, fontWeight: 500, fontSize: 40, color: COLORS.textDim, marginLeft: 10 }}>
            eiwit om mee te starten
          </span>
        </div>
        <div
          style={{
            marginTop: 14,
            padding: "16px 36px",
            borderRadius: 999,
            background: COLORS.accent,
            color: COLORS.bgSoft,
            fontFamily: BODY_FONT,
            fontWeight: 600,
            fontSize: 36,
            opacity: urlP,
            transform: `scale(${0.9 + urlP * 0.1})`,
          }}
        >
          my.ilse.fit/fitmarathon-ontbijt
        </div>
      </div>

      {/* signature */}
      <div
        style={{
          marginTop: 40,
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
