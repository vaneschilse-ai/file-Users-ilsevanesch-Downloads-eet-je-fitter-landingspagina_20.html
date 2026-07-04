import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { enter, countUp } from "../helpers";

const L1 = [200, 410, 620];
const L2: number[] = [110, 200, 290, 320, 410, 500, 530, 620, 710];

const TreeNode: React.FC<{ x: number; y: number; r: number; delay: number; bright?: boolean }> = ({ x, y, r, delay, bright }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay);
  return (
    <circle
      cx={x}
      cy={y}
      r={r * p}
      fill={bright ? COLORS.accentDeep : COLORS.accent}
      stroke={COLORS.bg}
      strokeWidth={4}
    />
  );
};

const Tree: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = enter(frame, fps, 26);
  const line = (x1: number, y1: number, x2: number, y2: number, key: string) => {
    const len = Math.hypot(x2 - x1, y2 - y1);
    return <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS.accent} strokeWidth={4} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - draw)} opacity={0.7} />;
  };
  return (
    <svg width={770} height={400} viewBox="0 0 770 400">
      {/* lines L0 -> L1 */}
      {L1.map((x, i) => line(385, 60, x, 200, `a${i}`))}
      {/* lines L1 -> L2 (3 each) */}
      {L1.map((px, i) =>
        L2.slice(i * 3, i * 3 + 3).map((cx, j) => line(px, 200, cx, 330, `b${i}-${j}`))
      )}
      {/* nodes */}
      <TreeNode x={385} y={60} r={30} delay={16} bright />
      {L1.map((x, i) => (
        <TreeNode key={`n1${i}`} x={x} y={200} r={22} delay={40 + i * 8} />
      ))}
      {L2.map((x, i) => (
        <TreeNode key={`n2${i}`} x={x} y={330} r={16} delay={70 + i * 5} />
      ))}
    </svg>
  );
};

export const NM3Team: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round(countUp(frame, fps, 13, 96));
  const statP = enter(frame, fps, 96);

  return (
    <SceneLayout justify="flex-start">
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Samen groeien</Eyebrow>
      </div>
      <div style={{ marginTop: 26 }}>
        <Headline delay={6} size={78}>
          Jij helpt anderen starten.
        </Headline>
      </div>
      <Body delay={14}>Over de omzet van je team verdien jij een percentage mee.</Body>

      <div style={{ marginTop: 30 }}>
        <Tree />
      </div>

      <div
        style={{
          marginTop: 10,
          opacity: statP,
          transform: `translateY(${(1 - statP) * 20}px)`,
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          color: COLORS.text,
          fontFamily: BODY_FONT,
          fontSize: 40,
          fontWeight: 500,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span style={{ fontFamily: HEADLINE_FONT, fontWeight: 800, fontSize: 72, color: COLORS.accentDeep }}>{count}</span>
        <span>mensen in je team — samen sterk</span>
      </div>
    </SceneLayout>
  );
};
