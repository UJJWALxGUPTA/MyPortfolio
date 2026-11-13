import React from 'react';

interface CRTOverlayProps {
  enabled: boolean;
}

export const CRTOverlay: React.FC<CRTOverlayProps> = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden opacity-35">
      <div className="scanlines-crimson absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-jet/40 via-transparent to-jet/40" />
    </div>
  );
};
