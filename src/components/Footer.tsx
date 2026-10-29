/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlatformType } from '../types/chat';
import { Lock, Heart, Shield, MessageCircle, Instagram, Video, Send, MessageSquare } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'generator' | 'about' | 'contact' | 'privacy') => void;
  onSelectPlatform?: (platform: PlatformType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectPlatform }) => {
  const handlePlatformClick = (p: PlatformType) => {
    onSelectPlatform?.(p);
    onNavigate('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="shrink-0 bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-[1720px] mx-auto px-6 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div
              onClick={() => onNavigate('generator')}
              className="flex items-center gap-2 cursor-pointer text-white font-bold text-base"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-black text-xs">
                CM
              </div>
              <span>Chatmocker.net</span>
            </div>
            <p className="text-[11.5px] text-slate-400 leading-relaxed">
              Create pixel-perfect, authentic fake social media chat screenshots for videos,
              memes, scriptwriting, and UI testing in high-resolution PNG & PDF.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span>100% Client-Side &middot; Zero Data Stored</span>
            </div>
          </div>

          {/* Col 2: Supported Social Mockups */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Chat Generators
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => handlePlatformClick('whatsapp')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Generator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePlatformClick('instagram')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram DM Generator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePlatformClick('tiktok')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-cyan-400" />
                  <span>TikTok Message Generator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePlatformClick('messenger')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-blue-400" />
                  <span>Messenger Generator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePlatformClick('simple')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                  <span>iMessage / SMS Generator</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Company & Legal
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    onNavigate('generator');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mockup Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us & FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('privacy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy & Data Security
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Disclaimer & Responsible Use */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Usage & Parody Notice
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              This tool is intended strictly for creative, parody, educational, screenplay, and entertainment purposes.
              Do not use generated assets to forge legal evidence, perpetrate fraud, or deceive or harass others.
            </p>
            <p className="text-[10px] text-slate-500">
              WhatsApp, Instagram, TikTok, Messenger, and Apple are registered trademarks of their respective owners.
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>&copy; {new Date().getFullYear()} Chatmocker.net &middot; All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-300 transition-colors">
              Privacy
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 transition-colors">
              Support
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-slate-300 transition-colors">
              About
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
