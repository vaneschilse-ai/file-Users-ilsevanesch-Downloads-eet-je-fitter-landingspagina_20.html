import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";
import { Narration } from "../../components/Narration";
import { Eyebrow, Headline, Body } from "../../components/Typo";
import { COLORS } from "../../theme";
import { HEADLINE_FONT, BODY_FONT } from "../../font";
import { enter, countUp } from "../../helpers";

// A stylised side-profile torso; `belly` controls how far the front bulges.
const Torso: React.FC<{ belly: number; label: string; delay: number; filled: boolean }> = ({
  belly,
  label,
  delay,
  filled,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = enter(frame, fps, delay);
  const LEN = 900;

  // back is straight (x=70); front bulges to (70 + belly) around the belly line
  const front = `M70 20 L118 20 C ${118 + belly} 90, ${118 + belly} 175, 150 225 C 132 275, 120 300, 116 330 L70 330 Z`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <svg width={220} height={360} viewBox="0 0 220 360">
        <path d={front} fill={filled ? COLORS.accentSoft : COLORS.bgWarm} opacity={0.9 * draw} />
        <path
          d={front}
          fill="none"
          stroke={filled ? COLORS.accentDeep : COLORS.textDim}
          strokeWidth={6}
          strokeLinejoin="round"
          strokeDasharray={LEN}
          strokeDashoffset={LEN * (1 - draw)}
        />
      </svg>
      <div
        style={{
          padding: "10px 26px",
          borderRadius: 999,
          background: filled ? COLORS.accentSoft : COLORS.bgWarm,
          border: `1.5px solid ${filled ? COLORS.accent : COLORS.track}`,
          color: filled ? COLORS.accentDeep : COLORS.textDim,
          fontFamily: BODY_FONT,
          fontSize: 34,
          fontWeight: 600,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cm = Math.round(countUp(frame, fps, 3, 62));
  const statP = interpolate(frame, [58, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneLayout justify="flex-start">
      <Narration file="scene1.mp3" />
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Opgeblazen gevoel</Eyebrow>
      </div>
      <div style={{ marginTop: 24 }}>
        <Headline delay={6} size={72}>
          &apos;s Avonds boller dan &apos;s ochtends
        </Headline>
      </div>
      <Body delay={14}>
        Er is niks bijgekomen — geen vet, geen kilo&apos;s. Het is lucht, vocht en
        vertering.
      </Body>

      <div style={{ display: "flex", gap: 70, marginTop: 40, alignItems: "flex-end" }}>
        <Torso belly={22} label="07:00" delay={26} filled={false} />
        <Torso belly={62} label="21:00" delay={38} filled />
      </div>

      <div style={{ display: "flex", gap: 22, marginTop: 30, opacity: statP }}>
        <div
          style={{
            padding: "18px 30px",
            borderRadius: 22,
            background: COLORS.bgSoft,
            border: `1.5px solid ${COLORS.accent}`,
            boxShadow: `0 12px 28px ${COLORS.shadow}`,
            fontFamily: BODY_FONT,
            fontSize: 34,
            fontWeight: 600,
            color: COLORS.text,
          }}
        >
          <span style={{ color: COLORS.accentDeep, fontWeight: 800, fontFamily: HEADLINE_FONT }}>0 kg</span> vet erbij
        </div>
        <div
          style={{
            padding: "18px 30px",
            borderRadius: 22,
            background: COLORS.accentSoft,
            border: `1.5px solid ${COLORS.accent}`,
            fontFamily: BODY_FONT,
            fontSize: 34,
            fontWeight: 600,
            color: COLORS.text,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          wél <span style={{ color: COLORS.accentDeep, fontWeight: 800, fontFamily: HEADLINE_FONT }}>+{cm} cm</span> lucht &amp; vocht
        </div>
      </div>
    </SceneLayout>
  );
};
