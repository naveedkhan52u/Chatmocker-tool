/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  ChatProfile,
  ChatTemplate,
  DeviceSettings,
  MessageItem,
  PlatformType,
  SenderProfile,
} from './types/chat';
import { DEFAULT_PROFILES, CHAT_TEMPLATES } from './data/templates';
import { Header, AppPage } from './components/Header';
import { Footer } from './components/Footer';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { PlatformSelector } from './components/editor/PlatformSelector';
import { ProfileEditor } from './components/editor/ProfileEditor';
import { DeviceSettingsEditor } from './components/editor/DeviceSettingsEditor';
import { MessageEditor } from './components/editor/MessageEditor';
import { ExportModal } from './components/editor/ExportModal';
import { TemplateModal } from './components/editor/TemplateModal';
import { QuickProfileModal } from './components/editor/QuickProfileModal';
import { DeviceFrame } from './components/mockups/DeviceFrame';
import { WhatsAppMockup } from './components/mockups/WhatsAppMockup';
import { InstagramMockup } from './components/mockups/InstagramMockup';
import { TikTokMockup } from './components/mockups/TikTokMockup';
import { MessengerMockup } from './components/mockups/MessengerMockup';
import { SimpleMockup } from './components/mockups/SimpleMockup';
import {
  MessageSquare,
  User,
  Smartphone,
  Download,
  FolderOpen,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Moon,
  Sun,
  Eye,
  Settings2,
  Camera,
  Upload,
  Edit3,
  ShieldCheck,
} from 'lucide-react';

export default function App() {
  // Navigation Page state: 'generator' | 'about' | 'contact' | 'privacy'
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'about' || hash === 'contact' || hash === 'privacy') {
      return hash as AppPage;
    }
    return 'generator';
  });

  // Sync hash on navigation
  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    window.location.hash = page === 'generator' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'about' || hash === 'contact' || hash === 'privacy') {
        setCurrentPage(hash as AppPage);
      } else {
        setCurrentPage('generator');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Current active social media platform
  const [platform, setPlatform] = useState<PlatformType>('whatsapp');

  // Receiver profiles per platform
  const [profiles, setProfiles] = useState<Record<PlatformType, ChatProfile>>(() => {
    const saved = localStorage.getItem('cm_profiles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_PROFILES;
  });

  // Sender profiles per platform
  const [senderProfiles, setSenderProfiles] = useState<Record<PlatformType, SenderProfile>>(() => {
    const saved = localStorage.getItem('cm_sender_profiles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      whatsapp: { name: 'You', avatar: '/src/assets/images/avatar_alex_turner_1793250680506.jpg' },
      instagram: { name: 'You', avatar: '/src/assets/images/avatar_alex_turner_1793250680506.jpg' },
      tiktok: { name: 'You', avatar: '/src/assets/images/avatar_alex_turner_1793250680506.jpg' },
      messenger: { name: 'You', avatar: '/src/assets/images/avatar_alex_turner_1793250680506.jpg' },
      simple: { name: 'You', avatar: '/src/assets/images/avatar_alex_turner_1793250680506.jpg' },
    };
  });

  // Messages per platform
  const [messagesByPlatform, setMessagesByPlatform] = useState<
    Record<PlatformType, MessageItem[]>
  >(() => {
    const saved = localStorage.getItem('cm_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    const init: Record<PlatformType, MessageItem[]> = {
      whatsapp: CHAT_TEMPLATES.find((t) => t.platform === 'whatsapp')?.messages || [],
      instagram: CHAT_TEMPLATES.find((t) => t.platform === 'instagram')?.messages || [],
      tiktok: CHAT_TEMPLATES.find((t) => t.platform === 'tiktok')?.messages || [],
      messenger: CHAT_TEMPLATES.find((t) => t.platform === 'messenger')?.messages || [],
      simple: CHAT_TEMPLATES.find((t) => t.platform === 'simple')?.messages || [],
    };
    return init;
  });

  // Device & Status Bar Settings
  const [deviceSettings, setDeviceSettings] = useState<DeviceSettings>(() => {
    const saved = localStorage.getItem('cm_device_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      time: '9:41',
      batteryLevel: 88,
      isCharging: false,
      wifiLevel: 3,
      cellularLevel: 4,
      networkType: '5G',
      notchStyle: 'dynamic_island',
      theme: 'light',
      os: 'ios',
      showStatusBar: true,
      showFooterBar: true,
      showWatermark: false,
      watermarkText: 'chatmocker.net',
    };
  });

  // Editor Sub-Navigation Tab: 'messages' | 'profile' | 'device'
  const [activeEditorTab, setActiveEditorTab] = useState<'messages' | 'profile' | 'device'>('messages');

  // Mobile View Tab: 'editor' | 'preview'
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  // Preview zoom scale (0.85, 1, 1.15)
  const [zoomScale, setZoomScale] = useState<number>(1);

  // Modals
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState<boolean>(false);
  const [isQuickProfileOpen, setIsQuickProfileOpen] = useState<boolean>(false);

  // Target element reference for screenshot export
  const exportTargetRef = useRef<HTMLDivElement>(null);
  const quickFileInputRef = useRef<HTMLInputElement>(null);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('cm_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('cm_sender_profiles', JSON.stringify(senderProfiles));
  }, [senderProfiles]);

  useEffect(() => {
    localStorage.setItem('cm_messages', JSON.stringify(messagesByPlatform));
  }, [messagesByPlatform]);

  useEffect(() => {
    localStorage.setItem('cm_device_settings', JSON.stringify(deviceSettings));
  }, [deviceSettings]);

  // Current platform data
  const currentProfile = profiles[platform] || DEFAULT_PROFILES[platform];
  const currentSenderProfile = senderProfiles[platform] || {
    name: 'You',
    avatar: '/src/assets/images/avatar_alex_turner_1793250680506.jpg',
  };
  const currentMessages = messagesByPlatform[platform] || [];

  // Profile update handler
  const handleUpdateProfile = (updated: Partial<ChatProfile>) => {
    setProfiles((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        ...updated,
      },
    }));
  };

  const handleUpdateSender = (updated: Partial<SenderProfile>) => {
    setSenderProfiles((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        ...updated,
      },
    }));
  };

  // Quick single photo upload
  const handleQuickPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleUpdateProfile({ avatar: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  // Device settings update handler
  const handleUpdateDevice = (updated: Partial<DeviceSettings>) => {
    setDeviceSettings((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Message handlers
  const handleAddMessage = (msg: MessageItem) => {
    setMessagesByPlatform((prev) => ({
      ...prev,
      [platform]: [...(prev[platform] || []), msg],
    }));
  };

  const handleUpdateMessage = (id: string, updated: Partial<MessageItem>) => {
    setMessagesByPlatform((prev) => ({
      ...prev,
      [platform]: (prev[platform] || []).map((m) =>
        m.id === id ? { ...m, ...updated } : m
      ),
    }));
  };

  const handleDeleteMessage = (id: string) => {
    setMessagesByPlatform((prev) => ({
      ...prev,
      [platform]: (prev[platform] || []).filter((m) => m.id !== id),
    }));
  };

  const handleReorderMessage = (index: number, direction: 'up' | 'down') => {
    setMessagesByPlatform((prev) => {
      const list = [...(prev[platform] || [])];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      const [removed] = list.splice(index, 1);
      list.splice(targetIndex, 0, removed);
      return {
        ...prev,
        [platform]: list,
      };
    });
  };

  const handleDuplicateMessage = (id: string) => {
    const list = messagesByPlatform[platform] || [];
    const item = list.find((m) => m.id === id);
    if (!item) return;

    const copy: MessageItem = {
      ...item,
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    };

    setMessagesByPlatform((prev) => ({
      ...prev,
      [platform]: [...(prev[platform] || []), copy],
    }));
  };

  const handleClearAllMessages = () => {
    if (confirm('Are you sure you want to clear all messages for this chat?')) {
      setMessagesByPlatform((prev) => ({
        ...prev,
        [platform]: [],
      }));
    }
  };

  const handleResetToDefault = () => {
    const defaultTpl = CHAT_TEMPLATES.find((t) => t.platform === platform);
    if (defaultTpl) {
      setProfiles((prev) => ({
        ...prev,
        [platform]: defaultTpl.profile,
      }));
      setMessagesByPlatform((prev) => ({
        ...prev,
        [platform]: defaultTpl.messages,
      }));
    }
  };

  const handleApplyTemplate = (template: ChatTemplate) => {
    setPlatform(template.platform);
    setProfiles((prev) => ({
      ...prev,
      [template.platform]: template.profile,
    }));
    setMessagesByPlatform((prev) => ({
      ...prev,
      [template.platform]: template.messages,
    }));
  };

  // Render social mockup according to platform
  const renderMockup = () => {
    const editHandler = () => setIsQuickProfileOpen(true);

    switch (platform) {
      case 'whatsapp':
        return (
          <WhatsAppMockup
            profile={currentProfile}
            messages={currentMessages}
            settings={deviceSettings}
            onEditProfile={editHandler}
          />
        );
      case 'instagram':
        return (
          <InstagramMockup
            profile={currentProfile}
            messages={currentMessages}
            settings={deviceSettings}
            onEditProfile={editHandler}
          />
        );
      case 'tiktok':
        return (
          <TikTokMockup
            profile={currentProfile}
            messages={currentMessages}
            settings={deviceSettings}
            onEditProfile={editHandler}
          />
        );
      case 'messenger':
        return (
          <MessengerMockup
            profile={currentProfile}
            messages={currentMessages}
            settings={deviceSettings}
            onEditProfile={editHandler}
          />
        );
      case 'simple':
      default:
        return (
          <SimpleMockup
            profile={currentProfile}
            messages={currentMessages}
            settings={deviceSettings}
            onEditProfile={editHandler}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header
        currentPlatform={platform}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenTemplates={() => setIsTemplateOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onResetChat={handleResetToDefault}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* View 1: About Us Page */}
        {currentPage === 'about' && (
          <AboutPage onGoToGenerator={() => handleNavigate('generator')} />
        )}

        {/* View 2: Contact Us Page */}
        {currentPage === 'contact' && (
          <ContactPage onGoToGenerator={() => handleNavigate('generator')} />
        )}

        {/* View 3: Privacy Policy Page */}
        {currentPage === 'privacy' && (
          <PrivacyPage
            onGoToGenerator={() => handleNavigate('generator')}
            onClearLocalData={handleResetToDefault}
          />
        )}

        {/* View 4: Main Chat Generator Workspace */}
        {currentPage === 'generator' && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1720px] w-full mx-auto">
            {/* Mobile View Toggle Switch (Editor vs Live Preview) */}
            <div className="lg:hidden p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3">
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 flex-1">
                <button
                  onClick={() => setMobileView('editor')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    mobileView === 'editor'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Settings2 className="w-4 h-4" />
                  <span>Editor</span>
                </button>
                <button
                  onClick={() => setMobileView('preview')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    mobileView === 'preview'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Live Preview</span>
                </button>
              </div>

              <button
                onClick={() => setIsExportOpen(true)}
                className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>

            {/* LEFT PANEL: Customization & Navigation Tools */}
            <aside
              className={`w-full lg:w-[480px] xl:w-[520px] shrink-0 border-r border-slate-800/80 bg-slate-950/70 flex flex-col overflow-y-auto ${
                mobileView === 'preview' ? 'hidden lg:flex' : 'flex'
              }`}
            >
              <div className="p-4 sm:p-5 space-y-4">
                {/* 1. Platform Navigation Bar */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Select Social Media Mockup
                  </label>
                  <PlatformSelector
                    currentPlatform={platform}
                    onSelectPlatform={(p) => setPlatform(p)}
                  />
                </div>

                {/* 2. PROMINENT QUICK PROFILE EDITOR BAR */}
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Active Contact Profile
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsQuickProfileOpen(true)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Full Profile Editor</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Profile Image with instant upload click */}
                    <div className="relative group shrink-0">
                      <img
                        src={currentProfile.avatar}
                        alt={currentProfile.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/70 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => quickFileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[9px] cursor-pointer"
                        title="Change profile picture"
                      >
                        <Camera className="w-3.5 h-3.5 mb-0.5" />
                        <span>Change</span>
                      </button>
                      <input
                        ref={quickFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleQuickPhotoUpload}
                      />
                    </div>

                    {/* Inline Name and Subtitle Inputs */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={currentProfile.name}
                          onChange={(e) => handleUpdateProfile({ name: e.target.value })}
                          placeholder="Contact Name..."
                          className="flex-1 px-2.5 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs font-bold text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                          title="Edit contact name"
                        />
                        {currentProfile.isVerified && (
                          <span title="Verified">
                            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={currentProfile.handle}
                          onChange={(e) => handleUpdateProfile({ handle: e.target.value })}
                          placeholder="Username / Phone..."
                          className="flex-1 px-2.5 py-0.5 bg-slate-950/70 border border-slate-800 rounded-md text-[11px] text-slate-300 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Change photo button */}
                    <button
                      type="button"
                      onClick={() => quickFileInputRef.current?.click()}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-colors border border-slate-700 shrink-0 cursor-pointer"
                      title="Upload new photo"
                    >
                      <Upload className="w-4 h-4 text-indigo-400" />
                      <span className="text-[10px]">Photo</span>
                    </button>
                  </div>
                </div>

                {/* 3. Sub-Navigation Tabs */}
                <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setActiveEditorTab('messages')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeEditorTab === 'messages'
                        ? 'bg-slate-800 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Messages ({currentMessages.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveEditorTab('profile')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeEditorTab === 'profile'
                        ? 'bg-slate-800 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Profiles & Avatars</span>
                  </button>

                  <button
                    onClick={() => setActiveEditorTab('device')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeEditorTab === 'device'
                        ? 'bg-slate-800 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                    <span>Phone / Status</span>
                  </button>
                </div>

                {/* 4. Tab Contents */}
                <div className="pt-1">
                  {activeEditorTab === 'messages' && (
                    <MessageEditor
                      platform={platform}
                      messages={currentMessages}
                      onAddMessage={handleAddMessage}
                      onUpdateMessage={handleUpdateMessage}
                      onDeleteMessage={handleDeleteMessage}
                      onReorderMessage={handleReorderMessage}
                      onDuplicateMessage={handleDuplicateMessage}
                      onClearAll={handleClearAllMessages}
                    />
                  )}

                  {activeEditorTab === 'profile' && (
                    <ProfileEditor
                      platform={platform}
                      profile={currentProfile}
                      senderProfile={currentSenderProfile}
                      onChangeProfile={handleUpdateProfile}
                      onChangeSender={handleUpdateSender}
                    />
                  )}

                  {activeEditorTab === 'device' && (
                    <DeviceSettingsEditor
                      platform={platform}
                      settings={deviceSettings}
                      onChange={handleUpdateDevice}
                    />
                  )}
                </div>
              </div>
            </aside>

            {/* RIGHT PANEL: Live Phone Mockup & Preview Workspace */}
            <main
              className={`flex-1 flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 bg-slate-900/30 overflow-y-auto relative ${
                mobileView === 'editor' ? 'hidden lg:flex' : 'flex'
              }`}
            >
              {/* Workspace Toolbar */}
              <div className="w-full max-w-[540px] flex items-center justify-between gap-3 mb-5 p-2 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-md">
                {/* Left: Quick Dark / Light toggle for mockup */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      handleUpdateDevice({
                        theme: deviceSettings.theme === 'dark' ? 'light' : 'dark',
                      })
                    }
                    className="p-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Toggle mockup light/dark theme"
                  >
                    {deviceSettings.theme === 'dark' ? (
                      <>
                        <Sun className="w-4 h-4 text-amber-400" />
                        <span className="hidden sm:inline">Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 text-indigo-400" />
                        <span className="hidden sm:inline">Dark Mode</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setIsTemplateOpen(true)}
                    className="p-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Browse premade story templates"
                  >
                    <FolderOpen className="w-4 h-4 text-indigo-400" />
                    <span className="hidden sm:inline">Templates</span>
                  </button>
                </div>

                {/* Right: Zoom controls & Export */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center bg-slate-950 rounded-xl p-0.5 border border-slate-800">
                    <button
                      onClick={() => setZoomScale((prev) => Math.max(0.75, prev - 0.1))}
                      className="p-1.5 text-slate-400 hover:text-slate-200 cursor-pointer"
                      title="Zoom out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono px-1.5 text-slate-300 tabular-nums">
                      {Math.round(zoomScale * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomScale((prev) => Math.min(1.25, prev + 0.1))}
                      className="p-1.5 text-slate-400 hover:text-slate-200 cursor-pointer"
                      title="Zoom in"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoomScale(1)}
                      className="p-1.5 text-slate-400 hover:text-slate-200 border-l border-slate-800 cursor-pointer"
                      title="Reset 100%"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => setIsExportOpen(true)}
                    className="py-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Click-to-edit hint */}
              <div className="mb-2 text-center">
                <span className="text-[11px] text-slate-400 inline-flex items-center gap-1 bg-slate-900/60 px-2.5 py-1 rounded-full border border-slate-800/80">
                  <Camera className="w-3 h-3 text-indigo-400" />
                  <span>Tip: Click on the profile photo or name in the phone screen to edit!</span>
                </span>
              </div>

              {/* Centered Device Canvas */}
              <div
                className="flex items-center justify-center transition-transform duration-200 origin-top pb-10"
                style={{ transform: `scale(${zoomScale})` }}
              >
                <DeviceFrame settings={deviceSettings} frameRef={exportTargetRef}>
                  {renderMockup()}
                </DeviceFrame>
              </div>
            </main>
          </div>
        )}
      </div>

      {/* Global Footer (Visible on all pages) */}
      <Footer
        onNavigate={handleNavigate}
        onSelectPlatform={(plat) => {
          setPlatform(plat);
          handleNavigate('generator');
        }}
      />

      {/* Quick Profile Modal */}
      <QuickProfileModal
        isOpen={isQuickProfileOpen}
        onClose={() => setIsQuickProfileOpen(false)}
        platform={platform}
        profile={currentProfile}
        onChangeProfile={handleUpdateProfile}
      />

      {/* Export High-Resolution Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        platform={platform}
        targetRef={exportTargetRef}
      />

      {/* Preset Story Templates Modal */}
      <TemplateModal
        isOpen={isTemplateOpen}
        onClose={() => setIsTemplateOpen(false)}
        onApplyTemplate={handleApplyTemplate}
        currentPlatform={platform}
      />
    </div>
  );
}
