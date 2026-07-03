import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { HEADLINE_FONT, BODY_FONT } from "../font";
import { enter, riseIn } from "../helpers";

/** Small pill label above the headline (DM Sans, blush). */
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
        padding: "12px 26px",
        borderRadius: 999,
        background: COLORS.accentSoft,
        border: `1.5px solid ${COLORS.accent}`,
        color: COLORS.accentDeep,
        fontFamily: BODY_FONT,
        fontSize: 30,
        fontWeight: 600,
        letterSpacing: 2,
        textTransform: "uppercase",
        transform: `translateY(${(1 - p) * 24}px)`,
      }}
    >
      {children}
    </div>
  );
};

/** Big scene headline — Playfair Display (56px+). */
export const Headline: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
}> = ({ children, delay = 6, size = 82 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <h1
      style={{
        ...riseIn(frame, fps, delay, 44),
        margin: 0,
        color: COLORS.text,
        fontFamily: HEADLINE_FONT,
        fontSize: size,
        lineHeight: 1.06,
        fontWeight: 800,
        textAlign: "center",
        letterSpacing: -0.5,
        maxWidth: 920,
      }}
    >
      {children}
    </h1>
  );
};

/** Supporting sentence — DM Sans (36px+). */
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
        fontFamily: BODY_FONT,
        fontSize: 40,
        lineHeight: 1.36,
        fontWeight: 400,
        textAlign: "center",
        maxWidth: 840,
      }}
    >
      {children}
    </p>
  );
};

/** Accent-coloured emphasis span. */
export const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: COLORS.accentDeep, fontWeight: 600 }}>{children}</span>
);
