'use client';

import { useCallback, useEffect, useState } from 'react';

import { useData } from 'components/context/data';
import NavFilter from 'components/nav-filter';
import Summary from 'components/summary';
import { SearchInput } from 'components/ui/search-input';
import { navFilter, summaryFilter } from 'config/data';
import { LayoutGroup } from 'framer-motion';
import { filterDataByNav, filterDataBySearch, filterDataBySummary } from 'lib/data';
import { Subscriptions, SubscriptionsModified, User } from 'types/data';

import CardInfo from './info';

type CardProps = { user: User | null };

export default function Card(props: CardProps) {
  const { user } = props;
  const { subscriptions, setSubscriptions } = useData();
  const [search, setSearch] = useState('');
  const [selected, setSelection] = useState<keyof typeof navFilter>(navFilter.upcoming.key);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      if (!e.target.value.length) {
        const isReset = true;
        setSubscriptions(subscriptions, isReset);
      } else {
        setSubscriptions(filterDataBySearch(subscriptions, e.target.value));
      }
    },
    [setSubscriptions, subscriptions],
  );

  const onNavChangeHandler = useCallback((key: keyof typeof navFilter) => {
    setSelection(key);
  }, []);

  return (
    <>
      <SearchInput type="text" value={search} placeholder="Search here" onChange={onChangeHandler} />
      <NavFilter count={subscriptions.length} selected={selected} onChange={onNavChangeHandler} />
      <div className="flex mt-6 mb-10 flex-col gap-3">
        <LayoutGroup id="cards">
          {subscriptions.length ? (
            subscriptions.map((subscription) => (
              <CardInfo selected={selected} user={user} key={subscription.id} subscription={subscription} />
            ))
          ) : (
            <div className="text-center mt-10 text-muted-foreground">No subscriptions.</div>
          )}
        </LayoutGroup>
      </div>
    </>
  );
}
