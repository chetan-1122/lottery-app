/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0F172A',
    background: '#FFFFFF',
    backgroundElement: '#F5F7FA',
    backgroundSelected: '#E2E8F0',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    borderSubtle: '#F1F5F9',
    inputBackground: '#F8FAFC',
    primary: '#1D64D8',
    primarySoft: '#EAF2FF',
    iconMuted: '#64748B',
    alertBg: '#FFFBEB',
    alertBorder: '#FDE68A',
    alertText: '#B45309',
    badgeDangerBg: '#FEE2E2',
    badgeDangerText: '#DC2626',
    chartGrid: '#E2E8F0',
    chartLabel: '#64748B',
  },
  dark: {
    text: '#F8FAFC',
    background: '#111827',
    backgroundElement: '#0B1120',
    backgroundSelected: '#1E293B',
    textSecondary: '#94A3B8',
    border: '#1F2937',
    borderSubtle: '#1E293B',
    inputBackground: '#1E293B',
    primary: '#60A5FA',
    primarySoft: '#1E3A5F',
    iconMuted: '#94A3B8',
    alertBg: '#2A1F0D',
    alertBorder: '#78350F',
    alertText: '#FBBF24',
    badgeDangerBg: '#451A1A',
    badgeDangerText: '#F87171',
    chartGrid: '#1F2937',
    chartLabel: '#94A3B8',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
