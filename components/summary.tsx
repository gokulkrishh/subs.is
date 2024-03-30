import { SummaryNumber } from 'components/summary-number';
import { Subscriptions, User } from 'types/data';

import SummaryDropdown from './summary-dropdown';

type SummaryProps = {
  subscriptions: Subscriptions[];
};

export default async function Summary({ subscriptions }: SummaryProps) {
  const totalCost = subscriptions.reduce((acc, curr) => acc + parseFloat(curr.cost), 0);
  return (
    <div className="flex flex-col">
      <SummaryDropdown />
      <SummaryNumber from={0} to={200} />
    </div>
  );
}
