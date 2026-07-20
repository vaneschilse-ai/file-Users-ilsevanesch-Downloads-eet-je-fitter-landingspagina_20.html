import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Narration } from "../components/Narration";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS } from "../theme";
import { BODY_FONT } from "../font";
import { enter } from "../helpers";

// A little person glyph, drawn centred inside a node of radius r at (cx, cy).
const Person: React.FC<{ cx: number; cy: number; r: number; color: string }> = ({
  cx,
  cy,
  r,
  color,
}) => (
  <>
    <circle cx={cx} cy={cy - r * 0.28} r={r * 0.26} fill={color} />
    <path
      d={`M${cx - r * 0.42} ${cy + r * 0.5} Q${cx} ${cy - r * 0.02} ${
        cx + r * 0.42
      } ${cy + r * 0.5} Z`}
      fill={color}
    />
  </>
);

/**
 * A "?" that dissolves into a small connected network: one central node
 * (you) links out to four others. Lines self-draw, nodes spring in.
 */
const NetworkSeed: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 350;
  const cy = 250;
  const sats = [
    { x: 120, y: 110 },
    { x: 580, y: 110 },
    { x: 580, y: 400 },
    { x: 120, y: 400 },
  ];

  const centerP = enter(frame, fps, 18);
  const qFade = interpolate(frame, [30, 46], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={700} height={500} viewBox="0 0 700 500">
      {/* connectors self-draw, then satellite nodes pop in */}
      {sats.map((s, i) => {
        const len = Math.hypot(s.x - cx, s.y - cy);
        const draw = enter(frame, fps, 42 + i * 8);
        const pop = enter(frame, fps, 50 + i * 8);
        return (
          <g key={i}>
            <line
              x1={cx}
              y1={cy}
              x2={s.x}
              y2={s.y}
              stroke={COLORS.accent}
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - draw)}
              opacity={0.7}
            />
            <circle
              cx={s.x}
              cy={s.y}
              r={40 * pop}
              fill={COLORS.bgSoft}
              stroke={COLORS.accent}
              strokeWidth={4}
            />
            <Person cx={s.x} cy={s.y} r={40 * pop} color={COLORS.accent} />
          </g>
        );
      })}

      {/* central node */}
      <circle
        cx={cx}
        cy={cy}
        r={72 * centerP}
        fill={COLORS.accentSoft}
        stroke={COLORS.accentDeep}
        strokeWidth={6}
      />
      <Person cx={cx} cy={cy} r={72 * centerP} color={COLORS.accentDeep} />

      {/* the dissolving question mark */}
      <text
        x={cx}
        y={cy + 26}
        textAnchor="middle"
        fill={COLORS.accentDeep}
        fontFamily={BODY_FONT}
        fontSize={110}
        fontWeight={800}
        opacity={qFade}
      >
        ?
      </text>
    </svg>
  );
};

export const Scene1Hook: React.FC = () => {
  return (
    <SceneLayout justify="flex-start">
      <Narration file="scene1.mp3" />
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Uitgelegd</Eyebrow>
      </div>
      <div style={{ marginTop: 26 }}>
        <Headline delay={6} size={78}>
          Hoe werkt netwerk&shy;marketing écht?
        </Headline>
      </div>
      <Body delay={14}>
        Geen ingewikkeld verhaal. Een bedrijf geeft z&apos;n reclamegeld terug aan
        mensen die het product delen.
      </Body>

      <div style={{ marginTop: 30 }}>
        <NetworkSeed />
      </div>
    </SceneLayout>
  );
};
