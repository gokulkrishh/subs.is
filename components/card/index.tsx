'use client';

import { useCallback, useEffect, useState } from 'react';

import NavFilter from 'components/nav-filter';
import Summary from 'components/summary';
import { SearchInput } from 'components/ui/search-input';
import { navFilter, summaryFilter } from 'config/data';
import { filterDataByNav, filterDataBySearch } from 'lib/data';
import { Subscriptions, User } from 'types/data';

import CardInfo from './info';

type CardProps = { subscriptions: Subscriptions[]; user: User | null };

export default function Card(props: CardProps) {
  const { subscriptions, user } = props;
  const [search, setSearch] = useState('');
  const [selected, setSelection] = useState<keyof typeof navFilter>(navFilter.monthly.key);
  const filterData = useCallback(
    (selected: keyof typeof navFilter, searchText: string) => {
      const filtered = filterDataByNav(subscriptions, selected);
      return filterDataBySearch(filtered, searchText);
    },
    [subscriptions],
  );
  const [data, setData] = useState<Subscriptions[]>(filterData(selected, search));

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
      <Summary user={user} subscriptions={data} />
      <div className="flex flex-col my-8 mb-12">
        <SearchInput type="text" value={search} placeholder="Search here" onChange={onSearchHandler} />
        <NavFilter
          filterBy={user?.filter_by as keyof typeof summaryFilter}
          count={data.length}
          selected={selected}
          onChange={onNavChangeHandler}
        />
        <div className="flex mt-6 mb-10 flex-col gap-3">
          {data.length ? (
            data.map((subscription) => <CardInfo user={user} key={subscription.id} subscription={subscription} />)
          ) : (
            <div className="text-center mt-10 text-muted-foreground">
              No {selected !== navFilter.all.key ? selected : ''} subscriptions{search.length ? ' found.' : '.'}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
