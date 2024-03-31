'use client';

import { SummaryNumber } from 'components/summary-number';
import { Subscriptions, User } from 'types/data';

import SummaryDropdown from './summary-dropdown';

type SummaryProps = {
  subscriptions: Subscriptions[];
  user: User | null;
};

export default function Summary({ subscriptions, user }: SummaryProps) {
  const totalCost = subscriptions.reduce((acc, curr) => acc + parseFloat(curr.cost), 0);
  return (
    <div className="flex flex-col">
      <h2 className="font-medium tracking-wide flex items-center gap-1">Total cost for subscriptions</h2>
      <SummaryNumber from={0} to={totalCost} />
    </div>
  );
}
