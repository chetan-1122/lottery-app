import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { useTheme, useThemeMode } from '@/hooks/use-theme';
import { ThemedText } from '@/ui/themedText';
import { ThemedView } from '@/ui/themedView';

interface TopHeaderProps {
  isDesktop: boolean;
  onOpenMenu: () => void;
  searchQuery: string;
  onChangeSearch: (text: string) => void;
  tenantName: string;
}

export function TopHeader({
  isDesktop,
  onOpenMenu,
  searchQuery,
  onChangeSearch,
  tenantName,
}: TopHeaderProps) {
  const theme = useTheme();
  const { isDark, toggleMode } = useThemeMode();
  const initial = tenantName.trim().charAt(0).toUpperCase() || 'T';

  return (
    <ThemedView type="background" style={[styles.header, { borderBottomColor: theme.border }]}>
      <View style={styles.left}>
        {!isDesktop && (
          <Pressable onPress={onOpenMenu} style={styles.menuBtn} hitSlop={8}>
            <Ionicons name="menu-outline" size={24} color={theme.text} />
          </Pressable>
        )}
        {!isDesktop && (
          <ThemedText type="smallBold" style={styles.mobileTitle}>
            Unleash Pos
          </ThemedText>
        )}
      </View>

      <View style={styles.right}>
        <View
          style={[
            styles.searchBox,
            { backgroundColor: theme.inputBackground, borderColor: theme.border },
            !isDesktop && styles.searchBoxCompact,
          ]}>
          <Ionicons name="search-outline" size={16} color={theme.iconMuted} />
          <TextInput
            value={searchQuery}
            onChangeText={onChangeSearch}
            placeholder="Search anything..."
            placeholderTextColor={theme.iconMuted}
            style={[styles.searchInput, { color: theme.text }]}
          />
          {isDesktop && (
            <ThemedView
              type="background"
              style={[styles.shortcutBadge, { borderColor: theme.border }]}>
              <ThemedText type="code" themeColor="textSecondary" style={styles.shortcutText}>
                ⌘K
              </ThemedText>
            </ThemedView>
          )}
        </View>

        {/* Dark / Light Mode Toggle */}
        <Pressable
          onPress={toggleMode}
          style={[
            styles.iconBtn,
            { backgroundColor: theme.inputBackground, borderColor: theme.border },
          ]}
          hitSlop={6}
          accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
          <Ionicons
            name={isDark ? 'sunny-outline' : 'moon-outline'}
            size={18}
            color={isDark ? '#FBBF24' : theme.iconMuted}
          />
        </Pressable>

        {isDesktop && (
          <Pressable style={styles.iconBtnPlain} hitSlop={6}>
            <Ionicons name="scan-outline" size={18} color={theme.iconMuted} />
          </Pressable>
        )}

        <View style={styles.userSection}>
          {isDesktop && (
            <ThemedText type="smallBold" style={styles.greeting}>
              Hi, {tenantName}
            </ThemedText>
          )}
          <View style={styles.avatarWrap}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: theme.primarySoft, borderColor: theme.primary },
              ]}>
              <ThemedText type="smallBold" style={[styles.avatarText, { color: theme.primary }]}>
                {initial}
              </ThemedText>
            </View>
            <View style={[styles.onlineDot, { borderColor: theme.background }]} />
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuBtn: {
    padding: 4,
    borderRadius: 8,
  },
  mobileTitle: {
    fontSize: 16,
    lineHeight: 20,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 36,
    width: 240,
  },
  searchBoxCompact: {
    flex: 1,
    maxWidth: 170,
    width: undefined,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    paddingVertical: 0,
  },
  shortcutBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
  },
  shortcutText: {
    fontSize: 11,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnPlain: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  greeting: {
    fontSize: 13,
    lineHeight: 18,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    lineHeight: 16,
  },
  onlineDot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#22C55E',
    borderWidth: 1.5,
  },
});
