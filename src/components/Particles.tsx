import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS, WIDTH, HEIGHT } from "../theme";

const RANGE = HEIGHT + 200; // vertical wrap distance

// Deterministic particle set (no Math.random at render time).
const PARTICLES = Array.from({ length: 14 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const rnd = seed / 233280;
  const rnd2 = ((i * 4096 + 150889) % 714025) / 714025;
  return {
    x: 60 + rnd * (WIDTH - 120),
    size: 10 + rnd2 * 26,
    speed: 1.4 + rnd * 2.2,
    // spread starting heights across the whole frame so they never line up
    phase: (i / 14) * RANGE + rnd2 * 120,
    color: i % 3 === 0 ? COLORS.accentDeep : COLORS.accent,
    opacity: 0.18 + rnd2 * 0.28,
    drift: (rnd - 0.5) * 70,
  };
});

/** 14 soft circles drifting upward — used behind the final scene. */
export const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {PARTICLES.map((p, i) => {
        // continuous upward drift with wrap-around, so they stay scattered
        const raw = (p.phase - frame * p.speed) % RANGE;
        const y = (raw + RANGE) % RANGE - 100;
        const x = p.x + Math.sin((frame + i * 30) / 40) * p.drift;
        const fade = interpolate(
          y,
          [-50, 150, HEIGHT - 200, HEIGHT + 50],
          [0, p.opacity, p.opacity, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: p.color,
              opacity: fade,
              filter: "blur(0.5px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
