import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { SIDEBAR_FOOTER_ITEM, SIDEBAR_SECTIONS } from '@/constants/navigation';
import { useTheme } from '@/hooks/use-theme';
import { StoreAccount, StoreLocation } from '@/types/dashboard';
import { ThemedText } from '@/ui/themedText';
import { ThemedView } from '@/ui/themedView';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
  activeItemId: string;
  onSelectItem: (itemId: string) => void;
  selectedAccount: StoreAccount;
  selectedLocation: StoreLocation;
  onOpenStoreSwitcher: () => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

function BrandLogoMark() {
  return (
    <Svg width={28} height={28} viewBox="0 0 32 32" fill="none">
      <Defs>
        <LinearGradient id="unleashGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#EC4899" />
          <Stop offset="45%" stopColor="#6366F1" />
          <Stop offset="100%" stopColor="#06B6D4" />
        </LinearGradient>
      </Defs>
      <Path
        d="M7 5V17.5C7 22.7467 11.0294 27 16 27C20.9706 27 25 22.7467 25 17.5V5"
        stroke="url(#unleashGrad)"
        strokeWidth={4.5}
        strokeLinecap="round"
      />
      <Path
        d="M12.5 5V16.5C12.5 18.7091 14.067 20.5 16 20.5C17.933 20.5 19.5 18.7091 19.5 16.5V5"
        stroke="url(#unleashGrad)"
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.75}
      />
    </Svg>
  );
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  activeItemId,
  onSelectItem,
  selectedAccount,
  selectedLocation,
  onOpenStoreSwitcher,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}: SidebarProps) {
  const theme = useTheme();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  return (
    <ThemedView
      type="background"
      style={[
        styles.container,
        { borderRightColor: theme.border },
        collapsed && !isMobileDrawer && styles.containerCollapsed,
      ]}>
      {/* Brand Header */}
      <View style={[styles.brandRow, collapsed && !isMobileDrawer && styles.brandRowCollapsed]}>
        <Pressable
          style={styles.brandLeft}
          onPress={collapsed && onToggleCollapse ? onToggleCollapse : undefined}>
          <BrandLogoMark />
          {(!collapsed || isMobileDrawer) && (
            <ThemedText type="default" style={styles.brandTitle}>
              Unleash Pos
            </ThemedText>
          )}
        </Pressable>

        {isMobileDrawer ? (
          <Pressable onPress={onCloseMobileDrawer} style={styles.collapseBtn} hitSlop={8}>
            <Ionicons name="close" size={20} color={theme.iconMuted} />
          </Pressable>
        ) : (
          !collapsed &&
          onToggleCollapse && (
            <Pressable onPress={onToggleCollapse} style={styles.collapseBtn} hitSlop={8}>
              <Ionicons name="chevron-back-outline" size={16} color={theme.iconMuted} />
              <Ionicons
                name="chevron-back-outline"
                size={16}
                color={theme.iconMuted}
                style={{ marginLeft: -10 }}
              />
            </Pressable>
          )
        )}
      </View>

      {/* Store Switcher Tile */}
      <View style={styles.storeSection}>
        <Pressable
          style={[
            styles.storeCard,
            { backgroundColor: theme.inputBackground, borderColor: theme.borderSubtle },
            collapsed && !isMobileDrawer && styles.storeCardCollapsed,
          ]}
          onPress={onOpenStoreSwitcher}>
          <View style={[styles.storeAvatar, { backgroundColor: theme.primarySoft }]}>
            <ThemedText type="smallBold" style={[styles.storeAvatarText, { color: theme.primary }]}>
              {selectedLocation.initials}
            </ThemedText>
          </View>
          {(!collapsed || isMobileDrawer) && (
            <>
              <View style={styles.storeInfo}>
                <ThemedText type="smallBold" style={styles.storeName} numberOfLines={1}>
                  {selectedLocation.name}
                </ThemedText>
                <ThemedText
                  type="small"
                  themeColor="textSecondary"
                  style={styles.storeTenant}
                  numberOfLines={1}>
                  {selectedAccount.name}
                </ThemedText>
              </View>
              <Ionicons name="swap-vertical-outline" size={16} color={theme.iconMuted} />
            </>
          )}
        </Pressable>
      </View>

      {/* Navigation List */}
      <ScrollView
        style={styles.navScroll}
        contentContainerStyle={styles.navScrollContent}
        showsVerticalScrollIndicator={false}>
        {SIDEBAR_SECTIONS.map((section) => (
          <View key={section.id} style={styles.sectionBlock}>
            {section.title && (!collapsed || isMobileDrawer) && (
              <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
                {section.title}
              </ThemedText>
            )}

            {section.items.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isExpanded = Boolean(expandedGroups[item.id]);
              const isActive =
                activeItemId === item.id ||
                Boolean(item.children?.some((child) => child.id === activeItemId));

              return (
                <View key={item.id}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.navItem,
                      collapsed && !isMobileDrawer && styles.navItemCollapsed,
                      isActive && !hasChildren && { backgroundColor: theme.primarySoft },
                      pressed && styles.navItemPressed,
                    ]}
                    onPress={() => {
                      if (hasChildren) {
                        if (collapsed && !isMobileDrawer && onToggleCollapse) {
                          onToggleCollapse();
                          setExpandedGroups((prev) => ({ ...prev, [item.id]: true }));
                        } else {
                          toggleGroup(item.id);
                        }
                      } else {
                        onSelectItem(item.id);
                        if (isMobileDrawer && onCloseMobileDrawer) {
                          onCloseMobileDrawer();
                        }
                      }
                    }}>
                    <Ionicons
                      name={item.icon}
                      size={18}
                      color={isActive ? theme.primary : theme.iconMuted}
                    />
                    {(!collapsed || isMobileDrawer) && (
                      <>
                        <ThemedText
                          type={isActive ? 'smallBold' : 'small'}
                          style={[styles.navLabel, isActive && { color: theme.primary }]}
                          numberOfLines={1}>
                          {item.label}
                        </ThemedText>
                        {hasChildren && (
                          <Ionicons
                            name={isExpanded ? 'chevron-down' : 'chevron-forward'}
                            size={14}
                            color={theme.iconMuted}
                          />
                        )}
                      </>
                    )}
                  </Pressable>

                  {/* Sub-items */}
                  {hasChildren && isExpanded && (!collapsed || isMobileDrawer) && (
                    <View style={styles.subList}>
                      {item.children?.map((child) => {
                        const childActive = activeItemId === child.id;
                        return (
                          <Pressable
                            key={child.id}
                            style={({ pressed }) => [
                              styles.subItem,
                              childActive && { backgroundColor: theme.primarySoft },
                              pressed && styles.navItemPressed,
                            ]}
                            onPress={() => {
                              onSelectItem(child.id);
                              if (isMobileDrawer && onCloseMobileDrawer) {
                                onCloseMobileDrawer();
                              }
                            }}>
                            <View
                              style={[
                                styles.subDot,
                                { backgroundColor: childActive ? theme.primary : theme.iconMuted },
                              ]}
                            />
                            <ThemedText
                              type={childActive ? 'smallBold' : 'small'}
                              themeColor={childActive ? undefined : 'textSecondary'}
                              style={[styles.subLabel, childActive && { color: theme.primary }]}
                              numberOfLines={1}>
                              {child.label}
                            </ThemedText>
                          </Pressable>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* Footer Settings */}
      <View style={[styles.footer, { borderTopColor: theme.borderSubtle }]}>
        <Pressable
          style={({ pressed }) => [
            styles.navItem,
            collapsed && !isMobileDrawer && styles.navItemCollapsed,
            activeItemId === SIDEBAR_FOOTER_ITEM.id && { backgroundColor: theme.primarySoft },
            pressed && styles.navItemPressed,
          ]}
          onPress={() => {
            onSelectItem(SIDEBAR_FOOTER_ITEM.id);
            if (isMobileDrawer && onCloseMobileDrawer) {
              onCloseMobileDrawer();
            }
          }}>
          <Ionicons
            name={SIDEBAR_FOOTER_ITEM.icon}
            size={18}
            color={activeItemId === SIDEBAR_FOOTER_ITEM.id ? theme.primary : theme.iconMuted}
          />
          {(!collapsed || isMobileDrawer) && (
            <ThemedText
              type={activeItemId === SIDEBAR_FOOTER_ITEM.id ? 'smallBold' : 'small'}
              style={[
                styles.navLabel,
                activeItemId === SIDEBAR_FOOTER_ITEM.id && { color: theme.primary },
              ]}>
              {SIDEBAR_FOOTER_ITEM.label}
            </ThemedText>
          )}
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    borderRightWidth: 1,
    flexDirection: 'column',
    height: '100%',
  },
  containerCollapsed: {
    width: 68,
  },
  brandRow: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRowCollapsed: {
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandTitle: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  collapseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: 6,
  },
  storeSection: {
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  storeCardCollapsed: {
    justifyContent: 'center',
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  storeAvatar: {
    width: 34,
    height: 34,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeAvatarText: {
    fontSize: 12,
    lineHeight: 16,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 13,
    lineHeight: 17,
  },
  storeTenant: {
    fontSize: 11,
    lineHeight: 15,
    marginTop: 1,
  },
  navScroll: {
    flex: 1,
  },
  navScrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  sectionBlock: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.8,
    paddingHorizontal: 10,
    marginBottom: 6,
    marginTop: 4,
    opacity: 0.75,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 9,
    marginBottom: 2,
  },
  navItemCollapsed: {
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  navItemPressed: {
    opacity: 0.75,
  },
  navLabel: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 18,
  },
  subList: {
    paddingLeft: 26,
    marginTop: 2,
    marginBottom: 6,
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  subDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  subLabel: {
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
