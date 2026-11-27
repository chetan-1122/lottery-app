import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { TopSellingGame } from '@/types/dashboard';

interface TopSellingGamesProps {
  games: TopSellingGame[];
  onPressAllGames?: () => void;
}

export function TopSellingGames({ games, onPressAllGames }: TopSellingGamesProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Top Selling Games</Text>
          <Text style={styles.subtitle}>Instant games ranked by today&apos;s revenue</Text>
        </View>
        <Pressable onPress={onPressAllGames} hitSlop={8}>
          <Text style={styles.link}>All games</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tableWrap}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.colHeader, styles.colGame]}>GAME</Text>
            <Text style={[styles.colHeader, styles.colNum]}>PRICE</Text>
            <Text style={[styles.colHeader, styles.colNum]}>SOLD</Text>
            <Text style={[styles.colHeader, styles.colNum]}>REVENUE</Text>
            <Text style={[styles.colHeader, styles.colSellThrough]}>SELL-THROUGH</Text>
          </View>

          {/* Table Body */}
          {games.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No instant game sales recorded today</Text>
            </View>
          ) : (
            games.map((game) => (
              <View key={game.id} style={styles.tableRow}>
                <Text style={[styles.cellPrimary, styles.colGame]} numberOfLines={1}>
                  {game.name}
                </Text>
                <Text style={[styles.cellText, styles.colNum]}>${game.price.toFixed(2)}</Text>
                <Text style={[styles.cellText, styles.colNum]}>{game.sold}</Text>
                <Text style={[styles.cellPrimary, styles.colNum]}>
                  ${game.revenue.toFixed(2)}
                </Text>
                <Text style={[styles.cellText, styles.colSellThrough]}>
                  {game.sellThrough}%
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
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
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  link: {
    fontSize: 12.5,
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
    fontWeight: '600',
    letterSpacing: 0.5,
    color: '#64748B',
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
    fontWeight: '600',
    color: '#0F172A',
  },
  cellText: {
    fontSize: 13,
    color: '#475569',
  },
  emptyState: {
    flex: 1,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: '#94A3B8',
  },
});
