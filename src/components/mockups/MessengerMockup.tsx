/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChatProfile, DeviceSettings, MessageItem } from '../../types/chat';
import { ChevronLeft, Phone, Video, Info, Plus, Camera, Image, Mic, ThumbsUp } from 'lucide-react';

interface MessengerMockupProps {
  profile: ChatProfile;
  messages: MessageItem[];
  settings: DeviceSettings;
  onEditProfile?: () => void;
}

export const MessengerMockup: React.FC<MessengerMockupProps> = ({
  profile,
  messages,
  settings,
  onEditProfile,
}) => {
  const isDark = settings.theme === 'dark';

  return (
    <div
      className={`flex-1 flex flex-col h-full overflow-hidden select-none font-sans ${
        isDark ? 'bg-[#18191a] text-neutral-100' : 'bg-white text-neutral-900'
      }`}
    >
      {/* Messenger Header */}
      <div
        className={`shrink-0 flex items-center justify-between px-3.5 py-2.5 border-b transition-colors shadow-2xs ${
          isDark ? 'border-neutral-800 bg-[#242526]' : 'border-neutral-200 bg-white'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <button className="text-inherit -ml-1">
            <ChevronLeft className="w-6 h-6 stroke-[2.5] text-[#0084ff]" />
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
                className="w-8 h-8 rounded-full object-cover group-hover/prof:opacity-85 transition-opacity"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%230084ff"><circle cx="12" cy="12" r="12"/><text x="12" y="16" fill="white" font-size="12" text-anchor="middle" font-family="sans-serif">FB</text></svg>';
                }}
              />
              {profile.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-[#242526] rounded-full" />
              )}
            </div>

            <div className="min-w-0 leading-tight">
              <span className="font-semibold text-sm truncate block max-w-[140px] group-hover/prof:underline">
                {profile.name}
              </span>
              <p className="text-[10.5px] text-neutral-400 truncate">
                {profile.status || 'Active now'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[#0084ff]">
          <button className="p-1">
            <Phone className="w-4 h-4 fill-current" />
          </button>
          <button className="p-1">
            <Video className="w-5 h-5 fill-current" />
          </button>
          <button className="p-1">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-2.5">
        {messages.map((msg, index) => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider text-center max-w-[85%]">
                  {msg.text}
                </span>
              </div>
            );
          }

          const isSender = msg.role === 'sender';
          const isLastSender =
            isSender &&
            index ===
              messages.map((m) => m.role).lastIndexOf('sender');

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-1.5 ${
                isSender ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isSender && (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover shrink-0 mb-1"
                />
              )}

              <div className="flex flex-col max-w-[76%] relative">
                <div
                  className={`relative px-3.5 py-2 rounded-2xl text-[13.5px] leading-snug break-words ${
                    isSender
                      ? 'bg-[#0084ff] text-white rounded-br-xs'
                      : isDark
                      ? 'bg-[#3e4042] text-neutral-100 rounded-bl-xs'
                      : 'bg-[#e4e6eb] text-neutral-900 rounded-bl-xs'
                  }`}
                >
                  {/* Image */}
                  {msg.type === 'image' && msg.imageUrl && (
                    <div className="mb-1 rounded-xl overflow-hidden max-h-56">
                      <img
                        src={msg.imageUrl}
                        alt="Messenger media"
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
                          ? 'bg-[#242526] border-neutral-700 text-white'
                          : 'bg-white border-neutral-200 text-neutral-900'
                      }`}
                    >
                      {msg.reaction}
                    </div>
                  )}
                </div>

                {/* Seen status with tiny receiver avatar indicator */}
                {isLastSender && msg.status === 'read' && (
                  <div className="flex items-center justify-end mt-1 mr-0.5">
                    <img
                      src={profile.avatar}
                      alt="Seen by"
                      referrerPolicy="no-referrer"
                      className="w-3.5 h-3.5 rounded-full object-cover border border-white dark:border-[#18191a]"
                      title="Seen"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Messenger Bottom Bar */}
      {settings.showFooterBar && (
        <div
          className={`shrink-0 flex items-center gap-2 px-3 py-2 border-t transition-colors ${
            isDark ? 'border-neutral-800 bg-[#242526]' : 'border-neutral-200 bg-white'
          }`}
        >
          <div className="flex items-center gap-2 text-[#0084ff]">
            <Plus className="w-4 h-4 cursor-pointer" />
            <Camera className="w-4 h-4 cursor-pointer" />
            <Image className="w-4 h-4 cursor-pointer" />
            <Mic className="w-4 h-4 cursor-pointer" />
          </div>

          <div
            className={`flex-1 flex items-center px-3 py-1.5 rounded-full text-xs ${
              isDark ? 'bg-[#3a3b3c] text-neutral-400' : 'bg-neutral-100 text-neutral-500'
            }`}
          >
            <span>Aa</span>
          </div>

          <button className="text-[#0084ff] p-1">
            <ThumbsUp className="w-5 h-5 fill-current" />
          </button>
        </div>
      )}
    </div>
  );
};
