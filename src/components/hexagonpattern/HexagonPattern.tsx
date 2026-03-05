"use client";

import { useId } from "react";

/**
 * HexagonPattern — SVG-based honeycomb pattern for backgrounds.
 * Tiles seamlessly. Use as a decorative background layer (e.g. position: absolute; inset: 0).
 */

const SQRT3 = Math.sqrt(3);

type HexagonPatternProps = {
  /** Hexagon "radius" (center to corner). Larger = bigger hexes. Default 20. */
  size?: number;
  /** Stroke or fill color. Default neutral-60. */
  color?: string;
  /** Opacity of the hexagons. Default 0.4. */
  opacity?: number;
  /** "stroke" = outline only, "fill" = filled. Default stroke. */
  variant?: "stroke" | "fill";
  /** Optional class for the wrapper (e.g. for positioning). */
  className?: string;
  /** Optional aria label; use aria-hidden on parent if decorative. */
  "aria-hidden"?: boolean;
};

function hexPoints(cx: number, cy: number, r: number): string {
  const points: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    points.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
  }
  return points.map(([x, y]) => `${x},${y}`).join(" ");
}

export function HexagonPattern({
  size = 20,
  color = "var(--blue-100)",
  opacity = 0.4,
  variant = "stroke",
  className = "",
  "aria-hidden": ariaHidden = true,
}: HexagonPatternProps) {
  const id = useId().replace(/:/g, "");
  const r = size;
  const w = 3 * r;
  const h = SQRT3 * r;
  const cx1 = 1.5 * r;
  const cy1 = (SQRT3 * r) / 2;
  const cx2 = 0;
  const cy2 = 0;

  return (
    <div
      className={className}
      aria-hidden={ariaHidden}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ display: "block" }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={`hexagon-pattern-${id}`}
            x="0"
            y="0"
            width={w}
            height={h}
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points={hexPoints(cx1, cy1, r)}
              fill={variant === "fill" ? color : "none"}
              stroke={variant === "stroke" ? color : "none"}
              strokeWidth={variant === "stroke" ? 1 : 0}
              style={{ opacity }}
            />
            <polygon
              points={hexPoints(cx2, cy2, r)}
              fill={variant === "fill" ? color : "none"}
              stroke={variant === "stroke" ? color : "none"}
              strokeWidth={variant === "stroke" ? 1 : 0}
              style={{ opacity }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#hexagon-pattern-${id})`} />
      </svg>
    </div>
  );
}
