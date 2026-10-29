/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Lock, Database, Trash2, ArrowRight, EyeOff, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPageProps {
  onGoToGenerator: () => void;
  onClearLocalData?: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({
  onGoToGenerator,
  onClearLocalData,
}) => {
  const handleClear = () => {
    if (confirm('This will clear all your locally stored custom chat messages and reset to defaults. Continue?')) {
      localStorage.removeItem('cm_profiles');
      localStorage.removeItem('cm_sender_profiles');
      localStorage.removeItem('cm_messages');
      localStorage.removeItem('cm_device_settings');
      onClearLocalData?.();
      alert('Local browser storage cleared successfully.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12 animate-in fade-in duration-200">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy by Design & Zero-Logging Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated & Effective Date: October 2026 &middot; Chatmocker.net
        </p>
      </div>

      {/* Quick Summary Box */}
      <div className="p-5 bg-emerald-950/20 rounded-2xl border border-emerald-500/30 space-y-2">
        <div className="flex items-center gap-2 text-emerald-300 text-sm font-bold">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>The 30-Second Summary</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Chatmocker.net does <strong className="text-white">not require an account, does not collect personal identity information, and does not store or transmit your chat conversations to remote servers</strong>. Everything you type, configure, and render runs entirely inside your browser's local sandbox memory.
        </p>
      </div>

      {/* Detailed Sections */}
      <div className="space-y-8 text-xs text-slate-300 leading-relaxed">
        {/* Section 1 */}
        <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-bold">
              1
            </span>
            <span>Client-Side Local Processing</span>
          </h2>
          <p>
            Unlike typical cloud applications that store your data in centralized databases, Chatmocker.net is engineered as a static, client-side Progressive Web Application. When you type messages, attach profile photos, or adjust status timestamps:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Text strings and uploaded media are converted into memory objects within your web browser.</li>
            <li>No data payload is transmitted to any external API or telemetry backend.</li>
            <li>Screenshots and PDF downloads are generated locally using HTML5 Canvas and browser image decoders.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-bold">
              2
            </span>
            <span>Browser LocalStorage & Data Control</span>
          </h2>
          <p>
            For your convenience, your active conversation state, profile names, and device settings are cached in your web browser's local storage (<code className="px-1.5 py-0.5 bg-slate-950 rounded text-indigo-300 font-mono">localStorage</code>). This ensures that if you refresh the page or close your browser tab, your work is not lost.
          </p>
          <p>
            This data never leaves your device and is accessible only to your current browser profile. You have complete autonomy to purge this cached data at any time:
          </p>
          <div className="pt-2">
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 hover:border-rose-500/40 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors border border-slate-700 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Purge All Local Chat Data Now</span>
            </button>
          </div>
        </div>

        {/* Section 3 */}
        <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-bold">
              3
            </span>
            <span>Information We Do NOT Collect</span>
          </h2>
          <p>Because Chatmocker.net has no user authentication or sign-up workflow:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-400">
            <div className="flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>No user emails or passwords stored</span>
            </div>
            <div className="flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>No phone contact sync or address book access</span>
            </div>
            <div className="flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>No location or GPS sensor tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>No sale or sharing of user browsing habits</span>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-bold">
              4
            </span>
            <span>Exported Media & Intellectual Property</span>
          </h2>
          <p>
            When you download an image or PDF from Chatmocker.net:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>The file is synthesized directly in your machine's graphic pipeline via an HTML5 blob.</li>
            <li>No copy or duplicate of the exported screenshot is retained on any remote storage bucket.</li>
            <li>You retain all rights to the creative dialogue, fictional narrative, and graphic arrangements you author.</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-bold">
              5
            </span>
            <span>Trademark & Platform Notice</span>
          </h2>
          <p>
            WhatsApp, Instagram, and Messenger are registered trademarks of Meta Platforms, Inc.
            TikTok is a registered trademark of ByteDance Ltd. iMessage is a registered trademark of Apple Inc.
            Chatmocker.net is an independent creative simulation tool and is not affiliated, associated, authorized,
            endorsed by, or in any way officially connected with these companies.
          </p>
        </div>

        {/* Section 6 */}
        <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-bold">
              6
            </span>
            <span>Contact Regarding Privacy</span>
          </h2>
          <p>
            If you have questions, feedback, or concerns regarding our privacy practices, please contact our
            dedicated privacy officer at:
          </p>
          <p className="font-semibold text-indigo-300">
            Email:{' '}
            <a href="mailto:privacy@chatmocker.net" className="hover:underline">
              privacy@chatmocker.net
            </a>
          </p>
        </div>
      </div>

      {/* Footer Return CTA */}
      <div className="pt-4 border-t border-slate-800 text-center">
        <button
          onClick={onGoToGenerator}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <span>Return to Chat Generator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
