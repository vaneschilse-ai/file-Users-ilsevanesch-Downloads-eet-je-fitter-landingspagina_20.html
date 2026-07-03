import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Narration } from "../components/Narration";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { enter } from "../helpers";

// Energy dipping through the day — self-drawing curve.
const EnergyCurve: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = enter(frame, fps, 20);
  // high in the morning, crashes by afternoon, low in the evening
  const path = "M60 110 C 150 90, 200 250, 320 250 C 430 250, 470 150, 560 175 C 620 195, 650 260, 680 285";
  const LEN = 820;

  return (
    <svg width={720} height={330} viewBox="0 0 720 330">
      <line x1={60} y1={40} x2={60} y2={290} stroke={COLORS.track} strokeWidth={3} />
      <line x1={60} y1={290} x2={690} y2={290} stroke={COLORS.track} strokeWidth={3} />
      <path d={`${path} L680 290 L60 290 Z`} fill={COLORS.accentGlow} opacity={draw * 0.4} />
      <path
        d={path}
        fill="none"
        stroke={COLORS.accentDeep}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={LEN}
        strokeDashoffset={LEN * (1 - draw)}
      />
      <text x={72} y={72} fill={COLORS.textDim} fontFamily={BODY_FONT} fontSize={28} fontWeight={600}>
        Energie
      </text>
      {[
        { x: 76, label: "ochtend" },
        { x: 300, label: "middag" },
        { x: 560, label: "avond" },
      ].map((t) => (
        <text key={t.label} x={t.x} y={320} fill={COLORS.textDim} fontFamily={BODY_FONT} fontSize={26} fontWeight={500}>
          {t.label}
        </text>
      ))}
    </svg>
  );
};

const chips = ["Energiedip", "Trek in zoet", "Futloos"];

export const Scene3Deficit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneLayout justify="flex-start">
      <Narration file="scene3.mp3" />
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Herkenbaar?</Eyebrow>
      </div>
      <div style={{ marginTop: 26 }}>
        <Headline delay={6} size={80}>
          Daarom heb je cravings.
        </Headline>
      </div>
      <Body delay={14}>Te weinig eiwit geeft een dip in je energie, trek in zoet en een humeur dat schommelt.</Body>

      <div style={{ marginTop: 34 }}>
        <EnergyCurve />
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
        {chips.map((c, i) => {
          const p = enter(frame, fps, 70 + i * 10);
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
