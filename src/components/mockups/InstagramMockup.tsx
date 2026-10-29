/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChatProfile, DeviceSettings, MessageItem } from '../../types/chat';
import { VerifiedBadge } from './SocialIcons';
import { ChevronLeft, Phone, Video, Camera, Mic, Image, Heart } from 'lucide-react';

interface InstagramMockupProps {
  profile: ChatProfile;
  messages: MessageItem[];
  settings: DeviceSettings;
  onEditProfile?: () => void;
}

export const InstagramMockup: React.FC<InstagramMockupProps> = ({
  profile,
  messages,
  settings,
  onEditProfile,
}) => {
  const isDark = settings.theme === 'dark';

  return (
    <div
      className={`flex-1 flex flex-col h-full overflow-hidden select-none font-sans ${
        isDark ? 'bg-black text-neutral-100' : 'bg-white text-neutral-900'
      }`}
    >
      {/* Instagram Header */}
      <div
        className={`shrink-0 flex items-center justify-between px-3.5 py-2.5 border-b transition-colors ${
          isDark ? 'border-neutral-800 bg-black' : 'border-neutral-200 bg-white'
        }`}
      >
        {/* Left: Back + Avatar + Name */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button className="text-inherit -ml-1">
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          <div
            onClick={onEditProfile}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer group/prof"
            title="Click to edit profile name or photo"
          >
            <div className="relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover group-hover/prof:opacity-85 transition-opacity"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%23e1306c"><circle cx="12" cy="12" r="12"/><text x="12" y="16" fill="white" font-size="12" text-anchor="middle" font-family="sans-serif">IG</text></svg>';
                }}
              />
              {profile.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-black rounded-full" />
              )}
            </div>

            <div className="min-w-0 leading-tight">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-[13.5px] truncate max-w-[130px] group-hover/prof:underline">
                  {profile.name}
                </span>
                {profile.isVerified && <VerifiedBadge className="w-3.5 h-3.5 text-sky-500 shrink-0" />}
              </div>
              <p className="text-[11px] text-neutral-400 truncate">
                {profile.status || profile.handle || 'Active now'}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Audio Call, Video Call */}
        <div className="flex items-center gap-3.5 text-inherit">
          <button className="hover:opacity-70 transition-opacity">
            <Phone className="w-5 h-5" />
          </button>
          <button className="hover:opacity-70 transition-opacity">
            <Video className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-2.5">
        {messages.map((msg, index) => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="flex justify-center my-3">
                <span className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase">
                  {msg.text}
                </span>
              </div>
            );
          }

          const isSender = msg.role === 'sender';
          const isLast = index === messages.length - 1;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-1.5 ${
                isSender ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* Receiver avatar next to bubble */}
              {!isSender && (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-full object-cover shrink-0 mb-1"
                />
              )}

              <div className="flex flex-col max-w-[75%] relative group">
                <div
                  className={`relative px-3.5 py-2 rounded-[20px] text-[13.5px] leading-relaxed break-words shadow-2xs ${
                    isSender
                      ? 'bg-gradient-to-r from-[#7828c8] via-[#e1306c] to-[#fd1d1d] text-white rounded-br-sm'
                      : isDark
                      ? 'bg-[#262626] text-neutral-100 rounded-bl-sm'
                      : 'bg-[#efefef] text-neutral-900 rounded-bl-sm'
                  }`}
                >
                  {/* Image message */}
                  {msg.type === 'image' && msg.imageUrl && (
                    <div className="mb-1 rounded-xl overflow-hidden max-h-56">
                      <img
                        src={msg.imageUrl}
                        alt="Instagram photo"
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  {msg.text && <p className="whitespace-pre-wrap">{msg.text}</p>}

                  {/* Reaction / Heart Badge */}
                  {(msg.reaction || msg.liked) && (
                    <div
                      className={`absolute -bottom-2.5 ${
                        isSender ? 'right-2' : 'left-2'
                      } flex items-center justify-center text-xs px-1.5 py-0.5 rounded-full shadow-md border ${
                        isDark
                          ? 'bg-[#1e1e1e] border-neutral-700 text-white'
                          : 'bg-white border-neutral-200 text-neutral-900'
                      }`}
                    >
                      {msg.reaction || (msg.liked && '❤️')}
                    </div>
                  )}
                </div>

                {/* Seen status for last sent message */}
                {isSender && isLast && msg.status === 'read' && (
                  <span className="text-[10px] text-neutral-400 self-end mt-1 font-medium pr-1">
                    Seen
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Instagram Bottom Input Bar */}
      {settings.showFooterBar && (
        <div
          className={`shrink-0 flex items-center gap-2 px-3.5 py-2.5 border-t transition-colors ${
            isDark ? 'border-neutral-800 bg-black' : 'border-neutral-200 bg-white'
          }`}
        >
          {/* Camera Button */}
          <button className="w-8 h-8 rounded-full bg-[#0095f6] text-white flex items-center justify-center shrink-0">
            <Camera className="w-4 h-4" />
          </button>

          {/* Input pill */}
          <div
            className={`flex-1 flex items-center justify-between px-3.5 py-2 rounded-full text-xs ${
              isDark ? 'bg-[#262626] text-neutral-400' : 'bg-neutral-100 text-neutral-500'
            }`}
          >
            <span>Message...</span>
            <div className="flex items-center gap-2 text-inherit">
              <Mic className="w-3.5 h-3.5" />
              <Image className="w-3.5 h-3.5" />
              <Heart className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
