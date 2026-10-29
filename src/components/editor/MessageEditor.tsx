/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { MessageDeliveryStatus, MessageItem, MessageRole, MessageType, PlatformType } from '../../types/chat';
import { Plus, Trash2, ArrowUp, ArrowDown, Copy, Edit3, Image, Mic, MessageSquare, Calendar, Smile, Check } from 'lucide-react';

interface MessageEditorProps {
  platform: PlatformType;
  messages: MessageItem[];
  onAddMessage: (msg: MessageItem) => void;
  onUpdateMessage: (id: string, updated: Partial<MessageItem>) => void;
  onDeleteMessage: (id: string) => void;
  onReorderMessage: (index: number, direction: 'up' | 'down') => void;
  onDuplicateMessage: (id: string) => void;
  onClearAll: () => void;
}

const COMMON_REACTIONS = ['❤️', '😂', '😮', '😢', '👍', '🔥', '👏', '🙏', '💀'];
const QUICK_EMOJIS = ['😊', '😂', '❤️', '🔥', '✨', '🙌', '👀', '💯', '🍕', '🎉'];

export const MessageEditor: React.FC<MessageEditorProps> = ({
  platform,
  messages,
  onAddMessage,
  onUpdateMessage,
  onDeleteMessage,
  onReorderMessage,
  onDuplicateMessage,
  onClearAll,
}) => {
  // New Message State
  const [role, setRole] = useState<MessageRole>('sender');
  const [type, setType] = useState<MessageType>('text');
  const [text, setText] = useState('');
  const [timestamp, setTimestamp] = useState('10:24 AM');
  const [status, setStatus] = useState<MessageDeliveryStatus>('read');
  const [reaction, setReaction] = useState<string>('');
  const [audioDuration, setAudioDuration] = useState('0:24');
  const [imageUrl, setImageUrl] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() && type === 'text' && !imageUrl) return;

    if (editingId) {
      onUpdateMessage(editingId, {
        role,
        type,
        text,
        imageUrl: type === 'image' ? imageUrl : undefined,
        audioDuration: type === 'audio' ? audioDuration : undefined,
        timestamp,
        status: role === 'sender' ? status : undefined,
        reaction: reaction || undefined,
      });
      setEditingId(null);
    } else {
      const newMessage: MessageItem = {
        id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        role,
        type,
        text: text.trim(),
        imageUrl: type === 'image' ? imageUrl : undefined,
        audioDuration: type === 'audio' ? audioDuration : undefined,
        timestamp: timestamp.trim() || '10:24 AM',
        status: role === 'sender' ? status : undefined,
        reaction: reaction || undefined,
      };
      onAddMessage(newMessage);
    }

    // Reset inputs but advance timestamp slightly
    setText('');
    setImageUrl('');
    setReaction('');
  };

  const handleStartEdit = (msg: MessageItem) => {
    setEditingId(msg.id);
    setRole(msg.role);
    setType(msg.type);
    setText(msg.text || '');
    setTimestamp(msg.timestamp || '10:24 AM');
    setStatus(msg.status || 'read');
    setReaction(msg.reaction || '');
    if (msg.audioDuration) setAudioDuration(msg.audioDuration);
    if (msg.imageUrl) setImageUrl(msg.imageUrl);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setText('');
    setImageUrl('');
    setReaction('');
  };

  return (
    <div className="space-y-4">
      {/* Compose Message Form */}
      <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200">
            {editingId ? 'Edit Message' : 'Compose Message'}
          </span>
          {editingId && (
            <button
              onClick={handleCancelEdit}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {/* Sender vs Receiver Role Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setRole('receiver')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              role === 'receiver'
                ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
            <span>Receiver (Them)</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('sender')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              role === 'sender'
                ? 'bg-indigo-600 text-white shadow-sm border border-indigo-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Sender (You)</span>
          </button>
        </div>

        {/* Message Type Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {(
            [
              { id: 'text', label: 'Text', icon: <MessageSquare className="w-3.5 h-3.5" /> },
              { id: 'audio', label: 'Voice Note', icon: <Mic className="w-3.5 h-3.5" /> },
              { id: 'image', label: 'Photo/Media', icon: <Image className="w-3.5 h-3.5" /> },
              { id: 'system', label: 'Date Badge', icon: <Calendar className="w-3.5 h-3.5" /> },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap ${
                type === t.id
                  ? 'bg-slate-800 border-indigo-500 text-indigo-300'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Text Input & Quick Emojis */}
        {type !== 'audio' && (
          <div>
            <textarea
              rows={2}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder={
                type === 'system'
                  ? 'e.g. TODAY or YESTERDAY AT 10:15 AM'
                  : 'Type your message (Press Enter to add)...'
              }
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
            {type === 'text' && (
              <div className="flex items-center gap-1 mt-1 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[10px] text-slate-500 mr-1">Insert:</span>
                {QUICK_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setText((prev) => prev + emoji)}
                    className="p-1 hover:bg-slate-800 rounded text-xs transition-colors shrink-0"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Image Upload Input */}
        {type === 'image' && (
          <div className="p-3 bg-slate-950 rounded-xl border border-dashed border-slate-800 text-center">
            {imageUrl ? (
              <div className="relative inline-block">
                <img
                  src={imageUrl}
                  alt="Attachment preview"
                  className="max-h-28 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg inline-flex items-center gap-1.5 transition-colors"
                >
                  <Image className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Choose Photo File</span>
                </button>
                <p className="text-[10px] text-slate-500">Supports PNG, JPG, WebP</p>
              </div>
            )}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        )}

        {/* Voice Note Duration */}
        {type === 'audio' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">
                Voice Note Duration
              </label>
              <input
                type="text"
                value={audioDuration}
                onChange={(e) => setAudioDuration(e.target.value)}
                placeholder="0:32"
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">
                Caption / Label (Optional)
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Voice message"
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {/* Timestamp, Delivery Status, and Reaction */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {/* Timestamp */}
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Timestamp</label>
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              placeholder="10:24 AM"
            />
          </div>

          {/* Delivery Status (Sender Only) */}
          {role === 'sender' && type !== 'system' && (
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as MessageDeliveryStatus)}
                className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="read">Read (Blue Check / Seen)</option>
                <option value="delivered">Delivered (Double Check)</option>
                <option value="sent">Sent (Single Check)</option>
                <option value="sending">Sending (Clock)</option>
              </select>
            </div>
          )}

          {/* Emoji Reaction */}
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Reaction Badge</label>
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={reaction}
                onChange={(e) => setReaction(e.target.value)}
                placeholder="❤️ or empty"
                className="w-16 px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 text-center focus:outline-none focus:border-indigo-500"
              />
              <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none">
                {COMMON_REACTIONS.slice(0, 4).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setReaction(reaction === r ? '' : r)}
                    className={`w-6 h-6 rounded flex items-center justify-center text-xs transition-colors ${
                      reaction === r ? 'bg-indigo-600/40 border border-indigo-500' : 'hover:bg-slate-800'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={() => handleSubmit()}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          {editingId ? (
            <>
              <Check className="w-4 h-4" />
              <span>Update Message</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add Message</span>
            </>
          )}
        </button>
      </div>

      {/* Messages List & Management */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-slate-400">
            Conversation Messages ({messages.length})
          </span>
          {messages.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-[11px] text-rose-400/80 hover:text-rose-400 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-1.5 max-h-[290px] overflow-y-auto pr-1">
          {messages.map((msg, index) => {
            const isSender = msg.role === 'sender';
            const isSystem = msg.type === 'system';

            return (
              <div
                key={msg.id}
                className={`flex items-center justify-between gap-2 p-2 rounded-xl border transition-colors ${
                  editingId === msg.id
                    ? 'bg-indigo-950/40 border-indigo-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Left: Role indicator badge + preview */}
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <button
                    onClick={() =>
                      onUpdateMessage(msg.id, {
                        role: isSender ? 'receiver' : 'sender',
                      })
                    }
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border shrink-0 transition-colors ${
                      isSystem
                        ? 'bg-slate-800 text-slate-400 border-slate-700'
                        : isSender
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                    title="Click to toggle Sender / Receiver"
                  >
                    {isSystem ? 'Date' : isSender ? 'You' : 'Them'}
                  </button>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-200 truncate">
                      {msg.type === 'audio'
                        ? `🎵 Voice note (${msg.audioDuration || '0:24'})`
                        : msg.type === 'image'
                        ? '📷 Photo attachment'
                        : msg.text || '(empty)'}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span>{msg.timestamp}</span>
                      {msg.reaction && (
                        <span>Reaction: {msg.reaction}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1 shrink-0 text-slate-400">
                  {/* Move Up */}
                  <button
                    disabled={index === 0}
                    onClick={() => onReorderMessage(index, 'up')}
                    className="p-1 hover:text-slate-200 disabled:opacity-20 transition-opacity"
                    title="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  {/* Move Down */}
                  <button
                    disabled={index === messages.length - 1}
                    onClick={() => onReorderMessage(index, 'down')}
                    className="p-1 hover:text-slate-200 disabled:opacity-20 transition-opacity"
                    title="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => handleStartEdit(msg)}
                    className="p-1 hover:text-indigo-400 transition-colors"
                    title="Edit message"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {/* Duplicate */}
                  <button
                    onClick={() => onDuplicateMessage(msg.id)}
                    className="p-1 hover:text-slate-200 transition-colors"
                    title="Duplicate message"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => onDeleteMessage(msg.id)}
                    className="p-1 hover:text-rose-400 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
