/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from 'react';
import { DeviceSettings } from '../../types/chat';
import { BatteryIcon, CellularIcon, WifiIcon } from './SocialIcons';

interface DeviceFrameProps {
  settings: DeviceSettings;
  children: ReactNode;
  frameRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  settings,
  children,
  frameRef,
  className = '',
}) => {
  const isDark = settings.theme === 'dark';

  return (
    <div
      ref={frameRef}
      id="chat-export-target"
      className={`relative w-[385px] min-h-[740px] max-h-[820px] rounded-[46px] border-[8px] ${
        isDark ? 'border-neutral-800 bg-neutral-950 text-neutral-100' : 'border-neutral-900 bg-white text-neutral-900'
      } shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] flex flex-col overflow-hidden select-none transition-colors duration-200 ${className}`}
      style={{
        boxShadow: isDark
          ? '0 0 0 1px rgba(255,255,255,0.06), 0 25px 65px -12px rgba(0,0,0,0.85)'
          : '0 0 0 1px rgba(0,0,0,0.08), 0 25px 65px -12px rgba(0,0,0,0.35)',
      }}
    >
      {/* Dynamic Island / Notch / Camera Hole Punch */}
      {settings.notchStyle === 'dynamic_island' && (
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-40 w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-sm pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-900/90 border border-neutral-700/40" />
          <div className="w-2 h-2 rounded-full bg-indigo-950/80" />
        </div>
      )}

      {settings.notchStyle === 'notch' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-40 w-36 h-5 bg-black rounded-b-2xl flex items-center justify-center pointer-events-none">
          <div className="w-12 h-1 bg-neutral-800 rounded-full mb-1" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 absolute right-4 top-1" />
        </div>
      )}

      {settings.notchStyle === 'punch_hole' && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 w-3.5 h-3.5 bg-black rounded-full border border-neutral-800 flex items-center justify-center pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
        </div>
      )}

      {/* Status Bar */}
      {settings.showStatusBar && (
        <div
          className={`shrink-0 z-30 flex items-center justify-between px-6 pt-2 pb-1 text-xs font-semibold tracking-tight transition-colors ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}
        >
          {/* Left: Clock */}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[13px]">{settings.time || '9:41'}</span>
          </div>

          {/* Right: Cellular, WiFi, Battery */}
          <div className="flex items-center gap-1.5">
            <CellularIcon bars={settings.cellularLevel} className="w-4 h-3.5" />
            <WifiIcon className="w-3.5 h-3" />
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-medium tabular-nums">{settings.batteryLevel}%</span>
              <BatteryIcon level={settings.batteryLevel} isCharging={settings.isCharging} className="w-5 h-2.5" />
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Content Viewport */}
      <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
        {children}
      </div>

      {/* Watermark Banner (if enabled) */}
      {settings.showWatermark && (
        <div className="shrink-0 py-1 bg-black/60 backdrop-blur-xs text-center border-t border-white/5 z-20">
          <p className="text-[10px] tracking-wider font-medium text-neutral-300 uppercase">
            {settings.watermarkText || 'chatmocker.net'}
          </p>
        </div>
      )}

      {/* Phone Bottom Home Indicator */}
      <div className="shrink-0 flex items-center justify-center py-2 pointer-events-none">
        <div
          className={`w-32 h-1 rounded-full transition-colors ${
            isDark ? 'bg-neutral-600/70' : 'bg-neutral-400/80'
          }`}
        />
      </div>
    </div>
  );
};
