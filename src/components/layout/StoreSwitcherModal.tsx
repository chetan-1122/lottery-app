import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { StoreAccount, StoreLocation } from '@/types/dashboard';
import { ThemedText } from '@/ui/themedText';
import { ThemedView } from '@/ui/themedView';

interface StoreSwitcherModalProps {
  visible: boolean;
  onClose: () => void;
  accounts: StoreAccount[];
  locations: StoreLocation[];
  selectedAccount: StoreAccount;
  selectedLocation: StoreLocation;
  onSelectAccount: (account: StoreAccount) => void;
  onSelectLocation: (location: StoreLocation) => void;
}

export function StoreSwitcherModal({
  visible,
  onClose,
  accounts,
  locations,
  selectedAccount,
  selectedLocation,
  onSelectAccount,
  onSelectLocation,
}: StoreSwitcherModalProps) {
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const filteredLocations = locations.filter((loc) => loc.accountId === selectedAccount.id);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.cardWrap} onPress={(e) => e.stopPropagation()}>
          <ThemedView type="background" style={styles.card}>
            <View style={styles.header}>
              <ThemedText type="smallBold" style={styles.title}>
                Switch store
              </ThemedText>
              <Pressable onPress={onClose} hitSlop={8} style={styles.closeBtn}>
                <Ionicons name="close" size={18} color="#64748B" />
              </Pressable>
            </View>

            <View style={styles.divider} />

            <View style={styles.body}>
              <ThemedText type="smallBold" themeColor="textSecondary" style={styles.fieldLabel}>
                ACCOUNT
              </ThemedText>
              <Pressable
                style={styles.selectBox}
                onPress={() => {
                  setAccountDropdownOpen((prev) => !prev);
                  setLocationDropdownOpen(false);
                }}>
                <View style={styles.selectLeft}>
                  <Ionicons name="business-outline" size={16} color="#2563EB" />
                  <ThemedText type="small" style={styles.selectText}>
                    {selectedAccount.name}
                  </ThemedText>
                </View>
                <Ionicons
                  name={accountDropdownOpen ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color="#64748B"
                />
              </Pressable>

              {accountDropdownOpen && (
                <ThemedView type="background" style={styles.dropdownMenu}>
                  {accounts.map((acc) => {
                    const isActive = acc.id === selectedAccount.id;
                    return (
                      <Pressable
                        key={acc.id}
                        style={[styles.dropdownItem, isActive && styles.dropdownItemActive]}
                        onPress={() => {
                          onSelectAccount(acc);
                          const firstLoc = locations.find((l) => l.accountId === acc.id);
                          if (firstLoc) onSelectLocation(firstLoc);
                          setAccountDropdownOpen(false);
                        }}>
                        <ThemedText
                          type={isActive ? 'smallBold' : 'small'}
                          style={[
                            styles.dropdownItemText,
                            isActive && styles.dropdownItemTextActive,
                          ]}>
                          {acc.name}
                        </ThemedText>
                        {isActive && <Ionicons name="checkmark" size={15} color="#2563EB" />}
                      </Pressable>
                    );
                  })}
                </ThemedView>
              )}

              <ThemedText
                type="smallBold"
                themeColor="textSecondary"
                style={[styles.fieldLabel, { marginTop: 14 }]}>
                LOCATION
              </ThemedText>
              <Pressable
                style={styles.selectBox}
                onPress={() => {
                  setLocationDropdownOpen((prev) => !prev);
                  setAccountDropdownOpen(false);
                }}>
                <View style={styles.selectLeft}>
                  <Ionicons name="location-outline" size={16} color="#7C3AED" />
                  <ThemedText type="small" style={styles.selectText}>
                    {selectedLocation.name}
                  </ThemedText>
                </View>
                <Ionicons
                  name={locationDropdownOpen ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color="#64748B"
                />
              </Pressable>

              {locationDropdownOpen && (
                <ThemedView type="background" style={styles.dropdownMenu}>
                  {filteredLocations.map((loc) => {
                    const isActive = loc.id === selectedLocation.id;
                    return (
                      <Pressable
                        key={loc.id}
                        style={[styles.dropdownItem, isActive && styles.dropdownItemActive]}
                        onPress={() => {
                          onSelectLocation(loc);
                          setLocationDropdownOpen(false);
                          onClose();
                        }}>
                        <ThemedText
                          type={isActive ? 'smallBold' : 'small'}
                          style={[
                            styles.dropdownItemText,
                            isActive && styles.dropdownItemTextActive,
                          ]}>
                          {loc.name}
                        </ThemedText>
                        {isActive && <Ionicons name="checkmark" size={15} color="#2563EB" />}
                      </Pressable>
                    );
                  })}
                </ThemedView>
              )}
            </View>
          </ThemedView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.28)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardWrap: {
    width: '100%',
    maxWidth: 300,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
  },
  closeBtn: {
    padding: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  body: {
    padding: 16,
  },
  fieldLabel: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  selectLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectText: {
    fontSize: 13,
    lineHeight: 18,
  },
  dropdownMenu: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  dropdownItemActive: {
    backgroundColor: '#EFF6FF',
  },
  dropdownItemText: {
    fontSize: 13,
    lineHeight: 18,
  },
  dropdownItemTextActive: {
    color: '#1D64D8',
  },
});
