/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChatProfile, DeviceSettings, MessageItem } from '../../types/chat';
import { VoiceWaveform, WhatsAppCheck } from './SocialIcons';
import { ArrowLeft, ChevronLeft, MoreVertical, Phone, Plus, Smile, Video, Mic, Send, Play } from 'lucide-react';

interface WhatsAppMockupProps {
  profile: ChatProfile;
  messages: MessageItem[];
  settings: DeviceSettings;
  onEditProfile?: () => void;
}

export const WhatsAppMockup: React.FC<WhatsAppMockupProps> = ({
  profile,
  messages,
  settings,
  onEditProfile,
}) => {
  const isDark = settings.theme === 'dark';
  const isIos = settings.os === 'ios';

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden select-none font-sans">
      {/* WhatsApp Header */}
      <div
        className={`shrink-0 flex items-center justify-between px-3 py-2 transition-colors border-b ${
          isDark
            ? 'bg-[#1f2c34] text-neutral-100 border-[#1f2c34]'
            : isIos
            ? 'bg-[#f6f6f6] text-neutral-900 border-neutral-200'
            : 'bg-[#008069] text-white border-[#008069]'
        }`}
      >
        {/* Left: Back + Avatar + Contact Info */}
        <div className="flex items-center gap-2 min-w-0">
          <button className="flex items-center text-inherit -ml-1">
            {isIos ? (
              <div className="flex items-center text-[#007aff] dark:text-[#3797f0]">
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                <span className="text-xs -ml-1 font-normal">14</span>
              </div>
            ) : (
              <ArrowLeft className="w-5 h-5" />
            )}
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
                className="w-9 h-9 rounded-full object-cover border border-black/10 dark:border-white/10 group-hover/prof:opacity-85 transition-opacity"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="%23008069"><circle cx="12" cy="12" r="12"/><text x="12" y="16" fill="white" font-size="12" text-anchor="middle" font-family="sans-serif">WA</text></svg>';
                }}
              />
              {profile.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-[#1f2c34] rounded-full" />
              )}
            </div>

            <div className="min-w-0 leading-tight">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-sm truncate max-w-[140px] group-hover/prof:underline">
                  {profile.name}
                </span>
              </div>
              <p
                className={`text-[11px] truncate ${
                  profile.status === 'typing...'
                    ? 'text-emerald-500 font-medium animate-pulse'
                    : isDark
                    ? 'text-neutral-400'
                    : isIos
                    ? 'text-neutral-500'
                    : 'text-neutral-100/90'
                }`}
              >
                {profile.status || 'online'}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Video, Call, More */}
        <div className="flex items-center gap-3">
          <button
            className={`p-1 ${
              isIos
                ? 'text-[#007aff] dark:text-[#3797f0]'
                : isDark
                ? 'text-neutral-300'
                : 'text-white'
            }`}
          >
            <Video className="w-5 h-5" />
          </button>
          <button
            className={`p-1 ${
              isIos
                ? 'text-[#007aff] dark:text-[#3797f0]'
                : isDark
                ? 'text-neutral-300'
                : 'text-white'
            }`}
          >
            <Phone className="w-4 h-4" />
          </button>
          {!isIos && (
            <button className="p-1 text-inherit">
              <MoreVertical className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area with authentic WhatsApp Wallpaper */}
      <div
        className={`flex-1 overflow-y-auto px-3.5 py-3 space-y-2.5 ${
          isDark ? 'bg-whatsapp-doodle-dark' : 'bg-whatsapp-doodle-light'
        }`}
      >
        {messages.map((msg) => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <span
                  className={`text-[10px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-md shadow-xs ${
                    isDark
                      ? 'bg-[#182229] text-neutral-300 border border-white/5'
                      : 'bg-white/90 text-neutral-600 border border-black/5'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            );
          }

          const isSender = msg.role === 'sender';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} group`}
            >
              <div
                className={`relative max-w-[82%] px-3 py-1.5 rounded-2xl shadow-xs transition-shadow text-[13.5px] leading-snug ${
                  isSender
                    ? isDark
                      ? 'bg-[#005c4b] text-neutral-100 rounded-tr-none'
                      : 'bg-[#d9fdd3] text-neutral-900 rounded-tr-none'
                    : isDark
                    ? 'bg-[#202c33] text-neutral-100 rounded-tl-none'
                    : 'bg-white text-neutral-900 rounded-tl-none'
                }`}
              >
                {/* Image message */}
                {msg.type === 'image' && msg.imageUrl && (
                  <div className="mb-1 rounded-lg overflow-hidden max-h-56">
                    <img
                      src={msg.imageUrl}
                      alt="Shared media"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Audio message (WhatsApp voice note) */}
                {msg.type === 'audio' && (
                  <div className="flex items-center gap-2 py-1 pr-1 min-w-[200px]">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                        isDark ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
                      }`}
                    >
                      <Play className="w-4 h-4 ml-0.5 fill-current" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <VoiceWaveform
                        activeColor={isDark ? 'bg-emerald-400' : 'bg-emerald-600'}
                        barColor={isDark ? 'bg-neutral-600' : 'bg-neutral-300'}
                      />
                      <div className="flex justify-between items-center text-[10px] text-neutral-400 px-1 mt-0.5">
                        <span className="tabular-nums">{msg.audioDuration || '0:24'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Text Message */}
                {msg.text && (
                  <p className="whitespace-pre-wrap break-words pr-1.5">
                    {msg.text}
                  </p>
                )}

                {/* Timestamp & Status ticks */}
                <div className="flex items-center justify-end gap-1 mt-0.5 text-[10px] opacity-70 float-right ml-2 -mb-0.5">
                  <span className="tabular-nums">{msg.timestamp}</span>
                  {isSender && (
                    <WhatsAppCheck
                      status={msg.status || 'read'}
                      className="inline-block"
                    />
                  )}
                </div>

                {/* Message Reaction Badge */}
                {msg.reaction && (
                  <div
                    className={`absolute -bottom-2.5 ${
                      isSender ? 'right-2' : 'left-2'
                    } flex items-center justify-center bg-white dark:bg-[#1f2c34] text-xs px-1.5 py-0.5 rounded-full shadow-md border border-black/5 dark:border-white/10 animate-in fade-in`}
                  >
                    <span>{msg.reaction}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* WhatsApp Bottom Input Mockup */}
      {settings.showFooterBar && (
        <div
          className={`shrink-0 flex items-center gap-2 px-2.5 py-2 transition-colors border-t ${
            isDark
              ? 'bg-[#1f2c34] border-[#2a3942] text-neutral-300'
              : 'bg-[#f0f2f5] border-neutral-200 text-neutral-600'
          }`}
        >
          {isIos ? (
            <button className="p-1 text-[#007aff] dark:text-[#3797f0]">
              <Plus className="w-5 h-5" />
            </button>
          ) : (
            <button className="p-1">
              <Smile className="w-5 h-5" />
            </button>
          )}

          <div
            className={`flex-1 flex items-center px-3 py-1.5 rounded-full text-xs transition-colors ${
              isDark ? 'bg-[#2a3942] text-neutral-400' : 'bg-white text-neutral-400 shadow-xs'
            }`}
          >
            <span>Message</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xs ${
                isDark ? 'bg-[#00a884] text-white' : 'bg-[#008069] text-white'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
