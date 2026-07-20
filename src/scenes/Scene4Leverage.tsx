import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Narration } from "../components/Narration";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS } from "../theme";
import { BODY_FONT, HEADLINE_FONT } from "../font";
import { enter, countUp } from "../helpers";

const PersonDot: React.FC<{ show: number }> = ({ show }) => (
  <div
    style={{
      width: 84,
      height: 84,
      borderRadius: 22,
      background: COLORS.accentSoft,
      border: `2px solid ${COLORS.accent}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: show,
      transform: `scale(${0.7 + show * 0.3})`,
    }}
  >
    <svg width={44} height={44} viewBox="0 0 40 40">
      <circle cx={20} cy={14} r={6.5} fill={COLORS.accentDeep} />
      <path d="M8 33 Q20 19 32 33 Z" fill={COLORS.accentDeep} />
    </svg>
  </div>
);

const StatPill: React.FC<{ value: number; suffix: string; label: string; delay: number }> = ({
  value,
  suffix,
  label,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay);
  const n = Math.round(countUp(frame, fps, value, delay));
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 28}px)`,
        width: 430,
        padding: "26px 20px",
        borderRadius: 28,
        background: COLORS.bgSoft,
        border: `1.5px solid ${COLORS.accent}`,
        boxShadow: `0 16px 36px ${COLORS.shadow}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <div
        style={{
          fontFamily: HEADLINE_FONT,
          fontWeight: 800,
          fontSize: 96,
          color: COLORS.accentDeep,
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {n}
        {suffix}
      </div>
      <div style={{ fontFamily: BODY_FONT, fontSize: 32, fontWeight: 500, color: COLORS.textDim, textAlign: "center" }}>
        {label}
      </div>
    </div>
  );
};

export const Scene4Leverage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // dots fill in one by one; the counter reflects how many are actually shown
  const dotShow = Array.from({ length: 12 }, (_, i) => enter(frame, fps, 24 + i * 6));
  const shown = dotShow.filter((v) => v > 0.5).length;

  return (
    <SceneLayout justify="flex-start">
      <Narration file="scene4.mp3" />
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Hefboom</Eyebrow>
      </div>
      <div style={{ marginTop: 24 }}>
        <Headline delay={6} size={78}>
          Klein %, groot bereik
        </Headline>
      </div>
      <Body delay={14}>
        Je verdient aan je eigen verkoop én een klein deel over je team. Niet
        harder werken — met meer mensen samen.
      </Body>

      {/* duplication panel */}
      <div
        style={{
          marginTop: 40,
          width: 940,
          padding: "34px 40px",
          borderRadius: 34,
          background: COLORS.bgSoft,
          border: `1px solid ${COLORS.cardBorder}`,
          boxShadow: `0 22px 50px ${COLORS.shadow}`,
          display: "flex",
          alignItems: "center",
          gap: 34,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
          <div style={{ fontFamily: BODY_FONT, fontSize: 34, fontWeight: 600, color: COLORS.textDim }}>
            1
          </div>
          <div
            style={{
              fontFamily: HEADLINE_FONT,
              fontWeight: 800,
              fontSize: 132,
              color: COLORS.accentDeep,
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {shown}
          </div>
          <div style={{ fontFamily: BODY_FONT, fontSize: 30, fontWeight: 500, color: COLORS.textDim, textAlign: "center" }}>
            klanten in
            <br />
            je netwerk
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {dotShow.map((s, i) => (
            <PersonDot key={i} show={s} />
          ))}
        </div>
      </div>

      {/* percentage stats */}
      <div style={{ display: "flex", gap: 30, marginTop: 30 }}>
        <StatPill value={68} suffix="%" label="bestelt opnieuw" delay={72} />
        <StatPill value={5} suffix="%" label="over je teamverkoop" delay={84} />
      </div>

      <div style={{ marginTop: 18, fontFamily: BODY_FONT, fontSize: 28, fontWeight: 400, color: COLORS.textDim }}>
        *voorbeeldcijfers ter illustratie
      </div>
    </SceneLayout>
  );
};
