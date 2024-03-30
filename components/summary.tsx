import { Number } from 'components/number';
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
      <div className="text-5xl mt-2 font-black tabular-nums">
        <Number from={0} to={totalCost} />
      </div>
    </div>
  );
}
