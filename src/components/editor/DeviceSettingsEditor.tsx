/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DeviceSettings, NotchStyle, PlatformType } from '../../types/chat';
import { Moon, Sun, Smartphone, Zap, Wifi, Signal, Shield } from 'lucide-react';

interface DeviceSettingsEditorProps {
  platform: PlatformType;
  settings: DeviceSettings;
  onChange: (updated: Partial<DeviceSettings>) => void;
}

export const DeviceSettingsEditor: React.FC<DeviceSettingsEditorProps> = ({
  platform,
  settings,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Theme & OS Style Controls */}
      <div className="grid grid-cols-2 gap-3">
        {/* Mockup Theme (Light / Dark) */}
        <div>
          <label className="text-[11px] font-medium text-slate-400 block mb-1">
            Chat Appearance
          </label>
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => onChange({ theme: 'light' })}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                settings.theme === 'light'
                  ? 'bg-slate-800 text-amber-300 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Light</span>
            </button>
            <button
              onClick={() => onChange({ theme: 'dark' })}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                settings.theme === 'dark'
                  ? 'bg-slate-800 text-indigo-300 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark</span>
            </button>
          </div>
        </div>

        {/* Operating System UI style (iOS vs Android) */}
        <div>
          <label className="text-[11px] font-medium text-slate-400 block mb-1">
            UI Style
          </label>
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => onChange({ os: 'ios' })}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                settings.os === 'ios'
                  ? 'bg-slate-800 text-sky-300 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Apple iOS</span>
            </button>
            <button
              onClick={() => onChange({ os: 'android' })}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                settings.os === 'android'
                  ? 'bg-slate-800 text-emerald-300 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Android</span>
            </button>
          </div>
        </div>
      </div>

      {/* Screen Notch / Cutout */}
      <div>
        <label className="text-[11px] font-medium text-slate-400 block mb-1">
          Top Bezel & Cutout
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(
            [
              { id: 'dynamic_island', label: 'Island' },
              { id: 'notch', label: 'Notch' },
              { id: 'punch_hole', label: 'Pin Hole' },
              { id: 'none', label: 'Clean' },
            ] as const
          ).map((notch) => (
            <button
              key={notch.id}
              onClick={() => onChange({ notchStyle: notch.id })}
              className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                settings.notchStyle === notch.id
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {notch.label}
            </button>
          ))}
        </div>
      </div>

      {/* Phone Status Bar Options: Time, Battery, Network */}
      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
            Status Bar Customizer
          </span>
          <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showStatusBar}
              onChange={(e) => onChange({ showStatusBar: e.target.checked })}
              className="w-3.5 h-3.5 rounded text-indigo-600 bg-slate-950 border-slate-700"
            />
            <span>Show Bar</span>
          </label>
        </div>

        {settings.showStatusBar && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Clock Time</label>
                <input
                  type="text"
                  value={settings.time}
                  onChange={(e) => onChange({ time: e.target.value })}
                  className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  placeholder="9:41"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Battery ({settings.batteryLevel}%)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={settings.batteryLevel}
                    onChange={(e) => onChange({ batteryLevel: Number(e.target.value) })}
                    className="flex-1 accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <button
                    onClick={() => onChange({ isCharging: !settings.isCharging })}
                    className={`p-1 rounded text-xs transition-colors ${
                      settings.isCharging
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title="Toggle charging bolt"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">WiFi Signal</label>
                <div className="flex gap-1">
                  {[1, 2, 3].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => onChange({ wifiLevel: lvl as 1 | 2 | 3 })}
                      className={`flex-1 py-1 rounded text-[10px] border transition-colors ${
                        settings.wifiLevel === lvl
                          ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                    >
                      {lvl} {lvl === 1 ? 'Bar' : 'Bars'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Cellular Signal</label>
                <div className="flex gap-1">
                  {[2, 3, 4].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => onChange({ cellularLevel: lvl as 2 | 3 | 4 })}
                      className={`flex-1 py-1 rounded text-[10px] border transition-colors ${
                        settings.cellularLevel === lvl
                          ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                    >
                      {lvl} Bars
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Frame Elements: Footer & Watermark */}
      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center gap-2 p-2 bg-slate-900 border border-slate-800 rounded-lg cursor-pointer text-xs text-slate-300 hover:border-slate-700">
          <input
            type="checkbox"
            checked={settings.showFooterBar}
            onChange={(e) => onChange({ showFooterBar: e.target.checked })}
            className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-700"
          />
          <span>Bottom Input Bar</span>
        </label>

        <label className="flex items-center gap-2 p-2 bg-slate-900 border border-slate-800 rounded-lg cursor-pointer text-xs text-slate-300 hover:border-slate-700">
          <input
            type="checkbox"
            checked={settings.showWatermark}
            onChange={(e) => onChange({ showWatermark: e.target.checked })}
            className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-700"
          />
          <span>Watermark Banner</span>
        </label>
      </div>
    </div>
  );
};
