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
  className,
}) => {
  const cx = 100;
  const cy = 70;
  const armLength = 60;

  const getHandCoords = (angleDeg: number) => {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: cx + armLength * Math.cos(rad),
      y: cy + armLength * Math.sin(rad),
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
      {}
      <circle cx="100" cy="40" r="15" fill="currentColor" opacity={0.8} />

      {}
      <line x1="100" y1="55" x2="100" y2="120" stroke="currentColor" strokeWidth="4" />

      {}
      <line x1="100" y1="120" x2="80" y2="180" stroke="currentColor" strokeWidth="4" />
      <line x1="100" y1="120" x2="120" y2="180" stroke="currentColor" strokeWidth="4" />

      {}
      {}
      <motion.line
        x1={cx}
        y1={cy}
        x2={leftHand.x}
        y2={leftHand.y}
        stroke="currentColor"
        strokeWidth="4"
        animate={{ x2: leftHand.x, y2: leftHand.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      <motion.line
        x1={cx}
        y1={cy}
        x2={rightHand.x}
        y2={rightHand.y}
        stroke="currentColor"
        strokeWidth="4"
        animate={{ x2: rightHand.x, y2: rightHand.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {}
      {}
      <motion.rect x={0} y={0} width="16" height="16" fill="#ff4444" opacity={0} />

      <motion.circle cx={leftHand.x} cy={leftHand.y} r="5" fill="currentColor" />
      <motion.circle cx={rightHand.x} cy={rightHand.y} r="5" fill="currentColor" />
    </svg>
  );
};
