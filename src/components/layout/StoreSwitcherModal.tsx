import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { StoreAccount, StoreLocation } from '@/types/dashboard';

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
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.title}>Switch store</Text>
            <Pressable onPress={onClose} hitSlop={8} style={styles.closeBtn}>
              <Ionicons name="close" size={18} color="#64748B" />
            </Pressable>
          </View>

          <View style={styles.divider} />

          <View style={styles.body}>
            <Text style={styles.fieldLabel}>ACCOUNT</Text>
            <Pressable
              style={styles.selectBox}
              onPress={() => {
                setAccountDropdownOpen((prev) => !prev);
                setLocationDropdownOpen(false);
              }}>
              <View style={styles.selectLeft}>
                <Ionicons name="business-outline" size={16} color="#2563EB" />
                <Text style={styles.selectText}>{selectedAccount.name}</Text>
              </View>
              <Ionicons
                name={accountDropdownOpen ? 'chevron-up' : 'chevron-down'}
                size={16}
                color="#64748B"
              />
            </Pressable>

            {accountDropdownOpen && (
              <View style={styles.dropdownMenu}>
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
                      <Text
                        style={[
                          styles.dropdownItemText,
                          isActive && styles.dropdownItemTextActive,
                        ]}>
                        {acc.name}
                      </Text>
                      {isActive && <Ionicons name="checkmark" size={15} color="#2563EB" />}
                    </Pressable>
                  );
                })}
              </View>
            )}

            <Text style={[styles.fieldLabel, { marginTop: 14 }]}>LOCATION</Text>
            <Pressable
              style={styles.selectBox}
              onPress={() => {
                setLocationDropdownOpen((prev) => !prev);
                setAccountDropdownOpen(false);
              }}>
              <View style={styles.selectLeft}>
                <Ionicons name="location-outline" size={16} color="#7C3AED" />
                <Text style={styles.selectText}>{selectedLocation.name}</Text>
              </View>
              <Ionicons
                name={locationDropdownOpen ? 'chevron-up' : 'chevron-down'}
                size={16}
                color="#64748B"
              />
            </Pressable>

            {locationDropdownOpen && (
              <View style={styles.dropdownMenu}>
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
                      <Text
                        style={[
                          styles.dropdownItemText,
                          isActive && styles.dropdownItemTextActive,
                        ]}>
                        {loc.name}
                      </Text>
                      {isActive && <Ionicons name="checkmark" size={15} color="#2563EB" />}
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
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
  card: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#FFFFFF',
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
    fontWeight: '600',
    color: '#0F172A',
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
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#64748B',
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
    fontWeight: '500',
    color: '#0F172A',
  },
  dropdownMenu: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
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
    color: '#334155',
  },
  dropdownItemTextActive: {
    color: '#1D64D8',
    fontWeight: '600',
  },
});
