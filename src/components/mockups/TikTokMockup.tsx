/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChatProfile, DeviceSettings, MessageItem } from '../../types/chat';
import { VerifiedBadge } from './SocialIcons';
import { ChevronLeft, MoreHorizontal, Smile, Send, Plus } from 'lucide-react';

interface TikTokMockupProps {
  profile: ChatProfile;
  messages: MessageItem[];
  settings: DeviceSettings;
  onEditProfile?: () => void;
}

export const TikTokMockup: React.FC<TikTokMockupProps> = ({
  profile,
  messages,
  settings,
  onEditProfile,
}) => {
  const isDark = settings.theme === 'dark';

  return (
    <div
      className={`flex-1 flex flex-col h-full overflow-hidden select-none font-sans ${
        isDark ? 'bg-[#121212] text-neutral-100' : 'bg-white text-neutral-900'
      }`}
    >
      {/* TikTok Header */}
      <div
        className={`shrink-0 flex items-center justify-between px-3.5 py-2.5 border-b transition-colors ${
          isDark ? 'border-neutral-800 bg-[#121212]' : 'border-neutral-200 bg-white'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <button className="text-inherit -ml-1">
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <div
            onClick={onEditProfile}
            className="flex items-center gap-2 min-w-0 cursor-pointer group/prof"
            title="Click to edit profile name or photo"
          >
            <div className="relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover group-hover/prof:opacity-85 transition-opacity"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm truncate max-w-[150px] group-hover/prof:underline">
                  {profile.name}
                </span>
                {profile.isVerified && <VerifiedBadge className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
              </div>
              <p className="text-[10.5px] text-neutral-400 truncate">
                {profile.handle || 'Direct message'}
              </p>
            </div>
          </div>
        </div>

        <button className="p-1 text-inherit">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3">
        {messages.map((msg) => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                  {msg.text}
                </span>
              </div>
            );
          }

          const isSender = msg.role === 'sender';

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                isSender ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isSender && (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                />
              )}

              <div className="flex flex-col max-w-[76%] relative">
                <div
                  className={`relative px-3.5 py-2 rounded-2xl text-[13.5px] leading-snug break-words ${
                    isSender
                      ? 'bg-[#3b82f6] text-white rounded-br-xs shadow-xs'
                      : isDark
                      ? 'bg-[#262626] text-neutral-100 rounded-bl-xs'
                      : 'bg-[#f1f1f2] text-neutral-900 rounded-bl-xs'
                  }`}
                >
                  {/* Image attachment */}
                  {msg.type === 'image' && msg.imageUrl && (
                    <div className="mb-1 rounded-xl overflow-hidden max-h-56">
                      <img
                        src={msg.imageUrl}
                        alt="TikTok media"
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  {msg.text && <p className="whitespace-pre-wrap">{msg.text}</p>}

                  {/* Reaction badge */}
                  {msg.reaction && (
                    <div
                      className={`absolute -bottom-2.5 ${
                        isSender ? 'right-2' : 'left-2'
                      } flex items-center justify-center text-xs px-1.5 py-0.5 rounded-full shadow-md border ${
                        isDark
                          ? 'bg-[#1f1f1f] border-neutral-700 text-white'
                          : 'bg-white border-neutral-200 text-neutral-900'
                      }`}
                    >
                      {msg.reaction}
                    </div>
                  )}
                </div>

                <div
                  className={`text-[9.5px] text-neutral-400 mt-1 ${
                    isSender ? 'self-end' : 'self-start'
                  }`}
                >
                  <span className="tabular-nums">{msg.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* TikTok Bottom Bar */}
      {settings.showFooterBar && (
        <div
          className={`shrink-0 flex items-center gap-2 px-3 py-2 border-t transition-colors ${
            isDark ? 'border-neutral-800 bg-[#121212]' : 'border-neutral-200 bg-white'
          }`}
        >
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              isDark ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            <Plus className="w-4 h-4" />
          </button>

          <div
            className={`flex-1 flex items-center justify-between px-3.5 py-2 rounded-full text-xs ${
              isDark ? 'bg-[#262626] text-neutral-400' : 'bg-neutral-100 text-neutral-500'
            }`}
          >
            <span>Send a message...</span>
            <Smile className="w-4 h-4 text-inherit" />
          </div>

          <button className="w-8 h-8 rounded-full bg-[#fe2c55] text-white flex items-center justify-center shrink-0">
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
