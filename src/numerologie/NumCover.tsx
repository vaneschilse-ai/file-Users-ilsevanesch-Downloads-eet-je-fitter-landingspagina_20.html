import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { LogoMark, Butterfly } from "../components/Logo";
import { FloatingNumbers } from "./FloatingNumbers";

/** Reel cover / voorblad — centred for Instagram feed-grid crop (1:1 / 4:5). */
export const NumCover: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: BODY_FONT }}>
      <AbsoluteFill style={{ background: "radial-gradient(120% 70% at 50% 30%, rgba(228,141,142,0.20) 0%, rgba(250,247,246,0) 60%)" }} />
      <FloatingNumbers />
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
            marginBottom: 40,
          }}
        >
          <Butterfly size={30} color={COLORS.accentDeep} />
          Zielsmissie
        </div>

        {/* glowing 7 */}
        <svg width={240} height={240} viewBox="0 0 240 240">
          <circle cx={120} cy={120} r={100} fill={COLORS.accentSoft} />
          <circle cx={120} cy={120} r={100} fill="none" stroke={COLORS.accent} strokeWidth={4} />
          <text x={120} y={120} textAnchor="middle" dominantBaseline="central" fill={COLORS.accentDeep} fontFamily={HEADLINE_FONT} fontWeight={800} fontSize={140}>
            7
          </text>
        </svg>

        <h1
          style={{
            margin: 0,
            marginTop: 40,
            fontFamily: HEADLINE_FONT,
            fontWeight: 800,
            fontSize: 104,
            lineHeight: 1.02,
            color: COLORS.text,
            textAlign: "center",
            letterSpacing: -1,
          }}
        >
          Wat is
          <br />
          numerologie?
        </h1>

        <p
          style={{
            margin: 0,
            marginTop: 26,
            fontFamily: BODY_FONT,
            fontWeight: 500,
            fontSize: 42,
            color: COLORS.textDim,
            textAlign: "center",
            maxWidth: 820,
          }}
        >
          De taal van getallen — en wat jouw levenspad over je zegt.
        </p>

        <div style={{ marginTop: 54 }}>
          <LogoMark scale={1.05} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
