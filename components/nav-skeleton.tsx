import { Skeleton } from './ui/skeleton';

export default function NavSkeleton() {
  return (
    <div className="flex justify-between h-[42px] sm:h-[38px] sm:items-center flex-col gap-4 sm:flex-row">
      <h2 className="text-lg font-semibold">Subscriptions</h2>
      <Skeleton className="flex max-sm:self-end h-[42px] w-[286px] border border-input rounded-md" />
    </div>
  );
}
