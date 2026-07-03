import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, SAFE } from "../theme";
import { BODY_FONT } from "../font";
import { LogoMark } from "./Logo";

/**
 * Full-frame scene wrapper. Paints the cream background, a soft blush glow,
 * a persistent brand watermark, and enforces the safe zone with padding.
 */
export const SceneLayout: React.FC<{
  children: React.ReactNode;
  justify?: React.CSSProperties["justifyContent"];
  showLogo?: boolean;
}> = ({ children, justify = "center", showLogo = true }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: BODY_FONT,
      }}
    >
      {/* soft blush glow so the cream isn't flat */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 75% at 50% 18%, rgba(228,141,142,0.16) 0%, rgba(250,247,246,0) 60%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(90% 60% at 50% 100%, rgba(228,141,142,0.10) 0%, rgba(250,247,246,0) 55%)",
        }}
      />
      <AbsoluteFill
        style={{
          paddingTop: SAFE.top,
          paddingBottom: SAFE.bottom,
          paddingLeft: SAFE.side,
          paddingRight: SAFE.side,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: justify,
        }}
      >
        {children}
      </AbsoluteFill>

      {/* persistent brand watermark, inside the bottom safe zone */}
      {showLogo ? (
        <div
          style={{
            position: "absolute",
            bottom: SAFE.bottom - 74,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LogoMark scale={0.62} muted />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
