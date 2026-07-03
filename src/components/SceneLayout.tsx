import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, SAFE } from "../theme";
import { fontFamily } from "../font";

/**
 * Full-frame scene wrapper. Paints the background and enforces the safe zone
 * with padding so no important content can touch the edges.
 */
export const SceneLayout: React.FC<{
  children: React.ReactNode;
  justify?: React.CSSProperties["justifyContent"];
}> = ({ children, justify = "center" }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
      }}
    >
      {/* subtle radial glow so the black isn't flat */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 80% at 50% 22%, rgba(99,102,241,0.10) 0%, rgba(10,10,10,0) 60%)",
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
    </AbsoluteFill>
  );
};
