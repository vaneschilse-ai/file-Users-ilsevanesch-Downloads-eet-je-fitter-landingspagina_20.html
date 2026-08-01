import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";
import { Narration } from "../../components/Narration";
import { Eyebrow, Headline, Body } from "../../components/Typo";
import { COLORS } from "../../theme";
import { BODY_FONT } from "../../font";
import { enter } from "../../helpers";

const bubbles = [
  { x: 180, y: 250 },
  { x: 300, y: 210 },
  { x: 410, y: 190 },
  { x: 520, y: 150 },
  { x: 610, y: 120 },
];

const Buildup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = enter(frame, fps, 20);
  const path = "M60 290 C 200 285, 250 235, 360 205 C 470 176, 520 130, 690 96";
  const LEN = 760;

  return (
    <svg width={720} height={340} viewBox="0 0 720 340">
      <line x1={60} y1={40} x2={60} y2={300} stroke={COLORS.track} strokeWidth={3} />
      <line x1={60} y1={300} x2={694} y2={300} stroke={COLORS.track} strokeWidth={3} />

      {/* filled area under the rising curve */}
      <path d={`${path} L690 300 L60 300 Z`} fill={COLORS.accentGlow} opacity={draw * 0.4} />
      <path
        d={path}
        fill="none"
        stroke={COLORS.accentDeep}
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={LEN}
        strokeDashoffset={LEN * (1 - draw)}
      />

      {/* bubbles pop in along the day */}
      {bubbles.map((b, i) => {
        const p = enter(frame, fps, 40 + i * 10);
        const r = (10 + i * 2) * p;
        return <circle key={i} cx={b.x} cy={b.y} r={r} fill={COLORS.accent} opacity={0.5 * p} />;
      })}

      <text x={70} y={66} fill={COLORS.textDim} fontFamily={BODY_FONT} fontSize={28} fontWeight={600}>
        Volume in je buik
      </text>
      <text x={64} y={330} fill={COLORS.textDim} fontFamily={BODY_FONT} fontSize={26} fontWeight={500}>
        07:00
      </text>
      <text x={628} y={330} fill={COLORS.textDim} fontFamily={BODY_FONT} fontSize={26} fontWeight={500}>
        21:00
      </text>
    </svg>
  );
};

const tags = ["Eten", "Ingeslikte lucht", "Vertering"];

export const Scene2Buildup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneLayout justify="flex-start">
      <Narration file="scene2.mp3" />
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Wat er gebeurt</Eyebrow>
      </div>
      <div style={{ marginTop: 24 }}>
        <Headline delay={6} size={76}>
          Overdag vult je systeem zich
        </Headline>
      </div>
      <Body delay={14}>
        Eten, ingeslikte lucht en vertering stapelen langzaam op. Je buik zet uit —
        heel normaal.
      </Body>

      <div style={{ marginTop: 40 }}>
        <Buildup />
      </div>

      <div style={{ display: "flex", gap: 18, marginTop: 34 }}>
        {tags.map((c, i) => {
          const p = enter(frame, fps, 92 + i * 10);
          return (
            <div
              key={c}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 24}px)`,
                padding: "16px 28px",
                borderRadius: 999,
                background: COLORS.bgSoft,
                border: `1.5px solid ${COLORS.accent}`,
                boxShadow: `0 12px 26px ${COLORS.shadow}`,
                color: COLORS.text,
                fontFamily: BODY_FONT,
                fontSize: 32,
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
