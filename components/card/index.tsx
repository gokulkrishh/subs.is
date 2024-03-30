'use client';

import { useCallback, useEffect, useState } from 'react';

import NavFilter from 'components/nav-filter';
import Summary from 'components/summary';
import { SearchInput } from 'components/ui/search-input';
import { navFilter, summaryFilter } from 'config/data';
import { LayoutGroup } from 'framer-motion';
import { filterDataByNav, filterDataBySearch, filterDataBySummary } from 'lib/data';
import { Subscriptions, User } from 'types/data';

import CardInfo from './info';

type CardProps = { subscriptions: Subscriptions[]; user: User | null };

export default function Card(props: CardProps) {
  const { subscriptions, user } = props;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelection] = useState<keyof typeof navFilter>(navFilter.upcoming.key);
  const [data, setData] = useState<Subscriptions[]>(subscriptions);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setData(filterDataBySearch(subscriptions, e.target.value));
    },
    [subscriptions],
  );

  const onNavChangeHandler = useCallback((key: keyof typeof navFilter) => {
    setSelection(key);
  }, []);

  return (
    <>
      <SearchInput type="text" value={search} placeholder="Search here" onChange={onChangeHandler} />
      <NavFilter count={data.length} selected={selected} onChange={onNavChangeHandler} />
      <div className="flex mt-6 mb-10 flex-col gap-3">
        <LayoutGroup id="cards">
          {data.length ? (
            data.map((subscription) => (
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
