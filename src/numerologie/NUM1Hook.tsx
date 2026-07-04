import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { Eyebrow, Headline, Body } from "../components/Typo";
import { FloatingNumbers } from "./FloatingNumbers";
import { COLORS } from "../theme";
import { HEADLINE_FONT } from "../font";
import { enter } from "../helpers";

export const NUM1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ring = enter(frame, fps, 26);

  return (
    <SceneLayout justify="center">
      <AbsoluteFill>
        <FloatingNumbers />
      </AbsoluteFill>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -40 }}>
        <Eyebrow delay={0}>Zielsmissie</Eyebrow>

        {/* glowing core circle with a 7 */}
        <div style={{ marginTop: 40, marginBottom: 30, transform: `scale(${0.7 + ring * 0.3})`, opacity: ring }}>
          <svg width={260} height={260} viewBox="0 0 260 260">
            <circle cx={130} cy={130} r={110} fill={COLORS.accentSoft} />
            <circle cx={130} cy={130} r={110} fill="none" stroke={COLORS.accent} strokeWidth={4} />
            <text x={130} y={130} textAnchor="middle" dominantBaseline="central" fill={COLORS.accentDeep} fontFamily={HEADLINE_FONT} fontWeight={800} fontSize={150}>
              7
            </text>
          </svg>
        </div>

        <Headline delay={6} size={92}>
          Wat is numerologie?
        </Headline>
        <Body delay={16}>De taal van getallen — je geboortedatum vertelt wie je bent en welk pad bij je past.</Body>
      </div>
    </SceneLayout>
  );
};
