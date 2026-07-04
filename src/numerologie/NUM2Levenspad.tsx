import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { enter } from "../helpers";

const Step: React.FC<{ children: React.ReactNode; delay: number; dim?: boolean }> = ({
  children,
  delay,
  dim,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 26}px)`,
        fontFamily: BODY_FONT,
        fontWeight: 600,
        fontSize: 52,
        color: dim ? COLORS.textDim : COLORS.text,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: 1,
      }}
    >
      {children}
    </div>
  );
};

export const NUM2Levenspad: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = enter(frame, fps, 96);

  return (
    <SceneLayout justify="flex-start">
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Stap voor stap</Eyebrow>
      </div>
      <div style={{ marginTop: 26 }}>
        <Headline delay={6} size={80}>
          Jouw levenspad&shy;getal.
        </Headline>
      </div>
      <Body delay={14}>Tel de cijfers van je geboortedatum op — tot je één getal overhoudt.</Body>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 34, marginTop: 60 }}>
        <Step delay={30} dim>
          14 · 03 · 1985
        </Step>
        <Step delay={48}>
          1+4+0+3+1+9+8+5 ={" "}
          <span style={{ color: COLORS.accentDeep, fontFamily: HEADLINE_FONT, fontWeight: 800 }}>31</span>
        </Step>
        <Step delay={68}>
          3 + 1 ={" "}
          <span style={{ color: COLORS.accentDeep, fontFamily: HEADLINE_FONT, fontWeight: 800 }}>4</span>
        </Step>

        {/* glowing result */}
        <div style={{ marginTop: 14, opacity: pop, transform: `scale(${0.6 + pop * 0.4})` }}>
          <svg width={220} height={220} viewBox="0 0 220 220">
            <circle cx={110} cy={110} r={92} fill={COLORS.accentSoft} />
            <circle cx={110} cy={110} r={92} fill="none" stroke={COLORS.accentDeep} strokeWidth={5} />
            <text x={110} y={110} textAnchor="middle" dominantBaseline="central" fill={COLORS.accentDeep} fontFamily={HEADLINE_FONT} fontWeight={800} fontSize={130}>
              4
            </text>
          </svg>
        </div>
        <div style={{ opacity: pop, fontFamily: BODY_FONT, fontWeight: 600, fontSize: 36, color: COLORS.textDim, marginTop: -6 }}>
          = jouw levenspad
        </div>
      </div>
    </SceneLayout>
  );
};
