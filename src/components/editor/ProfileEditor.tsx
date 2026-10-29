/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { ChatProfile, PlatformType, SenderProfile } from '../../types/chat';
import { PRESET_AVATARS } from '../../data/templates';
import { Upload, ShieldCheck, Link as LinkIcon, Sparkles, User, RefreshCw, Camera } from 'lucide-react';

interface ProfileEditorProps {
  platform: PlatformType;
  profile: ChatProfile;
  senderProfile: SenderProfile;
  onChangeProfile: (updated: Partial<ChatProfile>) => void;
  onChangeSender: (updated: Partial<SenderProfile>) => void;
  activeProfileTarget?: 'receiver' | 'sender';
  onSelectTarget?: (target: 'receiver' | 'sender') => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({
  platform,
  profile,
  senderProfile,
  onChangeProfile,
  onChangeSender,
  activeProfileTarget = 'receiver',
  onSelectTarget,
}) => {
  const [target, setTarget] = useState<'receiver' | 'sender'>(activeProfileTarget);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlField, setShowUrlField] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTarget = onSelectTarget ? activeProfileTarget : target;
  const setEffectiveTarget = (t: 'receiver' | 'sender') => {
    setTarget(t);
    onSelectTarget?.(t);
  };

  const isReceiver = currentTarget === 'receiver';
  const currentAvatar = isReceiver ? profile.avatar : senderProfile.avatar;
  const currentName = isReceiver ? profile.name : senderProfile.name;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        if (isReceiver) {
          onChangeProfile({ avatar: reader.result });
        } else {
          onChangeSender({ avatar: reader.result });
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    if (isReceiver) {
      onChangeProfile({ avatar: urlInput.trim() });
    } else {
      onChangeSender({ avatar: urlInput.trim() });
    }
    setUrlInput('');
    setShowUrlField(false);
  };

  const statusPresets: Record<PlatformType, string[]> = {
    whatsapp: ['online', 'typing...', 'tap here for contact info', 'Busy', 'Available', 'Hey there! I am using WhatsApp.'],
    instagram: ['Active now', 'Active 15m ago', 'Active yesterday', 'typing...'],
    tiktok: ['Active now', 'Active today', '@' + profile.name.toLowerCase().replace(/\s+/g, '')],
    messenger: ['Active now', 'Active 2h ago', 'typing...'],
    simple: ['iMessage', 'Text Message', 'Online'],
  };

  return (
    <div className="space-y-4">
      {/* Target Selector: Recipient (Them) vs Your Profile (You) */}
      <div>
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
          Choose Profile To Edit
        </label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setEffectiveTarget('receiver')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              isReceiver
                ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5 text-indigo-400" />
            <span>Recipient (Header & Incoming)</span>
          </button>

          <button
            type="button"
            onClick={() => setEffectiveTarget('sender')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              !isReceiver
                ? 'bg-indigo-600 text-white shadow-sm border border-indigo-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5 text-emerald-300" />
            <span>Your Profile (Sender)</span>
          </button>
        </div>
      </div>

      {/* Profile Photo Customization Card */}
      <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-indigo-400" />
            Profile Picture ({isReceiver ? 'Recipient' : 'You'})
          </span>
          <span className="text-[11px] text-slate-400">Live preview synced</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
          {/* Avatar preview with upload overlay */}
          <div className="relative group shrink-0">
            <img
              src={currentAvatar}
              alt={currentName}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500 shadow-md ring-4 ring-indigo-500/10"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="%236366f1"><circle cx="12" cy="12" r="12"/><text x="12" y="16" fill="white" font-size="10" text-anchor="middle" font-family="sans-serif">AVATAR</text></svg>';
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] font-medium cursor-pointer"
              title="Click to upload new photo"
            >
              <Upload className="w-5 h-5 mb-0.5" />
              <span>Change</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Action buttons to change photo */}
          <div className="flex-1 w-full space-y-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New Photo</span>
              </button>

              <button
                type="button"
                onClick={() => setShowUrlField(!showUrlField)}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                title="Paste direct Image URL"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Image URL</span>
              </button>
            </div>

            {showUrlField && (
              <div className="flex items-center gap-2 pt-1 animate-in fade-in">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="flex-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg"
                >
                  Apply
                </button>
              </div>
            )}

            <p className="text-[11px] text-slate-500">
              Supports JPG, PNG, WebP or direct image links.
            </p>
          </div>
        </div>

        {/* Preset Gallery */}
        <div className="pt-2 border-t border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 block mb-2">
            Or Choose from High-Res Presets:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {PRESET_AVATARS.map((av) => (
              <button
                key={av.id}
                type="button"
                onClick={() => {
                  if (isReceiver) {
                    onChangeProfile({ avatar: av.url, name: av.name });
                  } else {
                    onChangeSender({ avatar: av.url, name: av.name });
                  }
                }}
                className={`w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 transition-transform hover:scale-105 ${
                  currentAvatar === av.url
                    ? 'border-indigo-500 ring-2 ring-indigo-500/40'
                    : 'border-slate-700 opacity-80 hover:opacity-100'
                }`}
                title={`Use ${av.name}`}
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
      </div>

      {/* Name and Handle Inputs */}
      <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
        <span className="text-xs font-bold text-slate-200 block">
          Profile Name & Details
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={currentName}
              onChange={(e) => {
                if (isReceiver) {
                  onChangeProfile({ name: e.target.value });
                } else {
                  onChangeSender({ name: e.target.value });
                }
              }}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. Sophia Martinez"
            />
          </div>

          {isReceiver ? (
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">
                Username / Phone Number
              </label>
              <input
                type="text"
                value={profile.handle}
                onChange={(e) => onChangeProfile({ handle: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="e.g. sophia.m or +1 (555) 382..."
              />
            </div>
          ) : (
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">
                Role Label
              </label>
              <input
                type="text"
                disabled
                value="Sender (You)"
                className="w-full px-3 py-2 bg-slate-950/50 border border-slate-800 rounded-xl text-sm text-slate-500"
              />
            </div>
          )}
        </div>

        {/* Receiver-specific controls: Status & Badges */}
        {isReceiver && (
          <>
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">
                Online / Subtitle Status
              </label>
              <input
                type="text"
                value={profile.status}
                onChange={(e) => onChangeProfile({ status: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="e.g. online, typing..., Active now"
              />
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <span className="text-[10px] text-slate-500">Quick options:</span>
                {statusPresets[platform].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => onChangeProfile({ status: st })}
                    className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors ${
                      profile.status === st
                        ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 font-medium'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Badges & Indicators */}
            <div className="flex items-center gap-4 pt-2 border-t border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={profile.isVerified}
                  onChange={(e) => onChangeProfile({ isVerified: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-700 focus:ring-0 focus:outline-none"
                />
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Blue Verified Checkmark</span>
                </div>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={profile.isOnline}
                  onChange={(e) => onChangeProfile({ isOnline: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-700 focus:ring-0 focus:outline-none"
                />
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span>Green Online Dot</span>
                </div>
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
