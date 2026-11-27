/**
 * Theme hook and provider supporting both system color scheme and manual dark/light toggling.
 */

import React, { createContext, useContext, useMemo, useState } from 'react';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type ColorMode = 'light' | 'dark';

interface ThemeModeContextValue {
  mode: ColorMode;
  isDark: boolean;
  setMode: (mode: ColorMode) => void;
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [overrideMode, setOverrideMode] = useState<ColorMode | null>(null);

  const mode: ColorMode = overrideMode ?? (systemScheme === 'dark' ? 'dark' : 'light');

  const value = useMemo<ThemeModeContextValue>(
    () => ({
      mode,
      isDark: mode === 'dark',
      setMode: setOverrideMode,
      toggleMode: () => setOverrideMode((prev) => ((prev ?? mode) === 'dark' ? 'light' : 'dark')),
    }),
    [mode]
  );

  return React.createElement(ThemeModeContext.Provider, { value }, children);
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  const systemScheme = useColorScheme();
  const fallbackMode: ColorMode = systemScheme === 'dark' ? 'dark' : 'light';

  if (ctx) return ctx;

  return {
    mode: fallbackMode,
    isDark: fallbackMode === 'dark',
    setMode: () => {},
    toggleMode: () => {},
  };
}

export function useTheme() {
  const { mode } = useThemeMode();
  return Colors[mode];
}
