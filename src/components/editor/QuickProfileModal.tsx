/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { ChatProfile, PlatformType } from '../../types/chat';
import { PRESET_AVATARS } from '../../data/templates';
import { X, Upload, ShieldCheck, Camera, Check } from 'lucide-react';

interface QuickProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: PlatformType;
  profile: ChatProfile;
  onChangeProfile: (updated: Partial<ChatProfile>) => void;
}

export const QuickProfileModal: React.FC<QuickProfileModalProps> = ({
  isOpen,
  onClose,
  platform,
  profile,
  onChangeProfile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChangeProfile({ avatar: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold">Edit Profile Name & Photo</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar Upload & Presets */}
        <div className="py-4 space-y-4">
          <div className="flex items-center gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="relative group shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] cursor-pointer"
              >
                <Upload className="w-4 h-4 mb-0.5" />
                <span>Upload</span>
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo from Device</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                JPG, PNG, WebP supported
              </p>
            </div>
          </div>

          {/* Quick preset portraits */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
              Or pick preset avatar:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {PRESET_AVATARS.map((av) => (
                <button
                  key={av.id}
                  onClick={() => onChangeProfile({ avatar: av.url, name: av.name })}
                  className={`w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 transition-transform hover:scale-105 ${
                    profile.avatar === av.url
                      ? 'border-indigo-500 ring-2 ring-indigo-500/40'
                      : 'border-slate-700 opacity-80 hover:opacity-100'
                  }`}
                  title={av.name}
                >
                  <img
                    src={av.url}
                    alt={av.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Profile Display Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onChangeProfile({ name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Enter contact name..."
              autoFocus
            />
          </div>

          {/* Handle / Subtitle */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Handle / Phone / Subtitle
            </label>
            <input
              type="text"
              value={profile.handle}
              onChange={(e) => onChangeProfile({ handle: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. sophia.m or +1 (555)..."
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Status Text
            </label>
            <input
              type="text"
              value={profile.status}
              onChange={(e) => onChangeProfile({ status: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. online, Active now, typing..."
            />
          </div>

          {/* Verified toggle */}
          <div className="flex items-center gap-3 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300">
              <input
                type="checkbox"
                checked={profile.isVerified}
                onChange={(e) => onChangeProfile({ isVerified: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-700 focus:ring-0 focus:outline-none"
              />
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Show Verified Badge</span>
              </div>
            </label>
          </div>
        </div>

        {/* Done Button */}
        <div className="pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Check className="w-4 h-4" />
            <span>Save & Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
