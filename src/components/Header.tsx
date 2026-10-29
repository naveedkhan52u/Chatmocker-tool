/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, FolderOpen, RefreshCw, Menu, X, ArrowRight, MessageSquare, Info, Mail, Shield } from 'lucide-react';
import { PlatformType } from '../types/chat';

export type AppPage = 'generator' | 'about' | 'contact' | 'privacy';

interface HeaderProps {
  currentPlatform: PlatformType;
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onOpenTemplates?: () => void;
  onOpenExport?: () => void;
  onResetChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenTemplates,
  onOpenExport,
  onResetChat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (p: AppPage) => {
    onNavigate(p);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="shrink-0 bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleNav('generator')}
            className="text-lg font-bold tracking-tight text-white whitespace-nowrap flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-black text-sm shadow-sm">
              CM
            </div>
            <span>Chatmocker.net</span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <button
            onClick={() => handleNav('generator')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              currentPage === 'generator'
                ? 'text-white border-b-2 border-indigo-500 font-bold'
                : 'hover:text-white text-slate-400'
            }`}
          >
            Generator
          </button>

          <button
            onClick={() => handleNav('about')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              currentPage === 'about'
                ? 'text-white border-b-2 border-indigo-500 font-bold'
                : 'hover:text-white text-slate-400'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => handleNav('contact')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              currentPage === 'contact'
                ? 'text-white border-b-2 border-indigo-500 font-bold'
                : 'hover:text-white text-slate-400'
            }`}
          >
            Contact Us & FAQ
          </button>

          <button
            onClick={() => handleNav('privacy')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              currentPage === 'privacy'
                ? 'text-white border-b-2 border-indigo-500 font-bold'
                : 'hover:text-white text-slate-400'
            }`}
          >
            Privacy Policy
          </button>

          {/* Quick template shortcut when on generator */}
          {currentPage === 'generator' && onOpenTemplates && (
            <button
              onClick={onOpenTemplates}
              className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-300 transition-colors whitespace-nowrap pl-2 border-l border-slate-800 cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Templates</span>
            </button>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {currentPage === 'generator' ? (
            <button
              onClick={onOpenExport}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-sm flex items-center gap-2 whitespace-nowrap shrink-0 hover:shadow-indigo-500/25 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Screenshot</span>
            </button>
          ) : (
            <button
              onClick={() => handleNav('generator')}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-sm flex items-center gap-2 whitespace-nowrap shrink-0 hover:shadow-indigo-500/25 cursor-pointer"
            >
              <span>Launch Generator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-xl cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 border-t border-slate-800 bg-slate-900/98 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNav('generator')}
            className={`w-full text-left py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
              currentPage === 'generator'
                ? 'bg-indigo-600/20 text-indigo-300'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <span>Chat Generator</span>
          </button>

          <button
            onClick={() => handleNav('about')}
            className={`w-full text-left py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
              currentPage === 'about'
                ? 'bg-indigo-600/20 text-indigo-300'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Info className="w-4 h-4 text-emerald-400" />
            <span>About Us & Details</span>
          </button>

          <button
            onClick={() => handleNav('contact')}
            className={`w-full text-left py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
              currentPage === 'contact'
                ? 'bg-indigo-600/20 text-indigo-300'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Mail className="w-4 h-4 text-sky-400" />
            <span>Contact Us & FAQ</span>
          </button>

          <button
            onClick={() => handleNav('privacy')}
            className={`w-full text-left py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
              currentPage === 'privacy'
                ? 'bg-indigo-600/20 text-indigo-300'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Privacy Policy</span>
          </button>
        </div>
      )}
    </header>
  );
};
