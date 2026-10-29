/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Verified badge (Instagram / TikTok / Twitter style)
export const VerifiedBadge: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 text-sky-500' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.25 14.5L6.5 12.25l1.41-1.41 2.84 2.83 6.84-6.83 1.41 1.41-8.25 8.25z" />
  </svg>
);

// WhatsApp Double Check (Sent, Delivered, Read blue check)
export const WhatsAppCheck: React.FC<{
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  className?: string;
}> = ({ status = 'read', className = '' }) => {
  if (status === 'sending') {
    return (
      <svg className={`w-3.5 h-3.5 text-slate-400 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    );
  }

  if (status === 'sent') {
    return (
      <svg className={`w-3.5 h-3.5 text-slate-400 ${className}`} viewBox="0 0 16 15" fill="currentColor">
        <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879 5.86 7.073a.365.365 0 0 0-.516 0l-.364.364a.365.365 0 0 0 0 .516l3.328 3.328a.365.365 0 0 0 .516 0l5.743-7.455a.365.365 0 0 0-.057-.51z" />
      </svg>
    );
  }

  const isRead = status === 'read';
  const color = isRead ? 'text-[#53bdeb]' : 'text-slate-400';

  return (
    <svg className={`w-4 h-3.5 ${color} ${className}`} viewBox="0 0 16 11" fill="currentColor">
      <path d="M11.1 1.4l-.8-.8c-.2-.2-.5-.2-.7 0L4.3 5.9 2.4 4c-.2-.2-.5-.2-.7 0l-.8.8c-.2.2-.2.5 0 .7l2.8 2.8c.2.2.5.2.7 0l6.7-6.2c.2-.2.2-.5 0-.7z" />
      <path d="M15.1 1.4l-.8-.8c-.2-.2-.5-.2-.7 0L8.3 5.9 7.7 5.3c-.2-.2-.5-.2-.7 0l-.8.8c-.2.2-.2.5 0 .7l1.5 1.5c.2.2.5.2.7 0l6.7-6.2c.2-.2.2-.5 0-.7z" />
    </svg>
  );
};

// Waveform visualizer for voice notes
export const VoiceWaveform: React.FC<{
  bars?: number[];
  progress?: number;
  barColor?: string;
  activeColor?: string;
}> = ({
  bars = [30, 60, 40, 80, 50, 90, 75, 45, 65, 85, 40, 70, 55, 30, 60, 40],
  progress = 0.45,
  barColor = 'bg-slate-400/40',
  activeColor = 'bg-emerald-500',
}) => {
  return (
    <div className="flex items-center gap-[2px] h-6 px-1">
      {bars.map((height, i) => {
        const isActive = i / bars.length <= progress;
        return (
          <div
            key={i}
            className={`w-[2.5px] rounded-full transition-all ${isActive ? activeColor : barColor}`}
            style={{ height: `${Math.max(20, height)}%` }}
          />
        );
      })}
    </div>
  );
};

// Signal Cellular Icon (4 bars)
export const CellularIcon: React.FC<{ bars?: number; className?: string }> = ({ bars = 4, className = 'w-4 h-3' }) => (
  <svg className={className} viewBox="0 0 17 12" fill="currentColor">
    <rect x="1" y="9" width="2.5" height="3" rx="0.75" opacity={bars >= 1 ? '1' : '0.3'} />
    <rect x="5" y="6.5" width="2.5" height="5.5" rx="0.75" opacity={bars >= 2 ? '1' : '0.3'} />
    <rect x="9" y="3.5" width="2.5" height="8.5" rx="0.75" opacity={bars >= 3 ? '1' : '0.3'} />
    <rect x="13" y="0.5" width="2.5" height="11.5" rx="0.75" opacity={bars >= 4 ? '1' : '0.3'} />
  </svg>
);

// Wifi Icon (3 bars)
export const WifiIcon: React.FC<{ level?: number; className?: string }> = ({ className = 'w-4 h-3.5' }) => (
  <svg className={className} viewBox="0 0 16 12" fill="currentColor">
    <path d="M8 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4.24-4.24a6 6 0 0 1 8.48 0 .75.75 0 0 1-1.06 1.06 4.5 4.5 0 0 0-6.36 0 .75.75 0 0 1-1.06-1.06zm-2.83-2.83a10 10 0 0 1 14.14 0 .75.75 0 0 1-1.06 1.06 8.5 8.5 0 0 0-12.02 0 .75.75 0 0 1-1.06-1.06z" />
  </svg>
);

// Battery Icon with level and charging bolt
export const BatteryIcon: React.FC<{
  level: number;
  isCharging?: boolean;
  className?: string;
}> = ({ level, isCharging, className = 'w-6 h-3' }) => {
  const clamped = Math.min(100, Math.max(1, level));
  const fillWidth = Math.max(2, (clamped / 100) * 16.5);
  const isLow = clamped <= 20;

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 24 12" fill="none">
        {/* Outer border */}
        <rect x="1" y="1" width="20" height="10" rx="3" stroke="currentColor" strokeWidth="1.2" />
        {/* Battery terminal pip */}
        <path d="M22 4.5C22.6 4.8 23 5.4 23 6C23 6.6 22.6 7.2 22 7.5V4.5Z" fill="currentColor" opacity="0.6" />
        {/* Battery Fill */}
        <rect
          x="2.5"
          y="2.5"
          width={fillWidth}
          height="7"
          rx="1.5"
          fill={isLow ? '#ef4444' : isCharging ? '#22c55e' : 'currentColor'}
        />
        {/* Charging Lightning Bolt */}
        {isCharging && (
          <path
            d="M12.5 1.5L9 6.5H12L10.5 10.5L14.5 5.5H11.5L12.5 1.5Z"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="0.5"
          />
        )}
      </svg>
    </div>
  );
};
