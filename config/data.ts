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
  upcoming: { key: 'upcoming', label: 'Upcoming' },
  monthly: { key: 'monthly', label: 'Monthly' },
  yearly: { key: 'yearly', label: 'Yearly' },
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
  lifetime: {
    key: 'lifetime',
    label: 'lifetime',
  },
} as const;
