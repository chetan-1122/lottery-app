import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { STORE_ACCOUNTS, STORE_LOCATIONS } from '@/data/dashboard';
import { StoreAccount, StoreLocation } from '@/types/dashboard';
import { ThemedView } from '@/ui/themedView';

import { Sidebar } from './Sidebar';
import { StoreSwitcherModal } from './StoreSwitcherModal';
import { TopHeader } from './TopHeader';

interface AppLayoutProps {
  children: React.ReactNode;
  activeNavId?: string;
  onSelectNav?: (itemId: string) => void;
  searchQuery?: string;
  onChangeSearch?: (query: string) => void;
}

export function AppLayout({
  children,
  activeNavId = 'dashboard',
  onSelectNav,
  searchQuery = '',
  onChangeSearch,
}: AppLayoutProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [internalNavId, setInternalNavId] = useState(activeNavId);
  const [internalSearch, setInternalSearch] = useState(searchQuery);

  const [selectedAccount, setSelectedAccount] = useState<StoreAccount>(STORE_ACCOUNTS[0]);
  const [selectedLocation, setSelectedLocation] = useState<StoreLocation>(STORE_LOCATIONS[0]);

  const currentNavId = onSelectNav ? activeNavId : internalNavId;
  const handleSelectNav = onSelectNav ?? setInternalNavId;

  const currentSearch = onChangeSearch ? searchQuery : internalSearch;
  const handleChangeSearch = onChangeSearch ?? setInternalSearch;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ThemedView type="backgroundElement" style={styles.root}>
        {/* Persistent Desktop Sidebar */}
        {isDesktop && (
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
            activeItemId={currentNavId}
            onSelectItem={handleSelectNav}
            selectedAccount={selectedAccount}
            selectedLocation={selectedLocation}
            onOpenStoreSwitcher={() => setStoreModalOpen(true)}
          />
        )}

        {/* Main Column */}
        <View style={styles.mainColumn}>
          <TopHeader
            isDesktop={isDesktop}
            onOpenMenu={() => setMobileDrawerOpen(true)}
            searchQuery={currentSearch}
            onChangeSearch={handleChangeSearch}
            tenantName={selectedAccount.name}
          />

          <ScrollView
            style={styles.contentScroll}
            contentContainerStyle={[
              styles.contentContainer,
              !isDesktop && styles.contentContainerMobile,
            ]}
            showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </View>

        {/* Mobile Drawer Sidebar */}
        {!isDesktop && (
          <Modal
            visible={mobileDrawerOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setMobileDrawerOpen(false)}>
            <View style={styles.drawerOverlay}>
              <ThemedView type="background" style={styles.drawerPanel}>
                <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
                  <Sidebar
                    collapsed={false}
                    activeItemId={currentNavId}
                    onSelectItem={handleSelectNav}
                    selectedAccount={selectedAccount}
                    selectedLocation={selectedLocation}
                    onOpenStoreSwitcher={() => {
                      setMobileDrawerOpen(false);
                      setStoreModalOpen(true);
                    }}
                    isMobileDrawer
                    onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
                  />
                </SafeAreaView>
              </ThemedView>
              <Pressable
                style={styles.drawerBackdrop}
                onPress={() => setMobileDrawerOpen(false)}
              />
            </View>
          </Modal>
        )}

        {/* Switch Store Modal */}
        <StoreSwitcherModal
          visible={storeModalOpen}
          onClose={() => setStoreModalOpen(false)}
          accounts={STORE_ACCOUNTS}
          locations={STORE_LOCATIONS}
          selectedAccount={selectedAccount}
          selectedLocation={selectedLocation}
          onSelectAccount={setSelectedAccount}
          onSelectLocation={setSelectedLocation}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F7FA',
  },
  mainColumn: {
    flex: 1,
    flexDirection: 'column',
    minWidth: 0,
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    gap: 18,
    paddingBottom: 32,
  },
  contentContainerMobile: {
    padding: 14,
    gap: 14,
    paddingBottom: 28,
  },
  drawerOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerPanel: {
    width: 240,
    shadowColor: '#0F172A',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 12,
  },
  drawerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },
});
