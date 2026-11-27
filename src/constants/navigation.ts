import { NavSection } from '@/types/dashboard';

export const SIDEBAR_SECTIONS: NavSection[] = [
  {
    id: 'main',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'grid-outline',
        route: '/',
      },
    ],
  },
  {
    id: 'operations',
    title: 'OPERATIONS',
    items: [
      {
        id: 'system-users',
        label: 'System Users',
        icon: 'people-outline',
        children: [
          { id: 'employees', label: 'Employees' },
          { id: 'employee-groups', label: 'Employee Groups' },
          { id: 'users', label: 'Users' },
        ],
      },
      {
        id: 'lottery',
        label: 'Lottery',
        icon: 'ticket-outline',
        children: [
          { id: 'lottery-games', label: 'Lottery Games' },
          { id: 'lottery-adjustment', label: 'Lottery Adjustment' },
          { id: 'lottery-receiving', label: 'Lottery Receiving' },
          { id: 'lottery-activate', label: 'Lottery Activate' },
          { id: 'ticket-scan-format', label: 'Ticket Scan Format' },
        ],
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: 'pie-chart-outline',
      },
      {
        id: 'reconciliations',
        label: 'Reconciliations',
        icon: 'receipt-outline',
      },
      {
        id: 'devices',
        label: 'Devices',
        icon: 'desktop-outline',
      },
      {
        id: 'tender',
        label: 'Tender',
        icon: 'card-outline',
      },
    ],
  },
  {
    id: 'manage',
    title: 'MANAGE',
    items: [
      {
        id: 'history',
        label: 'History',
        icon: 'git-network-outline',
        children: [
          { id: 'audit-log', label: 'Audit Log' },
          { id: 'shift-history', label: 'Shift History' },
        ],
      },
      {
        id: 'others',
        label: 'Others',
        icon: 'ellipsis-horizontal-outline',
        children: [
          { id: 'taxes', label: 'Taxes' },
          { id: 'integrations', label: 'Integrations' },
        ],
      },
    ],
  },
];

export const SIDEBAR_FOOTER_ITEM = {
  id: 'settings',
  label: 'Settings',
  icon: 'settings-outline' as const,
};
