export const summaryFilter = {
  all: {
    key: 'all',
    label: 'all',
  },
  monthly: {
    key: 'monthly',
    label: 'monthly',
  },
  yearly: {
    key: 'yearly',
    label: 'yearly',
  },
} as const;

export const navFilter = {
  monthly: { key: 'monthly', label: 'Monthly' },
  yearly: { key: 'yearly', label: 'Yearly' },
  quarterly: { key: 'quarterly', label: 'Quarterly' },
  all: { key: 'all', label: 'All' },
} as const;

export const paymentCycle = {
  monthly: {
    key: 'monthly',
    label: 'month',
  },
  quarterly: {
    key: 'quarterly',
    label: 'quater',
  },
  yearly: {
    key: 'yearly',
    label: 'year',
  },
} as const;
