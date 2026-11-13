import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  borderBeam?: boolean;
  onClick?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  enableTilt = true,
  borderBeam = false,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinates mapped to rotational angles
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth physics spring transitions
  const mouseX = useSpring(x, { stiffness: 260, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 260, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={
        enableTilt
          ? {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }
          : undefined
      }
      className={`relative rounded-xl overflow-hidden glass-panel transition-shadow duration-300 will-change-transform ${
        isHovered ? 'shadow-crimson-md border-crimson/50' : 'border-red-600/20'
      } ${className}`}
    >
      {/* Animated Crimson Border Beam (traces perimeter on hover) */}
      {(borderBeam || isHovered) && (
        <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden z-10">
          <div
            className="absolute inset-[-100%] animate-border-beam opacity-70"
            style={{
              background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 280deg, #ff003c 320deg, #ffffff 360deg)',
            }}
          />
          {/* Inner masking to reveal only 1px border */}
          <div className="absolute inset-[1px] bg-obsidian-850/95 rounded-[11px]" />
        </div>
      )}

      {/* Content wrapper elevated in 3D */}
      <div className="relative z-20 h-full" style={enableTilt ? { transform: 'translateZ(10px)' } : undefined}>
        {children}
      </div>
    </motion.div>
  );
};

