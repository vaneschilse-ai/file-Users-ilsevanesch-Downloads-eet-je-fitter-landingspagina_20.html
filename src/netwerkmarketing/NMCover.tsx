import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { LogoMark, Butterfly } from "../components/Logo";

/**
 * Reel cover / voorblad for the netwerkmarketing video. Key content centred so
 * it survives Instagram's feed-grid crop (1:1 / 4:5).
 */

// small duplication motif: 1 -> 3
const MiniTree: React.FC = () => (
  <svg width={340} height={200} viewBox="0 0 340 200">
    <line x1={170} y1={40} x2={80} y2={150} stroke={COLORS.accent} strokeWidth={4} opacity={0.7} />
    <line x1={170} y1={40} x2={170} y2={150} stroke={COLORS.accent} strokeWidth={4} opacity={0.7} />
    <line x1={170} y1={40} x2={260} y2={150} stroke={COLORS.accent} strokeWidth={4} opacity={0.7} />
    <circle cx={170} cy={40} r={30} fill={COLORS.accentDeep} />
    <circle cx={80} cy={155} r={22} fill={COLORS.accent} />
    <circle cx={170} cy={155} r={22} fill={COLORS.accent} />
    <circle cx={260} cy={155} r={22} fill={COLORS.accent} />
  </svg>
);

export const NMCover: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: BODY_FONT }}>
      <AbsoluteFill style={{ background: "radial-gradient(120% 70% at 50% 30%, rgba(228,141,142,0.20) 0%, rgba(250,247,246,0) 60%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(90% 55% at 50% 92%, rgba(228,141,142,0.12) 0%, rgba(250,247,246,0) 55%)" }} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 30px",
            borderRadius: 999,
            background: COLORS.accentSoft,
            border: `1.5px solid ${COLORS.accent}`,
            color: COLORS.accentDeep,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 44,
          }}
        >
          <Butterfly size={30} color={COLORS.accentDeep} />
          Online inkomen
        </div>

        <MiniTree />

        <h1
          style={{
            margin: 0,
            marginTop: 34,
            fontFamily: HEADLINE_FONT,
            fontWeight: 800,
            fontSize: 100,
            lineHeight: 1.02,
            color: COLORS.text,
            textAlign: "center",
            letterSpacing: -1,
          }}
        >
          Hoe werkt
          <br />
          netwerk&shy;marketing?
        </h1>

        <p
          style={{
            margin: 0,
            marginTop: 28,
            fontFamily: BODY_FONT,
            fontWeight: 500,
            fontSize: 42,
            color: COLORS.textDim,
            textAlign: "center",
            maxWidth: 820,
          }}
        >
          Geen winkel, geen baas — jij bouwt je eigen inkomen.
        </p>

        <div style={{ marginTop: 56 }}>
          <LogoMark scale={1.05} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
