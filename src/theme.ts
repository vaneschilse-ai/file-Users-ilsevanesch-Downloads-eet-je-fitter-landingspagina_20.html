// ---------------------------------------------------------------------------
// Global video specs
// ---------------------------------------------------------------------------
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;
export const SCENE_DURATION = 180; // 6s per scene
export const TRANSITION = 12; // 12-frame fade
// 5 scenes of 180 frames, overlapping by 12 frames on each of the 4 joins.
export const DURATION_IN_FRAMES = SCENE_DURATION * 5 - TRANSITION * 4; // 852

// ---------------------------------------------------------------------------
// Colour system (as specified)
// ---------------------------------------------------------------------------
export const COLORS = {
  bg: "#0a0a0a",
  bgSoft: "#141417",
  text: "#ffffff",
  textDim: "#a1a1aa",
  accent: "#6366f1", // indigo
  accentSoft: "#2a2a4a",
  accentGlow: "rgba(99,102,241,0.35)",
  success: "#22c55e", // green
  successSoft: "#123522",
  successGlow: "rgba(34,197,94,0.35)",
  track: "#26262b",
  cardBorder: "rgba(255,255,255,0.08)",
};

// ---------------------------------------------------------------------------
// Safe zone (px) — nothing important outside this box
// ---------------------------------------------------------------------------
export const SAFE = {
  top: 150,
  bottom: 170,
  side: 60,
};

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------
export const FONT = {
  headline: 800 as const,
  semi: 600 as const,
  body: 400 as const,
};
