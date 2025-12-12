import type { FC, CSSProperties } from 'react';

interface CoreClockArmProps {
  angle: number;           // Rotation in degrees
  length?: number;         // Length relative to viewBox (default 100 which is radius if viewBox is 200)
  color?: string;          // Stroke color
  width?: number;          // Stroke width
  pivotX?: number;         // Pivot X (default 100)
  pivotY?: number;         // Pivot Y (default 100)
  viewBoxSize?: number;    // ViewBox square size (default 200)
  className?: string;
  style?: CSSProperties;
}

export const CoreClockArm: FC<CoreClockArmProps> = ({
  angle,
  length = 80,
  color = 'currentColor',
  width = 4,
  pivotX = 100,
  pivotY = 100,
  viewBoxSize = 200,
  className,
  style
}) => {
  // Calculate end point based on angle (assuming 0deg is UP like a clock)
  // Math: 0deg = -90deg in standard trig (which starts at 3 o'clock)
  // But SVG coord system: Y is down.
  // 0deg (12 o'clock) -> (0, -1) direction
  // angle in radians
  const rad = (angle - 90) * (Math.PI / 180);
  
  const x2 = pivotX + length * Math.cos(rad);
  const y2 = pivotY + length * Math.sin(rad);

  return (
    <svg 
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} 
      className={className} 
      style={{ width: '100%', height: '100%', ...style }}
    >
      {/* Optional: border/face matching viewBox? No, keep it pure arm unless requested. */}
      
      {/* The Arm */}
      <line 
        x1={pivotX} 
        y1={pivotY} 
        x2={x2} 
        y2={y2} 
        stroke={color} 
        strokeWidth={width} 
        strokeLinecap="round" 
      />
      
      {/* Pivot Point */}
      <circle cx={pivotX} cy={pivotY} r={width * 1.5} fill={color} />
    </svg>
  );
};
