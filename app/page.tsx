import Summary from 'components/summary';

import { getSubscriptions } from './actions/subscriptions';

export default async function Page() {
  const subscriptions = await getSubscriptions();
  return (
    <main className="flex flex-col mt-10">
      <Summary subscriptions={subscriptions} />
      <div className="flex flex-col my-10 mb-12">Card</div>
    </main>
  );
}
