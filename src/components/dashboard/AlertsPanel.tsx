import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AlertItem } from '@/types/dashboard';
import { ThemedText } from '@/ui/themedText';
import { ThemedView } from '@/ui/themedView';

interface AlertsPanelProps {
  alerts: AlertItem[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <ThemedView type="background" style={styles.card}>
      <View style={styles.header}>
        <View>
          <ThemedText type="smallBold" style={styles.title}>
            Alerts
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
            Items that need attention
          </ThemedText>
        </View>
        <View style={styles.countBadge}>
          <ThemedText type="smallBold" style={styles.countText}>
            {alerts.length}
          </ThemedText>
        </View>
      </View>

      <View style={styles.list}>
        {alerts.map((alert) => (
          <View key={alert.id} style={styles.alertRow}>
            <View style={styles.iconWrap}>
              <Ionicons name="scale-outline" size={16} color="#D97706" />
            </View>
            <View style={styles.alertBody}>
              <ThemedText type="smallBold" style={styles.alertTitle}>
                {alert.title}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.alertMeta}>
                {alert.register} · {alert.cashier} · {alert.date}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
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
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 17,
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
    lineHeight: 16,
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
    lineHeight: 18,
    color: '#B45309',
  },
  alertMeta: {
    fontSize: 11.5,
    lineHeight: 16,
    marginTop: 2,
  },
});
