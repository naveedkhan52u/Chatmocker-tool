/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { toPng, toJpeg, toBlob } from 'html-to-image';
import jsPDF from 'jspdf';
import { Download, FileText, Copy, Check, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { PlatformType } from '../../types/chat';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: PlatformType;
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  platform,
  targetRef,
}) => {
  const [resolution, setResolution] = useState<number>(2); // 2x retina
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const getExportOptions = () => {
    return {
      pixelRatio: resolution,
      cacheBust: true,
      skipAutoScale: true,
      quality: 0.98,
      backgroundColor: 'transparent',
    };
  };

  const downloadFile = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPng = async () => {
    if (!targetRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(targetRef.current, getExportOptions());
      const filename = `chatmocker_${platform}_${Date.now()}.png`;
      downloadFile(dataUrl, filename);
      showNotification('PNG downloaded in high resolution!');
    } catch (err) {
      console.error('Export PNG failed:', err);
      alert('Failed to generate PNG. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJpeg = async () => {
    if (!targetRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toJpeg(targetRef.current, getExportOptions());
      const filename = `chatmocker_${platform}_${Date.now()}.jpg`;
      downloadFile(dataUrl, filename);
      showNotification('JPG downloaded in high resolution!');
    } catch (err) {
      console.error('Export JPEG failed:', err);
      alert('Failed to generate JPG. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPdf = async () => {
    if (!targetRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(targetRef.current, {
        pixelRatio: 2,
        quality: 1,
      });

      const element = targetRef.current;
      const width = element.offsetWidth;
      const height = element.offsetHeight;

      // Create PDF matching device aspect ratio (in mm or points)
      const orientation = height > width ? 'portrait' : 'landscape';
      const pdf = new jsPDF({
        orientation,
        unit: 'px',
        format: [width, height],
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, width, height, undefined, 'FAST');
      pdf.save(`chatmocker_${platform}_conversation.pdf`);
      showNotification('PDF document exported successfully!');
    } catch (err) {
      console.error('Export PDF failed:', err);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!targetRef.current) return;
    try {
      setIsExporting(true);
      const blob = await toBlob(targetRef.current, { pixelRatio: 2 });
      if (!blob) throw new Error('Blob could not be generated');

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        showNotification('Screenshot copied directly to your clipboard!');
      } else {
        alert('Clipboard image copy is not supported in this browser.');
      }
    } catch (err) {
      console.error('Copy to clipboard failed:', err);
      alert('Could not copy image to clipboard. Try downloading PNG instead.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold">Export Conversation Screenshot</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resolution selector */}
        <div className="my-4 space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">
            Export Quality & Scale
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 1, label: '1x Normal', desc: 'Standard' },
              { val: 2, label: '2x Retina', desc: 'Recommended' },
              { val: 3, label: '3x Ultra HD', desc: 'Crisp Print' },
            ].map((res) => (
              <button
                key={res.val}
                type="button"
                onClick={() => setResolution(res.val)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  resolution === res.val
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold">{res.label}</div>
                <div className="text-[10px] text-slate-500">{res.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Notification pill */}
        {successMsg && (
          <div className="mb-3 p-2.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            disabled={isExporting}
            onClick={handleExportPng}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>
              {isExporting ? 'Generating...' : 'Download High-Resolution PNG'}
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              disabled={isExporting}
              onClick={handleExportPdf}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-700"
            >
              <FileText className="w-4 h-4 text-rose-400" />
              <span>Export as PDF</span>
            </button>

            <button
              disabled={isExporting}
              onClick={handleExportJpeg}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-700"
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>Download JPG</span>
            </button>
          </div>

          <button
            disabled={isExporting}
            onClick={handleCopyToClipboard}
            className="w-full py-2 px-3 bg-slate-950 hover:bg-slate-800/80 disabled:opacity-50 text-slate-300 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors border border-slate-800"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Copy Image to Clipboard</span>
              </>
            )}
          </button>
        </div>

        {/* Footer tip */}
        <p className="text-[11px] text-slate-500 text-center mt-4">
          Chatmocker.net exports clean pixel-perfect mockups without any watermarks or compression.
        </p>
      </div>
    </div>
  );
};
