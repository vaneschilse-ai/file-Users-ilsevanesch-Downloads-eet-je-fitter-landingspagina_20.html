import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow } from "../components/Typo";
import { Particles } from "../components/Particles";
import { COLORS, FONT } from "../theme";
import { enter, countUp } from "../helpers";

const foods = ["Eieren", "Kwark", "Kip & vis", "Peulvruchten"];

const CheckRow: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 24}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "16px 28px",
        borderRadius: 18,
        background: COLORS.bgSoft,
        border: `1px solid ${COLORS.cardBorder}`,
        width: 520,
      }}
    >
      <svg width={44} height={44} viewBox="0 0 44 44">
        <circle cx={22} cy={22} r={20} fill={COLORS.successSoft} stroke={COLORS.success} strokeWidth={3} />
        <path
          d="M13 22 L20 29 L32 15"
          fill="none"
          stroke={COLORS.success}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={40}
          strokeDashoffset={40 * (1 - enter(frame, fps, delay + 4))}
        />
      </svg>
      <span style={{ color: COLORS.text, fontSize: 40, fontWeight: FONT.semi }}>
        {label}
      </span>
    </div>
  );
};

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grams = Math.round(countUp(frame, fps, 30, 14));
  const numP = enter(frame, fps, 14);

  return (
    <SceneLayout justify="flex-start">
      <AbsoluteFill>
        <Particles />
      </AbsoluteFill>

      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Doe dit</Eyebrow>
      </div>

      {/* big number */}
      <div
        style={{
          marginTop: 28,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          transform: `scale(${0.7 + numP * 0.3})`,
          opacity: numP,
        }}
      >
        <span
          style={{
            color: COLORS.success,
            fontSize: 220,
            fontWeight: FONT.headline,
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: -4,
            textShadow: `0 0 60px ${COLORS.successGlow}`,
          }}
        >
          {grams}
        </span>
        <span
          style={{
            color: COLORS.text,
            fontSize: 90,
            fontWeight: FONT.headline,
          }}
        >
          g
        </span>
      </div>
      <div
        style={{
          color: COLORS.text,
          fontSize: 48,
          fontWeight: FONT.headline,
          textAlign: "center",
          marginTop: -6,
          opacity: numP,
        }}
      >
        eiwit per maaltijd
      </div>
      <div
        style={{
          color: COLORS.textDim,
          fontSize: 36,
          fontWeight: FONT.body,
          textAlign: "center",
          marginTop: 12,
          opacity: enter(frame, fps, 24),
        }}
      >
        Begin met een eiwitrijk ontbijt · streef naar ~1,6 g/kg
      </div>

      {/* food checklist */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginTop: 40,
          alignItems: "center",
        }}
      >
        {foods.map((f, i) => (
          <CheckRow key={f} label={f} delay={40 + i * 10} />
        ))}
      </div>
    </SceneLayout>
  );
};
