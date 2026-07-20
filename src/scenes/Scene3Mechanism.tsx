import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Narration } from "../components/Narration";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS } from "../theme";
import { BODY_FONT, HEADLINE_FONT } from "../font";
import { enter } from "../helpers";

const Person: React.FC<{ cx: number; cy: number; r: number; color: string }> = ({
  cx,
  cy,
  r,
  color,
}) => (
  <>
    <circle cx={cx} cy={cy - r * 0.26} r={r * 0.26} fill={color} />
    <path
      d={`M${cx - r * 0.44} ${cy + r * 0.52} Q${cx} ${cy - r * 0.02} ${
        cx + r * 0.44
      } ${cy + r * 0.52} Z`}
      fill={color}
    />
  </>
);

const root = { x: 480, y: 80 };
const l2 = [
  { x: 200, y: 330 },
  { x: 480, y: 330 },
  { x: 760, y: 330 },
];
// only the outer customers "build along"
const l3 = [
  { x: 110, y: 560, from: 0 },
  { x: 290, y: 560, from: 0 },
  { x: 670, y: 560, from: 2 },
  { x: 850, y: 560, from: 2 },
];

const Connector: React.FC<{
  a: { x: number; y: number };
  b: { x: number; y: number };
  delay: number;
  color: string;
}> = ({ a, b, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const draw = enter(frame, fps, delay);
  return (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={color}
      strokeWidth={5}
      strokeLinecap="round"
      strokeDasharray={len}
      strokeDashoffset={len * (1 - draw)}
      opacity={0.75}
    />
  );
};

const Tree: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rootP = enter(frame, fps, 16);

  return (
    <svg width={960} height={680} viewBox="0 0 960 680">
      {/* level-2 connectors */}
      {l2.map((n, i) => (
        <Connector key={`c2-${i}`} a={root} b={n} delay={30 + i * 8} color={COLORS.accent} />
      ))}
      {/* level-3 connectors */}
      {l3.map((n, i) => (
        <Connector key={`c3-${i}`} a={l2[n.from]} b={n} delay={64 + i * 6} color={COLORS.accent} />
      ))}

      {/* level-3 nodes */}
      {l3.map((n, i) => {
        const p = enter(frame, fps, 74 + i * 6);
        const r = 40 * p;
        return (
          <g key={`n3-${i}`}>
            <circle cx={n.x} cy={n.y} r={r} fill={COLORS.bgSoft} stroke={COLORS.accent} strokeWidth={4} />
            <Person cx={n.x} cy={n.y} r={r} color={COLORS.accent} />
          </g>
        );
      })}

      {/* level-2 nodes */}
      {l2.map((n, i) => {
        const p = enter(frame, fps, 40 + i * 8);
        const r = 50 * p;
        return (
          <g key={`n2-${i}`}>
            <circle cx={n.x} cy={n.y} r={r} fill={COLORS.bgSoft} stroke={COLORS.accent} strokeWidth={5} />
            <Person cx={n.x} cy={n.y} r={r} color={COLORS.accentDeep} />
          </g>
        );
      })}

      {/* root node */}
      <circle cx={root.x} cy={root.y} r={62 * rootP} fill={COLORS.accentSoft} stroke={COLORS.accentDeep} strokeWidth={6} />
      <Person cx={root.x} cy={root.y} r={62 * rootP} color={COLORS.accentDeep} />
      <text
        x={root.x}
        y={root.y + 108}
        textAnchor="middle"
        fill={COLORS.text}
        fontFamily={HEADLINE_FONT}
        fontSize={38}
        fontWeight={800}
        opacity={rootP}
      >
        JIJ
      </text>
    </svg>
  );
};

const steps = ["Gebruik", "Deel", "Groei"];

export const Scene3Mechanism: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneLayout justify="flex-start">
      <Narration file="scene3.mp3" />
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Het mechanisme</Eyebrow>
      </div>
      <div style={{ marginTop: 24 }}>
        <Headline delay={6} size={76}>
          Gebruiken, delen, groeien
        </Headline>
      </div>
      <Body delay={14}>
        Jij gebruikt het product en deelt je resultaat. Tevreden klanten blijven —
        en een paar bouwen mee.
      </Body>

      <div style={{ marginTop: 16 }}>
        <Tree />
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
        {steps.map((s, i) => {
          const p = enter(frame, fps, 96 + i * 10);
          return (
            <div
              key={s}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 22}px)`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 30px",
                borderRadius: 999,
                background: COLORS.bgSoft,
                border: `1.5px solid ${COLORS.accent}`,
                boxShadow: `0 12px 26px ${COLORS.shadow}`,
              }}
            >
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  background: COLORS.accentDeep,
                  color: COLORS.bgSoft,
                  fontFamily: HEADLINE_FONT,
                  fontWeight: 800,
                  fontSize: 26,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontFamily: BODY_FONT, fontSize: 34, fontWeight: 600, color: COLORS.text }}>
                {s}
              </span>
            </div>
          );
        })}
      </div>
    </SceneLayout>
  );
};
