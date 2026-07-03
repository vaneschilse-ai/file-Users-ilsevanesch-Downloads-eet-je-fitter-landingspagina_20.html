import React from "react";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";

/** Simple, on-brand butterfly mark (🦋 is part of Ilse's brand language). */
export const Butterfly: React.FC<{ size?: number; color?: string }> = ({
  size = 46,
  color = COLORS.accent,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* body */}
    <path
      d="M50 30 L50 74"
      stroke={color}
      strokeWidth={4}
      strokeLinecap="round"
    />
    {/* antennae */}
    <path
      d="M50 30 Q44 20 38 18 M50 30 Q56 20 62 18"
      stroke={color}
      strokeWidth={3.5}
      strokeLinecap="round"
    />
    {/* upper wings */}
    <path
      d="M50 36 Q26 12 18 30 Q12 44 34 50 Q48 52 50 40 Z"
      fill={color}
      opacity={0.9}
    />
    <path
      d="M50 36 Q74 12 82 30 Q88 44 66 50 Q52 52 50 40 Z"
      fill={color}
      opacity={0.9}
    />
    {/* lower wings */}
    <path
      d="M50 44 Q30 52 26 68 Q24 80 40 76 Q50 72 50 56 Z"
      fill={color}
      opacity={0.6}
    />
    <path
      d="M50 44 Q70 52 74 68 Q76 80 60 76 Q50 72 50 56 Z"
      fill={color}
      opacity={0.6}
    />
  </svg>
);

/** Horizontal brand watermark — LEVEL UP · by Fitmarathon. */
export const LogoMark: React.FC<{ scale?: number; muted?: boolean }> = ({
  scale = 1,
  muted = false,
}) => {
  const ink = muted ? COLORS.textDim : COLORS.text;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12 * scale,
        transform: `scale(${scale})`,
        opacity: muted ? 0.65 : 1,
      }}
    >
      <Butterfly size={38 * scale} color={COLORS.accent} />
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          style={{
            fontFamily: HEADLINE_FONT,
            fontWeight: 800,
            fontSize: 34 * scale,
            color: ink,
            letterSpacing: 0.5 * scale,
          }}
        >
          LEVEL UP
        </span>
        <span
          style={{
            fontFamily: BODY_FONT,
            fontWeight: 600,
            fontSize: 16 * scale,
            color: COLORS.accentDeep,
            letterSpacing: 4 * scale,
            marginTop: 3 * scale,
          }}
        >
          BY FITMARATHON
        </span>
      </div>
    </div>
  );
};

/** Large centred lockup used on the CTA scene. */
export const LogoBig: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    }}
  >
    <Butterfly size={92} color={COLORS.accent} />
    <span
      style={{
        fontFamily: HEADLINE_FONT,
        fontWeight: 800,
        fontSize: 84,
        color: COLORS.text,
        letterSpacing: 1,
        lineHeight: 1,
      }}
    >
      LEVEL UP
    </span>
    <span
      style={{
        fontFamily: BODY_FONT,
        fontWeight: 600,
        fontSize: 30,
        color: COLORS.accentDeep,
        letterSpacing: 8,
      }}
    >
      BY FITMARATHON
    </span>
  </div>
);
