/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlatformType } from '../../types/chat';
import { MessageSquare, MessageCircle, Instagram, Video, Send } from 'lucide-react';

interface PlatformSelectorProps {
  currentPlatform: PlatformType;
  onSelectPlatform: (platform: PlatformType) => void;
}

interface PlatformOption {
  id: PlatformType;
  name: string;
  badge: string;
  icon: React.ReactNode;
  activeColor: string;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  currentPlatform,
  onSelectPlatform,
}) => {
  const platforms: PlatformOption[] = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      badge: 'iOS & Android',
      icon: <MessageCircle className="w-4 h-4 text-emerald-400" />,
      activeColor: 'bg-emerald-500/15 border-emerald-500 text-emerald-300',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      badge: 'Direct DM',
      icon: <Instagram className="w-4 h-4 text-pink-400" />,
      activeColor: 'bg-pink-500/15 border-pink-500 text-pink-300',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      badge: 'Direct Message',
      icon: <Video className="w-4 h-4 text-cyan-400" />,
      activeColor: 'bg-cyan-500/15 border-cyan-400 text-cyan-300',
    },
    {
      id: 'messenger',
      name: 'Messenger',
      badge: 'Meta / FB',
      icon: <Send className="w-4 h-4 text-blue-400" />,
      activeColor: 'bg-blue-500/15 border-blue-500 text-blue-300',
    },
    {
      id: 'simple',
      name: 'Simple / SMS',
      badge: 'iMessage & Text',
      icon: <MessageSquare className="w-4 h-4 text-sky-400" />,
      activeColor: 'bg-sky-500/15 border-sky-500 text-sky-300',
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 overflow-x-auto scrollbar-none">
        {platforms.map((p) => {
          const isActive = currentPlatform === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPlatform(p.id)}
              className={`flex-1 min-w-[110px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold tracking-tight transition-all whitespace-nowrap border ${
                isActive
                  ? p.activeColor + ' shadow-sm'
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {p.icon}
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
