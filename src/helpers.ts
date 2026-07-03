import { interpolate, spring } from "remotion";

// A single, consistent spring config used everywhere — heavily damped so
// nothing overshoots or moves linearly.
export const SPRING_CONFIG = { damping: 200 } as const;

/**
 * Standard entrance driver: returns a 0..1 progress value that springs in.
 * Use `delay` to stagger related elements (8-12 frames apart).
 */
export const enter = (
  frame: number,
  fps: number,
  delay = 0
): number =>
  spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
    durationInFrames: 26,
  });

/**
 * Convenience: translate + fade entrance style from a spring progress value.
 */
export const riseIn = (
  frame: number,
  fps: number,
  delay = 0,
  distance = 40
): React.CSSProperties => {
  const p = enter(frame, fps, delay);
  return {
    opacity: p,
    transform: `translateY(${(1 - p) * distance}px)`,
  };
};

/**
 * Count-up: animate a number from `from` to `to` over a spring, driven by frame.
 */
export const countUp = (
  frame: number,
  fps: number,
  to: number,
  delay = 0,
  from = 0
): number => {
  const p = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
    durationInFrames: 40,
  });
  return from + (to - from) * p;
};

/** Linear-in-spring mapped fade helper. */
export const fadeAt = (
  frame: number,
  start: number,
  end: number
): number => interpolate(frame, [start, end], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
