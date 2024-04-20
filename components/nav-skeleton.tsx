import { Skeleton } from './ui/skeleton';

export default function NavSkeleton() {
  return (
    <div className="flex justify-between h-[42px] sm:h-[38px] sm:items-center flex-col gap-4 sm:flex-row">
      <h2 className="text-lg font-semibold">
        Subscriptions <span className="text-sm">(0)</span>
      </h2>
      <div className="flex border max-sm:self-end border-input max-w-fit bg-neutral-50 dark:bg-neutral-800/30 rounded-md">
        <button className="py-2 sm:py-1.5 m-0.5 font-medium disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring px-2.5 capitalize w-fit text-[13px] tracking-wide relative rounded-md">
          Upcoming
          <div
            className="absolute h-full border border-input/50 w-full rounded-sm top-0 left-0"
            style={{ backgroundColor: `rgba(255, 255, 255, 0.2)`, opacity: '1' }}
          ></div>
        </button>
        <button className="py-2 sm:py-1.5 m-0.5 font-medium disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring px-2.5 capitalize w-fit text-[13px] tracking-wide relative rounded-md">
          Monthly
        </button>
        <button className="py-2 sm:py-1.5 m-0.5 font-medium disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring px-2.5 capitalize w-fit text-[13px] tracking-wide relative rounded-md">
          Yearly
        </button>
        <button className="py-2 sm:py-1.5 m-0.5 font-medium disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring px-2.5 capitalize w-fit text-[13px] tracking-wide relative rounded-md">
          All
        </button>
      </div>
    </div>
  );
}
