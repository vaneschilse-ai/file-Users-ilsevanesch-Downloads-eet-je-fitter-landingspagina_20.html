import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { enter } from "../helpers";

const Node: React.FC<{
  label: string;
  variant?: "plain" | "bright" | "dead";
  delay: number;
  sub?: string;
}> = ({ label, variant = "plain", delay, sub }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay);
  const bright = variant === "bright";
  const dead = variant === "dead";
  return (
    <div style={{ position: "relative", opacity: p, transform: `scale(${0.8 + p * 0.2})` }}>
      <div
        style={{
          minWidth: 180,
          padding: "22px 14px",
          borderRadius: 22,
          textAlign: "center",
          background: bright ? COLORS.accent : COLORS.bgSoft,
          border: `2px solid ${bright ? COLORS.accent : dead ? COLORS.track : COLORS.accent}`,
          color: bright ? COLORS.bgSoft : dead ? COLORS.textDim : COLORS.text,
          fontFamily: BODY_FONT,
          fontSize: 38,
          fontWeight: 600,
          boxShadow: dead ? "none" : `0 12px 26px ${COLORS.shadow}`,
          opacity: dead ? 0.7 : 1,
        }}
      >
        {label}
      </div>
      {dead ? (
        <svg width={200} height={100} viewBox="0 0 200 100" style={{ position: "absolute", top: -3, left: "50%", transform: "translateX(-50%)" }}>
          <line x1={16} y1={84} x2={184} y2={16} stroke={COLORS.accentDeep} strokeWidth={6} strokeLinecap="round" strokeDasharray={230} strokeDashoffset={230 * (1 - enter(frame, fps, delay + 6))} />
        </svg>
      ) : null}
      {sub ? (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: 12, textAlign: "center", color: COLORS.accentDeep, fontFamily: BODY_FONT, fontWeight: 600, fontSize: 30 }}>
          {sub}
        </div>
      ) : null}
    </div>
  );
};

const Arrow: React.FC<{ delay: number; dim?: boolean }> = ({ delay, dim }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const d = enter(frame, fps, delay);
  const col = dim ? COLORS.track : COLORS.accentDeep;
  return (
    <svg width={90} height={40} viewBox="0 0 90 40">
      <line x1={6} y1={20} x2={70} y2={20} stroke={col} strokeWidth={6} strokeLinecap="round" strokeDasharray={64} strokeDashoffset={64 * (1 - d)} />
      <path d="M62 8 L80 20 L62 32" fill="none" stroke={col} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" opacity={d > 0.8 ? 1 : 0} />
    </svg>
  );
};

export const NM2Flow: React.FC = () => {
  return (
    <SceneLayout justify="flex-start">
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>De basis</Eyebrow>
      </div>
      <div style={{ marginTop: 26 }}>
        <Headline delay={6} size={78}>
          Van merk, direct naar jou.
        </Headline>
      </div>
      <Body delay={14}>Geen dure winkel of tussenhandel ertussen. Jij verdient de marge.</Body>

      {/* old way */}
      <div style={{ marginTop: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ fontFamily: BODY_FONT, fontWeight: 600, fontSize: 30, color: COLORS.textDim, letterSpacing: 2 }}>
          VROEGER
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Node label="Merk" delay={30} />
          <Arrow delay={38} dim />
          <Node label="Winkel" variant="dead" delay={42} />
          <Arrow delay={50} dim />
          <Node label="Klant" delay={54} />
        </div>
      </div>

      {/* direct way */}
      <div style={{ marginTop: 70, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ fontFamily: BODY_FONT, fontWeight: 600, fontSize: 30, color: COLORS.accentDeep, letterSpacing: 2 }}>
          NU
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Node label="Merk" delay={64} />
          <Arrow delay={72} />
          <Node label="JIJ" variant="bright" delay={76} sub="jouw marge" />
          <Arrow delay={86} />
          <Node label="Klant" delay={90} />
        </div>
      </div>
    </SceneLayout>
  );
};
