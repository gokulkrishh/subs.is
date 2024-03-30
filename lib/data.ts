import { navFilter, paymentCycle, summaryFilter } from 'config/data';
import {
  addMonths,
  addQuarters,
  addYears,
  endOfMonth,
  endOfYear,
  format,
  isBefore,
  isSameDay,
  isWithinInterval,
  previousDay,
  set,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  subDays,
  subMonths,
  subQuarters,
  subYears,
} from 'date-fns';
import { Subscriptions, SubscriptionsModified } from 'types/data';

import { formatDate } from './date';

export const filterDataBySearch = (data: SubscriptionsModified[], search: string) => {
  if (!search.length) return data;
  return data.filter((sub) => sub.name.toLowerCase().includes(search.toLowerCase()));
};

export const filterDataByNav = (
  data: SubscriptionsModified[],
  summarFilterBy: keyof typeof summaryFilter,
  navFilterBy: keyof typeof navFilter,
) => {
  return data.filter((sub) => {
    let startDate = new Date();
    let endDate = new Date();
    const today = new Date();
    const renewalDate = new Date(sub.renewal_date);

    if (summarFilterBy === summaryFilter.all.key) {
      return true;
    } else if (summarFilterBy === summaryFilter.monthly.key) {
      startDate = startOfMonth(new Date());
      endDate = endOfMonth(startDate);
    } else if (summarFilterBy === summaryFilter.yearly.key) {
      startDate = startOfYear(new Date());
      endDate = subDays(today, -1);
    }

    console.log(
      'sub',
      sub.name,
      sub.prev_renewal_date,
      summarFilterBy,
      isWithinInterval(new Date(sub.prev_renewal_date), { start: startDate, end: endDate }),
    );

    switch (navFilterBy) {
      case navFilter.upcoming.key:
        return isWithinInterval(renewalDate, { start: startDate, end: endDate });
      case navFilter.paid.key:
        return isWithinInterval(new Date(sub.prev_renewal_date), { start: startDate, end: endDate });
      case navFilter.all.key:
        return true;
      default:
        throw new Error('Unsupported filter');
    }
  });
};

export const filterDataBySummary = (data: SubscriptionsModified[], filterBy: keyof typeof summaryFilter) => {
  return data.filter((sub) => {
    const today = new Date();
    let startDate = new Date();
    let endDate = new Date();

    if (filterBy === summaryFilter.all.key) {
      return true;
    } else if (filterBy === summaryFilter.monthly.key) {
      startDate = startOfMonth(today);
      endDate = endOfMonth(today);
    } else if (filterBy === summaryFilter.yearly.key) {
      startDate = startOfYear(today);
      endDate = endOfYear(today);
    }

    return isWithinInterval(new Date(sub.renewal_date), { start: startDate, end: endDate });
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

  return formatDate(renewalDate.toISOString());
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
