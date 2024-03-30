import { Database } from './supabase';

export type Subscriptions = Database['public']['Tables']['subscriptions']['Row'];
export type SubscriptionsInsert = Database['public']['Tables']['subscriptions']['Insert'];
export type SubscriptionsUpdate = Database['public']['Tables']['subscriptions']['Update'];

export type User = Database['public']['Tables']['users']['Row'];

export type SubscriptionsModified = Subscriptions & {
  renewal_date: string;
  prev_renewal_date: string;
};

export type Currency = {
  symbol: string;
  name_plural: string;
  code: string;
  symbol_native: string;
  decimal_digits: number;
  name: string;
  rounding: number;
};
