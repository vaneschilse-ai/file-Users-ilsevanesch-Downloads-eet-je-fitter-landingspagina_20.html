import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "./theme";
import { HEADLINE_FONT, BODY_FONT } from "./font";
import { LogoMark, Butterfly } from "./components/Logo";

/**
 * Reel cover / voorblad. 1080x1920, but all key content is centred inside the
 * middle ~1080x1080 so it survives Instagram's feed-grid crop (1:1 / 4:5).
 */

const PlateStatic: React.FC = () => {
  const R = 150;
  const C = 2 * Math.PI * R;
  const proteinFrac = 0.15;
  return (
    <svg width={360} height={360} viewBox="0 0 420 420">
      <circle cx={210} cy={210} r={R} fill="none" stroke={COLORS.track} strokeWidth={54} />
      <circle
        cx={210}
        cy={210}
        r={R}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={54}
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C * proteinFrac}
        transform="rotate(-90 210 210)"
        opacity={0.55}
      />
      <circle
        cx={210}
        cy={210}
        r={R}
        fill="none"
        stroke={COLORS.accentDeep}
        strokeWidth={54}
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C * (1 - proteinFrac)}
        transform={`rotate(${-90 + (1 - proteinFrac) * 360} 210 210)`}
      />
      <text x={210} y={196} textAnchor="middle" fill={COLORS.text} fontFamily={HEADLINE_FONT} fontSize={44} fontWeight={800}>
        15%
      </text>
      <text x={210} y={244} textAnchor="middle" fill={COLORS.accentDeep} fontFamily={BODY_FONT} fontSize={30} fontWeight={600}>
        eiwit
      </text>
    </svg>
  );
};

export const Cover: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: BODY_FONT }}>
      {/* soft blush glows */}
      <AbsoluteFill style={{ background: "radial-gradient(120% 70% at 50% 30%, rgba(228,141,142,0.20) 0%, rgba(250,247,246,0) 60%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(90% 55% at 50% 92%, rgba(228,141,142,0.12) 0%, rgba(250,247,246,0) 55%)" }} />

      {/* centred content block (survives feed-grid crop) */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 80,
          paddingRight: 80,
          gap: 4,
        }}
      >
        {/* eyebrow */}
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
            fontFamily: BODY_FONT,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          <Butterfly size={30} color={COLORS.accentDeep} />
          Eiwit-check
        </div>

        <PlateStatic />

        {/* hook */}
        <h1
          style={{
            margin: 0,
            marginTop: 30,
            fontFamily: HEADLINE_FONT,
            fontWeight: 800,
            fontSize: 108,
            lineHeight: 1.02,
            color: COLORS.text,
            textAlign: "center",
            letterSpacing: -1,
          }}
        >
          Eet jij genoeg
          <br />
          eiwit?
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
            maxWidth: 800,
          }}
        >
          Wat jij eet, voel jij — in je energie, honger en humeur.
        </p>

        {/* logo */}
        <div style={{ marginTop: 56 }}>
          <LogoMark scale={1.05} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
