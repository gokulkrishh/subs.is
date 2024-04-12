import { SummaryNumber } from 'components/summary-number';
import { getCurrencySymbol } from 'lib/numbers';
import { Subscriptions, User } from 'types/data';

type SummaryProps = {
  subscriptions: Subscriptions[];
  user: User | null;
};

export default function Summary({ subscriptions, user }: SummaryProps) {
  const totalCost = subscriptions.reduce((acc, curr) => acc + parseFloat(curr.cost), 0);
  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-lg tracking-wide flex items-center gap-1">Total cost for subscriptions</h2>
      <div className="text-5xl mt-2">
        <span className="mr-1 font-sans font-bold">{getCurrencySymbol(user?.currency_code)}</span>
        <SummaryNumber from={0} to={totalCost} />
      </div>
    </div>
  );
}
