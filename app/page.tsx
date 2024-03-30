import Card from 'components/card';
import Summary from 'components/summary';
import { navFilter, summaryFilter } from 'config/data';

import { getSubscriptions } from './actions/subscriptions';
import { getUser } from './actions/user';

export default async function Page() {
  const user = await getUser();
  const subscriptions = await getSubscriptions(
    (user?.filter_by as keyof typeof summaryFilter) || summaryFilter.all.key,
  );

  return (
    <main className="flex flex-col mt-10">
      <Summary user={user} subscriptions={subscriptions} />
      <div className="flex flex-col my-10 mb-12">
        <Card user={user} subscriptions={subscriptions} />
      </div>
    </main>
  );
}
