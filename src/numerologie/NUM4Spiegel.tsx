import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS } from "../theme";
import { BODY_FONT } from "../font";
import { enter } from "../helpers";

const Compass: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = enter(frame, fps, 20);
  const needle = enter(frame, fps, 46);
  const C = 2 * Math.PI * 130;
  // needle settles pointing up-right
  const angle = interpolate(needle, [0, 1], [-140, -38]);

  return (
    <svg width={320} height={320} viewBox="0 0 320 320">
      <circle cx={160} cy={160} r={130} fill={COLORS.accentSoft} opacity={0.5} />
      {/* self-drawing ring */}
      <circle
        cx={160}
        cy={160}
        r={130}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C * (1 - draw)}
        transform="rotate(-90 160 160)"
      />
      {/* cardinal ticks */}
      {[0, 90, 180, 270].map((a) => {
        const rad = (a * Math.PI) / 180;
        const x1 = 160 + Math.cos(rad) * 112;
        const y1 = 160 + Math.sin(rad) * 112;
        const x2 = 160 + Math.cos(rad) * 128;
        const y2 = 160 + Math.sin(rad) * 128;
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS.accentDeep} strokeWidth={4} strokeLinecap="round" opacity={draw} />;
      })}
      {/* needle */}
      <g transform={`rotate(${angle} 160 160)`} opacity={needle}>
        <path d="M160 70 L176 160 L160 250 L144 160 Z" fill={COLORS.accentDeep} />
        <circle cx={160} cy={160} r={14} fill={COLORS.bgSoft} stroke={COLORS.accentDeep} strokeWidth={5} />
      </g>
    </svg>
  );
};

const chips = ["Inzicht", "Richting", "Patronen herkennen"];

export const NUM4Spiegel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneLayout justify="flex-start">
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Waarvoor?</Eyebrow>
      </div>
      <div style={{ marginTop: 26 }}>
        <Headline delay={6} size={78}>
          Geen trucje — een spiegel.
        </Headline>
      </div>
      <Body delay={14}>Een innerlijk kompas: het geeft inzicht, richting en laat je patronen zien.</Body>

      <div style={{ marginTop: 50 }}>
        <Compass />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, marginTop: 50, maxWidth: 900 }}>
        {chips.map((c, i) => {
          const p = enter(frame, fps, 66 + i * 10);
          return (
            <div
              key={c}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 26}px)`,
                padding: "18px 32px",
                borderRadius: 999,
                background: COLORS.bgSoft,
                border: `1.5px solid ${COLORS.accent}`,
                boxShadow: `0 12px 28px ${COLORS.shadow}`,
                color: COLORS.text,
                fontFamily: BODY_FONT,
                fontSize: 34,
                fontWeight: 600,
              }}
            >
              {c}
            </div>
          );
        })}
      </div>
    </SceneLayout>
  );
};
