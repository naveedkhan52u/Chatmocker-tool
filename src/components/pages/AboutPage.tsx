/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Sparkles,
  Shield,
  Layers,
  Cpu,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  Eye,
  Download,
  Share2,
} from 'lucide-react';

interface AboutPageProps {
  onGoToGenerator: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onGoToGenerator }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16 animate-in fade-in duration-200">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Next-Gen Chat Mockup Studio</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white text-balance">
          Craft Authentic Social Media Conversations in Seconds
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed text-balance">
          Chatmocker.net is a browser-native creative engine engineered for screenwriters,
          content creators, UX researchers, educators, and digital storytellers to simulate
          pixel-perfect chat dialogues across leading social messaging platforms.
        </p>
        <div className="pt-2 flex items-center justify-center gap-4">
          <button
            onClick={onGoToGenerator}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/25 cursor-pointer"
          >
            <span>Start Creating Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Core Mission & Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Our Purpose
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why We Built Chatmocker.net
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Existing mock chat generators online are often bloated with invasive popups, forced logins,
            blurry low-res renders, outdated UI components from 2017, or unwanted watermarks.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            We built Chatmocker.net with a clear philosophy: <strong className="text-white">Zero sign-up barrier</strong>,
            instant client-side performance, complete real-time interactivity, and obsessive accuracy to contemporary
            iOS and Android messaging apps.
          </p>
          <div className="space-y-2 pt-2">
            {[
              '100% Client-Side: No account required, no server database logging.',
              'Pixel-Perfect Fidelity: Exact font weights, bubble geometries, and ticks.',
              'Retina & 4K Export: Crisp PNG, JPG, and aspect-ratio scaled PDFs.',
              'Dynamic Real-Time Controls: Switch roles, edit inline, and manage reactions.',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
            <Layers className="w-6 h-6 text-indigo-400" />
            <h3 className="font-bold text-sm text-white">5 Supported Platforms</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              WhatsApp, Instagram DM, TikTok Messages, Facebook Messenger, and Apple iMessage / SMS.
            </p>
          </div>

          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
            <Lock className="w-6 h-6 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Zero Privacy Exposure</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All messages stay inside your local browser memory. No data is sent to external servers.
            </p>
          </div>

          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
            <Zap className="w-6 h-6 text-amber-400" />
            <h3 className="font-bold text-sm text-white">Real-Time Reactive</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every keystroke, reaction emoji, timestamp change, and photo upload updates instantly.
            </p>
          </div>

          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
            <Download className="w-6 h-6 text-sky-400" />
            <h3 className="font-bold text-sm text-white">Retina Export Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Download lossless 2x and 3x PNGs, compressed JPGs, or print-ready PDF formats.
            </p>
          </div>
        </div>
      </div>

      {/* Target Audience / Use Cases */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Applications
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Who Uses Chatmocker.net?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Trusted by creative minds and digital specialists around the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Filmmakers & Scriptwriters',
              desc: 'Simulate high-authenticity mobile screen inserts for cinematic productions, YouTube skits, web series, and short films.',
            },
            {
              title: 'Meme & Social Creators',
              desc: 'Produce viral comedy dialogues, celebrity parodies, relatable relationship threads, and storytelling reels.',
            },
            {
              title: 'UX Designers & Product Teams',
              desc: 'Prototype conversational UI flows, notification mockups, and customer support scenarios for product pitches.',
            },
            {
              title: 'Educators & Cyber Literacy',
              desc: 'Demonstrate cyber safety, social engineering detection, phishing examples, and online conduct in classroom slides.',
            },
            {
              title: 'Novelists & Fiction Writers',
              desc: 'Visualize contemporary epistolary fiction, modern character interactions, and dynamic dialogue exchanges.',
            },
            {
              title: 'Marketing & Ad Storyboards',
              desc: 'Mock up influencer collaborations, brand DM testimonials, and campaign preview decks for clients.',
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
            >
              <h3 className="font-bold text-sm text-white">{card.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsible Use Disclaimer */}
      <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
          <Shield className="w-5 h-5" />
          <span>Responsible Use & Disclaimer</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Chatmocker.net is designed exclusively for creative, educational, parody, storytelling, and
          prototyping purposes. Users are strictly prohibited from using this utility to commit fraud,
          forge evidence, harass individuals, spread malicious misinformation, or impersonate real people
          without their explicit authorization.
        </p>
        <p className="text-xs text-slate-400">
          WhatsApp, Instagram, TikTok, Facebook Messenger, and Apple iMessage are registered trademarks of their
          respective owners (Meta Platforms Inc., ByteDance Ltd., and Apple Inc.). Chatmocker.net is an independent
          educational simulation tool with no affiliation or endorsement from these corporations.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-6 border-t border-slate-800 space-y-3">
        <h3 className="text-xl font-bold text-white">Ready to create your conversation?</h3>
        <p className="text-xs text-slate-400">No account required. Jump straight into the editor.</p>
        <button
          onClick={onGoToGenerator}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <span>Open Chat Generator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
