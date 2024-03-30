import { Skeleton } from './ui/skeleton';

export default function NavSkeleton() {
  return (
    <div className="flex justify-between items-center">
      <h2 className="md:text-lg font-semibold">Subscriptions</h2>
      <Skeleton className="flex h-[38px] w-[181px] border border-input rounded-md" />
    </div>
  );
}
