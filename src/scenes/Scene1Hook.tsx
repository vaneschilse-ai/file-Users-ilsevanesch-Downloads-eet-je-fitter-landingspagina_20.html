import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow, Headline } from "../components/Typo";
import { COLORS, FONT } from "../theme";
import { enter, countUp } from "../helpers";

// Donut showing a plate: mostly carbs, tiny protein sliver.
const Plate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const R = 150;
  const C = 2 * Math.PI * R;
  const draw = enter(frame, fps, 18);
  // Protein is only ~15% of the plate.
  const proteinFrac = 0.15;

  return (
    <svg width={420} height={420} viewBox="0 0 420 420">
      {/* carbs ring (background of donut) */}
      <circle
        cx={210}
        cy={210}
        r={R}
        fill="none"
        stroke={COLORS.accentSoft}
        strokeWidth={54}
      />
      {/* carbs arc */}
      <circle
        cx={210}
        cy={210}
        r={R}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={54}
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C * (1 - (1 - proteinFrac) * draw)}
        transform="rotate(-90 210 210)"
      />
      {/* protein sliver */}
      <circle
        cx={210}
        cy={210}
        r={R}
        fill="none"
        stroke={COLORS.success}
        strokeWidth={54}
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C * (1 - proteinFrac * draw)}
        transform={`rotate(${-90 + (1 - proteinFrac) * 360} 210 210)`}
      />
      <text
        x={210}
        y={196}
        textAnchor="middle"
        fill={COLORS.text}
        fontSize={40}
        fontWeight={FONT.headline}
      >
        Je bord
      </text>
      <text
        x={210}
        y={244}
        textAnchor="middle"
        fill={COLORS.success}
        fontSize={30}
        fontWeight={FONT.semi}
      >
        15% eiwit
      </text>
    </svg>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "JIJ vs NODIG" bars
  const jij = enter(frame, fps, 40);
  const nodig = enter(frame, fps, 52);
  const pct = Math.round(countUp(frame, fps, 55, 60)); // reach 55%

  return (
    <SceneLayout justify="flex-start">
      <div style={{ marginTop: 8 }}>
        <Eyebrow delay={0}>Eiwit-check</Eyebrow>
      </div>
      <div style={{ marginTop: 30 }}>
        <Headline delay={6} size={78}>
          Je eet te weinig eiwit.
        </Headline>
      </div>

      <div style={{ marginTop: 30 }}>
        <Plate />
      </div>

      {/* JIJ vs NODIG comparison */}
      <div style={{ width: 780, marginTop: 20 }}>
        {[
          { label: "JIJ", value: jij * 0.55, color: COLORS.accent, tag: "" },
          { label: "NODIG", value: nodig * 1.0, color: COLORS.success, tag: "" },
        ].map((row) => (
          <div
            key={row.label}
            style={{ display: "flex", alignItems: "center", marginBottom: 22 }}
          >
            <div
              style={{
                width: 150,
                color: COLORS.text,
                fontSize: 34,
                fontWeight: FONT.semi,
              }}
            >
              {row.label}
            </div>
            <div
              style={{
                flex: 1,
                height: 46,
                borderRadius: 12,
                background: COLORS.track,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${row.value * 100}%`,
                  height: "100%",
                  borderRadius: 12,
                  background: row.color,
                }}
              />
            </div>
          </div>
        ))}
        <div
          style={{
            textAlign: "center",
            marginTop: 6,
            color: COLORS.textDim,
            fontSize: 36,
            fontWeight: FONT.semi,
            opacity: interpolate(frame, [58, 74], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontVariantNumeric: "tabular-nums",
          }}
        >
          Gemiddeld haal je maar{" "}
          <span style={{ color: COLORS.accent, fontWeight: FONT.headline }}>
            {pct}%
          </span>{" "}
          van wat je nodig hebt
        </div>
      </div>
    </SceneLayout>
  );
};
