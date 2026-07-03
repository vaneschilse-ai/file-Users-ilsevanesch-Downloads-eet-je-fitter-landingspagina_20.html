import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow, Headline } from "../components/Typo";
import { COLORS, FONT } from "../theme";
import { enter, countUp } from "../helpers";

// Descending line chart that draws itself (stroke-dashoffset).
const MuscleChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = enter(frame, fps, 20);
  const path = "M60 80 L180 130 L300 165 L420 210 L540 250 L660 300";
  const LEN = 720; // generous over-estimate for the polyline length

  // dot rides the end of the drawn line
  const pts = [
    [60, 80],
    [180, 130],
    [300, 165],
    [420, 210],
    [540, 250],
    [660, 300],
  ];
  const idx = Math.min(pts.length - 1, Math.floor(draw * (pts.length - 1)));
  const nextIdx = Math.min(pts.length - 1, idx + 1);
  const seg = draw * (pts.length - 1) - idx;
  const dotX = pts[idx][0] + (pts[nextIdx][0] - pts[idx][0]) * seg;
  const dotY = pts[idx][1] + (pts[nextIdx][1] - pts[idx][1]) * seg;

  return (
    <svg width={720} height={360} viewBox="0 0 720 360">
      {/* axes */}
      <line x1={60} y1={40} x2={60} y2={320} stroke={COLORS.track} strokeWidth={3} />
      <line x1={60} y1={320} x2={680} y2={320} stroke={COLORS.track} strokeWidth={3} />
      {/* area under curve */}
      <path
        d={`${path} L660 320 L60 320 Z`}
        fill={COLORS.accentGlow}
        opacity={draw * 0.5}
      />
      {/* the line */}
      <path
        d={path}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={LEN}
        strokeDashoffset={LEN * (1 - draw)}
      />
      {draw > 0.02 && (
        <circle cx={dotX} cy={dotY} r={12} fill={COLORS.text} stroke={COLORS.accent} strokeWidth={5} />
      )}
      <text x={80} y={70} fill={COLORS.textDim} fontSize={28} fontWeight={FONT.semi}>
        Spiermassa
      </text>
      <text x={560} y={352} fill={COLORS.textDim} fontSize={28} fontWeight={FONT.semi}>
        leeftijd →
      </text>
    </svg>
  );
};

export const Scene3Deficit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loss = countUp(frame, fps, 1, 60).toFixed(0);
  const hunger = enter(frame, fps, 90);

  return (
    <SceneLayout justify="flex-start">
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Het gevolg</Eyebrow>
      </div>
      <div style={{ marginTop: 26 }}>
        <Headline delay={6} size={68}>
          Te weinig eiwit = spierverlies.
        </Headline>
      </div>

      <div style={{ marginTop: 30 }}>
        <MuscleChart />
      </div>

      <div
        style={{
          marginTop: 6,
          color: COLORS.text,
          fontSize: 40,
          fontWeight: FONT.semi,
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
          opacity: interpolate(frame, [58, 72], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Na je 35e:{" "}
        <span style={{ color: COLORS.accent, fontWeight: FONT.headline }}>
          −{loss}% spiermassa
        </span>{" "}
        per jaar
      </div>

      {/* hunger meter */}
      <div style={{ width: 780, marginTop: 40, opacity: hunger }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: COLORS.textDim,
            fontSize: 32,
            fontWeight: FONT.semi,
            marginBottom: 12,
          }}
        >
          <span>Honger &amp; cravings</span>
          <span style={{ color: COLORS.accent }}>hoog ↑</span>
        </div>
        <div style={{ height: 40, borderRadius: 12, background: COLORS.track, overflow: "hidden" }}>
          <div
            style={{
              width: `${88 * hunger}%`,
              height: "100%",
              borderRadius: 12,
              background: `linear-gradient(90deg, ${COLORS.accentSoft}, ${COLORS.accent})`,
            }}
          />
        </div>
      </div>
    </SceneLayout>
  );
};
