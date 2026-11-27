import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { KpiStat } from '@/types/dashboard';
import { ThemedText } from '@/ui/themedText';
import { ThemedView } from '@/ui/themedView';

interface StatCardsProps {
  stats: KpiStat[];
}

export function StatCards({ stats }: StatCardsProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  return (
    <View style={styles.grid}>
      {stats.map((stat) => (
        <ThemedView
          key={stat.id}
          type="background"
          style={[styles.card, isWide ? styles.cardQuarter : styles.cardHalf]}>
          <View style={styles.topRow}>
            <ThemedText type="small" themeColor="textSecondary" style={styles.label} numberOfLines={1}>
              {stat.label}
            </ThemedText>
            <View style={[styles.iconBadge, { backgroundColor: stat.iconBg }]}>
              <Ionicons name={stat.icon} size={18} color={stat.iconColor} />
            </View>
          </View>
          <ThemedText type="subtitle" style={styles.value}>
            {stat.value}
          </ThemedText>
        </ThemedView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  cardQuarter: {
    flex: 1,
    minWidth: 180,
  },
  cardHalf: {
    width: '47.5%',
    flexGrow: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
    marginRight: 8,
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
});
