import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { KpiStat } from '@/types/dashboard';

interface StatCardsProps {
  stats: KpiStat[];
}

export function StatCards({ stats }: StatCardsProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  return (
    <View style={styles.grid}>
      {stats.map((stat) => (
        <View
          key={stat.id}
          style={[styles.card, isWide ? styles.cardQuarter : styles.cardHalf]}>
          <View style={styles.topRow}>
            <Text style={styles.label} numberOfLines={1}>
              {stat.label}
            </Text>
            <View style={[styles.iconBadge, { backgroundColor: stat.iconBg }]}>
              <Ionicons name={stat.icon} size={18} color={stat.iconColor} />
            </View>
          </View>
          <Text style={styles.value}>{stat.value}</Text>
        </View>
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
    backgroundColor: '#FFFFFF',
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
    fontWeight: '500',
    color: '#475569',
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
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
});
