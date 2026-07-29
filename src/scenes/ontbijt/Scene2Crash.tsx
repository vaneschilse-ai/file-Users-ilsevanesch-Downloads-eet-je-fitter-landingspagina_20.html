import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";
import { Narration } from "../../components/Narration";
import { Eyebrow, Headline, Body } from "../../components/Typo";
import { COLORS } from "../../theme";
import { BODY_FONT } from "../../font";
import { enter } from "../../helpers";

const SugarCurve: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drawSpike = enter(frame, fps, 20);
  const drawFlat = enter(frame, fps, 40);

  const spike =
    "M60 235 C 130 235, 170 92, 245 86 C 330 80, 360 300, 452 300 C 545 300, 605 288, 690 288";
  const flat = "M60 236 C 220 214, 340 200, 690 190";
  const SPIKE_LEN = 940;
  const FLAT_LEN = 700;

  return (
    <svg width={720} height={340} viewBox="0 0 720 340">
      <line x1={60} y1={40} x2={60} y2={300} stroke={COLORS.track} strokeWidth={3} />
      <line x1={60} y1={300} x2={694} y2={300} stroke={COLORS.track} strokeWidth={3} />

      {/* stable line — with protein */}
      <path
        d={flat}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={FLAT_LEN}
        strokeDashoffset={FLAT_LEN * (1 - drawFlat)}
      />
      {/* spike & crash — fast carbs */}
      <path
        d={spike}
        fill="none"
        stroke={COLORS.accentDeep}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={SPIKE_LEN}
        strokeDashoffset={SPIKE_LEN * (1 - drawSpike)}
      />

      <text x={70} y={66} fill={COLORS.textDim} fontFamily={BODY_FONT} fontSize={28} fontWeight={600}>
        Bloedsuiker
      </text>
      <text x={64} y={330} fill={COLORS.textDim} fontFamily={BODY_FONT} fontSize={26} fontWeight={500}>
        ontbijt
      </text>
      <text x={520} y={330} fill={COLORS.textDim} fontFamily={BODY_FONT} fontSize={26} fontWeight={500}>
        2 uur later
      </text>
    </svg>
  );
};

const Legend: React.FC<{ color: string; label: string; delay: number }> = ({ color, label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: p, transform: `translateY(${(1 - p) * 18}px)` }}>
      <div style={{ width: 34, height: 8, borderRadius: 4, background: color }} />
      <span style={{ fontFamily: BODY_FONT, fontSize: 30, fontWeight: 600, color: COLORS.text }}>{label}</span>
    </div>
  );
};

const chips = ["Energiedip", "Trek in zoet", "Concentratie weg"];

export const Scene2Crash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneLayout justify="flex-start">
      <Narration file="scene2.mp3" />
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Wat er gebeurt</Eyebrow>
      </div>
      <div style={{ marginTop: 24 }}>
        <Headline delay={6} size={78}>
          Piek… en dan de dip
        </Headline>
      </div>
      <Body delay={14}>
        Een ontbijt vol snelle koolhydraten jaagt je bloedsuiker omhoog — en laat
        &apos;m net zo hard weer vallen.
      </Body>

      <div style={{ marginTop: 34 }}>
        <SugarCurve />
      </div>

      <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
        <Legend color={COLORS.accentDeep} label="Snelle koolhydraten" delay={58} />
        <Legend color={COLORS.accent} label="Mét eiwit" delay={66} />
      </div>

      <div style={{ display: "flex", gap: 18, marginTop: 34 }}>
        {chips.map((c, i) => {
          const p = enter(frame, fps, 76 + i * 10);
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
