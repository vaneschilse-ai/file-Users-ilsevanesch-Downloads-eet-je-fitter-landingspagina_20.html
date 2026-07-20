import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Narration } from "../components/Narration";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { COLORS } from "../theme";
import { BODY_FONT } from "../font";
import { enter } from "../helpers";

// ---- small node icons -----------------------------------------------------
const Ic: React.FC<{ kind: string; c: string }> = ({ kind, c }) => {
  const common = { fill: "none", stroke: c, strokeWidth: 3.4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <svg width={46} height={46} viewBox="0 0 40 40">
      {kind === "brand" && (
        <>
          <rect x={9} y={9} width={22} height={22} rx={6} {...common} />
          <circle cx={20} cy={20} r={3.6} fill={c} />
        </>
      )}
      {kind === "ad" && (
        <>
          <path d="M9 17 L24 11 L24 29 L9 23 Z" {...common} />
          <path d="M24 14 Q32 16 32 20 Q32 24 24 26" {...common} />
          <path d="M12 23 L14 32" {...common} />
        </>
      )}
      {kind === "shop" && (
        <>
          <path d="M9 18 L11 12 L29 12 L31 18 Z" {...common} />
          <path d="M11 18 L11 31 L29 31 L29 18" {...common} />
          <path d="M17 31 L17 23 L23 23 L23 31" {...common} />
        </>
      )}
      {kind === "person" && (
        <>
          <circle cx={20} cy={14} r={6.5} fill={c} />
          <path d="M8 33 Q20 19 32 33 Z" fill={c} />
        </>
      )}
    </svg>
  );
};

type Node = { ic: string; label: string; hot?: boolean };
type Col = {
  title: string;
  muted: boolean;
  tops: number[];
  nodes: Node[];
  caption: string;
  returnArrow?: boolean;
};

const H = 760;
const CARD_H = 108;
const CX = 220;

const Column: React.FC<{ col: Col; baseDelay: number }> = ({ col, baseDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const line = col.muted ? COLORS.textDim : COLORS.accentDeep;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      {/* column title */}
      <div
        style={{
          padding: "10px 26px",
          borderRadius: 999,
          background: col.muted ? COLORS.bgWarm : COLORS.accentSoft,
          border: `1.5px solid ${col.muted ? COLORS.track : COLORS.accent}`,
          color: col.muted ? COLORS.textDim : COLORS.accentDeep,
          fontFamily: BODY_FONT,
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: 1,
        }}
      >
        {col.title}
      </div>

      <div style={{ position: "relative", width: 440, height: H }}>
        {/* connector layer (self-drawing) */}
        <svg width={440} height={H} viewBox={`0 0 440 ${H}`} style={{ position: "absolute", inset: 0 }}>
          {col.tops.slice(0, -1).map((t, i) => {
            const y1 = t + CARD_H;
            const y2 = col.tops[i + 1];
            const len = y2 - y1;
            const draw = enter(frame, fps, baseDelay + i * 10);
            return (
              <line
                key={i}
                x1={CX}
                y1={y1}
                x2={CX}
                y2={y2}
                stroke={line}
                strokeWidth={5}
                strokeLinecap="round"
                strokeDasharray={len}
                strokeDashoffset={len * (1 - draw)}
                opacity={col.muted ? 0.5 : 0.85}
              />
            );
          })}

          {/* reward returns to "you" */}
          {col.returnArrow &&
            (() => {
              const draw = enter(frame, fps, baseDelay + 34);
              const LEN = 430;
              return (
                <g>
                  <path
                    d="M398 700 C 432 660 432 470 400 420"
                    fill="none"
                    stroke={COLORS.accentDeep}
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeDasharray={LEN}
                    strokeDashoffset={LEN * (1 - draw)}
                  />
                  <polygon
                    points="400,412 388,432 412,432"
                    fill={COLORS.accentDeep}
                    opacity={draw > 0.9 ? 1 : 0}
                  />
                </g>
              );
            })()}
        </svg>

        {/* node cards */}
        {col.nodes.map((n, i) => {
          const p = enter(frame, fps, baseDelay - 6 + i * 10);
          const hot = n.hot;
          const iconColor = col.muted ? COLORS.textDim : COLORS.accentDeep;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: col.tops[i],
                left: CX - 180,
                width: 360,
                height: CARD_H,
                borderRadius: 24,
                background: hot ? COLORS.accentSoft : COLORS.bgSoft,
                border: `${hot ? 2 : 1.5}px solid ${
                  hot ? COLORS.accentDeep : col.muted ? COLORS.cardBorder : COLORS.accent
                }`,
                boxShadow: `0 12px 28px ${COLORS.shadow}`,
                display: "flex",
                alignItems: "center",
                gap: 18,
                paddingLeft: 26,
                opacity: p,
                transform: `translateY(${(1 - p) * 24}px) scale(${0.94 + p * 0.06})`,
              }}
            >
              <div
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 18,
                  background: col.muted ? COLORS.bgWarm : COLORS.accentSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Ic kind={n.ic} c={iconColor} />
              </div>
              <span
                style={{
                  fontFamily: BODY_FONT,
                  fontSize: 36,
                  fontWeight: 600,
                  color: col.muted ? COLORS.textDim : COLORS.text,
                }}
              >
                {n.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* caption */}
      <div
        style={{
          fontFamily: BODY_FONT,
          fontSize: 30,
          fontWeight: 600,
          color: col.muted ? COLORS.textDim : COLORS.accentDeep,
          textAlign: "center",
          maxWidth: 400,
          lineHeight: 1.25,
        }}
      >
        {col.caption}
      </div>
    </div>
  );
};

const LEFT: Col = {
  title: "Traditioneel",
  muted: true,
  tops: [10, 226, 442, 652],
  nodes: [
    { ic: "brand", label: "Merk" },
    { ic: "ad", label: "Dure reclame" },
    { ic: "shop", label: "Winkel" },
    { ic: "person", label: "Klant" },
  ],
  caption: "de marge lekt weg",
};

const RIGHT: Col = {
  title: "Netwerk",
  muted: false,
  tops: [10, 326, 652],
  nodes: [
    { ic: "brand", label: "Merk" },
    { ic: "person", label: "Jij deelt", hot: true },
    { ic: "person", label: "Klant" },
  ],
  caption: "de marge komt bij jóu terug",
  returnArrow: true,
};

export const Scene2Difference: React.FC = () => {
  return (
    <SceneLayout justify="flex-start">
      <Narration file="scene2.mp3" />
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Het verschil</Eyebrow>
      </div>
      <div style={{ marginTop: 24 }}>
        <Headline delay={6} size={74}>
          Waar gaat het geld heen?
        </Headline>
      </div>
      <Body delay={14}>
        De winkel betaalt dure reclame en tussenhandel. In een netwerk gaat die
        marge naar wie het product aanbeveelt.
      </Body>

      <div style={{ display: "flex", gap: 40, marginTop: 40 }}>
        <Column col={LEFT} baseDelay={30} />
        <Column col={RIGHT} baseDelay={40} />
      </div>
    </SceneLayout>
  );
};
