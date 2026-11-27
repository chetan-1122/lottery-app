import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { TopSellingGame } from '@/types/dashboard';
import { ThemedText } from '@/ui/themedText';
import { ThemedView } from '@/ui/themedView';

interface TopSellingGamesProps {
  games: TopSellingGame[];
  onPressAllGames?: () => void;
}

export function TopSellingGames({ games, onPressAllGames }: TopSellingGamesProps) {
  return (
    <ThemedView type="background" style={styles.card}>
      <View style={styles.header}>
        <View>
          <ThemedText type="smallBold" style={styles.title}>
            Top Selling Games
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
            Instant games ranked by today&apos;s revenue
          </ThemedText>
        </View>
        <Pressable onPress={onPressAllGames} hitSlop={8}>
          <ThemedText type="linkPrimary" style={styles.link}>
            All games
          </ThemedText>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tableWrap}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <ThemedText type="small" themeColor="textSecondary" style={[styles.colHeader, styles.colGame]}>
              GAME
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={[styles.colHeader, styles.colNum]}>
              PRICE
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={[styles.colHeader, styles.colNum]}>
              SOLD
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={[styles.colHeader, styles.colNum]}>
              REVENUE
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={[styles.colHeader, styles.colSellThrough]}>
              SELL-THROUGH
            </ThemedText>
          </View>

          {/* Table Body */}
          {games.length === 0 ? (
            <View style={styles.emptyState}>
              <ThemedText type="small" themeColor="textSecondary" style={styles.emptyText}>
                No instant game sales recorded today
              </ThemedText>
            </View>
          ) : (
            games.map((game) => (
              <View key={game.id} style={styles.tableRow}>
                <ThemedText type="smallBold" style={[styles.cellPrimary, styles.colGame]} numberOfLines={1}>
                  {game.name}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={[styles.cellText, styles.colNum]}>
                  ${game.price.toFixed(2)}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={[styles.cellText, styles.colNum]}>
                  {game.sold}
                </ThemedText>
                <ThemedText type="smallBold" style={[styles.cellPrimary, styles.colNum]}>
                  ${game.revenue.toFixed(2)}
                </ThemedText>
                <ThemedText
                  type="small"
                  themeColor="textSecondary"
                  style={[styles.cellText, styles.colSellThrough]}>
                  {game.sellThrough}%
                </ThemedText>
              </View>
            ))
          )}
        </View>
      </ScrollView>
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
    minHeight: 340,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  link: {
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: '600',
    color: '#1D64D8',
  },
  tableWrap: {
    flexGrow: 1,
  },
  table: {
    flex: 1,
    minWidth: 460,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  colHeader: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  colGame: {
    flex: 2,
    paddingRight: 8,
  },
  colNum: {
    flex: 1,
    textAlign: 'right',
    paddingHorizontal: 6,
  },
  colSellThrough: {
    flex: 1.2,
    textAlign: 'right',
    paddingLeft: 6,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  cellPrimary: {
    fontSize: 13,
    lineHeight: 18,
  },
  cellText: {
    fontSize: 13,
    lineHeight: 18,
  },
  emptyState: {
    flex: 1,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.75,
  },
});
