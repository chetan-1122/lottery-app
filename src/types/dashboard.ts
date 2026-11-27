export interface StoreAccount {
  id: string;
  name: string;
}

export interface StoreLocation {
  id: string;
  accountId: string;
  name: string;
  initials: string;
}

export interface NavChildItem {
  id: string;
  label: string;
  route?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon:
    | 'grid-outline'
    | 'people-outline'
    | 'ticket-outline'
    | 'pie-chart-outline'
    | 'receipt-outline'
    | 'desktop-outline'
    | 'card-outline'
    | 'git-network-outline'
    | 'ellipsis-horizontal-outline'
    | 'settings-outline';
  route?: string;
  children?: NavChildItem[];
}

export interface NavSection {
  id: string;
  title?: string;
  items: NavItem[];
}

export interface KpiStat {
  id: string;
  label: string;
  value: number;
  icon: 'ticket-outline' | 'cube-outline' | 'flash-outline' | 'archive-outline';
  iconColor: string;
  iconBg: string;
}

export interface SalesTrendPoint {
  date: string;
  fullDate: string;
  instantSales: number;
  onlineSales: number;
  payouts: number;
  ticketsSold: number;
  netCash: number;
  activeBooks: number;
  ticketsInStock: number;
}

export interface TopSellingGame {
  id: string;
  name: string;
  price: number;
  sold: number;
  revenue: number;
  sellThrough: number;
}

export interface AlertItem {
  id: string;
  title: string;
  register: string;
  cashier: string;
  date: string;
  severity: 'warning' | 'danger';
}
