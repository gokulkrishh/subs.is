'use client';

import { useState } from 'react';

import NavFilter from 'components/nav-filter';
import { SearchInput } from 'components/ui/search-input';
import { navFilter } from 'config/data';
import { LayoutGroup } from 'framer-motion';
import { Subscriptions, User } from 'types/data';

import CardInfo from './info';

type CardProps = { subscriptions: Subscriptions[]; user: User | null };

export default function Card(props: CardProps) {
  const { subscriptions, user } = props;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelection] = useState<keyof typeof navFilter>(navFilter.upcoming.key);

  return (
    <>
      <SearchInput
        className="mb-6"
        type="text"
        value={search}
        placeholder="Search here"
        onChange={(e) => setSearch(e.target.value)}
      />
      <NavFilter selected={selected} setSelection={setSelection} />
      <div className="flex mt-6 mb-10 flex-col gap-3">
        <LayoutGroup>
          {subscriptions.length ? (
            subscriptions.map((subscription) => (
              <CardInfo user={user} key={subscription.id} subscription={subscription} />
            ))
          ) : (
            <div className="text-center mt-10 text-muted-foreground">No subscriptions.</div>
          )}
        </LayoutGroup>
      </div>
    </>
  );
}
