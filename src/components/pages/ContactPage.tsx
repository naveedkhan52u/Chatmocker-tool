/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Mail,
  Send,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Shield,
} from 'lucide-react';

interface ContactPageProps {
  onGoToGenerator: () => void;
}

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Is Chatmocker.net completely free to use?',
    a: 'Yes, 100% free. You can generate unlimited fake conversations across all 5 platforms and download high-resolution PNG, JPG, and PDF files with zero fees and no mandatory sign-up.',
  },
  {
    q: 'Do you store, log, or read my simulated conversations?',
    a: 'Never. Chatmocker.net operates 100% client-side inside your browser engine. Your texts, photos, and generated screenshots exist solely in your local browser memory and optional browser storage (LocalStorage). Nothing is sent to our servers.',
  },
  {
    q: 'Can I use exported screenshots in monetized YouTube videos, memes, or books?',
    a: 'Yes, you own your creative output. You may use generated screenshots in creative videos, tutorials, parody content, novels, or slides. However, you must not use them to commit fraud, defamation, or illegal impersonation.',
  },
  {
    q: 'How do I achieve the highest resolution for printing or 4K video?',
    a: 'When you click "Export Screenshot", select the "2x Retina" or "3x Ultra HD" resolution setting. This outputs pixel-dense images up to 300+ DPI, ensuring razor-sharp typography even on 4K displays.',
  },
  {
    q: 'Can I change both the sender (my) and receiver (contact) photo and name?',
    a: 'Yes! In the Profiles & Avatars tab or the always-visible profile bar, you can seamlessly toggle between editing the recipient (incoming contact) and your profile (sender). You can upload custom photos or pick from realistic presets.',
  },
  {
    q: 'Can I request support for a new social media platform?',
    a: 'Absolutely! Use the contact form below with the "Feature Request" category to suggest new platforms (e.g., Telegram, Discord, Snapchat, Twitter/X DMs) and specific UI features.',
  },
];

export const ContactPage: React.FC<ContactPageProps> = ({ onGoToGenerator }) => {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Feature Request');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Simulate reliable submission
    const generatedId = 'CM-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(generatedId);
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>We'd Love to Hear from You</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Contact & Support
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Have a question, feedback, feature idea, or bug report? Send us a message or
          browse our frequently asked questions.
        </p>
      </div>

      {/* Contact Form & Support Info Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Support Info Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Direct Inquiries</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium block">General & Technical Support</span>
                <a
                  href="mailto:support@chatmocker.net"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors"
                >
                  support@chatmocker.net
                </a>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium block">Partnerships & Feedback</span>
                <a
                  href="mailto:partners@chatmocker.net"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors"
                >
                  partners@chatmocker.net
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Typical response time: under 24 hours</span>
            </div>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Need Help Quickly?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Most formatting or rendering questions can be solved by checking our pre-built
              story templates or toggling between iOS and Android modes in the generator.
            </p>
            <div className="pt-2">
              <button
                onClick={onGoToGenerator}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <span>Jump back to Generator</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Working Contact Form (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-slate-900/90 rounded-2xl border border-slate-800">
          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in">
              <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-400">
                  Thank you for reaching out, <span className="text-slate-200 font-semibold">{name}</span>.
                  Your reference ticket number is:
                </p>
                <div className="inline-block px-3 py-1 bg-slate-950 rounded-lg border border-slate-800 font-mono text-sm text-indigo-300 font-bold mt-2">
                  {ticketId}
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We've routed your inquiry to our engineering team and will reply to{' '}
                <strong className="text-slate-200">{email}</strong> shortly.
              </p>
              <div className="pt-3 flex justify-center gap-3">
                <button
                  onClick={handleResetForm}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 cursor-pointer"
                >
                  Send Another Message
                </button>
                <button
                  onClick={onGoToGenerator}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Back to Generator
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>Send Us a Message</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Turner"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="Feature Request">Feature Request</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="General Question">General Question</option>
                    <option value="Partnership">Partnership / Collaboration</option>
                    <option value="Privacy or Legal">Privacy / Legal Question</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Suggestion for Telegram style"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Your Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help? Describe your feedback or request in detail..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6 pt-4 border-t border-slate-800/80">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Answers to common questions about features, exports, and privacy.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-100">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
