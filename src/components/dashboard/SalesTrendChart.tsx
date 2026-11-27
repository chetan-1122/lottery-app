import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg';

import { SalesTrendPoint } from '@/types/dashboard';

interface SalesTrendChartProps {
  data: SalesTrendPoint[];
}

type RangeOption = '7D' | '14D';

const CHART_HEIGHT = 230;
const PAD_LEFT = 42;
const PAD_RIGHT = 16;
const PAD_TOP = 14;
const PAD_BOTTOM = 28;
const Y_TICKS = [0, 25, 50, 75, 100];
const MAX_Y_DISPLAY = 105;

function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export function SalesTrendChart({ data }: SalesTrendChartProps) {
  const [range, setRange] = useState<RangeOption>('14D');
  const [chartWidth, setChartWidth] = useState(600);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const visibleData = useMemo(
    () => (range === '7D' ? data.slice(-7) : data),
    [data, range]
  );

  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0) setChartWidth(w);
  };

  const innerW = Math.max(chartWidth - PAD_LEFT - PAD_RIGHT, 100);
  const innerH = CHART_HEIGHT - PAD_TOP - PAD_BOTTOM;

  const points = useMemo(() => {
    const count = visibleData.length;
    return visibleData.map((item, idx) => {
      const x = PAD_LEFT + (count > 1 ? (idx / (count - 1)) * innerW : innerW / 2);
      const clampedVal = Math.min(item.instantSales, MAX_Y_DISPLAY);
      const y = PAD_TOP + innerH - (clampedVal / MAX_Y_DISPLAY) * innerH;
      return { x, y, item };
    });
  }, [visibleData, innerW, innerH]);

  const instantPath = useMemo(() => buildSmoothPath(points), [points]);

  const selectedPoint =
    selectedIndex !== null && selectedIndex < points.length ? points[selectedIndex] : null;

  const showEveryNthLabel = chartWidth < 460 && visibleData.length > 7 ? 2 : 1;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Lottery Sales Trend</Text>
            <Ionicons name="information-circle-outline" size={16} color="#94A3B8" />
          </View>
          <Text style={styles.subtitle}>Instant vs online sales and payouts</Text>
        </View>

        <View style={styles.rangeToggle}>
          {(['7D', '14D'] as RangeOption[]).map((opt) => {
            const active = range === opt;
            return (
              <Pressable
                key={opt}
                style={[styles.rangeBtn, active && styles.rangeBtnActive]}
                onPress={() => {
                  setRange(opt);
                  setSelectedIndex(null);
                }}>
                <Text style={[styles.rangeText, active && styles.rangeTextActive]}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Chart Area */}
      <View style={styles.chartWrap} onLayout={handleLayout}>
        <Svg width={chartWidth} height={CHART_HEIGHT}>
          {/* Horizontal gridlines & Y labels */}
          {Y_TICKS.map((tick) => {
            const y = PAD_TOP + innerH - (tick / MAX_Y_DISPLAY) * innerH;
            return (
              <React.Fragment key={tick}>
                <Line
                  x1={PAD_LEFT}
                  y1={y}
                  x2={chartWidth - PAD_RIGHT}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeWidth={1}
                  strokeDasharray={tick === 0 ? undefined : '3,4'}
                />
                <SvgText
                  x={PAD_LEFT - 8}
                  y={y + 4}
                  fontSize={10.5}
                  fill="#64748B"
                  textAnchor="end">
                  {`$${tick}`}
                </SvgText>
              </React.Fragment>
            );
          })}

          {/* Baseline for Online / Draw and Payouts */}
          <Line
            x1={PAD_LEFT}
            y1={PAD_TOP + innerH}
            x2={chartWidth - PAD_RIGHT}
            y2={PAD_TOP + innerH}
            stroke="#93C5FD"
            strokeWidth={1.5}
            strokeDasharray="4,4"
          />

          {/* Instant (Scratch) smooth curve */}
          <Path d={instantPath} fill="none" stroke="#3B6FD8" strokeWidth={2} />

          {/* Selected vertical crosshair */}
          {selectedPoint && (
            <>
              <Line
                x1={selectedPoint.x}
                y1={PAD_TOP}
                x2={selectedPoint.x}
                y2={PAD_TOP + innerH}
                stroke="#94A3B8"
                strokeWidth={1}
                strokeDasharray="3,3"
              />
              <Circle
                cx={selectedPoint.x}
                cy={selectedPoint.y}
                r={5}
                fill="#1D64D8"
                stroke="#FFFFFF"
                strokeWidth={2}
              />
            </>
          )}

          {/* X-axis date labels */}
          {points.map((pt, idx) =>
            idx % showEveryNthLabel === 0 ? (
              <SvgText
                key={pt.item.date}
                x={pt.x}
                y={CHART_HEIGHT - 8}
                fontSize={10.5}
                fill={selectedIndex === idx ? '#1D64D8' : '#64748B'}
                fontWeight={selectedIndex === idx ? '700' : '400'}
                textAnchor="middle">
                {pt.item.date}
              </SvgText>
            ) : null
          )}
        </Svg>

        {/* Invisible tap columns so user can tap any date to inspect tooltip */}
        <View style={[styles.touchOverlay, { left: PAD_LEFT, right: PAD_RIGHT }]}>
          {points.map((pt, idx) => (
            <Pressable
              key={pt.item.date}
              style={styles.touchColumn}
              onPress={() => setSelectedIndex((prev) => (prev === idx ? null : idx))}
            />
          ))}
        </View>
      </View>

      {/* Interactive Tooltip Detail Card (shown when a date is tapped) */}
      {selectedPoint && (
        <View style={styles.tooltipCard}>
          <View style={styles.tooltipHeader}>
            <Text style={styles.tooltipDate}>{selectedPoint.item.fullDate}</Text>
            <Pressable onPress={() => setSelectedIndex(null)} hitSlop={8}>
              <Ionicons name="close" size={16} color="#94A3B8" />
            </Pressable>
          </View>

          <Text style={styles.tooltipSectionTitle}>SCRATCH TICKET SALES</Text>

          <View style={styles.tooltipRow}>
            <View style={styles.tooltipLegendLeft}>
              <View style={[styles.dot, { backgroundColor: '#3B6FD8' }]} />
              <Text style={styles.tooltipLabel}>Instant (Scratch)</Text>
            </View>
            <Text style={styles.tooltipAmount}>
              ${selectedPoint.item.instantSales.toFixed(2)}
            </Text>
          </View>

          <View style={styles.tooltipRow}>
            <View style={styles.tooltipLegendLeft}>
              <View style={[styles.dot, { backgroundColor: '#93C5FD' }]} />
              <Text style={styles.tooltipLabel}>Online / Draw</Text>
            </View>
            <Text style={styles.tooltipAmount}>
              ${selectedPoint.item.onlineSales.toFixed(2)}
            </Text>
          </View>

          <View style={styles.tooltipRow}>
            <View style={styles.tooltipLegendLeft}>
              <View style={[styles.dot, { backgroundColor: '#64748B' }]} />
              <Text style={styles.tooltipLabel}>Payouts</Text>
            </View>
            <Text style={styles.tooltipAmount}>
              -${selectedPoint.item.payouts.toFixed(2)}
            </Text>
          </View>

          <View style={styles.tooltipDivider} />

          <View style={styles.tooltipRow}>
            <Text style={styles.tooltipLabel}>Scratch tickets sold</Text>
            <Text style={styles.tooltipAmount}>{selectedPoint.item.ticketsSold}</Text>
          </View>

          <View style={styles.tooltipRow}>
            <Text style={styles.tooltipLabel}>Net lottery cash</Text>
            <Text style={[styles.tooltipAmount, { color: '#1D64D8' }]}>
              ${selectedPoint.item.netCash.toFixed(2)}
            </Text>
          </View>

          <Text style={[styles.tooltipSectionTitle, { marginTop: 10 }]}>LOTTERY INVENTORY</Text>

          <View style={styles.inventoryRow}>
            <View style={styles.inventoryBox}>
              <Text style={styles.inventoryVal}>{selectedPoint.item.activeBooks}</Text>
              <Text style={styles.inventorySub}>Active books</Text>
            </View>
            <View style={styles.inventoryBox}>
              <Text style={styles.inventoryVal}>
                {selectedPoint.item.ticketsInStock.toLocaleString()}
              </Text>
              <Text style={styles.inventorySub}>Tickets in stock</Text>
            </View>
          </View>
        </View>
      )}

      {/* Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#3B6FD8' }]} />
          <Text style={styles.legendText}>Instant (Scratch)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#93C5FD' }]} />
          <Text style={styles.legendText}>Online / Draw</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#64748B' }]} />
          <Text style={styles.legendText}>Payouts</Text>
        </View>
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
    gap: 12,
  },
  titleWrap: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
  rangeToggle: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 3,
    gap: 2,
  },
  rangeBtn: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 6,
  },
  rangeBtnActive: {
    backgroundColor: '#1D64D8',
  },
  rangeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  rangeTextActive: {
    color: '#FFFFFF',
  },
  chartWrap: {
    position: 'relative',
    width: '100%',
    height: CHART_HEIGHT,
  },
  touchOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  touchColumn: {
    flex: 1,
  },
  tooltipCard: {
    marginTop: 12,
    marginBottom: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    maxWidth: 260,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  tooltipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tooltipDate: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  tooltipSectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.7,
    color: '#64748B',
    marginBottom: 6,
  },
  tooltipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  tooltipLegendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tooltipLabel: {
    fontSize: 12,
    color: '#475569',
  },
  tooltipAmount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  tooltipDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 6,
  },
  inventoryRow: {
    flexDirection: 'row',
    gap: 8,
  },
  inventoryBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    padding: 8,
  },
  inventoryVal: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  inventorySub: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 2,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 16,
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#475569',
  },
});
