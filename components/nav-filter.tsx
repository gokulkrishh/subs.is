'use client';

import { navFilter, summaryFilter } from 'config/data';
import { motion } from 'framer-motion';
import { cn } from 'lib/utils';
import { useTheme } from 'next-themes';

type NavFilterProps = {
  onChange: (key: keyof typeof navFilter) => void;
  selected: keyof typeof navFilter;
  filterBy: keyof typeof summaryFilter;
  count: string;
  loading?: boolean;
};

export default function NavFilter({ onChange, loading, selected, count, filterBy }: NavFilterProps) {
  const { resolvedTheme: theme } = useTheme();

  return (
    <div className="flex justify-between sm:items-center flex-col gap-4 sm:flex-row tabular-nums">
      <h2 className="text-lg font-semibold">
        Subscriptions{' '}
        {!loading ? (
          <span className="text-sm" title="Active + Inactive subscriptions count">
            ({count})
          </span>
        ) : null}
      </h2>
      <div className="flex border max-sm:self-end border-input max-w-fit bg-neutral-50 dark:bg-neutral-800/30 rounded-md">
        {Object.values(navFilter).map(({ key, label }) => {
          const isDisabled = filterBy === summaryFilter.all.key && key !== navFilter.all.key;
          return (
            <motion.button
              onClick={() => {
                if (!isDisabled) onChange(key);
              }}
              disabled={isDisabled}
              key={key}
              className={cn(
                `py-2 sm:py-1.5 m-0.5 font-medium disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring px-2.5 capitalize w-fit text-[13px] tracking-wide relative rounded-md`,
              )}
            >
              {label}
              {selected === key && (
                <motion.div
                  layoutId="selected"
                  initial={{
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                  }}
                  animate={{
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                  }}
                  transition={{ type: 'spring', duration: 0.3 }}
                  className="absolute h-full border border-input/50 w-full rounded-sm top-0 left-0"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
