import { navFilter } from 'config/data';

import { Skeleton } from './ui/skeleton';

export default function NavSkeleton() {
  return (
    <div className="flex justify-between h-[42px] sm:h-[38px] sm:items-center flex-col gap-4 sm:flex-row">
      <h2 className="text-lg font-semibold">Subscriptions</h2>
      <div className="flex border max-sm:self-end border-input max-w-fit bg-neutral-50 dark:bg-neutral-800/30 rounded-full">
        {Object.values(navFilter).map(({ key, label }) => (
          <button
            key={key}
            className="py-2 sm:py-1.5 m-0.5 font-medium disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring px-2.5 capitalize w-fit text-[13px] tracking-wide relative rounded-full"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
