import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { SalesTrendChart } from '@/components/dashboard/SalesTrendChart';
import { StatCards } from '@/components/dashboard/StatCards';
import { TopSellingGames } from '@/components/dashboard/TopSellingGames';
import { AppLayout } from '@/components/layout/AppLayout';
import {
  DASHBOARD_ALERTS,
  KPI_STATS,
  SALES_TREND_14D,
  TOP_SELLING_GAMES,
} from '@/data/dashboard';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/ui/themedText';
import { ThemedView } from '@/ui/themedView';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 960;
  const theme = useTheme();

  const [activeNavId, setActiveNavId] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return DASHBOARD_ALERTS;
    return DASHBOARD_ALERTS.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.register.toLowerCase().includes(q) ||
        a.cashier.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const activeSectionTitle = activeNavId
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  return (
    <AppLayout
      activeNavId={activeNavId}
      onSelectNav={setActiveNavId}
      searchQuery={searchQuery}
      onChangeSearch={setSearchQuery}>
      {activeNavId === 'dashboard' ? (
        <>
          {/* Row 1: KPI Stat Cards */}
          <StatCards stats={KPI_STATS} />

          {/* Row 2: Lottery Sales Trend Chart */}
          <SalesTrendChart data={SALES_TREND_14D} />

          {/* Row 3: Top Selling Games + Alerts */}
          <View style={[styles.bottomRow, !isWide && styles.bottomRowStacked]}>
            <View style={isWide ? styles.leftCol : styles.fullCol}>
              <TopSellingGames
                games={TOP_SELLING_GAMES}
                onPressAllGames={() => setActiveNavId('lottery-games')}
              />
            </View>
            <View style={isWide ? styles.rightCol : styles.fullCol}>
              <AlertsPanel alerts={filteredAlerts} />
            </View>
          </View>
        </>
      ) : (
        <ThemedView
          type="background"
          style={[styles.sectionPlaceholder, { borderColor: theme.border }]}>
          <ThemedText type="smallBold" style={styles.placeholderTitle}>
            {activeSectionTitle}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.placeholderSubtitle}>
            This section is ready to be connected to your backend data.
          </ThemedText>
          <Pressable
            style={styles.backBtn}
            onPress={() => setActiveNavId('dashboard')}>
            <ThemedText type="smallBold" style={styles.backBtnText}>
              Back to Dashboard
            </ThemedText>
          </Pressable>
        </ThemedView>
      )}
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  bottomRowStacked: {
    flexDirection: 'column',
  },
  leftCol: {
    flex: 1.9,
    minWidth: 0,
  },
  rightCol: {
    flex: 1,
    minWidth: 280,
  },
  fullCol: {
    width: '100%',
  },
  sectionPlaceholder: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 320,
    gap: 10,
  },
  placeholderTitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  placeholderSubtitle: {
    fontSize: 13.5,
    textAlign: 'center',
  },
  backBtn: {
    marginTop: 8,
    backgroundColor: '#1D64D8',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 9,
  },
  backBtnText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#FFFFFF',
  },
});
