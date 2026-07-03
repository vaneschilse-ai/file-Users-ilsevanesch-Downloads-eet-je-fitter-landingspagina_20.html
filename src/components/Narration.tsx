import React from "react";
import { Audio, staticFile } from "remotion";

/**
 * Voice-over slot. The video plays fine silently; drop in the audio to enable.
 *
 * To add the Nederlandse voice-over:
 *   1. Put 5 clips in  public/vo/  named  scene1.mp3 … scene5.mp3
 *      (one line per scene — see VOICEOVER.md for the exact script + timing).
 *   2. Flip VO_ENABLED to true below.
 *   3. If a clip runs longer/shorter than its scene, tweak SCENE_DURATION
 *      in theme.ts (or per-scene frames) so the picture matches the voice.
 */
export const VO_ENABLED = false;

export const Narration: React.FC<{ file: string; volume?: number }> = ({
  file,
  volume = 1,
}) => {
  if (!VO_ENABLED) return null;
  return <Audio src={staticFile(`vo/${file}`)} volume={volume} />;
};
