import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS } from "../theme";
import { BODY_FONT } from "../font";
import { enter } from "../helpers";

const LeverageChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = enter(frame, fps, 22);
  const urenPath = "M60 240 L680 232";
  const inkomenPath = "M60 258 C 220 250, 360 210, 500 150 C 580 118, 640 92, 680 70";
  const urenLen = 622;
  const inkLen = 720;
  return (
    <svg width={720} height={320} viewBox="0 0 720 320">
      <line x1={60} y1={40} x2={60} y2={280} stroke={COLORS.track} strokeWidth={3} />
      <line x1={60} y1={280} x2={690} y2={280} stroke={COLORS.track} strokeWidth={3} />
      {/* inkomen area */}
      <path d={`${inkomenPath} L680 280 L60 280 Z`} fill={COLORS.accentGlow} opacity={draw * 0.4} />
      {/* uren (flat) */}
      <path d={urenPath} fill="none" stroke={COLORS.textDim} strokeWidth={6} strokeLinecap="round" strokeDasharray={urenLen} strokeDashoffset={urenLen * (1 - draw)} opacity={0.6} />
      {/* inkomen (rising) */}
      <path d={inkomenPath} fill="none" stroke={COLORS.accentDeep} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={inkLen} strokeDashoffset={inkLen * (1 - draw)} />
      {/* legend */}
      <g opacity={enter(frame, fps, 60)}>
        <circle cx={470} cy={252} r={8} fill={COLORS.textDim} />
        <text x={486} y={261} fill={COLORS.textDim} fontFamily={BODY_FONT} fontSize={30} fontWeight={600}>uren</text>
        <circle cx={150} cy={96} r={8} fill={COLORS.accentDeep} />
        <text x={166} y={105} fill={COLORS.accentDeep} fontFamily={BODY_FONT} fontSize={30} fontWeight={600}>inkomen</text>
      </g>
    </svg>
  );
};

const chips = ["Flexibel", "Van huis", "Naast je werk"];

export const NM4Leverage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneLayout justify="flex-start">
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>De hefboom</Eyebrow>
      </div>
      <div style={{ marginTop: 26 }}>
        <Headline delay={6} size={78}>
          Niet vast aan je uren.
        </Headline>
      </div>
      <Body delay={14}>Je inkomen groeit met producten én je team — niet met méér werkuren.</Body>

      <div style={{ marginTop: 40 }}>
        <LeverageChart />
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 40 }}>
        {chips.map((c, i) => {
          const p = enter(frame, fps, 72 + i * 10);
          return (
            <div
              key={c}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 26}px)`,
                padding: "18px 30px",
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
