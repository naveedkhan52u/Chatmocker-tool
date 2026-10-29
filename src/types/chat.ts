/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PlatformType = 'whatsapp' | 'instagram' | 'tiktok' | 'messenger' | 'simple';

export type MessageRole = 'sender' | 'receiver';

export type MessageType = 'text' | 'image' | 'audio' | 'system';

export type MessageDeliveryStatus = 'sending' | 'sent' | 'delivered' | 'read';

export interface MessageItem {
  id: string;
  role: MessageRole;
  type: MessageType;
  text: string;
  imageUrl?: string;
  audioDuration?: string;
  timestamp: string;
  status?: MessageDeliveryStatus;
  reaction?: string;
  liked?: boolean;
}

export interface ChatProfile {
  name: string;
  handle: string;
  avatar: string;
  status: string;
  isVerified: boolean;
  isOnline: boolean;
  phoneOrSubtitle?: string;
}

export interface SenderProfile {
  name: string;
  avatar: string;
}

export type NotchStyle = 'dynamic_island' | 'notch' | 'punch_hole' | 'none';

export interface DeviceSettings {
  time: string;
  batteryLevel: number;
  isCharging: boolean;
  wifiLevel: 1 | 2 | 3;
  cellularLevel: 1 | 2 | 3 | 4;
  networkType: '5G' | 'LTE' | '4G' | 'WiFi';
  notchStyle: NotchStyle;
  theme: 'light' | 'dark';
  os: 'ios' | 'android';
  showStatusBar: boolean;
  showFooterBar: boolean;
  showWatermark: boolean;
  watermarkText: string;
}

export interface ChatTemplate {
  id: string;
  title: string;
  category: string;
  platform: PlatformType;
  description: string;
  profile: ChatProfile;
  messages: MessageItem[];
}
