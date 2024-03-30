'use client';

import { use } from 'react';

import { SummaryNumber } from 'components/summary-number';

import { useData } from './context/data';
import SummaryDropdown from './summary-dropdown';

export default function Summary() {
  const { subscriptions } = useData();
  const totalCost = subscriptions.reduce((acc, curr) => acc + parseFloat(curr.cost), 0);
  return (
    <div className="flex flex-col">
      <SummaryDropdown />
      <SummaryNumber from={0} to={totalCost} />
    </div>
  );
}
