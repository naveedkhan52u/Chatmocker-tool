/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChatProfile, DeviceSettings, MessageItem } from '../../types/chat';
import { ChevronLeft, ChevronRight, Video, Plus, ArrowUp } from 'lucide-react';

interface SimpleMockupProps {
  profile: ChatProfile;
  messages: MessageItem[];
  settings: DeviceSettings;
  onEditProfile?: () => void;
}

export const SimpleMockup: React.FC<SimpleMockupProps> = ({
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
      {/* iOS iMessage Header */}
      <div
        className={`shrink-0 flex items-center justify-between px-3 py-2 border-b transition-colors ${
          isDark
            ? 'border-neutral-800 bg-neutral-900/80 backdrop-blur-md'
            : 'border-neutral-200 bg-neutral-50/90 backdrop-blur-md'
        }`}
      >
        <button className="flex items-center text-[#007aff] text-xs font-medium -ml-1">
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span>Messages</span>
        </button>

        {/* Center Contact Lockup */}
        <div
          onClick={onEditProfile}
          className="flex flex-col items-center cursor-pointer group/prof"
          title="Click to edit profile name or photo"
        >
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover group-hover/prof:opacity-85 transition-opacity"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%238e8e93"><circle cx="12" cy="12" r="12"/><text x="12" y="16" fill="white" font-size="12" text-anchor="middle" font-family="sans-serif">SMS</text></svg>';
              }}
            />
          </div>
          <div className="flex items-center gap-0.5 mt-0.5">
            <span className="text-[11.5px] font-semibold tracking-tight group-hover/prof:underline">
              {profile.name}
            </span>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
          </div>
        </div>

        <button className="text-[#007aff] p-1">
          <Video className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3">
        {messages.map((msg, index) => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <span className="text-[10.5px] font-medium text-neutral-400 tracking-tight">
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
              className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} relative group`}
            >
              {/* Tapback reaction floating on top of bubble */}
              {msg.reaction && (
                <div
                  className={`relative z-10 -mb-2 ${
                    isSender ? 'mr-3' : 'ml-3'
                  } bg-white dark:bg-[#1c1c1e] text-[13px] px-2 py-0.5 rounded-full shadow-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center`}
                >
                  <span>{msg.reaction}</span>
                </div>
              )}

              <div
                className={`max-w-[76%] px-3.5 py-2 rounded-[18px] text-[14px] leading-snug break-words ${
                  isSender
                    ? 'bg-[#007aff] text-white rounded-br-[4px]'
                    : isDark
                    ? 'bg-[#26252a] text-white rounded-bl-[4px]'
                    : 'bg-[#e9e9eb] text-black rounded-bl-[4px]'
                }`}
              >
                {/* Image message */}
                {msg.type === 'image' && msg.imageUrl && (
                  <div className="mb-1 rounded-xl overflow-hidden max-h-56">
                    <img
                      src={msg.imageUrl}
                      alt="Shared media"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {msg.text && <p className="whitespace-pre-wrap">{msg.text}</p>}
              </div>

              {/* Delivery / Read Status below sender bubble */}
              {isSender && (
                <div className="mt-1 text-[10px] text-neutral-400 font-medium">
                  {isLastSender && msg.status === 'read' ? (
                    <span>Read {msg.timestamp}</span>
                  ) : isLastSender && msg.status === 'delivered' ? (
                    <span>Delivered</span>
                  ) : null}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* iMessage Bottom Input Bar */}
      {settings.showFooterBar && (
        <div
          className={`shrink-0 flex items-center gap-2 px-3 py-2 border-t transition-colors ${
            isDark ? 'border-neutral-800 bg-black' : 'border-neutral-200 bg-white'
          }`}
        >
          <button
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-600'
            }`}
          >
            <Plus className="w-4 h-4" />
          </button>

          <div
            className={`flex-1 flex items-center justify-between px-3.5 py-1.5 rounded-full border text-xs ${
              isDark
                ? 'bg-neutral-900 border-neutral-700 text-neutral-400'
                : 'bg-white border-neutral-300 text-neutral-500'
            }`}
          >
            <span>iMessage</span>
            <button className="w-6 h-6 rounded-full bg-[#007aff] text-white flex items-center justify-center">
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
