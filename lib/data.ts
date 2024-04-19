import { navFilter, paymentCycle } from 'config/data';
import {
  addMonths,
  addQuarters,
  addWeeks,
  addYears,
  format,
  isAfter,
  isBefore,
  isSameDay,
  set,
  subDays,
  subMonths,
  subQuarters,
  subYears,
} from 'date-fns';
import { Subscriptions } from 'types/data';

export const filterDataBySearch = (data: Subscriptions[], searchText: string) => {
  if (!searchText.length) return data;
  return data.filter((sub) => sub.name.toLowerCase().includes(searchText.toLowerCase()));
};

export const filterDataByNav = (data: Subscriptions[], filterBy: keyof typeof navFilter) => {
  if (filterBy === navFilter.upcoming.key) {
    const today = subDays(new Date(), 1);
    const twoWeeks = addWeeks(today, 2);
    return data.filter((sub) => {
      const renewalDate = new Date(sub.renewal_date ?? '');
      return isAfter(renewalDate, today) && isBefore(renewalDate, twoWeeks);
    });
  }

  return data
    .filter((sub) => filterBy === navFilter.all.key || sub.payment_cycle === filterBy)
    .sort((a, b) => {
      return a?.renewal_date?.localeCompare(b?.renewal_date ?? '') ?? 0;
    });
};

export const calculateRenewalDate = (start_date: string, payment_cycle: string): string => {
  const startDate = new Date(start_date);
  const today = new Date();
  let renewalDate;
  switch (payment_cycle) {
    case paymentCycle.monthly.key:
      renewalDate = set(startDate, { month: today.getMonth(), year: today.getFullYear() });
      if (isBefore(renewalDate, today) && !isSameDay(renewalDate, today)) {
        renewalDate = addMonths(renewalDate, 1);
      }
      break;
    case paymentCycle.yearly.key:
      renewalDate = set(startDate, { year: today.getFullYear() });
      if (isBefore(renewalDate, today) && !isSameDay(renewalDate, today)) {
        renewalDate = addYears(renewalDate, 1);
      }
      break;
    case paymentCycle.quarterly.key:
      renewalDate = set(startDate, { year: today.getFullYear() });
      if (isBefore(renewalDate, today) && !isSameDay(renewalDate, today)) {
        renewalDate = addQuarters(renewalDate, 1);
      }
      break;
    default:
      throw new Error('Unsupported payment cycle');
  }

  return format(renewalDate, 'yyyy-MM-dd');
};

export const calculatePrevRenewalDate = (billing_date: string, renewal_date: string, payment_cycle: string): string => {
  const startDate = new Date(billing_date);
  const renewalDate = new Date(renewal_date);
  let prevRenewalDate;

  if (isSameDay(startDate, renewalDate)) {
    return format(renewalDate, 'yyyy-MM-dd');
  }

  switch (payment_cycle) {
    case paymentCycle.monthly.key:
      prevRenewalDate = subMonths(renewalDate, 1);
      break;
    case paymentCycle.yearly.key:
      prevRenewalDate = subYears(renewalDate, 1);
      break;
    case paymentCycle.quarterly.key:
      prevRenewalDate = subQuarters(renewalDate, 1);
    default:
      throw new Error('Unsupported payment cycle');
  }

  return format(prevRenewalDate, 'yyyy-MM-dd');
};

export const activeFilter = (subscription: Subscriptions) => subscription.active;
export const inActiveFilter = (subscription: Subscriptions) => !subscription.active;
