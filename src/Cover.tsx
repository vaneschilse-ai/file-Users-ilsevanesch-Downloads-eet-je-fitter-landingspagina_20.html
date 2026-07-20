import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "./theme";
import { HEADLINE_FONT, BODY_FONT } from "./font";
import { LogoMark, Butterfly } from "./components/Logo";

/**
 * Reel cover / voorblad. 1080x1920, but all key content is centred inside the
 * middle ~1080x1080 so it survives Instagram's feed-grid crop (1:1 / 4:5).
 */

const Person: React.FC<{ cx: number; cy: number; r: number; color: string }> = ({
  cx,
  cy,
  r,
  color,
}) => (
  <>
    <circle cx={cx} cy={cy - r * 0.28} r={r * 0.26} fill={color} />
    <path
      d={`M${cx - r * 0.42} ${cy + r * 0.5} Q${cx} ${cy - r * 0.02} ${cx + r * 0.42} ${cy + r * 0.5} Z`}
      fill={color}
    />
  </>
);

const NetworkStatic: React.FC = () => {
  const cx = 200;
  const cy = 200;
  const sats = [
    { x: 40, y: 60 },
    { x: 360, y: 60 },
    { x: 360, y: 340 },
    { x: 40, y: 340 },
  ];
  return (
    <svg width={400} height={400} viewBox="0 0 400 400">
      {sats.map((s, i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={s.x} y2={s.y} stroke={COLORS.accent} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
          <circle cx={s.x} cy={s.y} r={38} fill={COLORS.bgSoft} stroke={COLORS.accent} strokeWidth={4} />
          <Person cx={s.x} cy={s.y} r={38} color={COLORS.accent} />
        </g>
      ))}
      <circle cx={cx} cy={cy} r={64} fill={COLORS.accentSoft} stroke={COLORS.accentDeep} strokeWidth={6} />
      <Person cx={cx} cy={cy} r={64} color={COLORS.accentDeep} />
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
          Netwerkmarketing
        </div>

        <NetworkStatic />

        {/* hook */}
        <h1
          style={{
            margin: 0,
            marginTop: 30,
            fontFamily: HEADLINE_FONT,
            fontWeight: 800,
            fontSize: 100,
            lineHeight: 1.03,
            color: COLORS.text,
            textAlign: "center",
            letterSpacing: -1,
          }}
        >
          Hoe werkt
          <br />
          netwerkmarketing?
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
          In 30 seconden uitgelegd — zonder ingewikkeld verhaal.
        </p>

        {/* logo */}
        <div style={{ marginTop: 56 }}>
          <LogoMark scale={1.05} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
