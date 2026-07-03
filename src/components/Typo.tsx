import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";
import { enter, riseIn } from "../helpers";

/** Small pill label above the headline. */
export const Eyebrow: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay);
  return (
    <div
      style={{
        ...riseIn(frame, fps, delay, 24),
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 24px",
        borderRadius: 999,
        border: `1px solid ${COLORS.accent}`,
        background: COLORS.accentSoft,
        color: COLORS.text,
        fontSize: 30,
        fontWeight: FONT.semi,
        letterSpacing: 1,
        textTransform: "uppercase",
        transform: `translateY(${(1 - p) * 24}px)`,
      }}
    >
      {children}
    </div>
  );
};

/** Big scene headline (56px+). */
export const Headline: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  accentWord?: string;
}> = ({ children, delay = 6, size = 76 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <h1
      style={{
        ...riseIn(frame, fps, delay, 44),
        margin: 0,
        color: COLORS.text,
        fontSize: size,
        lineHeight: 1.08,
        fontWeight: FONT.headline,
        textAlign: "center",
        letterSpacing: -1,
        maxWidth: 900,
      }}
    >
      {children}
    </h1>
  );
};

/** Supporting sentence (36px+). */
export const Body: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 14,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <p
      style={{
        ...riseIn(frame, fps, delay, 32),
        margin: 0,
        marginTop: 26,
        color: COLORS.textDim,
        fontSize: 40,
        lineHeight: 1.35,
        fontWeight: FONT.body,
        textAlign: "center",
        maxWidth: 820,
      }}
    >
      {children}
    </p>
  );
};
