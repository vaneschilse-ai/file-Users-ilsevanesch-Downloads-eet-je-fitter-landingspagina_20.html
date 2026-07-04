import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, WIDTH, HEIGHT } from "../theme";
import { HEADLINE_FONT } from "../font";

// Deterministic scatter of soft numbers drifting gently — decorative backdrop.
const NUMS = Array.from({ length: 16 }, (_, i) => {
  const r = (i * 9301 + 49297) % 233280;
  const rnd = r / 233280;
  const r2 = ((i * 4096 + 150889) % 714025) / 714025;
  return {
    char: String((i % 9) + 1),
    x: 40 + rnd * (WIDTH - 140),
    y: 60 + r2 * (HEIGHT - 200),
    size: 60 + rnd * 130,
    opacity: 0.05 + r2 * 0.12,
    drift: 18 + rnd * 30,
    phase: i * 37,
    color: i % 3 === 0 ? COLORS.accentDeep : COLORS.accent,
  };
});

export const FloatingNumbers: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {NUMS.map((n, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: n.x,
            top: n.y + Math.sin((frame + n.phase) / 46) * n.drift,
            fontFamily: HEADLINE_FONT,
            fontWeight: 800,
            fontSize: n.size,
            color: n.color,
            opacity: n.opacity,
          }}
        >
          {n.char}
        </span>
      ))}
    </AbsoluteFill>
  );
};
