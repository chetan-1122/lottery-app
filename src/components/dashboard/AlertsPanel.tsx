import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AlertItem } from '@/types/dashboard';

interface AlertsPanelProps {
  alerts: AlertItem[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Alerts</Text>
          <Text style={styles.subtitle}>Items that need attention</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{alerts.length}</Text>
        </View>
      </View>

      <View style={styles.list}>
        {alerts.map((alert) => (
          <View key={alert.id} style={styles.alertRow}>
            <View style={styles.iconWrap}>
              <Ionicons name="scale-outline" size={16} color="#D97706" />
            </View>
            <View style={styles.alertBody}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertMeta}>
                {alert.register} · {alert.cashier} · {alert.date}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  countBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  list: {
    gap: 10,
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  iconWrap: {
    marginTop: 1,
  },
  alertBody: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#B45309',
  },
  alertMeta: {
    fontSize: 11.5,
    color: '#78716C',
    marginTop: 2,
  },
});
