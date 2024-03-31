import Card from 'components/card';
import Summary from 'components/summary';
import { navFilter, summaryFilter } from 'config/data';

import { getSubscriptions } from './actions/subscriptions';
import { getUser } from './actions/user';

export default async function Page() {
  const user = await getUser();
  const subscriptions = await getSubscriptions();

  return (
    <main className="flex flex-col mt-10">
      <Card user={user} subscriptions={subscriptions} />
    </main>
  );
}
