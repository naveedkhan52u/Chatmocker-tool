/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CHAT_TEMPLATES } from '../../data/templates';
import { ChatTemplate, PlatformType } from '../../types/chat';
import { Sparkles, X, MessageSquare, Check } from 'lucide-react';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (template: ChatTemplate) => void;
  currentPlatform: PlatformType;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({
  isOpen,
  onClose,
  onApplyTemplate,
  currentPlatform,
}) => {
  const [filter, setFilter] = useState<string>('all');

  if (!isOpen) return null;

  const filtered = CHAT_TEMPLATES.filter((tpl) => {
    if (filter === 'all') return true;
    if (filter === 'current') return tpl.platform === currentPlatform;
    return tpl.category.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold">Pre-made Chat Story Templates</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Templates' },
            { id: 'current', label: `Current Platform (${currentPlatform})` },
            { id: 'casual', label: 'Casual' },
            { id: 'influencer', label: 'Influencer' },
            { id: 'meme', label: 'Meme / Viral' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap ${
                filter === f.id
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Template Cards Grid */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-1">
          {filtered.map((tpl) => (
            <div
              key={tpl.id}
              className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-3 min-w-0">
                <img
                  src={tpl.profile.avatar}
                  alt={tpl.profile.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-700"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-slate-100">
                      {tpl.title}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                      {tpl.platform}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {tpl.messages.length} messages
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {tpl.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onApplyTemplate(tpl);
                  onClose();
                }}
                className="w-full sm:w-auto py-2 px-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0"
              >
                <span>Load Template</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
