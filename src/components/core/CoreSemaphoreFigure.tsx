
import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface CoreSemaphoreFigureProps {
  leftAngle: number;
  rightAngle: number;
  size?: number;
  className?: string;
}

export const CoreSemaphoreFigure: React.FC<CoreSemaphoreFigureProps> = ({
  leftAngle,
  rightAngle,
  size = 200,
  className
}) => {
  // Center of the arms
  const cx = 100;
  const cy = 70;
  const armLength = 60;
  
  // Helper to get coordinates from angle (0 is Up/12:00)
  // SVG coords: 0 deg = -Y axis.
  // Math.cos/sin use radians. 0 rad = +X axis.
  // We convert degrees to radians, subtract 90 (or rotate logic) to align 0 with North.
  const getHandCoords = (angleDeg: number) => {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: cx + armLength * Math.cos(rad),
      y: cy + armLength * Math.sin(rad)
    };
  };

  const leftHand = getHandCoords(leftAngle);
  const rightHand = getHandCoords(rightAngle);

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      className={clsx('semaphore-figure', className)}
    >
      {/* Head */}
      <circle cx="100" cy="40" r="15" fill="currentColor" opacity={0.8} />
      
      {/* Body */}
      <line x1="100" y1="55" x2="100" y2="120" stroke="currentColor" strokeWidth="4" />
      
      {/* Legs (Static) */}
      <line x1="100" y1="120" x2="80" y2="180" stroke="currentColor" strokeWidth="4" />
      <line x1="100" y1="120" x2="120" y2="180" stroke="currentColor" strokeWidth="4" />

      {/* Arms (Animated) */}
      {/* Left Arm (User's Left side of screen, Figure's Right arm?) 
          Standard semaphore convention: "Right arm" usually means the signaler's right arm.
          If we view the signaler from front, their Right Arm is on our Left. 
          The 'leftAngle' prop should correspond to the arm on the LEFT of the SCREEN (Signaler's Right).
          Let's map props directly to screen side to avoid confusion.
          leftAngle -> Arm on left side of screen.
          rightAngle -> Arm on right side of screen.
      */}
      <motion.line 
        x1={cx} y1={cy} 
        x2={leftHand.x} y2={leftHand.y} 
        stroke="currentColor" 
        strokeWidth="4"
        animate={{ x2: leftHand.x, y2: leftHand.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      
      <motion.line 
        x1={cx} y1={cy} 
        x2={rightHand.x} y2={rightHand.y} 
        stroke="currentColor" 
        strokeWidth="4"
        animate={{ x2: rightHand.x, y2: rightHand.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Flags (Optional squares at ends of hands) */}
      {/* Red/Yellow flags are standard but we'll stick to mono schematic for now */}
      <motion.rect
        x={0} y={0} width="16" height="16"
        fill="#ff4444" 
        // Logic to position flag at end of arm, rotating with arm? 
        // Too complex for simple SVG lines. Just circles at hands for now.
        opacity={0} // Hidden for schematic style
      />
      
      <motion.circle cx={leftHand.x} cy={leftHand.y} r="5" fill="currentColor" />
      <motion.circle cx={rightHand.x} cy={rightHand.y} r="5" fill="currentColor" />
    </svg>
  );
};
