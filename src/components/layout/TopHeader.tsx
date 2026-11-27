import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

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
  const initial = tenantName.trim().charAt(0).toUpperCase() || 'T';

  return (
    <View style={styles.header}>
      <View style={styles.left}>
        {!isDesktop && (
          <Pressable onPress={onOpenMenu} style={styles.menuBtn} hitSlop={8}>
            <Ionicons name="menu-outline" size={24} color="#0F172A" />
          </Pressable>
        )}
        {!isDesktop && <Text style={styles.mobileTitle}>Unleash Pos</Text>}
      </View>

      <View style={styles.right}>
        <View style={[styles.searchBox, !isDesktop && styles.searchBoxCompact]}>
          <Ionicons name="search-outline" size={16} color="#94A3B8" />
          <TextInput
            value={searchQuery}
            onChangeText={onChangeSearch}
            placeholder="Search anything..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
          {isDesktop && (
            <View style={styles.shortcutBadge}>
              <Text style={styles.shortcutText}>⌘K</Text>
            </View>
          )}
        </View>

        {isDesktop && (
          <Pressable style={styles.iconBtn} hitSlop={6}>
            <Ionicons name="scan-outline" size={18} color="#475569" />
          </Pressable>
        )}

        <View style={styles.userSection}>
          {isDesktop && <Text style={styles.greeting}>Hi, {tenantName}</Text>}
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>
            <View style={styles.onlineDot} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
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
    fontWeight: '700',
    color: '#0F172A',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    justifyContent: 'flex-end',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 36,
    width: 240,
  },
  searchBoxCompact: {
    flex: 1,
    maxWidth: 180,
    width: undefined,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    paddingVertical: 0,
  },
  shortcutBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  shortcutText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  iconBtn: {
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
    fontWeight: '600',
    color: '#1E293B',
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: '#93C5FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1D64D8',
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
    borderColor: '#FFFFFF',
  },
});
