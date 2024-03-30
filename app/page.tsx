import Card from 'components/card';
import Summary from 'components/summary';

import { getSubscriptions } from './actions/subscriptions';
import { getUser } from './actions/user';

export default async function Page() {
  const [user, subscriptions] = await Promise.all([await getUser(), await getSubscriptions()]);
  return (
    <main className="flex flex-col mt-10">
      <Summary subscriptions={subscriptions} />
      <div className="flex flex-col my-10 mb-12">
        <Card user={user} subscriptions={subscriptions} />
      </div>
    </main>
  );
}
