import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { AlertItem } from '@/types/dashboard';
import { ThemedText } from '@/ui/themedText';
import { ThemedView } from '@/ui/themedView';

interface AlertsPanelProps {
  alerts: AlertItem[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  const theme = useTheme();

  return (
    <ThemedView type="background" style={[styles.card, { borderColor: theme.border }]}>
      <View style={styles.header}>
        <View>
          <ThemedText type="smallBold" style={styles.title}>
            Alerts
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
            Items that need attention
          </ThemedText>
        </View>
        <View style={[styles.countBadge, { backgroundColor: theme.badgeDangerBg }]}>
          <ThemedText type="smallBold" style={[styles.countText, { color: theme.badgeDangerText }]}>
            {alerts.length}
          </ThemedText>
        </View>
      </View>

      <View style={styles.list}>
        {alerts.map((alert) => (
          <View
            key={alert.id}
            style={[
              styles.alertRow,
              { backgroundColor: theme.alertBg, borderColor: theme.alertBorder },
            ]}>
            <View style={styles.iconWrap}>
              <Ionicons name="scale-outline" size={16} color={theme.alertText} />
            </View>
            <View style={styles.alertBody}>
              <ThemedText type="smallBold" style={[styles.alertTitle, { color: theme.alertText }]}>
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
    padding: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
  },
  countText: {
    fontSize: 12,
    lineHeight: 16,
  },
  list: {
    gap: 10,
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderWidth: 1,
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
  },
  alertMeta: {
    fontSize: 11.5,
    lineHeight: 16,
    marginTop: 2,
  },
});
