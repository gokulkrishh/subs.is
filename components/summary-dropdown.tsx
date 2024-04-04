'use client';

import { useEffect, useState } from 'react';

import { updateSummaryFilter } from 'app/actions/user';
import { summaryFilter } from 'config/data';
import { cn } from 'lib/utils';
import { toast } from 'sonner';
import { User } from 'types/data';

import { DownArrowIcon } from './icons';

export default function SummaryDropdown({ user }: { user: User | null }) {
  const [filterBy, setFilterBy] = useState<keyof typeof summaryFilter>(
    (user?.filter_by as keyof typeof summaryFilter) || summaryFilter.monthly.key,
  );

  useEffect(() => {
    setFilterBy(user?.filter_by as keyof typeof summaryFilter);
  }, [user?.filter_by]);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as keyof typeof summaryFilter;
    try {
      setFilterBy(value);
      await updateSummaryFilter(value);
    } catch (error) {
      toast.error(error?.toString());
    }
  };

  return (
    <h2 className="font-medium tracking-wide flex items-center gap-1">
      <label>Total cost</label>
      <div className={cn(`flex mt-[1px] w-fit relative items-center`)}>
        <select
          value={filterBy}
          onChange={onChange}
          className={cn(
            `appearance-none border-b rounded-none border-input bg-transparent w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`,
            {
              'w-[50px]': filterBy === summaryFilter.yearly.key,
              'w-[20px]': filterBy === summaryFilter.all.key,
            },
          )}
        >
          {Object.values(summaryFilter).map(({ key, label }) => (
            <option key={label} value={key}>
              {label}
            </option>
          ))}
        </select>
        <DownArrowIcon className="ml-0.5 absolute -right-5 h-4 w-4 text-primary" />
      </div>
    </h2>
  );
}
