'use client';

import { useCallback, useEffect, useState } from 'react';

import NavFilter from 'components/nav-filter';
import { SearchInput } from 'components/ui/search-input';
import { navFilter, summaryFilter } from 'config/data';
import { motion } from 'framer-motion';
import { filterDataByNav, filterDataBySearch, filterDataBySummary } from 'lib/data';
import { Subscriptions, User } from 'types/data';

import CardInfo from './info';

type CardProps = { subscriptions: Subscriptions[]; user: User | null };

export default function Card(props: CardProps) {
  const { subscriptions, user } = props;
  const [search, setSearch] = useState('');
  const [selected, setSelection] = useState<keyof typeof navFilter>(navFilter.upcoming.key);
  const [data, setData] = useState<Subscriptions[]>(subscriptions);
  const summaryFilterBy = (user?.filter_by as keyof typeof summaryFilter) || summaryFilter.monthly.key;

  const filterData = useCallback(
    (navFilterBy: keyof typeof navFilter, searchText: string) => {
      const filteredSubscriptions = filterDataBySummary(subscriptions, summaryFilterBy, navFilterBy);
      const filteredByNav = filterDataByNav(filteredSubscriptions, summaryFilterBy, navFilterBy);
      return filterDataBySearch(filteredByNav, searchText);
    },
    [subscriptions, summaryFilterBy],
  );

  useEffect(() => {
    setData(filterData(selected, search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptions]);

  const onSearchHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setData(filterData(selected, e.target.value));
    },
    [filterData, selected],
  );

  const onNavChangeHandler = useCallback(
    (key: keyof typeof navFilter) => {
      setSelection(key);
      setData(filterData(key, search));
    },
    [filterData, search],
  );

  return (
    <>
      <SearchInput type="text" value={search} placeholder="Search here" onChange={onSearchHandler} />
      <NavFilter count={data.length} selected={selected} onChange={onNavChangeHandler} />
      <div className="flex mt-6 mb-10 flex-col gap-3">
        {data.length ? (
          data.map((subscription) => (
            <CardInfo selected={selected} user={user} key={subscription.id} subscription={subscription} />
          ))
        ) : (
          <div className="text-center mt-10 text-muted-foreground">
            No {selected !== navFilter.all.key ? selected : ''} subscriptions.
          </div>
        )}
      </div>
    </>
  );
}
